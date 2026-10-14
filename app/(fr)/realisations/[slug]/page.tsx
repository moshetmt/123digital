import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { FaqListe } from '@/components/sections/FaqListe'
import { CTA } from '@/components/sections/CTA'
import { BASE_URL, faqPageSchema } from '@/lib/schema'
import { etudesDeCas } from '@/data/etudes-de-cas'
import { services } from '@/data/services'

const PHONE_TEL = 'tel:+33652092301'
const PHONE_DISPLAY = '06 52 09 23 01'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return etudesDeCas.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const etude = etudesDeCas.find((e) => e.slug === slug)
  if (!etude) return {}
  const url = `${BASE_URL}/realisations/${etude.slug}`
  return {
    title: etude.metaTitle,
    description: etude.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: etude.metaTitle,
      description: etude.metaDescription,
      url,
      type: 'article',
      images: [{ url: `${BASE_URL}${etude.maquette}`, width: 1600, height: 1000, alt: etude.titre }],
    },
  }
}

const h2Style = {
  fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
  lineHeight: 1.15,
  letterSpacing: '-0.01em',
  color: 'var(--ink)',
} as const

const sectionStyle = { padding: 'clamp(1.75rem, 5vw, 3rem) 1rem 0' } as const
const proseStyle = { color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: '68ch' } as const

function Recit({ titre, paragraphes, scene, inverse = false }: { titre: string; paragraphes: string[]; scene: string; inverse?: boolean }) {
  return (
    <section className="mx-auto max-w-5xl" style={sectionStyle}>
      <div className={`grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-10 items-center ${inverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div>
          <h2 className="font-sans font-extrabold mb-4" style={h2Style}>{titre}</h2>
          <div className="flex flex-col gap-3" style={proseStyle}>
            {paragraphes.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
        <Image
          src={scene}
          alt=""
          width={1200}
          height={900}
          sizes="(max-width: 1024px) 100vw, 440px"
          className="rounded w-full"
          style={{ height: 'auto', border: '1px solid var(--line)' }}
        />
      </div>
    </section>
  )
}

export default async function EtudeDeCasPage({ params }: Props) {
  const { slug } = await params
  const index = etudesDeCas.findIndex((e) => e.slug === slug)
  if (index === -1) notFound()
  const etude = etudesDeCas[index]
  const suivante = etudesDeCas[(index + 1) % etudesDeCas.length]
  const libelle = (id: string) => services.find((s) => s.id === id)?.title ?? id
  const chips = [etude.client.metier, etude.client.ville, ...etude.services.map(libelle)]
  const path = `/realisations/${etude.slug}`

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: etude.titre,
    description: etude.metaDescription,
    url: `${BASE_URL}${path}`,
    image: `${BASE_URL}${etude.maquette}`,
    inLanguage: 'fr-FR',
    // Pas de datePublished ni dateModified : dates de livraison non fournies.
    author: { '@type': 'Person', '@id': `${BASE_URL}/#person`, name: 'Maurice Timsit', url: `${BASE_URL}/a-propos` },
    publisher: { '@id': `${BASE_URL}/#business` },
  }
  const faq = etude.faq.length > 0 ? faqPageSchema(etude.faq.map((f) => ({ question: f.question, answer: f.reponse }))) : null

  return (
    <>
      {/* Le fil d'Ariane émet déjà le BreadcrumbList : chaque entrée porte un href. */}
      <JsonLd schema={faq ? [article, faq] : [article]} />

      <PageBanner
        breadcrumb={
          <Breadcrumb
            tone="vert"
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Réalisations', href: '/realisations' },
              { label: etude.client.nom, href: path },
            ]}
          />
        }
        title={etude.titre}
        sub={etude.accroche}
        actions={
          <>
            <BannerCta href={PHONE_TEL}>{PHONE_DISPLAY}</BannerCta>
            <BannerCtaLine href="/audit-gratuit">Audit gratuit</BannerCtaLine>
          </>
        }
      >
        <ul className="flex flex-wrap justify-center gap-2" style={{ marginTop: '1.25rem', listStyle: 'none', padding: 0 }}>
          {chips.map((c) => (
            <li
              key={c}
              className="rounded"
              style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.65rem', border: '1px solid oklch(0.985 0.003 150 / 45%)', color: 'var(--on-brand)' }}
            >
              {c}
            </li>
          ))}
        </ul>
      </PageBanner>

      <div className="bg-background" style={{ paddingBottom: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
        <div className="mx-auto max-w-5xl" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem) 1rem 0' }}>
          <Image
            src={etude.maquette}
            alt={etude.maquetteAlt ?? `${etude.client.nom} : maquette du site réalisé par 123 Digital`}
            width={1600}
            height={1000}
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="rounded"
            style={{ width: '100%', height: 'auto', border: '1px solid var(--line)' }}
          />
          {etude.court?.liens && (
            <div className="flex flex-wrap gap-3" style={{ marginTop: '1.25rem' }}>
              {etude.court.liens.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={l.principal ? 'btn-plein' : 'btn-contour'}
                >
                  {l.label} <ArrowUpRight size={14} aria-hidden />
                </a>
              ))}
            </div>
          )}
        </div>

        {etude.court && (
          <section className="mx-auto max-w-3xl" style={sectionStyle}>
            <h2 className="font-sans font-extrabold mb-6" style={h2Style}>Journal de bord</h2>
            <ol className="flex flex-col gap-7" style={{ listStyle: 'none', padding: 0, borderLeft: '3px solid var(--line)', marginLeft: 8 }}>
              {etude.court.journal.map((e, i) => (
                <li key={i} className="relative" style={{ paddingLeft: '1.5rem' }}>
                  <span
                    aria-hidden
                    className="absolute rounded-full"
                    style={{ left: -10, top: 5, width: 17, height: 17, backgroundColor: 'var(--brand-strong)', border: '3px solid var(--surface)' }}
                  />
                  <h3 className="font-sans font-extrabold" style={{ fontSize: '1.15rem', color: 'var(--brand-strong)', marginBottom: '0.35rem' }}>{e.repere}</h3>
                  <p style={{ color: 'var(--ink)', fontSize: '1.12rem', lineHeight: 1.55 }}>{e.texte}</p>
                  {e.image && (
                    <Image
                      src={e.image.src}
                      alt={e.image.alt}
                      width={e.image.portrait ? 720 : 1600}
                      height={e.image.portrait ? 1280 : 1000}
                      sizes={e.image.portrait ? '(max-width: 768px) 70vw, 320px' : '(max-width: 768px) 100vw, 720px'}
                      className="rounded"
                      style={{ width: '100%', maxWidth: e.image.portrait ? 320 : undefined, height: 'auto', border: '1px solid var(--line)', marginTop: '1rem' }}
                    />
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}

        {!etude.court && (
          <>
        {/* Récit en deux colonnes : texte + scène générée pour l'étude
            (public/images/illustrations/etudes/<slug>-<section>.webp), la scène
            change de côté à chaque section. */}
        <Recit titre="La commande" paragraphes={etude.commande} scene={`/images/illustrations/etudes/${etude.slug}-commande.webp`} />
        <Recit titre="Les coulisses" paragraphes={etude.coulisses} scene={`/images/illustrations/etudes/${etude.slug}-coulisses.webp`} inverse />

        <section className="mx-auto max-w-5xl" style={sectionStyle}>
          <h2 className="font-sans font-extrabold mb-5" style={h2Style}>Comment on a procédé</h2>
          <ol className="flex flex-col gap-4" style={{ listStyle: 'none', padding: 0 }}>
            {etude.etapes.map((e, i) => (
              <li
                key={e.titre}
                className="flex flex-col sm:flex-row gap-4 rounded"
                style={{ border: '1px solid var(--line)', backgroundColor: 'var(--surface-2)', padding: '1.1rem' }}
              >
                {/* Une illustration par etape (scripts/illustrations_etapes.py d'ads-os),
                    les six pictos de service se repetaient sept fois par page. */}
                <Image
                  src={`/images/illustrations/etapes/${etude.slug}-${i + 1}.webp`}
                  alt=""
                  width={96}
                  height={96}
                  className="shrink-0"
                  style={{ width: 96, height: 96 }}
                />
                <div>
                  <h3 className="font-sans font-extrabold" style={{ fontSize: '1.05rem', color: 'var(--ink)', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--brand-strong)' }}>{String(i + 1).padStart(2, '0')}</span> {e.titre}
                  </h3>
                  <p style={{ color: 'var(--ink-2)', fontSize: '0.92rem', lineHeight: 1.6 }}>{e.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-5xl" style={sectionStyle}>
          <h2 className="font-sans font-extrabold mb-5" style={h2Style}>Les choix qu&apos;on a faits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {etude.choix.map((c) => (
              <div
                key={c.titre}
                className="rounded"
                style={{ border: '1px solid var(--line)', backgroundColor: 'var(--surface-2)', padding: '1.25rem' }}
              >
                <h3 className="font-sans font-extrabold" style={{ fontSize: '1.02rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>{c.titre}</h3>
                <p style={{ color: 'var(--ink-2)', fontSize: '0.9rem', lineHeight: 1.6 }}>{c.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {etude.iterations && etude.iterations.length > 0 && (
          <section className="mx-auto max-w-5xl" style={sectionStyle}>
            <h2 className="font-sans font-extrabold mb-2" style={h2Style}>Ce qu&apos;on a jeté en route</h2>
            <p style={{ ...proseStyle, marginBottom: '1.25rem' }}>On ne livre pas du premier coup. Ce qu&apos;on a construit, ce qui a cassé, ce qu&apos;on a refait, dans l&apos;ordre.</p>
            {/* Frise verticale : trait vert à gauche, une pastille par itération. */}
            <ol className="flex flex-col gap-5" style={{ listStyle: 'none', padding: 0, borderLeft: '3px solid var(--line-strong, var(--line))', marginLeft: 10 }}>
              {etude.iterations.map((it, i) => (
                <li key={it.titre} className="relative flex flex-col sm:flex-row gap-4" style={{ paddingLeft: '1.5rem' }}>
                  <span
                    aria-hidden
                    className="absolute rounded-full"
                    style={{ left: -10, top: 4, width: 17, height: 17, backgroundColor: 'var(--brand-strong)', border: '3px solid var(--surface)' }}
                  />
                  {/* La version jetée, en vignette : c'est elle qu'on montre, pas seulement son récit. */}
                  {it.image && (
                    <Image
                      src={it.image}
                      alt={`Version abandonnée : ${it.titre}`}
                      width={800}
                      height={500}
                      sizes="(max-width: 640px) 100vw, 260px"
                      className="rounded shrink-0 w-full sm:w-[260px]"
                      style={{ height: 'auto', border: '1px solid var(--line)', backgroundColor: 'var(--surface-2)' }}
                    />
                  )}
                  <div>
                    <h3 className="font-sans font-extrabold" style={{ fontSize: '1.02rem', color: 'var(--ink)', marginBottom: '0.3rem' }}>
                      <span style={{ color: 'var(--brand-strong)' }}>v{i + 1}</span> {it.titre}
                    </h3>
                    <p style={{ color: 'var(--ink-2)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '68ch' }}>{it.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
            {etude.mosaique && (
              <figure className="mt-8">
                <Image
                  src={etude.mosaique.src}
                  alt={etude.mosaique.legende}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="rounded w-full"
                  style={{ height: 'auto', border: '1px solid var(--line)' }}
                />
                <figcaption style={{ color: 'var(--ink-3)', fontSize: '0.82rem', marginTop: '0.5rem' }}>{etude.mosaique.legende}</figcaption>
              </figure>
            )}
          </section>
        )}

        <Recit titre="Ce que ça change" paragraphes={etude.resultat} scene={`/images/illustrations/etudes/${etude.slug}-resultat.webp`} />
          </>
        )}

        {etude.client.url && (
          <section className="mx-auto max-w-5xl" style={sectionStyle}>
            <div
              className="rounded flex flex-wrap items-center justify-between gap-3"
              style={{ border: '1px solid var(--line)', backgroundColor: 'var(--surface-2)', padding: '1.1rem 1.25rem' }}
            >
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Site en ligne</div>
                <div className="font-sans font-extrabold" style={{ color: 'var(--ink)' }}>{etude.client.nom}</div>
              </div>
              <a
                href={etude.client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-contour"
              >
                {etude.client.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')} <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>
          </section>
        )}

        {etude.faq.length > 0 && (
        <section className="mx-auto max-w-5xl" style={sectionStyle}>
          <h2 className="font-sans font-extrabold mb-5" style={h2Style}>Questions fréquentes</h2>
          <FaqListe items={etude.faq.map((f) => ({ question: f.question, answer: f.reponse }))} />
        </section>
        )}

        <section className="mx-auto max-w-5xl" style={sectionStyle}>
          <Link
            href={`/realisations/${suivante.slug}`}
            className="flex items-center justify-between gap-3 rounded"
            style={{ border: '1px solid var(--line)', padding: '1.1rem 1.25rem', color: 'var(--ink)' }}
          >
            <span>
              <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Étude suivante</span>
              <span className="font-sans font-extrabold">{suivante.client.nom}</span>
            </span>
            <ArrowRight size={18} aria-hidden />
          </Link>
        </section>
      </div>

      <CTA />
    </>
  )
}
