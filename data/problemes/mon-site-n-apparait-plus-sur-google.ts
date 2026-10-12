import type { PageProbleme } from '../problemes'

export const page: PageProbleme = {
  slug: 'mon-site-n-apparait-plus-sur-google',
  famille: 'panne',
  requete: 'mon site n’apparaît plus sur google',
  title: 'Mon site n’apparaît plus sur Google : diagnostic en 10 min',
  description: 'Votre site a disparu de Google ou chuté d’un coup ? Les causes par ordre de probabilité, ce que Search Console montre et pourquoi site: ne prouve rien.',
  titre: 'Mon site n’apparaît plus sur Google : le diagnostic en 10 minutes',
  reponse: 'Ouvrez Search Console avant de conclure : la commande site: ne renvoie pas forcément toutes les pages indexées, Search Console fait foi. Dans l’ordre, je vérifie si la demande a baissé, si une mise à jour du site a posé un noindex ou un blocage robots.txt, si le site répond encore, puis les rapports Actions manuelles et Problèmes de sécurité. Une baisse après une mise à jour de Google n’est pas une pénalité et ne se répare pas en une journée.',
  datePublication: '2026-10-07',
  tempsLecture: 8,
  contenu: [
    // source : C:\projet site\ads-os\rag\sources\seo-best-practices\erreurs-seo-programmatique.md (point 3)
    {
      type: 'intro',
      texte: 'Vous tapez le nom de votre métier, puis celui de votre entreprise, et votre site ne sort plus. Avant de toucher à quoi que ce soit, il faut savoir si le site a réellement quitté l’index de Google ou si c’est l’outil qui vous le fait croire. Une absence dans un outil ne prouve pas une absence dans Google. Voici la méthode que j’applique, dans l’ordre où les causes se présentent le plus souvent.',
    },
    // source : https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site
    // source : https://support.google.com/webmasters/answer/9012289 (outil d’inspection d’URL)
    {
      type: 'h2',
      titre: 'Premier réflexe : vérifier dans Search Console',
      texte: 'La commande site:votresite.fr est le test que tout le monde fait en premier. Google l’écrit dans sa documentation : cette commande « ne renvoie pas forcément toutes les URL indexées ». Elle sert à un premier coup d’œil. Pour trancher sur une page précise, Google renvoie vers l’outil d’inspection d’URL de Search Console. Il affiche « L’URL est sur Google » ou « L’URL n’est pas sur Google », et c’est cette réponse qui compte. Si vous n’avez pas accès à Search Console, récupérez-le en premier, auprès de la personne qui a fait le site si besoin.',
    },
    // source : C:\projet site\ads-os\clients\123digital\06-reports\2026-08-19-diagnostic-search-console.md
    {
      type: 'paragraphe',
      texte: 'Je l’ai vécu sur mon propre site en août 2026. Une série de pages ne sortait jamais dans les résultats, et tout laissait croire qu’elles avaient été écartées. J’ai inspecté un échantillon de huit de ces pages muettes dans Search Console : sept étaient « envoyée et indexée ». Google les avait acceptées et ne les montrait presque jamais. Le problème relevait du contenu des pages, et il se traite autrement qu’une désindexation.',
    },
    // source : https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops
    {
      type: 'h2',
      titre: 'Souvent, rien n’a disparu : la demande a changé',
      texte: 'Dans son guide sur les baisses de trafic, Google range la saisonnalité et l’évolution de l’intérêt des internautes parmi les causes principales, au même titre que les problèmes techniques. Avant de chercher une panne, ouvrez le rapport Performances de Search Console, choisissez la plage « 16 derniers mois » et comparez avec la même période de l’année précédente. Google conseille aussi Google Trends pour voir si la requête elle-même baisse pour tout le monde. Un site qui garde ses positions sur une requête moins cherchée perd des clics sans avoir rien perdu.',
    },
    // source : C:\projet site\ads-os\clients\123digital\06-reports\2026-08-19-diagnostic-search-console.md (section Volume global)
    {
      type: 'paragraphe',
      texte: 'La position moyenne trompe aussi. Sur mon site, entre mai et août 2026, les impressions ont plus que doublé pendant que la position moyenne passait de 12,7 à 31. Deux lectures tiennent : un recul réel des pages, ou un site qui sort sur beaucoup de nouvelles requêtes lointaines, ce qui fait baisser la moyenne sans qu’aucune page existante ait reculé. Mes données ne permettaient pas de trancher. C’est pour cela que je lis les positions requête par requête et page par page, et la moyenne en dernier.',
    },
    // source : https://support.google.com/webmasters/answer/7440203 (rapport Indexation des pages)
    // source : https://developers.google.com/search/docs/crawling-indexing/http-network-errors
    // source : https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops
    // source : https://developers.google.com/search/updates/core-updates (liste publique des mises à jour)
    // source : https://support.google.com/webmasters/answer/9044175 (rapport Actions manuelles)
    // source : https://support.google.com/webmasters/answer/9044101 (rapport Problèmes de sécurité)
    {
      type: 'liste',
      titre: 'Le diagnostic en 10 minutes, dans l’ordre où je le fais',
      items: [
        '1. Rapport Performances, 16 derniers mois : la chute est-elle brutale, à une date précise, ou progressive ? Une date précise oriente vers une modification du site ou une mise à jour de Google.',
        '2. Inspection d’URL sur la page d’accueil et sur deux pages importantes : sont-elles sur Google ?',
        '3. Rapport Indexation des pages : les motifs « Exclue par la balise noindex » ou « Bloquée par le fichier robots.txt » ont-ils grimpé d’un coup ?',
        '4. Le site répond-il ? Ouvrez-le depuis un téléphone, hors de votre wifi. Google retire de l’index les URL qui renvoient durablement une erreur serveur, et celles qui passent en erreur 404 après avoir été indexées.',
        '5. Rapport Actions manuelles : un compteur s’affiche en haut du rapport s’il y en a une.',
        '6. Rapport Problèmes de sécurité : contenu piraté, logiciel malveillant, hameçonnage.',
        '7. Si rien de tout cela ne ressort : comparer la date de la chute avec la liste des mises à jour publiée par Google.',
      ],
    },
    // source : https://developers.google.com/search/docs/crawling-indexing/block-indexing
    {
      type: 'h2',
      titre: 'La cause la plus banale : un blocage posé par une mise à jour',
      texte: 'Une page sort de Google de deux façons silencieuses. La balise noindex, dans le code de la page ou dans un en-tête X-Robots-Tag, demande à Google de ne pas l’indexer. Le fichier robots.txt, lui, interdit l’exploration. Ces deux réglages servent pendant la construction d’un site, pour que le brouillon reste hors de Google, et ils survivent parfois à la mise en ligne ou reviennent avec une extension, un thème ou une nouvelle version. Google précise un piège : si une page est bloquée par robots.txt, son robot ne voit jamais le noindex, et la page peut rester dans les résultats. Les deux réglages ne se combinent donc pas.',
    },
    // source : C:\projet site\ads-os\clients\123digital\06-reports\2026-08-20-strategie-seo.md (section 5, chantier 2)
    {
      type: 'paragraphe',
      texte: 'Je me suis fait prendre sur mon propre site le 20 août 2026. J’ouvre la version anglaise à Google. Deux heures plus tard, en relisant le fichier robots.txt, je trouve une ligne Disallow: /en/ qui interdisait précisément l’exploration de cette version. Une ligne oubliée annulait le travail fait deux heures plus tôt. La règle que j’en tire : relire robots.txt après chaque mise en ligne, même quand on n’y a pas touché.',
    },
    {
      type: 'cta',
      titre: 'Vous n’arrivez pas à lire Search Console ?',
      texte: 'Je fais ce diagnostic avec vous, sur votre site, en trente minutes et sans engagement. Vous repartez avec la cause probable et l’ordre des corrections.',
    },
    // source : https://support.google.com/webmasters/answer/9044175 (rapport Actions manuelles)
    // source : https://support.google.com/webmasters/answer/9044101 (rapport Problèmes de sécurité)
    {
      type: 'h2',
      titre: 'Action manuelle ou site piraté : Google vous prévient',
      texte: 'Une action manuelle est une décision humaine : un examinateur de Google a constaté que des pages enfreignent ses règles contre le spam. Google prévient dans le rapport Actions manuelles et dans la messagerie de Search Console. Après correction, on dépose une demande de réexamen ; selon Google, la plupart prennent de quelques jours à quelques semaines, parfois davantage pour les liens. Les motifs listés par Google vont du contenu de faible valeur ajoutée aux liens artificiels, en passant par le texte caché, le bourrage de mots-clés, les redirections trompeuses ou le spam laissé par des utilisateurs dans des commentaires. Le piratage relève du rapport Problèmes de sécurité : contenu ajouté à votre insu, logiciel malveillant, pages d’hameçonnage. Google peut alors afficher un avertissement dans les résultats ou une page d’alerte avant votre site. La désinfection est un travail de développeur ; ce rapport vous dit ce que Google a vu et comment demander un examen une fois le site nettoyé.',
    },
    // source : https://developers.google.com/search/updates/core-updates
    // source : https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops
    {
      type: 'h2',
      titre: 'Une mise à jour de Google n’est pas une pénalité',
      texte: 'Si aucun rapport ne signale de problème et que la chute tombe sur une mise à jour principale, vous êtes face à une réévaluation. Google écrit que ces mises à jour ne ciblent pas de sites ou de pages en particulier, et qu’il peut n’y avoir rien de fondamentalement mauvais dans votre contenu. Aucune notification n’est envoyée au site. Le rétablissement prend du temps : Google parle de plusieurs mois, parfois jusqu’à la mise à jour suivante. Il déconseille les corrections express, comme retirer un élément parce qu’on a lu qu’il nuisait au référencement, et recommande des changements utiles à vos visiteurs et durables.',
    },
    // source : https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops (site moves and migrations)
    // source : https://developers.google.com/search/docs/crawling-indexing/http-network-errors
    {
      type: 'h2',
      titre: 'Après une refonte ou un changement d’adresse',
      texte: 'Google cite les déménagements et migrations de site parmi les causes de baisse. Si votre site a été refait ou a changé de nom de domaine juste avant la chute, comparez les anciennes adresses aux nouvelles : une ancienne page indexée qui renvoie maintenant une erreur 404 finit retirée de l’index, avec la place qu’elle occupait. La préparation d’une migration et les délais normaux après une mise en ligne sont détaillés dans la page consacrée au nouveau site invisible sur Google.',
    },
    // source : https://support.google.com/webmasters/answer/9012289
    // source : https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site
    // source : https://support.google.com/webmasters/answer/9044175
    // source : https://support.google.com/webmasters/answer/9044101
    // source : https://developers.google.com/search/updates/core-updates
    {
      type: 'faq',
      faqs: [
        {
          question: 'Pourquoi mon site n’apparaît plus quand je tape son nom sur Google ?',
          reponse: 'Vérifiez d’abord dans Search Console, avec l’inspection d’URL sur la page d’accueil. Si elle est sur Google, le problème vient du classement ou de la requête. Si elle n’y est plus, cherchez un noindex, un blocage robots.txt, une erreur serveur ou une action manuelle.',
        },
        {
          question: 'La commande site: ne montre plus mes pages, est-ce grave ?',
          reponse: 'Pas forcément. Google indique que site: ne renvoie pas forcément toutes les URL indexées. L’inspection d’URL dans Search Console dit si une page est sur Google.',
        },
        {
          question: 'Comment savoir si j’ai une pénalité Google ?',
          reponse: 'Une action manuelle apparaît dans le rapport Actions manuelles de Search Console et dans sa messagerie. Une baisse liée à une mise à jour principale n’est pas une pénalité et ne fait l’objet d’aucun message.',
        },
        {
          question: 'Combien de temps pour revenir dans Google ?',
          reponse: 'Après la levée d’un noindex ou d’un blocage, Google doit explorer à nouveau les pages. Après une action manuelle, comptez le délai du réexamen, de quelques jours à quelques semaines. Après une mise à jour principale, Google parle de plusieurs mois.',
        },
        {
          question: 'Mon site a été piraté, va-t-il revenir sur Google ?',
          reponse: 'Une fois le site nettoyé, demandez un examen depuis le rapport Problèmes de sécurité de Search Console. Google indique un délai de quelques jours à quelques semaines.',
        },
      ],
    },
    // source : https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site
    // source : https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops
    // source : https://developers.google.com/search/docs/crawling-indexing/block-indexing
    // source : https://developers.google.com/search/updates/core-updates
    {
      type: 'resume',
      titre: 'À retenir',
      items: [
        'Search Console fait foi : la commande site: ne prouve ni la présence ni l’absence.',
        'Comparez sur 16 mois avant de chercher une panne : la demande a peut-être baissé.',
        'Cherchez d’abord un noindex ou un blocage robots.txt posé par une mise à jour.',
        'Action manuelle et piratage sont signalés dans Search Console, avec une procédure de réexamen.',
        'Une mise à jour de Google se rattrape en mois, sans correction express.',
      ],
    },
  ],
  sources: [
    { label: 'Google Search Central : opérateurs de recherche, site:', url: 'https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site' },
    { label: 'Aide Search Console : outil d’inspection d’URL', url: 'https://support.google.com/webmasters/answer/9012289' },
    { label: 'Google Search Central : comprendre une baisse de trafic', url: 'https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops' },
    { label: 'Aide Search Console : rapport Indexation des pages', url: 'https://support.google.com/webmasters/answer/7440203' },
    { label: 'Google Search Central : erreurs HTTP et réseau', url: 'https://developers.google.com/search/docs/crawling-indexing/http-network-errors' },
    { label: 'Google Search Central : mises à jour principales', url: 'https://developers.google.com/search/updates/core-updates' },
    { label: 'Aide Search Console : rapport Actions manuelles', url: 'https://support.google.com/webmasters/answer/9044175' },
    { label: 'Aide Search Console : rapport Problèmes de sécurité', url: 'https://support.google.com/webmasters/answer/9044101' },
    { label: 'Google Search Central : bloquer l’indexation', url: 'https://developers.google.com/search/docs/crawling-indexing/block-indexing' },
  ],
  liens: [
    { label: 'Votre site est neuf et n’apparaît pas encore ? Comment apparaître sur Google', href: '/problemes/nouveau-site-invisible-sur-google' },
    { label: 'Mon site est lent sur mobile', href: '/problemes/mon-site-est-lent-sur-mobile' },
    { label: 'Référencement naturel (SEO)', href: '/services/seo' },
    { label: 'Audit gratuit de 30 minutes', href: '/audit-gratuit' },
  ],
}
