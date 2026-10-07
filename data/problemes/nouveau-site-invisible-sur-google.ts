import type { PageProbleme } from '../problemes'

export const page: PageProbleme = {
  slug: 'nouveau-site-invisible-sur-google',
  famille: 'panne',
  requete: 'nouveau site n’apparaît pas sur google',
  title: 'Nouveau site invisible sur Google : délais et vérifications',
  description: 'Votre nouveau site, refait ou migré, ne sort nulle part sur Google ? Le délai normal, les blocages à chercher dans l’ordre et ce qu’une migration doit préparer.',
  titre: 'Nouveau site invisible sur Google : combien de temps attendre et quoi vérifier',
  reponse: 'Google indique qu’il peut falloir quelques semaines pour remarquer un nouveau site, et que l’exploration d’une page prend de quelques jours à quelques semaines. Passé ce délai, je vérifie dans l’ordre : le noindex du brouillon resté en place, le fichier robots.txt, le sitemap soumis dans Search Console, la balise canonical, puis l’inspection d’URL des pages principales. Pour une refonte, tout se joue avant la mise en ligne, avec des redirections 301 page à page.',
  datePublication: '2026-10-07',
  tempsLecture: 7,
  contenu: [
    // source : https://developers.google.com/search/docs/fundamentals/get-on-google
    {
      type: 'intro',
      texte: 'Le site est en ligne, il est beau, vous l’avez envoyé à vos proches, et quand vous tapez votre métier sur Google, rien. Un site neuf démarre sans historique, et Google ne le découvre pas à la seconde où il est publié. La question utile est double : combien de temps l’attente est normale, et à partir de quand on cherche un blocage. Je réponds aux deux, puis je raconte une bascule réelle que j’ai suivie heure par heure.',
    },
    // source : https://developers.google.com/search/docs/fundamentals/get-on-google
    // source : https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
    {
      type: 'h2',
      titre: 'Combien de temps c’est normal',
      texte: 'Google donne lui-même l’ordre de grandeur : il peut falloir quelques semaines pour qu’il remarque un nouveau site, ou des changements sur un site existant. Pour une page donnée, l’exploration prend de quelques jours à quelques semaines. Google ajoute qu’il explore des milliards de pages et qu’il est inévitable que certains sites lui échappent : rien n’est garanti, d’où l’intérêt de lui signaler le site plutôt que d’attendre. Concrètement, un site publié il y a dix jours et absent des résultats n’a rien d’anormal. Un site publié il y a deux mois et toujours absent mérite les vérifications qui suivent.',
    },
    // source : C:\projet site\ads-os\.claude\skills\seo-migration\SKILL.md (checklist pré-migration : robots.txt, noindex accidentel, sitemap)
    // source : https://developers.google.com/search/docs/crawling-indexing/block-indexing
    // source : https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
    // source : https://support.google.com/webmasters/answer/9012289
    {
      type: 'liste',
      titre: 'Ce que je vérifie sur un site neuf, dans cet ordre',
      items: [
        '1. Le noindex du brouillon : un site en construction porte souvent une balise noindex pour rester hors de Google. Elle doit disparaître le jour exact de la mise en ligne.',
        '2. Le fichier robots.txt, à l’adresse votresite.fr/robots.txt : aucune ligne Disallow ne doit couvrir les pages à référencer, et une ligne Sitemap peut y indiquer le plan du site.',
        '3. Search Console : la propriété existe-t-elle, et vous appartient-elle ?',
        '4. Le sitemap : soumis dans le rapport Sitemaps, sans erreur, avec des adresses complètes et uniquement les versions canoniques des pages.',
        '5. La balise canonical : chaque page doit désigner sa propre adresse, sur le bon domaine.',
        '6. L’inspection d’URL sur l’accueil et les pages de service : « L’URL est sur Google » ou non, et si non, pour quelle raison.',
        '7. Les copies techniques : l’adresse provisoire fournie par l’hébergeur sert parfois le même site en parallèle. Elle ne doit pas être indexable.',
      ],
    },
    // source : https://support.google.com/webmasters/answer/7440203 (rapport Indexation des pages)
    {
      type: 'paragraphe',
      texte: 'Le rapport Indexation des pages de Search Console donne, pour chaque page écartée, un motif. Sur un site neuf, deux motifs reviennent et ne signalent aucune erreur de votre part. « Détectée, actuellement non indexée » : Google connaît l’adresse mais ne l’a pas encore explorée. « Explorée, actuellement non indexée » : il l’a lue et ne l’a pas retenue pour l’instant. Le premier se résout souvent avec le temps. Le second pose une question de contenu : la page apporte-t-elle quelque chose de plus que les pages déjà présentes sur le sujet ?',
    },
    // source : https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
    // source : C:\projet site\ads-os\scripts\gsc_sitemap.py (soumission et relevé du sitemap par l’API Search Console)
    {
      type: 'h2',
      titre: 'Le sitemap : un simple indice pour Google',
      texte: 'Le sitemap liste les pages que vous voulez voir explorées. Google le dit sans détour : le soumettre est « simplement un indice », qui ne garantit ni son téléchargement ni son usage pour explorer le site. Il reste indispensable sur un site neuf, parce qu’aucun lien extérieur ne mène encore vers vos pages. Trois règles de Google à respecter : des adresses complètes, uniquement la version préférée de chaque page, et pas plus de 50 000 adresses ou 50 Mo par fichier. Je soumets le sitemap par Search Console, puis je relève deux dates dans le rapport : le dernier envoi et le dernier téléchargement par Google. Si le second suit le premier sans erreur, la porte est ouverte.',
    },
    // source : https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
    // source : https://support.google.com/webmasters/answer/9012289
    {
      type: 'h2',
      titre: 'Demander une indexation : utile, mais limité',
      texte: 'L’outil d’inspection d’URL propose un bouton « Demander une indexation ». Il sert pour une poignée d’adresses importantes : Google applique un quota quotidien par propriété et renvoie vers le sitemap dès qu’il y a beaucoup de pages. Deux phrases de sa documentation évitent bien des nuits blanches. Demander plusieurs fois l’exploration de la même adresse ne l’accélère pas. Et une demande ne garantit pas l’entrée dans les résultats, ni immédiatement ni du tout. Je demande l’indexation de l’accueil et des pages de service, une fois, puis j’attends.',
    },
    {
      type: 'cta',
      titre: 'Un site neuf qui ne sort toujours pas ?',
      texte: 'Je vérifie ces sept points sur votre site pendant un échange de trente minutes, sans engagement, et je vous dis ce qui bloque.',
    },
    // source : https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
    // source : C:\projet site\ads-os\.claude\skills\seo-migration\SKILL.md
    {
      type: 'h2',
      titre: 'Refonte ou migration : ce qui se prépare avant la mise en ligne',
      texte: 'Quand le nouveau site remplace un ancien, l’enjeu change : il faut transmettre ce que l’ancien avait acquis. Avant la bascule, je dresse l’inventaire de toutes les adresses existantes et je fais correspondre chaque ancienne adresse à sa nouvelle équivalente, jamais à l’accueil par défaut. Google recommande des redirections permanentes côté serveur, 301 ou 308, à garder aussi longtemps que possible et en général au moins un an. Le jour J : nouveau sitemap soumis, canonical auto-référente sur chaque page, robots.txt relu. Si le nom de domaine ou le sous-domaine change, l’outil Changement d’adresse de Search Console s’ajoute ; Google précise qu’il ne sert ni pour le passage de http à https ni pour un changement de www. Google prévient enfin que la visibilité peut fluctuer pendant le déménagement, et que pour un site de taille moyenne il faut quelques semaines ou plus pour que les nouvelles adresses remplacent les anciennes.',
    },
    // source : C:\projet site\ads-os\.claude\skills\seo-migration\SKILL.md (phase 3, suivi J+1 à J+30)
    {
      type: 'paragraphe',
      texte: 'Après la bascule, je suis trois rendez-vous. Le lendemain : aucune erreur 404, pas de chaîne de redirections, pas d’explosion d’erreurs dans Search Console, le suivi des conversions qui remonte. À une semaine : le trafic comparé à la référence relevée avant la bascule, sachant qu’une baisse de 10 à 20 % reste une fluctuation habituelle à ce stade. À un mois : le trafic doit avoir retrouvé son niveau. Une baisse qui dépasse encore 20 % se traite comme une panne : redirection manquante, contenu perdu, problème technique.',
    },
    // source : C:\projet site\ads-os\clients\msds18\06-reports\2026-07-31-bascule-site-next.md
    // source : C:\projet site\ads-os\clients\msds18\06-reports\2026-07-31-seo-migration-plan.md
    // source : C:\projet site\ads-os\clients\msds18\06-reports\2026-07-31-audit-technique-post-bascule.md
    {
      type: 'resume',
      titre: 'Cas réel, anonymisé',
      items: [
        'Un artisan du chauffage de la métropole lyonnaise change de site en juillet 2026 : 40 pages, toutes gardées à la même adresse, donc aucune redirection à écrire. Seule la version www de l’adresse renvoie vers le domaine sans www, par une redirection permanente 308.',
        'Avant la bascule, titre, description et titre principal sont comparés page à page entre l’ancien et le nouveau site : 40 sur 40 identiques.',
        'Le soir de la mise en ligne, je soumets le sitemap : Google le télécharge dans les secondes qui suivent, sans erreur. Le compteur de pages indexées affiche zéro, ce qui est normal le premier jour.',
        'L’audit du même soir trouve une régression : la balise canonical, présente sur chaque page de l’ancien site, avait disparu du nouveau. Le correctif est écrit dans l’heure.',
        'Il trouve aussi deux copies complètes du site, servies sur des adresses techniques de l’hébergeur et explorables par Google. Elles doivent renvoyer un noindex, filtré sur le nom d’hôte pour ne jamais toucher le vrai domaine.',
      ],
    },
    // source : https://support.google.com/webmasters/answer/7440203
    // source : https://support.google.com/webmasters/answer/9012289
    {
      type: 'h2',
      titre: 'Indexé ne veut pas encore dire visible',
      texte: 'Une fois les pages dans l’index, une seconde attente commence. Google précise que le statut « L’URL est sur Google » rend la page éligible aux résultats sans garantir qu’elle y apparaisse. Il rappelle aussi qu’il ne faut pas s’attendre à voir toutes les adresses d’un site indexées, seulement les pages canoniques. Un site neuf indexé et absent des premières pages a franchi l’étape technique ; la suite dépend de ce que chaque page apporte de plus que celles déjà classées. Si votre site était visible et a disparu, la démarche diffère et fait l’objet d’une page à part.',
    },
    // source : https://developers.google.com/search/docs/fundamentals/get-on-google
    // source : https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
    // source : https://support.google.com/webmasters/answer/7440203
    // source : https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
    // source : https://support.google.com/webmasters/answer/9012289
    {
      type: 'faq',
      faqs: [
        {
          question: 'Combien de temps pour qu’un nouveau site apparaisse sur Google ?',
          reponse: 'Google indique quelques semaines pour remarquer un nouveau site, et de quelques jours à quelques semaines pour explorer une page. Soumettre le sitemap dans Search Console aide sans rien garantir.',
        },
        {
          question: 'Pourquoi mon site n’est pas indexé par Google ?',
          reponse: 'Les causes les plus fréquentes sur un site neuf : le noindex du brouillon resté en place, une ligne Disallow dans robots.txt, un sitemap jamais soumis, une canonical qui pointe ailleurs. L’inspection d’URL de Search Console donne la raison page par page.',
        },
        {
          question: 'Est-ce que demander l’indexation plusieurs fois accélère les choses ?',
          reponse: 'Non. Google écrit que redemander l’exploration de la même adresse ne la fait pas explorer plus vite, et qu’un quota limite ces demandes.',
        },
        {
          question: 'Faut-il des redirections si je refais mon site ?',
          reponse: 'Oui, pour toute adresse qui change. Google recommande des redirections permanentes 301 ou 308, de l’ancienne page vers son équivalent, gardées au moins un an.',
        },
        {
          question: 'Mon nouveau site est indexé mais je ne le trouve pas, pourquoi ?',
          reponse: 'Être indexé rend une page éligible aux résultats sans lui donner de position. Sur un site neuf, le classement vient ensuite, page par page.',
        },
      ],
    },
    // source : https://developers.google.com/search/docs/fundamentals/get-on-google
    // source : https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
    // source : https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
    // source : https://support.google.com/webmasters/answer/9012289
    {
      type: 'resume',
      titre: 'À retenir',
      items: [
        'Quelques semaines d’attente sont normales pour un site neuf, selon Google.',
        'Le premier suspect est le noindex du brouillon, le second le fichier robots.txt.',
        'Le sitemap et la demande d’indexation signalent vos pages à Google sans rien garantir.',
        'Une refonte se prépare avant la mise en ligne : inventaire, redirections 301 page à page, canonical.',
        'Indexé signifie éligible : la visibilité vient après.',
      ],
    },
  ],
  liens: [
    { label: 'Mon site n’apparaît plus sur Google : le diagnostic', href: '/problemes/mon-site-n-apparait-plus-sur-google' },
    { label: 'Création de site web', href: '/services/creation-site-web' },
    { label: 'Faut-il refondre son site ?', href: '/blog/refonte-site-web-quand-pourquoi' },
    { label: 'Référencement naturel (SEO)', href: '/services/seo' },
    { label: 'Audit gratuit de 30 minutes', href: '/audit-gratuit' },
  ],
}
