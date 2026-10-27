import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBanner, BannerCta, BannerCtaLine } from '@/components/sections/PageBanner'
import { BASE_URL, serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import { CTA } from '@/components/sections/CTA'

// Page SEO de l'Ain (intention « consultant SEO »). /bourg-en-bresse garde l'intention généraliste.
// Honnêteté de localisation : Maurice Timsit est basé à Lyon, il intervient dans l'Ain à distance et sur rendez-vous.
// Aucune adresse dans l'Ain, aucun LocalBusiness localisé dans l'Ain.
//
// Faits locaux et sources :
// - Bourg-en-Bresse est la préfecture de l'Ain : https://fr.wikipedia.org/wiki/Bourg-en-Bresse (encadré de la commune)
// - Bourg-en-Bresse compte plus de 40 000 habitants (42 372 en 2023, population municipale INSEE reprise par Wikipédia,
//   même page ; data/villes.ts donne 40 190, millésime plus ancien)
// - L'Ain compte près de 680 000 habitants (679 344 en 2023, population municipale INSEE reprise par Wikipédia) :
//   https://fr.wikipedia.org/wiki/Ain_(département)
// - Gex et le Pays de Gex : communes de l'Ain, et l'agglomération genevoise s'étend en partie sur le pays de Gex
//   (même page Wikipédia du département) ; la banlieue lyonnaise atteint le sud-ouest du département (même page),
//   Miribel est une commune de l'Ain voisine de l'agglomération lyonnaise
// - Oyonnax et la plasturgie : déjà documenté dans data/villes.ts (villeInsights.oyonnax)
// - Bellegarde-sur-Valserine fait partie de la commune nouvelle de Valserhône (créée le 1er janvier 2019)
// - Délai « 3 à 6 mois selon la concurrence » et « à partir de 450 €/mois, engagement 3 mois » : /services/seo
// - Fiche sans local ouvert au public (adresse masquée, zone de service) : consignes Google
//   https://support.google.com/business/answer/3038177?hl=fr

const TITLE = 'Consultant SEO Bourg-en-Bresse et Ain | 123 Digital'
const DESCRIPTION =
  'Consultant SEO indépendant basé à Lyon, j’aide les artisans et PME de Bourg-en-Bresse et de l’Ain à être trouvés sur Google. Audit gratuit de 30 minutes.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/consultant-seo-bourg-en-bresse` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${BASE_URL}/consultant-seo-bourg-en-bresse`,
  },
}

const faqs = [
  {
    q: 'Consultant ou agence SEO à Bourg-en-Bresse : que choisir ?',
    a: 'Avec un consultant, vous parlez à la personne qui fait le travail, du premier échange au rapport mensuel. Une agence apporte plus de bras pour un gros site ou plusieurs métiers à la fois. Pour un artisan ou une PME de l’Ain, un consultant suffit dans la grande majorité des cas, et aucun chef de projet ne s’intercale entre vous et le travail.',
  },
  {
    q: 'Faut-il que mon consultant soit à Bourg-en-Bresse pour que Google me montre dans la ville ?',
    a: 'Non. Google s’appuie sur votre fiche d’entreprise, votre site, vos avis et vos pages, pas sur l’adresse de la personne qui les optimise. Je suis basé à Lyon et je travaille avec vous par visio, par téléphone et sur rendez-vous dans l’Ain.',
  },
  {
    q: 'Au bout de combien de temps voit-on des résultats en SEO local ?',
    a: 'Comptez 3 à 6 mois selon la concurrence sur votre métier et votre commune. Une fiche Google bien remplie peut bouger plus tôt, un nouveau contenu demande du temps pour être indexé et classé. Je ne garantis aucune position : je vous montre l’évolution dans Search Console chaque mois.',
  },
  {
    q: 'Combien coûte un accompagnement SEO dans l’Ain ?',
    a: 'Le premier échange est un audit gratuit de 30 minutes. L’accompagnement mensuel démarre à partir de 450 € par mois, avec un engagement de 3 mois. Le détail des formules figure sur la page du service SEO.',
  },
  {
    q: 'Je me déplace chez mes clients et je n’ai pas de local ouvert au public : puis-je avoir une fiche Google ?',
    a: 'Oui. Google permet de masquer l’adresse et d’indiquer une zone de service, par exemple Bourg-en-Bresse et les communes autour. Ce sont ses règles pour les entreprises qui se déplacent, et je les applique à votre fiche.',
  },
]

const h2Style = { fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }
const pClass = 'text-base leading-relaxed mb-4'
const pStyle = { color: 'var(--ink-2)' }

export default function ConsultantSeoBourgEnBressePage() {
  const jsonLd = [
    {
      ...serviceSchema({
        name: 'Consultant SEO Bourg-en-Bresse et Ain',
        description:
          'Référencement naturel et SEO local pour les artisans et PME de Bourg-en-Bresse et de l’Ain, par un consultant indépendant basé à Lyon, à distance et sur rendez-vous.',
        path: '/consultant-seo-bourg-en-bresse',
      }),
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Ain' },
        { '@type': 'City', name: 'Bourg-en-Bresse' },
      ],
    },
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Consultant SEO Bourg-en-Bresse et Ain', path: '/consultant-seo-bourg-en-bresse' },
    ]),
    faqPageSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
  ]

  return (
    <>
      <JsonLd schema={jsonLd} />

      <PageBanner
        icone="map-pin"
        title="Consultant SEO à Bourg-en-Bresse et dans l’Ain"
        highlight="Bourg-en-Bresse et dans l’Ain"
        sub="Maurice Timsit, consultant SEO indépendant basé à Lyon. J’aide les artisans et PME de l’Ain à être trouvés sur Google, à distance et sur rendez-vous."
        actions={
          <>
            <BannerCta href="/audit-gratuit">Audit gratuit 30 min</BannerCta>
            <BannerCtaLine href="/services/seo">Le service SEO</BannerCtaLine>
          </>
        }
      />

      <section className="bg-background" style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem 3rem' }}>
        <div className="mx-auto max-w-3xl">
          <p className={pClass} style={{ ...pStyle, color: 'var(--ink)', fontWeight: 600 }}>
            Je suis Maurice Timsit, consultant SEO indépendant basé à Lyon. J’aide les artisans, commerces et PME de
            Bourg-en-Bresse et de l’Ain à apparaître sur Google quand un client cherche leur métier dans leur commune.
            Je travaille à distance et sur rendez-vous dans l’Ain. Pour me contacter, réservez l’audit gratuit de
            30 minutes ou utilisez le formulaire en bas de page.
          </p>
          <p className={pClass} style={pStyle}>
            Cette page décrit mon travail de référencement dans l’Ain. Pour le reste de ce que je fais à
            Bourg-en-Bresse (site, publicité, communication), voir ma page{' '}
            <Link href="/bourg-en-bresse" className="underline">consultant digital à Bourg-en-Bresse</Link>.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Comment un client cherche un artisan dans l’Ain
          </h2>
          <p className={pClass} style={pStyle}>
            Votre client tape un métier suivi d’une commune : « plombier Ambérieu-en-Bugey », « électricien
            Oyonnax », « comptable Bourg-en-Bresse ». L’Ain compte près de 680 000 habitants et n’a pas de grande
            métropole. Les recherches se répartissent entre plusieurs bassins : Bourg-en-Bresse, préfecture du
            département, avec plus de 40 000 habitants, Oyonnax et sa plasturgie, Ambérieu-en-Bugey, Belley, Gex,
            Valserhône (où se trouve Bellegarde-sur-Valserine) et Miribel.
          </p>
          <p className={pClass} style={pStyle}>
            Chacun de ces bassins a ses requêtes et ses concurrents. Un électricien de Belley ne se bat pas avec
            celui d’Oyonnax. Mon travail commence par la liste des requêtes réellement tapées dans vos communes. Si
            vous êtes à Oyonnax, ma page{' '}
            <Link href="/oyonnax" className="underline">consultant digital à Oyonnax</Link>{' '}
            donne le contexte industriel de la ville.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Un département entre Lyon et Genève
          </h2>
          <p className={pClass} style={pStyle}>
            La banlieue lyonnaise touche le sud-ouest de l’Ain, autour de Miribel, et l’agglomération genevoise
            s’étend en partie sur le Pays de Gex. Selon votre commune, vos clients comparent donc avec des
            résultats lyonnais, genevois ou locaux. Je regarde dans Search Console d’où viennent les requêtes qui
            vous amènent déjà des visites, avant de choisir celles que nous visons.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Le SEO local dans une ville de 40 000 habitants
          </h2>
          <p className={pClass} style={pStyle}>
            À Bourg-en-Bresse, le SEO local repose sur peu d’éléments, qu’il faut tenir à jour : une fiche Google
            complète, des avis récents auxquels vous répondez, un site qui dit clairement ce que vous faites et où,
            et une page par commune réellement desservie. Je vérifie, requête par requête, qui occupe les premiers
            résultats avant de vous annoncer ce qui est jouable. Dans certains métiers la place est libre, dans
            d’autres un concurrent installé la tient depuis des années.
          </p>
          <p className={pClass} style={pStyle}>
            Je n’écris pas de pages identiques où seul le nom de la commune change : Google les traite comme des
            doublons. Chaque page a son contenu : les interventions faites dans la commune, les questions des clients
            du secteur, vos réalisations.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Ma méthode en quatre étapes
          </h2>
          <ol className="list-decimal pl-6 mb-4 space-y-3" style={pStyle}>
            <li>
              <strong>Audit.</strong> Je regarde votre site, votre fiche Google et vos positions actuelles, en
              commençant par les requêtes qui vous apportent déjà des affichages. L’
              <Link href="/audit-gratuit" className="underline">audit gratuit de 30 minutes</Link> sert de point de
              départ.
            </li>
            <li>
              <strong>Fiche Google.</strong> Catégories, zone de service, services, photos, avis. Si votre fiche est
              suspendue ou n’apparaît pas, lisez{' '}
              <Link href="/problemes/fiche-google-suspendue-ou-invisible" className="underline">
                fiche Google suspendue ou invisible
              </Link>.
            </li>
            <li>
              <strong>Pages.</strong> Je corrige les pages existantes puis j’en crée de nouvelles pour les
              communes et les services qui comptent. Si votre site est récent et que Google ne le montre pas,
              voir{' '}
              <Link href="/problemes/nouveau-site-invisible-sur-google" className="underline">
                nouveau site invisible sur Google
              </Link>.
            </li>
            <li>
              <strong>Suivi.</strong> Chaque mois, un rapport tiré de Search Console : positions, clics, demandes
              reçues, et ce que je fais le mois suivant.
            </li>
          </ol>
          <p className={pClass} style={pStyle}>
            Les premiers effets apparaissent en 3 à 6 mois selon la concurrence. Les formules et tarifs sont sur la
            page{' '}
            <Link href="/services/seo" className="underline">SEO et référencement</Link>.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Ce que je fais, ce que je ne fais pas
          </h2>
          <p className={pClass} style={pStyle}>
            Je fais l’audit, la fiche Google, la rédaction et l’optimisation des pages, le suivi dans Search Console
            et le rapport mensuel. Je ne garantis ni position ni nombre de visites : personne ne peut le faire
            honnêtement. Je n’achète pas de liens en masse et je ne publie pas de pages en série.
          </p>

          <h2 className="font-display font-extrabold mt-10 mb-5" style={h2Style}>
            Travailler à distance depuis Lyon
          </h2>
          <p className={pClass} style={pStyle}>
            Nous échangeons par visio ou par téléphone, vous me donnez accès à votre site, à votre fiche Google et à
            Search Console, et je fais le reste. Un rendez-vous sur place dans l’Ain reste possible quand il apporte
            quelque chose, par exemple pour photographier vos réalisations.
          </p>
        </div>
      </section>

      <section className="bg-background" style={{ padding: '0 1.5rem 8rem' }}>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display font-extrabold mb-10" style={h2Style}>
            Questions fréquentes
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="rounded p-6"
                style={{ backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius)' }}
              >
                <h3 className="font-display font-extrabold text-base mb-3" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>{q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
