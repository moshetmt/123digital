import type { PageProbleme } from '../problemes'

export const page: PageProbleme = {
  slug: 'mes-google-ads-ne-rapportent-rien',
  famille: 'argent',
  requete: 'audit Google Ads',
  title: 'Audit Google Ads : ce qu’on vérifie quand rien ne rapporte',
  description:
    'Audit Google Ads : les sept points contrôlés (conversions, termes de recherche, enchères, horaires, annonces, page d’arrivée) et ce qu’on décide ensuite.',
  titre: 'Audit Google Ads : ce qu’on contrôle quand le compte ne rapporte rien, dans l’ordre',
  // source : C:\projet site\ads-os\.claude\skills\account-audit\SKILL.md (tracking en premier : un tracking faux invalide le reste)
  // source : C:\projet site\ads-os\rag\sources\best-practices\benchmarks-sea-france.md (seuil taux de conversion < 4 % = à améliorer)
  reponse:
    'Un audit Google Ads passe un compte en revue en sept points : le suivi des conversions, les termes de recherche, la structure des campagnes, les enchères, les zones et horaires de diffusion, les annonces et la page d’arrivée. Le suivi des conversions passe en premier, parce qu’un suivi faux rend toutes les autres lectures fausses. Il en sort la cause principale du gaspillage et l’ordre des corrections. Sur un compte d’artisan, un taux de conversion sous 4 % est le seuil à partir duquel je cherche une cause.',
  datePublication: '2026-10-07',
  tempsLecture: 8,
  contenu: [
    {
      type: 'intro',
      texte:
        'Un audit Google Ads (on dit aussi audit AdWords, audit de campagne SEA ou audit de compte Google Ads) répond à une question : où part l’argent, et pourquoi le téléphone ne sonne pas ? Vous voyez passer des clics et une facture chaque mois, sans plus de demandes. Avant de couper le compte ou de changer de prestataire, il existe une lecture méthodique, avec des rapports que Google fournit à tout annonceur. Je décris ici celle que j’applique, avec les erreurs que j’ai vues sur de vrais comptes. Cette page ne parle pas du démarrage d’une campagne, ni de la relation avec une agence : elle part d’un compte qui tourne et qui ne rapporte pas.',
    },
    // source : C:\projet site\ads-os\.claude\skills\account-audit\SKILL.md (rubriques de l’audit : tracking, structure, termes de recherche, mots clés, annonces, enchères et budget, zones et horaires, audiences et appareils, pages d’arrivée)
    // source : https://support.google.com/google-ads/answer/1722022?hl=fr (mesure des conversions : repérer ce qui pousse les clients à agir, alimenter les enchères intelligentes)
    {
      type: 'h2',
      titre: 'Ce que contrôle un audit de compte Google Ads',
      texte:
        'Un audit lit le compte de l’intérieur, avec les rapports de Google Ads, du suivi des conversions jusqu’à la page où atterrit le visiteur. Le suivi passe en premier, parce que les enchères intelligentes de Google s’appuient sur les conversions mesurées : si elles sont fausses, tout ce qui suit l’est aussi. Voici les sept points, que la suite de la page détaille.',
    },
    {
      type: 'liste',
      titre: 'Les sept points d’un audit Google Ads :',
      items: [
        '1. Le suivi des conversions : les actions comptées sont-elles les bonnes, la mesure voit-elle les appels et les formulaires (point 1 ci-dessous).',
        '2. Les termes de recherche : ce que les internautes ont réellement tapé, et la part du budget partie sur des recherches hors sujet (point 2).',
        '3. La structure des campagnes : une campagne par ligne de service, sans mots clés qui se font concurrence (point 5).',
        '4. Les enchères et le budget : une stratégie d’enchères adaptée au nombre de conversions du compte, du budget pour les campagnes qui produisent (point 5).',
        '5. Les zones, les horaires et les appareils : où et quand les annonces s’affichent, et ce que chaque créneau ramène (point 3).',
        '6. Les annonces : ce qu’elles promettent, et si cette promesse se retrouve sur la page (point 4).',
        '7. La page d’arrivée : titre, numéro cliquable, formulaire, vitesse (point 4).',
      ],
    },
    // source : C:\projet site\ads-os\rag\sources\best-practices\benchmarks-sea-france.md (benchmarks Search France, mise à jour du 24/06/2026)
    {
      type: 'h2',
      titre: 'Les repères avant de commencer',
      texte:
        'Pour savoir si un compte « ne rapporte rien » ou rapporte simplement moins qu’espéré, il faut des points de comparaison. Voici les fourchettes que je tiens à jour pour les campagnes Search des services à domicile en France. Ce sont des moyennes nationales, relevées en juin 2026 : une zone ou une saison peut s’en écarter.',
    },
    {
      type: 'liste',
      titre: 'Ordres de grandeur, campagnes Search, France :',
      items: [
        'Plomberie et chauffage : coût par clic de 1,50 à 3 €, taux de clic de 4 à 7 %, taux de conversion de 5 à 10 %, coût par demande de 20 à 60 €.',
        'Serrurerie et dépannage : coût par clic de 2 à 5 €, taux de conversion de 8 à 15 %, coût par demande de 15 à 40 €.',
        'Électricité : coût par clic de 1,20 à 2,50 €, taux de conversion de 5 à 10 %, coût par demande de 25 à 50 €.',
        'Taux de conversion : au-dessus de 8 %, c’est bon ; de 4 à 8 %, acceptable ; sous 4 %, il y a une cause à trouver.',
        'Part du budget partie sur des recherches hors sujet : sous 5 %, c’est sain ; de 5 à 15 %, acceptable ; au-delà de 15 %, à corriger.',
      ],
    },
    // source : C:\projet site\ads-os\.claude\skills\conversion-diagnostic\SKILL.md (problèmes courants : comptage Toutes, tag tel:, consent mode, conversions secondaires, délai 24-72 h)
    {
      type: 'h2',
      titre: '1. Les conversions ne sont pas mesurées, ou mal',
      texte:
        'Une campagne qui « ne rapporte rien » rapporte parfois des clients que Google Ads ne voit pas. L’inverse existe aussi : un compte qui affiche de belles conversions qui n’en sont pas. Dans les deux cas, l’algorithme d’enchères apprend sur un signal faux, et vous pilotez à l’aveugle. Je commence donc toujours par la chaîne de mesure : la balise existe-t-elle, se déclenche-t-elle au bon moment, la conversion remonte-t-elle dans le compte ? Une conversion met normalement 24 à 72 heures à apparaître.',
    },
    {
      type: 'liste',
      titre: 'Les erreurs de mesure que je retrouve le plus souvent :',
      items: [
        'Une demande de devis comptée en mode « Toutes » : chaque rechargement de la page de remerciement ajoute une conversion.',
        'Une balise sur le lien téléphone qui compte le clic sur le numéro, et ignore si l’appel a vraiment eu lieu.',
        'Le mode de consentement qui bloque les balises quand le visiteur refuse les cookies.',
        'Des conversions secondaires, comme une visite de page, comptées dans les enchères comme si c’étaient des demandes.',
      ],
    },
    // source : C:\projet site\ads-os\clients\msds18\06-reports\2026-09-06-search-terms-review.md (section 1 : Ads ne voit que 2 formulaires sur 7 depuis le 01/09, refus de cookies)
    // source : C:\Users\moche\.claude-ads\projects\C--projet-site-ads-os\memory\feedback_croiser-feuille-leads-avant-coupure.md (73 % des conversions Ads = clics tel:)
    {
      type: 'paragraphe',
      texte:
        'Chez un chauffagiste de la métropole lyonnaise, Google Ads ne voyait en septembre 2026 que 2 formulaires sur 7 : les autres visiteurs avaient refusé les cookies, et la conversion ne remontait pas. Sur ce même compte, 73 % des conversions enregistrées étaient des clics sur le numéro de téléphone. Le compte paraissait donc moins rentable qu’il ne l’était. Ce qui a permis de le voir : une feuille de suivi où chaque demande reçue est notée, indépendamment de Google.',
    },
    // source : https://support.google.com/google-ads/answer/2472708?hl=fr (terme de recherche vs mot clé, termes omis pour confidentialité, mots clés à exclure)
    {
      type: 'h2',
      titre: '2. Les recherches achetées ne sont pas celles que vous croyez',
      texte:
        'Un mot clé est ce que vous déclarez à Google. Un terme de recherche est ce que la personne a vraiment tapé avant de cliquer. Les deux diffèrent souvent, et c’est dans cet écart que part l’argent. Le rapport sur les termes de recherche montre les requêtes réelles ; quand une requête ne correspond pas à votre activité, Google recommande de l’ajouter comme mot clé à exclure. Une limite à connaître : Google omet du rapport les recherches trop rares, pour des raisons de confidentialité, et les regroupe en « autres requêtes ».',
    },
    // source : C:\projet site\ads-os\clients\msds18\06-reports\2026-09-06-search-terms-review.md (export = environ 51 % de la dépense réelle du cycle)
    // source : C:\projet site\ads-os\clients\msds18\06-reports\2026-06-24-search-terms-review.md (5,9 % du budget semaine sur parasites, termes de voiture passés malgré les négatifs)
    // source : C:\projet site\ads-os\rag\sources\best-practices\methode-lecture-donnees-ads.md (négatifs de niveau compte qui tuent des mots-clés sans trace)
    {
      type: 'paragraphe',
      texte:
        'Sur le compte du chauffagiste, l’export d’une quinzaine de septembre ne montrait qu’environ la moitié de la dépense réelle, le reste étant agrégé par Google. Une semaine de juin, 5,9 % du budget était parti sur des recherches hors sujet, dont des demandes de réparation de climatisation de voiture passées entre les mailles des exclusions. Le piège inverse existe : une liste d’exclusions posée au niveau du compte peut bloquer vos propres mots clés sans laisser de trace dans les statistiques. Le mot clé apparaît actif et ne diffuse jamais. Je lis donc les exclusions avant de conclure qu’un mot clé n’a pas de volume.',
    },
    // source : C:\projet site\ads-os\clients\msds18\06-reports\2026-07-19-analyse-exports-operateur.md (section 6 : campagne C sur mobile, 96 clics, 26,37 % de CTR, 0 conversion, fenêtre 12-18/07)
    // source : C:\Users\moche\.claude-ads\projects\C--projet-site-ads-os\memory\feedback_croiser-feuille-leads-avant-coupure.md (dimanche : Ads 227 € / 0 conv sur 9 dimanches, feuille : meilleur jour, 8 leads installation dont 4 Google Ads)
    {
      type: 'h2',
      titre: '3. Un appareil ou un créneau dépense sans rien ramener',
      texte:
        'Le rapport par appareil et le rapport par jour et heure montrent où part le budget. Sur une semaine de juillet, la campagne d’installation du chauffagiste a reçu 96 clics sur mobile, avec un taux de clic de 26,37 %, et zéro conversion. C’est la signature d’un chercheur de prix qui clique, lit et repart. Mais avant de couper un appareil ou un créneau, je croise toujours avec la feuille des demandes. Sur ce même compte, Google Ads affichait 227 € dépensés le dimanche sur neuf semaines pour zéro conversion. La feuille montrait l’inverse : le dimanche était le meilleur jour des formulaires, avec 8 demandes d’installation, dont 4 venues de Google Ads. Couper le dimanche sur la seule foi de Google Ads aurait supprimé des clients réels.',
    },
    // source : https://support.google.com/google-ads/answer/6372656?hl=fr (page Calendrier de diffusion : performances par jour et heure, par jour, par heure)
    // source : https://support.google.com/google-ads/answer/2732132?hl=fr (ajustements d’enchères par appareil, de -100 % à +900 %, -100 % désactive la diffusion sur l’appareil)
    // source : https://support.google.com/google-ads/answer/1722043?hl=fr (ciblage géographique : choisir les zones où se trouvent vos clients, signaux sans précision absolue garantie)
    {
      type: 'paragraphe',
      texte:
        'Trois réglages de Google Ads portent ce point de l’audit. Le calendrier de diffusion affiche les résultats par jour et heure, par jour ou par heure. Les ajustements d’enchères par appareil vont de -100 % à +900 %, et -100 % coupe la diffusion sur l’appareil concerné. Le ciblage géographique doit couvrir les zones où se trouvent vos clients : Google précise qu’il repose sur des signaux et ne garantit pas une précision absolue, d’où l’intérêt de relire les résultats par zone.',
    },
    {
      type: 'cta',
      titre: 'Un regard extérieur sur votre compte',
      texte:
        'Si vous voulez savoir laquelle de ces causes pèse chez vous, je regarde votre compte lors d’un audit gratuit de 30 minutes, sans engagement. Vous repartez avec la cause principale et l’ordre des corrections.',
    },
    // source : C:\projet site\ads-os\clients\msds18\06-reports\2026-07-21-rapport-annonces.md (C2 : CTR 23,36 %, conversion 0,37 %, campagne A 5,51 % sur 30 jours ; benchmark installation 3-7 % ; URLs vers /#formulaire)
    {
      type: 'h2',
      titre: '4. L’annonce attire le clic, la page ne fait pas appeler',
      texte:
        'Un taux de clic élevé rassure, et il ne prédit rien. Il dit que l’annonce accroche ; l’intention d’achat se lit ailleurs. Quand les clics arrivent et que les demandes ne suivent pas, je regarde l’écart entre ce que promet l’annonce et ce que montre la page d’arrivée.',
    },
    {
      type: 'resume',
      titre: 'Cas réel, anonymisé',
      items: [
        'Un chauffagiste de la métropole lyonnaise, sur 30 jours arrêtés au 21 juillet 2026.',
        'Son groupe d’annonces « devis et prix » avait le meilleur taux de clic du compte : 23,36 %, plus de trois fois le haut de la fourchette attendue pour une campagne de devis (3 à 7 %).',
        'Il avait aussi le pire résultat : 0,37 % de conversion, contre 5,51 % pour sa campagne de dépannage.',
        'Les titres répondaient à une curiosité (« combien coûte… ») au lieu de parler à quelqu’un qui a un projet.',
        'Trois annonces envoyaient encore vers l’ancienne page unique alors que des pages dédiées existaient.',
      ],
    },
    // source : C:\projet site\ads-os\.claude\skills\landing-page-audit\SKILL.md (message match, tel:, formulaire 3-5 champs, /merci/, seuils LCP 2,5 s / 4 s)
    {
      type: 'liste',
      titre: 'Ce que je vérifie sur la page d’arrivée :',
      items: [
        'Le titre de la page reprend la recherche et la promesse de l’annonce.',
        'Le numéro de téléphone est cliquable sur mobile.',
        'Le formulaire est visible sans défiler sur un téléphone et compte 3 à 5 champs au plus.',
        'Une page de confirmation existe après l’envoi, et elle est suivie comme conversion.',
        'La page s’affiche vite : un affichage principal sous 2,5 secondes est bon, au-delà de 4 secondes il devient critique.',
      ],
    },
    // source : C:\projet site\ads-os\rag\sources\best-practices\EXEMPLE-structure-compte-leadgen-local.md (sous ~30 conv/mois par campagne le smart bidding n'apprend pas ; 1 campagne par ligne de service sous 3 000 €/mois)
    // source : C:\projet site\ads-os\.claude\skills\account-audit\SKILL.md (tCPA ~30 conv/mois)
    // source : C:\projet site\ads-os\clients\msds18\06-reports\2026-07-21-rapport-annonces.md (3 annonces sur 20 = 31 conversions sur 33 ; 43 % de la dépense pour 2 conversions)
    // source : C:\projet site\ads-os\rag\sources\best-practices\methode-lecture-donnees-ads.md (lire en J+1, détail jour par jour : 1,56 % masquait 51,5 %)
    {
      type: 'h2',
      titre: '5. Le budget est dispersé sur trop de campagnes',
      texte:
        'Les enchères automatiques de Google apprennent à partir des conversions. En dessous d’environ 30 conversions par mois et par campagne, elles n’ont pas assez de signal. Découper un petit budget en une campagne par ville ou par prestation divise ce signal d’autant. Pour un budget d’artisan, sous 3 000 € par mois, je construis une campagne par ligne de service, sur une zone unique. Sur le compte du chauffagiste, 3 annonces sur 20 produisaient 31 des 33 conversions du mois, et 43 % de la dépense n’avait ramené que 2 conversions. Le compte tenait sur trois annonces : le reste diluait le budget. Dernier réflexe de lecture : je lis la veille le lendemain, jamais la journée en cours, et je tire le détail jour par jour. Sur ce compte, une perte d’affichage pour budget de 1,56 % en moyenne sur quatre jours cachait 51,5 % sur la seule journée décisive.',
    },
    // source : app/(fr)/audit-gratuit/page.tsx (audit gratuit de 30 minutes, sans engagement, appel vidéo, analyse préalable du site et du secteur, campagnes existantes analysées, trois actions prioritaires, accès aux comptes publicitaires utile mais non obligatoire)
    {
      type: 'h2',
      titre: 'Ce que vous recevez d’un audit Google Ads',
      texte:
        'Mon audit gratuit dure 30 minutes, en appel vidéo, sans engagement. J’analyse votre site, votre secteur et vos campagnes existantes avant l’appel, et vous n’avez rien à préparer : l’accès à vos comptes publicitaires aide sans être obligatoire. Vous repartez avec la cause principale de ce qui ne rapporte pas, l’ordre des corrections, et les trois actions prioritaires à mener. Le livrable tient en un plan court, sans jargon, que vous pouvez appliquer vous-même.',
    },
    // source : app/(fr)/services/publicite-en-ligne/page.tsx (honoraires de gestion à partir de 350 €/mois pour 1 à 2 campagnes Google Ads, budget médias recommandé de 500 à 1 000 €/mois en sus)
    {
      type: 'h2',
      titre: 'Ce qu’on décide après l’audit',
      texte:
        'Trois suites sont possibles. Vous appliquez le plan vous-même, avec les rapports décrits plus haut. Vous me confiez la gestion du compte : mes honoraires démarrent à 350 € par mois pour une à deux campagnes Google Ads, et le budget médias, que vous payez à Google, s’ajoute (je recommande 500 à 1 000 € par mois). Ou vous arrêtez les annonces, si l’audit montre que la publicité payante ne se justifie pas dans votre cas. Dans les trois cas, la décision vous revient, et elle se prend sur des chiffres lus dans votre compte.',
    },
    {
      type: 'h2',
      titre: 'Qui réalise un audit Google Ads',
      texte:
        'Trois profils proposent un audit : une agence, un consultant indépendant, ou vous-même avec les rapports de Google Ads. Chez 123digital, c’est moi, Maurice Timsit, qui lis le compte. Quel que soit le profil, deux questions valent d’être posées avant de signer : l’audit vérifie-t-il d’abord le suivi des conversions, et vous remet-il la liste des corrections, que vous puissiez les appliquer sans lui ?',
    },
    // source : C:\projet site\ads-os\clients\msds18\06-reports\2026-07-21-rapport-annonces.md (C2 meilleur CTR / pire CPA)
    // source : C:\projet site\ads-os\.claude\skills\conversion-diagnostic\SKILL.md (tag tel:, consent mode)
    // source : C:\Users\moche\.claude-ads\projects\C--projet-site-ads-os\memory\feedback_croiser-feuille-leads-avant-coupure.md
    // source : C:\projet site\ads-os\rag\sources\best-practices\benchmarks-sea-france.md (seuils budget gaspillé)
    {
      type: 'faq',
      faqs: [
        {
          question: 'Qu’est-ce qu’un audit Google Ads et que vérifie-t-il ?',
          reponse:
            'Un audit Google Ads est la lecture complète d’un compte publicitaire. Il contrôle sept points : le suivi des conversions, les termes de recherche, la structure des campagnes, les enchères, les zones et horaires de diffusion, les annonces et la page d’arrivée. Il se conclut par la cause principale du gaspillage et l’ordre des corrections.',
        },
        {
          question: 'Combien coûte un audit Google Ads, et combien de temps dure-t-il ?',
          reponse:
            'Mon audit est gratuit, sans engagement, et tient en un appel vidéo de 30 minutes, après une analyse préalable de votre site, de votre secteur et de vos campagnes. La gestion du compte, si vous me la confiez ensuite, démarre à 350 € par mois d’honoraires pour une à deux campagnes, hors budget médias.',
        },
        {
          question: 'Pourquoi Google Ads affiche 0 conversion alors que j’ai reçu des appels ?',
          reponse:
            'Parce que la mesure ne voit pas tout. Une balise sur le numéro compte les clics sur le lien et ignore les appels passés en recopiant le numéro, et un visiteur qui refuse les cookies peut envoyer un formulaire sans que Google Ads le sache. Notez chaque demande reçue dans une feuille, avec sa provenance : c’est elle qui fait foi.',
        },
        {
          question: 'Un bon taux de clic veut-il dire que mes annonces marchent ?',
          reponse:
            'Non. J’ai vu un groupe d’annonces à 23,36 % de taux de clic convertir à 0,37 %, quinze fois moins bien que la campagne voisine. Le taux de clic mesure l’accroche ; le coût par demande mesure ce qui compte.',
        },
        {
          question: 'Faut-il couper les annonces sur mobile ou le week-end ?',
          reponse:
            'Pas sur la seule donnée de Google Ads. Croisez d’abord avec les demandes réellement reçues ce jour-là ou sur cet appareil. Sur un compte, le dimanche paraissait mort dans Google Ads alors qu’il était le meilleur jour des formulaires.',
        },
        {
          question: 'Quelle part de budget perdue est normale sur Google Ads ?',
          reponse:
            'Sous 5 % de la dépense sur des recherches hors sujet, le compte est sain. Entre 5 et 15 %, c’est acceptable avec une revue régulière des termes de recherche. Au-delà de 15 %, les exclusions sont à reprendre.',
        },
      ],
    },
    {
      type: 'resume',
      titre: 'À retenir',
      items: [
        'Un audit Google Ads contrôle sept points : conversions, termes de recherche, structure, enchères, zones et horaires, annonces, page d’arrivée.',
        'Vérifier la mesure des conversions avant tout le reste, et tenir une trace des demandes hors de Google.',
        'Lire le rapport des termes de recherche, en sachant qu’une partie des requêtes n’y figure pas.',
        'Ne jamais couper un appareil ou un créneau sans croiser avec les demandes réellement reçues.',
        'Juger une annonce sur son coût par demande. Le taux de clic mesure seulement l’accroche.',
        'Sous 3 000 € par mois, une campagne par ligne de service, sur une zone unique.',
      ],
    },
  ],
  liens: [
    { label: 'Publicité en ligne : comment je gère un compte', href: '/services/publicite-en-ligne' },
    { label: 'Je paie une agence sans résultat : vérifier soi-même', href: '/problemes/je-paie-une-agence-sans-resultat' },
    { label: 'Je ne reçois plus les demandes de mon site', href: '/problemes/je-ne-recois-plus-les-demandes-de-mon-site' },
    { label: 'Débuter Google Ads quand on est une PME', href: '/blog/google-ads-pme-debuter' },
    { label: 'Demander un audit gratuit de 30 minutes', href: '/audit-gratuit' },
  ],
}
