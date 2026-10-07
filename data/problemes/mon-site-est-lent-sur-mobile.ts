import type { PageProbleme } from '../problemes'

export const page: PageProbleme = {
  slug: 'mon-site-est-lent-sur-mobile',
  famille: 'panne',
  requete: 'site lent sur mobile',
  title: 'Site lent sur mobile : mesurer, trouver la cause, corriger',
  description: 'Votre site met trop de temps à charger sur téléphone ? Le mesurer avec PageSpeed Insights, les seuils officiels de Google, les cinq causes et leur coût réel.',
  titre: 'Mon site est lent sur mobile : comment le mesurer et quoi corriger',
  reponse: 'Mesurez la page dans PageSpeed Insights et regardez d’abord le LCP, le temps d’affichage du plus gros élément visible : Google le juge bon à 2,5 secondes ou moins, mauvais au-delà de 4 secondes. Les causes reviennent presque toujours aux mêmes cinq : image principale trop lourde ou chargée tard, polices, code qui bloque l’affichage, scripts et bibliothèques en trop, serveur lent. Sur mon propre site, ces corrections ont divisé le LCP mobile par deux, mesuré avec le même outil le même jour.',
  datePublication: '2026-10-07',
  tempsLecture: 8,
  contenu: [
    // source : https://developers.google.com/speed/docs/insights/v5/about (variabilité des mesures)
    {
      type: 'intro',
      texte: 'Sur ordinateur, au bureau, votre site s’affiche bien. Sur un téléphone, dans la rue, la page reste blanche quelques secondes, puis le titre arrive, puis le reste. Vos visiteurs vivent la seconde version. Avant de corriger, il faut mesurer avec les bons outils et lire les chiffres correctement, parce qu’un score de vitesse varie beaucoup d’une mesure à l’autre. Je vous donne la méthode, les causes qui reviennent, et ce que j’ai changé sur mon propre site.',
    },
    // source : https://developers.google.com/speed/docs/insights/v5/about
    {
      type: 'h2',
      titre: 'Mesurer avec PageSpeed Insights, et lire ce qu’il affiche',
      texte: 'PageSpeed Insights, l’outil gratuit de Google, affiche deux types de données qu’on confond souvent. En haut, les données terrain : l’expérience de vrais visiteurs sur Chrome, collectée sur les 28 derniers jours, et retenue au 75e centile pour refléter les visites les plus pénibles. En dessous, les données de laboratoire : un chargement simulé par Lighthouse sur un téléphone de milieu de gamme et un réseau mobile. Google prévient que les deux peuvent différer. Quand une page n’a pas assez de visiteurs, l’outil se replie sur l’ensemble du site, et parfois n’affiche aucune donnée terrain. Le score de 0 à 100 vient du laboratoire : 90 et plus est bon, 50 à 89 est à améliorer, moins de 50 est mauvais.',
    },
    // source : https://web.dev/articles/lcp
    // source : https://developers.google.com/search/docs/appearance/core-web-vitals (mis à jour le 10/12/2025)
    {
      type: 'liste',
      titre: 'Les trois seuils officiels des Core Web Vitals',
      items: [
        'LCP (Largest Contentful Paint) : temps d’affichage du plus gros élément visible, image ou bloc de texte. Bon à 2,5 secondes ou moins, à améliorer jusqu’à 4 secondes, mauvais au-delà.',
        'INP (Interaction to Next Paint) : délai de réaction à un toucher ou un clic. Bon sous 200 millisecondes.',
        'CLS (Cumulative Layout Shift) : stabilité de la page pendant le chargement, quand un bouton se décale sous le doigt. Bon sous 0,1.',
        'Google évalue chaque seuil au 75e centile des chargements, séparément sur mobile et sur ordinateur. Le rapport Core Web Vitals de Search Console regroupe ces résultats pour tout votre site.',
      ],
    },
    // source : C:\projet site\ads-os\clients\msds18\06-reports\2026-08-28-pagespeed.md
    // source : C:\projet site\ads-os\clients\msds18\06-reports\2026-07-31-bascule-site-next.md (section 3)
    // source : C:\projet site\ads-os\clients\msds18\ETAT.md (CrUX vide faute de trafic)
    {
      type: 'paragraphe',
      texte: 'Une seule mesure ne prouve rien. Sur le site d’un artisan du chauffage que je suis, j’ai relevé 20 points d’écart sur la même page à deux minutes d’intervalle. Le soir de sa mise en ligne, les mesures tombaient en deux paquets : 88 à 97 avec un LCP de 2,6 à 3,1 secondes, ou 63 à 73 avec un LCP de 7,3 à 8,8 secondes, sans que le site change entre les deux. Et faute de trafic suffisant, ce site n’a aucune donnée terrain : seul le laboratoire le mesure. Ma règle : trois mesures, je garde la médiane, et je compare toujours avec le même outil.',
    },
    // source : C:\projet site\ads-os\.claude\skills\core-web-vitals\SKILL.md (process, sections LCP et INP)
    // source : https://web.dev/articles/optimize-lcp
    {
      type: 'h2',
      titre: 'Les cinq causes qui reviennent',
      texte: 'Google découpe le LCP en quatre temps : la réponse du serveur, le délai avant que le navigateur commence à charger l’élément principal, la durée de ce chargement, et le délai avant son affichage. Chaque cause ci-dessous allonge l’un de ces quatre temps.',
    },
    // source : https://web.dev/articles/optimize-lcp
    // source : C:\projet site\ads-os\.claude\skills\core-web-vitals\SKILL.md
    // source : C:\projet site\ads-os\clients\msds18\ETAT.md (TTFB 43 à 118 ms)
    {
      type: 'liste',
      titre: 'Dans l’ordre où je les cherche',
      items: [
        '1. L’image principale trop lourde ou découverte tard : une photo de bannière non compressée, ou chargée par un script au lieu d’être présente dans le HTML. Format WebP, poids réduit, chargement prioritaire.',
        '2. Les polices de caractères : chaque police téléchargée retarde l’affichage du texte. Une police de moins, c’est un téléchargement de moins.',
        '3. Le code qui bloque l’affichage : feuilles de style et scripts placés en tête de page, ou un titre masqué tant qu’un script n’a pas joué son animation d’entrée.',
        '4. Les scripts et bibliothèques en trop : effets animés, modules tiers, outils de test. Google cite les longues tâches du processeur parmi les causes de retard, et elles pèsent aussi sur l’INP.',
        '5. Le serveur lent : au-delà de 600 millisecondes avant le premier octet, la cause se trouve du côté de l’hébergement, du cache ou du CDN. Sur le site d’artisan cité plus haut, le serveur répondait en 43 à 118 millisecondes : ce suspect-là était écarté d’emblée.',
      ],
    },
    // source : C:\projet site\ads-os\.claude\skills\core-web-vitals\SKILL.md (sections CLS et INP)
    {
      type: 'paragraphe',
      texte: 'Les deux autres métriques ont leurs propres suspects. Une page qui saute pendant le chargement, le CLS, vient le plus souvent d’images posées sans dimensions, d’un bandeau ou d’un module intégré qui pousse le contenu, d’une police qui change la taille du texte en arrivant, ou d’un bloc qui apparaît tard au-dessus du reste. Une page qui réagit mal au doigt, l’INP, souffre presque toujours de trop de JavaScript : scripts tiers empilés, gestionnaires d’événements lents, processeur occupé au moment du toucher. Sur un site vitrine, le LCP reste le chantier prioritaire ; ces deux-là se vérifient ensuite, avec le même outil.',
    },
    // source : https://web.dev/case-studies/vodafone (publié le 17/03/2021)
    // source : C:\projet site\ads-os\rag\sources\best-practices\benchmarks-sea-france.md (ligne 56)
    // source : https://developers.google.com/search/docs/appearance/page-experience (mis à jour le 22/09/2026)
    {
      type: 'h2',
      titre: 'Ce que la lenteur coûte en clients',
      texte: 'Le cas le plus propre que je connaisse vient de Vodafone, publié par Google sur web.dev en 2021. Deux versions d’une même page d’arrivée, trafic partagé à 50/50, aucune différence visuelle : seule la vitesse changeait. La version au LCP amélioré de 31 % a produit 8 % de ventes en plus. Dans mes repères de travail, un site dont le LCP dépasse 4 secondes peut diviser son taux de conversion par deux. La règle vaut aussi pour la publicité payante : chaque clic payé arrive sur la même page lente. Côté classement, Google est clair : il cherche à montrer le contenu le plus pertinent, même quand l’expérience de page est médiocre. Accélérer un site garde vos visiteurs ; la pertinence de la page reste le premier critère de classement.',
    },
    {
      type: 'cta',
      titre: 'Vous voulez savoir ce qui ralentit votre site ?',
      texte: 'Je mesure vos pages principales sur mobile, je vous montre la cause qui pèse le plus et l’ordre des corrections. Trente minutes, sans engagement.',
    },
    // source : C:\projet site\ads-os\clients\123digital\ETAT.md (lignes Performance et « En prod depuis le 06/09 »)
    {
      type: 'h2',
      titre: 'Ce que j’ai corrigé sur mon propre site',
      texte: 'Fin août 2026, PageSpeed Insights donnait à mon site un score mobile de 65 et un LCP de 6,5 secondes, alors que l’ordinateur affichait 94. J’ai cherché dans l’ordre ci-dessus, et quatre corrections sont parties en production le 6 septembre. La bannière d’accueil est désormais rendue côté serveur, sans fondu d’entrée : le titre principal démarrait à opacité zéro et attendait une animation, ce qui retardait le LCP. Les fondus d’entrée ont été retirés de dix sections. Les bibliothèques d’animation 3D ont été désinstallées. Une police a été supprimée.',
    },
    // source : C:\projet site\ads-os\clients\123digital\ETAT.md (ligne Performance)
    {
      type: 'paragraphe',
      texte: 'Le résultat, mesuré avec Lighthouse le 6 septembre sur les deux versions : 6,8 secondes de LCP pour l’ancienne, entre 3,1 et 3,9 secondes pour la nouvelle selon la passe. Le LCP a été divisé par deux, et le score mobile est passé de 53 à une fourchette de 70 à 80. Je reste au-dessus des 2,5 secondes que Google juge bonnes, et la mesure officielle PageSpeed Insights est encore à refaire. Je l’écris tel quel : un chiffre flatteur tiré d’une seule passe ne vous servirait à rien pour juger votre propre site.',
    },
    // source : C:\projet site\ads-os\.claude\skills\core-web-vitals\SKILL.md
    // source : https://developers.google.com/speed/docs/insights/v5/about
    // source : https://web.dev/articles/optimize-lcp
    {
      type: 'h2',
      titre: 'Par où commencer sur votre site',
      texte: 'Mesurez l’accueil et vos deux pages qui reçoivent le plus de visites, sur mobile, trois fois chacune. Repérez la métrique la plus faible : presque toujours le LCP sur un site vitrine. Repérez ensuite le plus gros élément affiché à l’écran au chargement, image ou bloc de texte : c’est lui que mesure le LCP. Si c’est une image, travaillez son poids et sa priorité ; si c’est un titre, cherchez ce qui retarde son affichage. Les gains rapides et sans risque viennent en premier : compression, mise en cache, chargement différé des images situées plus bas dans la page, scripts inutiles retirés.',
    },
    // source : https://developers.google.com/speed/docs/insights/v5/about
    // source : https://web.dev/articles/lcp
    // source : https://developers.google.com/search/docs/appearance/page-experience
    // source : https://web.dev/case-studies/vodafone
    // source : https://web.dev/articles/optimize-lcp
    {
      type: 'faq',
      faqs: [
        {
          question: 'Pourquoi mon site est lent sur mobile et rapide sur ordinateur ?',
          reponse: 'PageSpeed Insights mesure le mobile en simulant un téléphone de milieu de gamme sur réseau mobile : une page lourde en images ou en scripts y perd beaucoup plus qu’au bureau.',
        },
        {
          question: 'Quel est un bon score PageSpeed sur mobile ?',
          reponse: 'Lighthouse classe 90 et plus comme bon, 50 à 89 à améliorer, moins de 50 mauvais. Le score varie d’une mesure à l’autre : fiez-vous à la médiane de trois mesures et au LCP, bon à 2,5 secondes ou moins.',
        },
        {
          question: 'Un site lent est-il pénalisé par Google ?',
          reponse: 'Google affirme qu’il montre le contenu le plus pertinent même quand l’expérience de page est médiocre. La vitesse sert d’abord à garder les visiteurs : chez Vodafone, un LCP amélioré de 31 % a apporté 8 % de ventes en plus.',
        },
        {
          question: 'Pourquoi PageSpeed Insights n’affiche pas de données réelles pour mon site ?',
          reponse: 'Les données terrain viennent des visiteurs de Chrome sur 28 jours. Sans assez de trafic, l’outil n’en affiche aucune et seul le laboratoire mesure le site.',
        },
        {
          question: 'Mon site met trop de temps à charger, que faire en premier ?',
          reponse: 'Identifier l’élément LCP de la page d’accueil dans le détail Lighthouse, puis traiter ce qui le retarde : image trop lourde, police, script qui bloque l’affichage ou serveur lent.',
        },
      ],
    },
    // source : https://developers.google.com/speed/docs/insights/v5/about
    // source : https://web.dev/articles/lcp
    // source : https://web.dev/case-studies/vodafone
    // source : https://developers.google.com/search/docs/appearance/page-experience
    {
      type: 'resume',
      titre: 'À retenir',
      items: [
        'Mesurez avec PageSpeed Insights, trois fois, et gardez la médiane.',
        'Le LCP est bon à 2,5 secondes ou moins et mauvais au-delà de 4 secondes.',
        'Image principale, polices, code bloquant, scripts en trop, serveur : les cinq suspects habituels.',
        'Chez Vodafone, un LCP amélioré de 31 % a apporté 8 % de ventes en plus.',
        'La vitesse garde les visiteurs, la pertinence de la page reste le premier critère de Google.',
      ],
    },
  ],
  liens: [
    { label: 'Création de site web', href: '/services/creation-site-web' },
    { label: 'Faut-il refondre son site ?', href: '/blog/refonte-site-web-quand-pourquoi' },
    { label: 'Mon site n’apparaît plus sur Google', href: '/problemes/mon-site-n-apparait-plus-sur-google' },
    { label: 'Audit gratuit de 30 minutes', href: '/audit-gratuit' },
  ],
}
