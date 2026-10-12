import type { PageProbleme } from '../problemes'

export const page: PageProbleme = {
  slug: 'je-paie-une-agence-sans-resultat',
  famille: 'argent',
  requete: 'je paie une agence et je n’ai aucun client',
  title: 'Je paie une agence sans résultat : vérifier en 20 minutes',
  description:
    'Vous payez une agence et aucun client n’arrive ? Les comptes à vérifier vous-même, l’historique Google Ads, dix questions à poser et comment partir proprement.',
  titre: 'Je paie une agence et je n’ai aucun client : ce que vous pouvez vérifier vous-même',
  // source : https://support.google.com/google-ads/answer/9978556?hl=fr (niveaux d'accès Google Ads)
  // source : https://support.google.com/google-ads/answer/19888?hl=fr (historique des modifications)
  reponse:
    'Vérifiez d’abord que vous êtes propriétaire de vos comptes : administrateur de Google Ads, propriétaire de votre fiche Google et de votre Search Console, titulaire de votre nom de domaine. Ouvrez ensuite l’historique des modifications de Google Ads, qui montre qui a modifié quoi, et quand, sur les deux dernières années. Si les rapports que vous recevez parlent d’impressions et jamais de demandes reçues, vous tenez la première question à poser à l’agence.',
  datePublication: '2026-10-07',
  tempsLecture: 8,
  contenu: [
    {
      type: 'intro',
      texte:
        'Cette page ne juge pas les agences. Elle donne à un chef d’entreprise les moyens de lire lui-même ce qui se passe dans ses comptes, sans compétence technique, avec ses seuls identifiants. Une bonne agence n’a rien à craindre de ces vérifications. Une agence qui travaille mal sera mise en face de faits, ce qui vaut mieux qu’une impression. Pour lire les performances d’une campagne en détail, une autre page de ce site y est consacrée ; ici, il s’agit de propriété, de traces et de rapports.',
    },
    // source : C:\projet site\ads-os\clients\123digital\06-reports\2026-08-28-bilan-situation.md (section 5 : GA4 et Clarity illisibles sans accès ; ajout lecteur = 2 minutes ; quatre semaines de sessions)
    {
      type: 'h2',
      titre: 'Pourquoi la propriété des comptes passe en premier',
      texte:
        'Sans accès, on ne lit rien. Je l’ai vécu sur mon propre site, en août 2026 : les statistiques GA4 et les enregistrements de visites Clarity existaient, quatre semaines de sessions étaient enregistrées, et je ne pouvais rien en lire, parce que le compte qui fait mes relevés n’avait pas été ajouté à ces outils. Il manquait un accès qui se donne en deux minutes. Si c’est vrai pour un professionnel sur son propre site, c’est vrai pour un artisan dont tous les comptes ont été ouverts par un prestataire.',
    },
    // source : https://support.google.com/google-ads/answer/9978556?hl=fr (5 niveaux ; seul l'administrateur accorde des droits ; un seul administrateur = risque de perdre l'accès aux balises)
    // source : https://support.google.com/business/answer/3403100?hl=fr (Propriétaire principal unique ; Propriétaire ; Administrateur ne peut ni ajouter ni supprimer d'utilisateurs ni supprimer la fiche ; menu Utilisateurs et accès)
    // source : https://support.google.com/webmasters/answer/7687615?hl=fr (propriétaire validé / délégué ; seuls les propriétaires accordent des autorisations ; page Utilisateurs et autorisations visible des seuls propriétaires)
    // source : https://www.afnic.fr/wp-media/uploads/2026/07/afnic-charte-de-nommage-06-07-2026.pdf (articles 6.4 et 6.6 : titulaire, bureau d'enregistrement, transmission avec accord des deux parties)
    {
      type: 'h2',
      titre: 'Les quatre comptes dont vous devez être propriétaire',
      texte:
        'Chacun de ces outils distingue un propriétaire, qui décide qui entre, et des utilisateurs, qui travaillent dedans. Votre agence peut être utilisatrice. Vous devez être propriétaire.',
    },
    {
      type: 'liste',
      titre: 'Ce qu’il faut vérifier, compte par compte :',
      items: [
        'Google Ads : il existe cinq niveaux d’accès (e-mails uniquement, facturation, lecture seule, standard, administrateur). Seul un administrateur peut accorder des droits d’accès ou modifier ceux des autres. Votre adresse doit y figurer en administrateur. Google signale aussi qu’avec un seul administrateur, le compte risque de perdre l’accès à ses balises si cette personne devient indisponible.',
        'Fiche Google (Google Business Profile) : dans les paramètres de la fiche, rubrique « Utilisateurs et accès ». Il n’y a qu’un propriétaire principal par fiche. Un administrateur ne peut ni ajouter ni supprimer d’utilisateurs, ni supprimer la fiche : si vous n’êtes qu’administrateur, la fiche ne vous appartient pas en pratique.',
        'Search Console : la page « Utilisateurs et autorisations » ne s’affiche qu’aux propriétaires, et seuls les propriétaires peuvent accorder des autorisations. Si vous ne voyez pas cette page, vous n’êtes pas propriétaire.',
        'Nom de domaine : il est enregistré au nom d’un titulaire, par l’intermédiaire d’un bureau d’enregistrement. Pour un nom en .fr, le titulaire peut changer de bureau d’enregistrement, et si le titulaire est l’agence, transmettre le nom demande l’accord des deux parties.',
      ],
    },
    // source : https://support.google.com/google-ads/answer/19888?hl=fr (menu Campagnes > Historique des modifications ; deux dernières années ; colonne Utilisateur = e-mail ; « Système Google Ads », « API Google Ads » ; filtres par type et période)
    {
      type: 'h2',
      titre: 'L’historique des modifications : qui a touché quoi, et quand',
      texte:
        'Google Ads garde la liste des modifications apportées au compte, aux campagnes et aux groupes d’annonces sur les deux dernières années. On l’ouvre par le menu Campagnes, puis « Historique des modifications ». La colonne « Utilisateur » affiche l’adresse e-mail de la personne qui a fait la modification dans l’interface. Les changements faits par des automatismes apparaissent sous des noms comme « Système Google Ads », et ceux faits par un outil externe sous « API Google Ads ». On peut filtrer par période et par type de modification, budgets ou mots clés par exemple.',
    },
    {
      type: 'liste',
      titre: 'Ce que je regarde dans cet historique :',
      items: [
        'La date de la dernière modification faite par une personne de l’agence, et leur fréquence sur les trois derniers mois.',
        'La part des modifications signées par un système automatique plutôt que par un humain.',
        'Les hausses de budget : à quelle date, par qui, et ce qui a suivi en demandes reçues.',
        'Les ajouts de mots clés, et l’existence ou non d’ajouts d’exclusions dans la même période.',
      ],
    },
    // source : https://support.google.com/google-ads/answer/10279006?hl=fr (application automatique depuis la section Recommandations ; 4 catégories : annonces, enchères, mots clés et ciblage, mesure ; activable/désactivable)
    // source : C:\projet site\ads-os\.claude\skills\recommendations-review\SKILL.md (pièges : broad, enchères auto avant 15-30 conv, hausse de budget si non rentable)
    // source : C:\projet site\ads-os\rag\sources\best-practices\methode-lecture-donnees-ads.md (score d'optimisation = obéissance aux recommandations ; panneau tronqué, exiger l'export)
    {
      type: 'h2',
      titre: 'Les recommandations que Google applique tout seul',
      texte:
        'Google Ads propose des recommandations, et il peut les appliquer automatiquement si l’option est activée. Le réglage se trouve dans la section « Recommandations » du compte, et il couvre quatre familles : annonces, enchères, mots clés et ciblage, mesure. Certaines sont utiles. D’autres coûtent cher à un petit compte : des mots clés en requête large, rarement pertinents pour un artisan local à petit budget ; un passage aux enchères automatiques avant d’avoir 15 à 30 conversions fiables par mois ; une hausse de budget sur des campagnes qui ne sont pas rentables. Demandez si l’application automatique est activée, et sur quelles familles. Méfiez-vous aussi du « score d’optimisation » mis en avant dans certains rapports : il mesure à quel point le compte suit les recommandations de Google, et ne dit rien de sa rentabilité.',
    },
    // source : C:\projet site\ads-os\clients\msds18\06-reports\2026-07-21-rapport-annonces.md (force d'annonce EXCELLENT sur annonces à 0 conversion, même note que l'annonce à 19 conversions)
    // source : C:\projet site\ads-os\CLAUDE.md (priorité KPI lead gen : CPA, taux de conversion, CTR, CPC ; jamais le CTR au détriment du CPA)
    // source : C:\projet site\ads-os\.claude\skills\account-audit\SKILL.md (dépense gaspillée en euros par mois)
    {
      type: 'h2',
      titre: 'Un rapport qui parle d’impressions et jamais de demandes',
      texte:
        'Un rapport mensuel peut être long, coloré, plein de chiffres en hausse, et ne jamais dire combien de demandes la dépense a produites. Les impressions, le taux de clic et la « force d’annonce » sont des indicateurs de moyens. Chez un chauffagiste de la métropole lyonnaise, quatre annonces notées « Excellent » par Google n’avaient produit aucune conversion, et portaient la même note qu’une annonce qui en avait produit 19. Pour une entreprise qui cherche des demandes, l’ordre de lecture est le suivant : coût par demande, puis taux de conversion, puis taux de clic, puis coût par clic. Un bon rapport donne aussi la dépense partie sur des recherches hors sujet, en euros.',
    },
    {
      type: 'cta',
      titre: 'Faire lire vos comptes par quelqu’un qui n’a rien à vous vendre dessus',
      texte:
        'Lors d’un audit gratuit de 30 minutes, je regarde avec vous les accès, l’historique et le dernier rapport reçu. Vous repartez avec ce qui est fait, ce qui ne l’est pas, et les questions à poser.',
    },
    // source : questions construites à partir des vérifications sourcées plus haut (niveaux d'accès Google Ads, rôles Business Profile, propriétaires Search Console, titulaire Afnic, historique des modifications, application automatique, ordre CPA > conv > CTR > CPC)
    {
      type: 'h2',
      titre: 'Dix questions à poser à votre agence',
      texte:
        'Chaque question renvoie à une vérification décrite plus haut. Une réponse vague sur l’une d’elles vous dit déjà quelque chose.',
    },
    {
      type: 'liste',
      titre: 'Les questions :',
      items: [
        'Quel est mon niveau d’accès au compte Google Ads, et pouvez-vous me passer administrateur ?',
        'Qui est propriétaire principal de ma fiche Google ?',
        'Suis-je propriétaire de ma propriété Search Console ?',
        'Au nom de quel titulaire mon nom de domaine est-il enregistré, et chez quel bureau d’enregistrement ?',
        'Combien de demandes la campagne a-t-elle produites le mois dernier, et comment les comptez-vous ?',
        'Quel est mon coût par demande, et comment a-t-il évolué ?',
        'L’application automatique des recommandations est-elle activée ? Sur quelles familles ?',
        'Quelles modifications avez-vous faites ce mois-ci ? Je les retrouverai dans l’historique.',
        'Combien ai-je dépensé sur des recherches hors sujet, et quelles exclusions avez-vous ajoutées ?',
        'Si nous arrêtons, que se passe-t-il pour mes comptes, mes données et mon domaine ?',
      ],
    },
    {
      type: 'liste',
      titre: 'Les signaux d’alarme :',
      items: [
        'Vous n’avez aucun accès administrateur, ou l’agence refuse de vous le donner.',
        'Le nom de domaine ou la fiche Google est au nom de l’agence.',
        'Aucune modification humaine dans l’historique depuis des semaines.',
        'Les rapports ne donnent jamais un nombre de demandes ni un coût par demande.',
        'Le score d’optimisation ou la force d’annonce est présenté comme un résultat.',
      ],
    },
    // source : https://support.google.com/business/answer/3403100?hl=fr (délai de sept jours avant de pouvoir transférer la propriété principale ou supprimer d'autres propriétaires)
    // source : https://www.afnic.fr/wp-media/uploads/2026/07/afnic-charte-de-nommage-06-07-2026.pdf (art. 6.4 : accord des deux parties ; art. 6.6 : le titulaire choisit le nouveau bureau, qui fait procéder au changement)
    // source : https://support.google.com/webmasters/answer/7687615?hl=fr (propriétaire validé par jeton, propriétaire délégué ajouté par un propriétaire validé)
    {
      type: 'h2',
      titre: 'Partir proprement, dans le bon ordre',
      texte:
        'Récupérez les accès avant d’annoncer votre départ. Sur Google Ads, faites-vous passer administrateur. Sur la fiche Google, demandez le rôle de propriétaire, puis le transfert de la propriété principale. Une fois propriétaire, vous attendez sept jours avant de pouvoir retirer les accès d’autres propriétaires ou administrateurs, dont ceux de l’agence : prévoyez ce délai. Sur Search Console, validez vous-même votre propriété, par fichier ou par enregistrement DNS : vous devenez propriétaire validé, et vous ne dépendez plus d’un propriétaire délégué par l’agence. Pour un nom de domaine en .fr, si le titulaire est l’agence, la transmission demande son accord ; si c’est vous, vous choisissez le nouveau bureau d’enregistrement et c’est lui qui fait procéder au changement. Une fois ces accès en main, l’historique de deux ans reste dans votre compte Google Ads, et le nouveau prestataire peut tout relire.',
    },
    {
      type: 'faq',
      faqs: [
        {
          question: 'Mon compte Google Ads appartient-il à mon agence ?',
          reponse:
            'Regardez votre niveau d’accès. Seul un administrateur peut accorder ou retirer des droits sur le compte. Si votre adresse n’y figure pas en administrateur, demandez-le : sans ce niveau, vous ne décidez pas qui travaille dans votre compte.',
        },
        {
          question: 'Comment savoir si mon agence travaille vraiment sur mon compte ?',
          reponse:
            'Ouvrez l’historique des modifications dans le menu Campagnes. Il liste les changements des deux dernières années, avec l’adresse e-mail de la personne qui les a faits ou la mention d’un système automatique.',
        },
        {
          question: 'Mon nom de domaine est au nom de mon agence, que faire ?',
          reponse:
            'Pour un nom en .fr, la transmission demande l’accord des deux parties. Demandez-la par écrit, avant toute rupture, et précisez chez quel bureau d’enregistrement il doit arriver.',
        },
        {
          question: 'Puis-je récupérer ma fiche Google si l’agence l’a créée ?',
          reponse:
            'Oui, si l’agence vous donne le rôle de propriétaire puis vous transfère la propriété principale. Une fois propriétaire, vous attendez sept jours avant de pouvoir retirer les accès de l’agence.',
        },
        {
          question: 'Le score d’optimisation Google Ads mesure-t-il la qualité du travail ?',
          reponse:
            'Non. Il mesure à quel point le compte suit les recommandations de Google. Un compte peut avoir un score élevé et ne produire aucune demande.',
        },
      ],
    },
    {
      type: 'resume',
      titre: 'À retenir',
      items: [
        'Être administrateur de Google Ads, propriétaire de la fiche Google et de Search Console, titulaire du domaine.',
        'Lire l’historique des modifications : il dit qui a touché le compte, et quand.',
        'Savoir si les recommandations de Google s’appliquent toutes seules.',
        'Exiger dans chaque rapport le nombre de demandes et le coût par demande.',
        'Récupérer les accès avant d’annoncer un départ.',
      ],
    },
  ],
  sources: [
    { label: 'Aide Google Ads : niveaux d’accès au compte', url: 'https://support.google.com/google-ads/answer/9978556?hl=fr' },
    { label: 'Aide Google Ads : historique des modifications', url: 'https://support.google.com/google-ads/answer/19888?hl=fr' },
    { label: 'Aide Google Business Profile : propriétaires et administrateurs de la fiche', url: 'https://support.google.com/business/answer/3403100?hl=fr' },
    { label: 'Aide Search Console : propriétaires, utilisateurs et autorisations', url: 'https://support.google.com/webmasters/answer/7687615?hl=fr' },
    { label: 'AFNIC : charte de nommage (juillet 2026)', url: 'https://www.afnic.fr/wp-media/uploads/2026/07/afnic-charte-de-nommage-06-07-2026.pdf' },
    { label: 'Aide Google Ads : application automatique des recommandations', url: 'https://support.google.com/google-ads/answer/10279006?hl=fr' },
  ],
  liens: [
    { label: 'Mes Google Ads ne rapportent rien : les cinq causes', href: '/problemes/mes-google-ads-ne-rapportent-rien' },
    { label: 'Consultant ou agence : comment choisir', href: '/blog/consultant-digital-ou-agence-lyon' },
    { label: 'Le guide de la fiche Google pour une PME', href: '/blog/google-business-profile-guide-pme' },
    { label: 'Publicité en ligne : comment je gère un compte', href: '/services/publicite-en-ligne' },
    { label: 'Demander un audit gratuit de 30 minutes', href: '/audit-gratuit' },
  ],
}
