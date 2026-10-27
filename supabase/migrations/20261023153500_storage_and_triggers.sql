begin;

-- ==============================================================================
-- 1. Função e Triggers para atualização automática de updated_at
-- ==============================================================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_platforms_updated_at on public.platforms;
create trigger set_platforms_updated_at
  before update on public.platforms
  for each row execute function public.handle_updated_at();

drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at
  before update on public.categories
  for each row execute function public.handle_updated_at();

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();

drop trigger if exists set_product_images_updated_at on public.product_images;
create trigger set_product_images_updated_at
  before update on public.product_images
  for each row execute function public.handle_updated_at();

-- ==============================================================================
-- 2. Ajuste na política de leitura de categorias no RLS
-- Permite leitura de categorias ativas mesmo sem produtos publicados imediatos
-- ==============================================================================

drop policy if exists categories_read_with_published_products on public.categories;
drop policy if exists categories_read_active on public.categories;

create policy categories_read_active on public.categories
  for select to anon using (is_active);

-- ==============================================================================
-- 3. Políticas de RLS para o Supabase Storage (bucket 'product-images')
-- ==============================================================================

-- Leitura pública das imagens de produtos
drop policy if exists "product_images_public_read" on storage.objects;
create policy "product_images_public_read"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Upload permitido para usuários autenticados e service_role
drop policy if exists "product_images_insert" on storage.objects;
create policy "product_images_insert"
  on storage.objects for insert
  to authenticated, service_role
  with check (bucket_id = 'product-images');

-- Atualização de imagens existente
drop policy if exists "product_images_update" on storage.objects;
create policy "product_images_update"
  on storage.objects for update
  to authenticated, service_role
  using (bucket_id = 'product-images');

-- Exclusão de imagens
drop policy if exists "product_images_delete" on storage.objects;
create policy "product_images_delete"
  on storage.objects for delete
  to authenticated, service_role
  using (bucket_id = 'product-images');

commit;
