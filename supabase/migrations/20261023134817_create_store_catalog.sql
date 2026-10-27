begin;

create table public.platforms (
	id text primary key check (id ~ '^[a-z0-9-]+$'),
	name text not null unique,
	base_url text not null check (base_url ~ '^https://'),
	allowed_affiliate_hosts text[] not null default '{}',
	is_active boolean not null default true,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table public.sports (
	id text primary key check (id ~ '^[a-z0-9-]+$'),
	name text not null unique,
	created_at timestamptz not null default now()
);

create table public.categories (
	id uuid primary key default gen_random_uuid(),
	slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
	name text not null,
	description text,
	is_active boolean not null default true,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create unique index categories_name_lower_uidx on public.categories (lower(name));

create table public.products (
	id uuid primary key default gen_random_uuid(),
	external_id text unique,
	slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
	name text not null check (length(btrim(name)) > 0),
	description text not null default '',
	brand text,
	model text,
	product_type text,
	category_id uuid not null references public.categories(id) on delete restrict,
	platform_id text not null references public.platforms(id) on update cascade on delete restrict,
	source_url text check (source_url is null or source_url ~ '^https://'),
	affiliate_url text check (affiliate_url is null or affiliate_url ~ '^https://'),
	price numeric(12, 2) check (price is null or price >= 0),
	currency text not null default 'BRL' check (currency ~ '^[A-Z]{3}$'),
	availability text,
	status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
	attributes jsonb not null default '[]'::jsonb check (jsonb_typeof(attributes) = 'array'),
	football_types text[] not null default '{}',
	is_featured boolean not null default false,
	source_name text,
	source_checked_at date,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now(),
	constraint products_football_types_check check (football_types <@ array['campo', 'futsal', 'society']::text[])
);

create index products_category_status_idx on public.products (category_id, status);
create index products_platform_status_idx on public.products (platform_id, status);
create index products_updated_at_idx on public.products (updated_at desc);

create table public.product_sports (
	product_id uuid not null references public.products(id) on delete cascade,
	sport_id text not null references public.sports(id) on update cascade on delete cascade,
	created_at timestamptz not null default now(),
	primary key (product_id, sport_id)
);

create index product_sports_sport_product_idx on public.product_sports (sport_id, product_id);

create table public.product_rankings (
	product_id uuid not null references public.products(id) on delete cascade,
	sport_id text not null references public.sports(id) on update cascade on delete cascade,
	source_name text not null,
	rank integer not null check (rank > 0),
	observed_at date not null,
	created_at timestamptz not null default now(),
	primary key (product_id, sport_id, source_name, observed_at)
);

create index product_rankings_sport_date_rank_idx on public.product_rankings (sport_id, observed_at desc, rank);

create table public.product_images (
	id uuid primary key default gen_random_uuid(),
	product_id uuid not null references public.products(id) on delete cascade,
	storage_path text,
	source_url text,
	alt_text text not null default '',
	source_type text not null default 'pending' check (source_type in ('amazon-pa-api', 'authorized', 'provided', 'pending')),
	verified_at timestamptz,
	position integer not null default 0 check (position >= 0),
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now(),
	constraint product_images_single_location_check check (num_nonnulls(storage_path, source_url) = 1),
	constraint product_images_storage_path_check check (storage_path is null or (storage_path <> '' and storage_path !~ '^/')),
	constraint product_images_source_url_check check (source_url is null or source_url ~ '^https://')
);

create unique index product_images_product_position_uidx on public.product_images (product_id, position);
create index product_images_product_id_idx on public.product_images (product_id);

alter table public.platforms enable row level security;
alter table public.sports enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_sports enable row level security;
alter table public.product_rankings enable row level security;
alter table public.product_images enable row level security;

revoke all on table public.platforms, public.sports, public.categories, public.products,
	public.product_sports, public.product_rankings, public.product_images
	from public, anon, authenticated;

grant select on table public.platforms, public.sports, public.categories, public.products,
	public.product_sports, public.product_rankings, public.product_images to anon;
grant select, insert, update, delete on table public.platforms, public.sports, public.categories,
	public.products, public.product_sports, public.product_rankings, public.product_images to service_role;

create policy platforms_read_active on public.platforms
	for select to anon using (is_active);

create policy sports_read_public on public.sports
	for select to anon using (true);

create policy categories_read_with_published_products on public.categories
	for select to anon using (
		is_active and exists (
			select 1 from public.products p
			where p.category_id = categories.id and p.status = 'published'
		)
	);

create policy products_read_published on public.products
	for select to anon using (status = 'published');

create policy product_sports_read_published on public.product_sports
	for select to anon using (
		exists (select 1 from public.products p where p.id = product_sports.product_id and p.status = 'published')
	);

create policy product_rankings_read_published on public.product_rankings
	for select to anon using (
		exists (select 1 from public.products p where p.id = product_rankings.product_id and p.status = 'published')
	);

create policy product_images_read_published on public.product_images
	for select to anon using (
		exists (select 1 from public.products p where p.id = product_images.product_id and p.status = 'published')
	);

insert into public.platforms (id, name, base_url, allowed_affiliate_hosts) values
	('amazon', 'Amazon', 'https://www.amazon.com.br', array['www.amazon.com.br', 'amzn.to']),
	('shopee', 'Shopee', 'https://shopee.com.br', array['shopee.com.br', 'www.shopee.com.br', 's.shopee.com.br']),
	('mercado-livre', 'Mercado Livre', 'https://www.mercadolivre.com.br', array['mercadolivre.com.br', 'www.mercadolivre.com.br', 'produto.mercadolivre.com.br'])
on conflict (id) do nothing;

insert into public.sports (id, name) values
	('futebol', 'Futebol'),
	('volei', 'Vôlei')
on conflict (id) do nothing;

insert into public.categories (slug, name) values
	('bolas', 'Bolas'),
	('bombas-para-bolas', 'Bombas para bolas'),
	('protecao-esportiva', 'Proteção esportiva'),
	('joelheiras', 'Joelheiras'),
	('redes-e-lazer', 'Redes e lazer'),
	('acessorios', 'Acessórios'),
	('camisas-de-torcida', 'Camisas de torcida'),
	('mini-gols-e-recreacao', 'Mini-gols e recreação'),
	('roupas-para-treino', 'Roupas para treino'),
	('chuteiras', 'Chuteiras'),
	('luvas-de-goleiro', 'Luvas de goleiro'),
	('acessorios-para-bolas', 'Acessórios para bolas'),
	('treino-e-marcacao', 'Treino e marcação'),
	('arbitragem-e-treino', 'Arbitragem e treino')
on conflict (slug) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do nothing;

revoke execute on function public.rls_auto_enable() from public, anon, authenticated;

commit;
