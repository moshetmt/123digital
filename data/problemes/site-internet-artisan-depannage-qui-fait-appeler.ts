import type { PageProbleme } from '../problemes'

export const page: PageProbleme = {
  slug: 'site-internet-artisan-depannage-qui-fait-appeler',
  famille: 'projet',
  requete: 'site internet pour artisan dépannage',
  title: 'Site internet d’artisan dépannage : ce qui fait appeler',
  description:
    'Site internet pour plombier, chauffagiste ou dépanneur : ce qui fait appeler, ce qui ne sert à rien, une page par métier, et ce que l’artisan doit fournir.',
  titre: 'Site internet d’artisan dépannage : ce qui fait appeler, et ce qui ne sert à rien',
  // source : C:\projet site\ads-os\rag\sources\best-practices\inventaire-creation-site.md (barre d’appel collante, formulaire en position 2, photos réelles, règle de provenance des pages ville)
  // source : C:\projet site\ads-os\clients\depann69\ETAT.md (un site par métier, marque multi-métiers jugée peu crédible)
  reponse:
    'Un site de dépanneur fait appeler quand le visiteur trouve tout de suite trois choses : votre numéro, la preuve que vous intervenez chez lui, la preuve que vous traitez sa panne. Concrètement : un bouton d’appel toujours à portée du pouce sur mobile, des communes et des marques nommées, des photos de vrais chantiers et un formulaire de trois lignes. Une page par métier vaut mieux qu’un site fourre-tout, et une page par ville seulement quand vous avez des chantiers à y raconter.',
  datePublication: '2026-10-07',
  tempsLecture: 8,
  contenu: [
    {
      type: 'intro',
      texte:
        'La personne qui cherche un plombier, un chauffagiste ou un serrurier a un problème en cours. Elle ne lit pas votre histoire, elle ne compare pas cinq devis : elle cherche quelqu’un de crédible qui décroche. Un site de dépannage se juge donc sur une seule question, posée en quelques secondes sur un téléphone : est-ce que j’appelle ? Voici ce qui fait répondre oui, ce que j’ai vu ne servir à rien, et ce que je demande à un artisan avant de construire son site.',
    },
    // source : C:\projet site\ads-os\clients\123digital\06-reports\2026-08-20-strategie-seo.md (section 1 : coupure publicitaire d’août 2026, 8 sessions dont 5 organiques, 2 directes, 1 référent, 3 demandes ; 211 sessions dont 121 payées avec la publicité active du 20/07 au 08/08)
    {
      type: 'h2',
      titre: 'Pourquoi le site d’un dépanneur se juge autrement',
      texte:
        'Pour un service que l’on compare des semaines, je compte une à deux demandes pour cent visiteurs. Sur un site de dépannage, le visiteur arrive avec l’intention d’appeler : le site doit seulement ne pas l’en empêcher. Le cas ci-dessous m’a servi de référence pour tout ce qui suit. Il montre un site au trafic minuscule qui produit quand même des demandes, parce que chaque visiteur a une panne.',
    },
    {
      type: 'resume',
      titre: 'Cas réel, anonymisé',
      items: [
        'Un artisan du chauffage de la métropole lyonnaise, publicité coupée pendant une partie du mois d’août 2026.',
        'Sur la période : 8 visites au total, dont 5 venues de la recherche Google naturelle, 2 en accès direct et 1 depuis un autre site.',
        'Sur ces 8 visites, 3 demandes reçues par le formulaire du site.',
        'Avec la publicité active, du 20 juillet au 8 août, le même site avait reçu 211 visites, dont 121 payées : la publicité achète le volume, la page fait le reste.',
      ],
    },
    // source : C:\projet site\ads-os\rag\sources\best-practices\inventaire-creation-site.md (sections 6.1, 6.3, 7, 8 et 10)
    // source : C:\projet site\ads-os\.claude\skills\landing-page-audit\SKILL.md (numéro cliquable tel:, formulaire de 3 à 5 champs, zone affichée, photos réelles plutôt que banque d’images)
    // source : C:\projet site\123digital\app\api\contact\route.ts (formulaire à 3 lignes : prénom, mail ou téléphone, besoin)
    {
      type: 'h2',
      titre: 'Ce qui fait appeler',
      texte:
        'Je construis chaque page de dépannage sur le même ordre : un titre qui nomme la panne, le bouton d’appel, le formulaire juste dessous, puis les preuves. L’ordre ne change pas d’une page à l’autre : un bloc absent se supprime, il ne se déplace pas.',
    },
    {
      type: 'liste',
      titre: 'Les éléments qui comptent',
      items: [
        'Le numéro visible sans faire défiler, cliquable sur mobile, et une barre d’appel collée en bas de l’écran du téléphone qui reste là pendant toute la lecture.',
        'Le formulaire en deuxième position, juste après le titre : c’est le filet quand vous ne pouvez pas décrocher, la nuit, sur un chantier ou pendant une fermeture.',
        'Un formulaire court. Je vise trois lignes : le prénom, un téléphone ou un mail, le besoin. Chaque champ en plus doit se justifier.',
        'La zone d’intervention écrite en toutes lettres : communes, rayon, et ce que vous ne couvrez pas.',
        'Les marques que vous réparez, nommées. La personne dont la chaudière ou la clim d’une marque rare tombe en panne cherche ce nom.',
        'Des photos de vrais chantiers, prises au téléphone, sans retouche, jamais réutilisées d’une page à l’autre.',
        'Des avis réels, reliés à votre fiche Google, avec auteur et date.',
        'Une page de remerciement dédiée après l’envoi du formulaire : c’est elle qui permet de compter les demandes.',
      ],
    },
    // source : C:\projet site\ads-os\rag\sources\best-practices\elements-a-fournir-nouveau-site.md (banques d’images, promesses de délai propagées sur 12 pages, numéro provisoire en production, jamais d’étoiles inventées ni d’aggregateRating auto-déclaré)
    // source : C:\projet site\ads-os\rag\sources\best-practices\inventaire-creation-site.md (statut d’ouverture calculé, aucune promesse intenable pendant une fermeture)
    {
      type: 'h2',
      titre: 'Ce qui ne sert à rien, ou dessert',
      texte:
        'Certains éléments coûtent du temps et de l’argent sans faire appeler personne. D’autres font perdre l’appel qu’on avait gagné.',
    },
    {
      type: 'liste',
      titre: 'Ce que je retire ou refuse',
      items: [
        'Les photos de banque d’images : elles se repèrent, et un dépanneur sans photo de chantier n’a pas de preuve.',
        'Les promesses de délai que l’artisan n’a pas validées mot pour mot. Sur un projet, des formulations différentes s’étaient propagées sur 12 pages avant qu’une seule soit tranchée, et il a fallu tout reprendre.',
        'Un numéro provisoire laissé en production : un site qui affiche un faux numéro ne convertit pas.',
        'Des étoiles affichées par le site lui-même, sans lien avec la fiche Google : je ne les pose jamais, c’est un risque d’action manuelle de Google.',
        'Un « ouvert maintenant » écrit en dur, qui reste affiché pendant les fermetures. Le statut d’ouverture se calcule.',
        'Un prix inventé pour remplir une page. La politique de prix se décide avec l’artisan : publiés, sur devis, ou une fourchette qu’il assume.',
      ],
    },
    // source : C:\projet site\ads-os\clients\depann69\ETAT.md (14 et 15/09/2026 : un site par métier, marque multi-métiers jugée peu crédible, 0 recherche « entreprise multiservices lyon » et « tous corps d’état lyon », plombier 6 600 et serrurier 5 400 recherches par mois à Lyon)
    // source : C:\projet site\ads-os\clients\vitre69\ETAT.md (décision du 15/09/2026 : un site par métier pour les particuliers)
    // source : C:\projet site\ads-os\rag\sources\best-practices\elements-a-fournir-nouveau-site.md (ce que le client ne fait pas)
    {
      type: 'h2',
      titre: 'Une page par métier plutôt qu’un site multi-services',
      texte:
        'Un artisan qui fait de la plomberie, de la serrurerie et de la vitrerie est tenté par un seul site « multi-services ». Pour le particulier en panne, c’est le mauvais choix. Il cherche un métier précis, et une marque qui fait tout lui paraît moins crédible qu’un spécialiste. Les volumes le confirment : en septembre 2026, à Lyon, « plombier » comptait environ 6 600 recherches par mois et « serrurier » environ 5 400, quand « entreprise multiservices » et « tous corps d’état » n’en comptaient aucune. Ma règle : un site, ou au minimum une page complète, par métier vendu aux particuliers. La liste de ce que vous ne faites pas compte autant : sans elle, le site attire des appels que vous ne pouvez pas honorer, comme un climaticien qui reçoit des demandes de climatisation automobile.',
    },
    // source : C:\projet site\ads-os\clients\123digital\06-reports\2026-08-20-strategie-seo.md (144 pages ville × service sans aucun clic, recouvrement mesuré à 77 %, seuil de 40 %)
    // source : C:\projet site\ads-os\clients\123digital\ETAT.md (131 pages ville en noindex le 19/08/2026)
    // source : C:\projet site\ads-os\rag\sources\best-practices\inventaire-creation-site.md (section 7 : 55 % de texte propre, 4 000 caractères, test d’interchangeabilité, règle de provenance)
    {
      type: 'h2',
      titre: 'Les pages ville : seulement quand il y a de la matière',
      texte:
        'Je parle d’expérience, sur mon propre site. J’y avais publié 144 pages croisant une ville et un service : elles n’ont produit aucun clic, et leur texte se recouvrait à 77 % d’une page à l’autre. J’en ai retiré 131 de l’index de Google le 19 août 2026. Une page ville utile raconte ce que l’artisan fait réellement dans cette commune. Mes seuils avant de publier : au moins deux sources vérifiables par page (chantiers de l’artisan, bâti de la commune, règles locales), au moins 55 % de texte propre à la page, et un test simple. Je remplace mentalement le nom de la commune par une autre : si le texte reste crédible, la page est rejetée.',
    },
    {
      type: 'cta',
      titre: 'Un site de dépannage à lancer ?',
      texte:
        'Pendant l’audit gratuit de 30 minutes, je regarde votre métier, votre zone et vos concurrents, et je vous dis quelles pages valent la peine d’être écrites.',
    },
    // source : C:\projet site\ads-os\rag\sources\best-practices\elements-a-fournir-nouveau-site.md (sections 1, 2, 3, 9 et « les 4 manques qui ont réellement coûté du temps »)
    {
      type: 'h2',
      titre: 'Ce que l’artisan doit me fournir',
      texte:
        'Je rédige tous les textes, je construis la charte, les pages et la mesure. Mais certaines pièces ne s’inventent pas, et sans elles le site reste en préversion. Un site d’artisan déjà terminé et testé est resté hors ligne des semaines pour une seule raison : le nom de domaine n’était pas réservé.',
    },
    {
      type: 'liste',
      titre: 'La liste que j’envoie',
      items: [
        'Le nom de domaine souhaité, et les accès s’il est déjà réservé.',
        'Le numéro de téléphone affiché, sur une ligne réellement ouverte, et l’adresse mail où recevoir les demandes, testée.',
        'La raison sociale complète, le SIRET et l’adresse, pour les mentions légales.',
        'La liste fermée de ce que vous vendez, et surtout de ce que vous ne faites pas.',
        'La zone d’intervention, et le délai que vous vous engagez à tenir, écrit avec vos mots.',
        'Vos horaires réels et vos périodes de fermeture.',
        'Votre logo, en fichier vectoriel si possible.',
        '10 à 20 photos de chantiers, prises au téléphone, sans retouche.',
        'Le lien vers votre fiche Google.',
        'Ce qui vous distingue vraiment, en trois points, avec la preuve derrière chacun.',
      ],
    },
    // source : C:\projet site\ads-os\clients\123digital\00-brief\offering.md (site vitrine à partir de 1 500 €)
    // source : C:\projet site\123digital\data\etudes-de-cas.ts (réalisation Clim69 publiée sur /realisations/clim69 : numéro et devis à portée du pouce, pages locales écrites à la main avec deux sources, feuille Google des demandes, aucun prix affiché par choix du client)
    {
      type: 'h2',
      titre: 'Budget, et un exemple que vous pouvez visiter',
      texte:
        'Un site vitrine commence chez moi à 1 500 €. Pour voir à quoi ressemble ce travail, l’étude de cas Clim69, un artisan climaticien de Villeurbanne, raconte le chantier en entier : le numéro et le devis à portée du pouce sur mobile, des pages locales écrites à la main sur au moins deux sources chacune, une feuille Google qui reçoit chaque demande et trie le spam, et aucun prix affiché, par choix du patron. Les sept versions du site jetées en route y sont aussi.',
    },
    // source : C:\projet site\ads-os\clients\123digital\00-brief\offering.md
    // source : C:\projet site\ads-os\clients\depann69\ETAT.md
    // source : C:\projet site\ads-os\clients\123digital\06-reports\2026-08-20-strategie-seo.md
    // source : C:\projet site\ads-os\rag\sources\best-practices\inventaire-creation-site.md
    // source : C:\projet site\ads-os\rag\sources\best-practices\elements-a-fournir-nouveau-site.md
    {
      type: 'faq',
      faqs: [
        {
          question: 'Combien coûte un site internet pour un artisan ?',
          reponse:
            'Chez moi, un site vitrine commence à 1 500 €. Mon guide sur le prix d’un site détaille les postes.',
        },
        {
          question: 'Faut-il une page par ville pour un artisan ?',
          reponse:
            'Seulement quand vous avez des chantiers réels à raconter dans la commune. Une page ville copiée d’une autre avec le nom changé n’apporte rien, et j’en ai fait l’expérience sur mon propre site.',
        },
        {
          question: 'Un seul site pour plombier, serrurier et vitrier, c’est une bonne idée ?',
          reponse:
            'Pour des particuliers en panne, je recommande un site ou au minimum une page complète par métier. La personne cherche un spécialiste, et les recherches « multiservices » sont quasi inexistantes.',
        },
        {
          question: 'Le formulaire sert-il encore si mes clients appellent ?',
          reponse:
            'Oui. Il prend le relais quand vous ne pouvez pas décrocher, et il laisse une trace datée de chaque demande. Il doit rester court et placé juste après le titre.',
        },
        {
          question: 'Faut-il afficher ses prix sur un site de dépannage ?',
          reponse:
            'C’est votre décision : prix publiés, sur devis, ou fourchette assumée. Je n’invente jamais un tarif, et une page sans consigne claire sur les prix reste vague au mauvais endroit.',
        },
      ],
    },
    // source : C:\projet site\ads-os\clients\123digital\00-brief\offering.md
    // source : C:\projet site\ads-os\clients\depann69\ETAT.md
    // source : C:\projet site\ads-os\clients\123digital\06-reports\2026-08-20-strategie-seo.md
    // source : C:\projet site\ads-os\rag\sources\best-practices\inventaire-creation-site.md
    // source : C:\projet site\ads-os\rag\sources\best-practices\elements-a-fournir-nouveau-site.md
    {
      type: 'resume',
      titre: 'À retenir',
      items: [
        'Le visiteur d’un site de dépannage veut appeler : le site doit seulement ne pas l’en empêcher.',
        'Numéro toujours visible, formulaire de trois lignes en deuxième position, zone et marques nommées, photos réelles.',
        'Une page par métier, et des pages ville seulement avec de la matière vérifiable.',
        'Ni banque d’images, ni promesse de délai non validée, ni étoiles affichées par le site.',
        'Site vitrine à partir de 1 500 €, sur la base des pièces que vous seul pouvez fournir.',
      ],
    },
  ],
  liens: [
    { label: 'Création de site web', href: '/services/creation-site-web' },
    { label: 'Étude de cas : le site de Clim69', href: '/realisations/clim69' },
    { label: 'Combien coûte un site pour une PME', href: '/blog/site-web-pme-prix-guide' },
    { label: 'Je ne reçois plus les demandes de mon site', href: '/problemes/je-ne-recois-plus-les-demandes-de-mon-site' },
    { label: 'Audit gratuit de 30 minutes', href: '/audit-gratuit' },
  ],
}
