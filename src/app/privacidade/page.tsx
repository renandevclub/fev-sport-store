import type { Metadata } from "next";
import Link from "next/link";
import { contactEmail, getCanonicalPath } from "@/lib/store-data";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Conheça as práticas de privacidade da F&V Sports Store.",
  ...(getCanonicalPath("/privacidade") ? { alternates: { canonical: getCanonicalPath("/privacidade") } } : {}),
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <Link className="brand" href="/" aria-label="F&V Sports Store, início">
          <span className="brand-mark" aria-hidden="true">F<span>&</span>V</span>
          <span className="brand-copy"><strong>SPORTS</strong><small>STORE</small></span>
        </Link>
        <Link className="legal-back" href="/">Voltar à loja <span aria-hidden="true">↗</span></Link>
      </header>
      <article className="legal-content">
        <p className="eyebrow eyebrow-dark"><span /> TRANSPARÊNCIA</p>
        <h1>Privacidade e<br /><em>links externos.</em></h1>
        <p className="legal-updated">F&V Sports Store · Brasil</p>

        <section>
          <h2>Como esta loja funciona</h2>
          <p>A F&V Sports Store apresenta produtos de vendedores e marketplaces independentes. Ao abrir um link de oferta, você sai deste site e passa a utilizar o serviço do vendedor, sujeito às políticas e condições dele.</p>
        </section>
        <section>
          <h2>Links de afiliados</h2>
          <p>Alguns links podem ser links de afiliados. Se uma compra elegível for concluída, a loja pode receber uma comissão, sem custo adicional para você. A existência de um clique não confirma uma venda ou comissão. Preços, estoque, entrega e condições comerciais são definidos pelo vendedor e podem mudar.</p>
        </section>
        <section>
          <h2>Dados e analytics</h2>
          <p>A versão inicial não exige conta, não oferece checkout e não instala cookies publicitários ou ferramentas externas de analytics. A interface emite eventos técnicos de navegação no navegador para permitir uma integração futura, mas não envia nem armazena esses eventos enquanto nenhum provedor estiver configurado.</p>
          <p>Não solicitamos CPF, endereço, telefone ou dados de pagamento. O vendedor pode tratar dados quando você acessa o site dele; consulte a política de privacidade desse serviço.</p>
        </section>
        <section>
          <h2>Contato</h2>
          {contactEmail
            ? <p>Para dúvidas sobre esta política, escreva para <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
            : <p>O canal de contato será informado pelo responsável da loja quando configurado.</p>}
        </section>
      </article>
      <footer className="legal-footer"><span>© {new Date().getFullYear()} F&V Sports Store</span><span>Documento sujeito à revisão pelo responsável da loja antes da publicação.</span></footer>
    </main>
  );
}