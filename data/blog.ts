export interface BlogArticle {
  slug: string
  titre: string
  description: string
  datePublication: string
  dateModification?: string
  categorie: string
  tags: string[]
  image: string
  tempsLecture: number
  contenu: BlogSection[]
}

export interface BlogSection {
  type: 'intro' | 'h2' | 'h3' | 'paragraphe' | 'liste' | 'faq' | 'cta' | 'resume'
  titre?: string
  texte?: string
  items?: string[]
  faqs?: Array<{ question: string; reponse: string }>
}

export const articles: BlogArticle[] = [
  {
    slug: 'seo-local-pme-guide-complet',
    titre: 'SEO local pour PME : le guide complet pour apparaître en tête sur Google en 2026',
    description: 'Tout ce qu\'un patron de PME doit savoir pour être trouvé sur Google par ses clients locaux. De Google Business Profile aux mots-clés locaux, guide pratique étape par étape.',
    datePublication: '2026-03-15',
    dateModification: '2026-04-01',
    categorie: 'SEO',
    tags: ['SEO local', 'Google Business Profile', 'PME', 'référencement local', 'Google Maps'],
    image: '/images/blog/seo-local-pme.svg',
    tempsLecture: 12,
    contenu: [
      {
        type: 'intro',
        texte: 'Quand un client cherche "plombier Lyon" ou "restaurant Annecy" sur Google, il choisit l\'un des 3 premiers résultats dans 75% des cas. Si votre entreprise n\'apparaît pas là, vous perdez des clients chaque jour sans le savoir. Ce guide vous explique comment changer ça, étape par étape, sans jargon technique.',
      },
      {
        type: 'h2',
        titre: 'Qu\'est-ce que le SEO local et pourquoi est-ce crucial pour une PME ?',
        texte: 'Le SEO local (référencement local) est l\'ensemble des techniques qui permettent à votre entreprise d\'apparaître en tête sur Google quand quelqu\'un dans votre zone géographique cherche vos services. Contrairement au SEO national, il ne s\'agit pas de rivaliser avec les grandes marques, mais d\'être visible auprès de votre bassin de clientèle naturel.',
      },
      {
        type: 'liste',
        titre: 'Les 3 endroits où apparaître sur Google en local :',
        items: [
          'Le Pack Local (Google Maps) — les 3 fiches d\'entreprises qui apparaissent avec une carte',
          'Les résultats organiques — les liens normaux sous le Pack Local',
          'Google Ads local — les publicités payantes avec mention "Annonce"',
        ],
      },
      {
        type: 'h2',
        titre: 'Étape 1 : Optimiser votre Google Business Profile (anciennement Google My Business)',
        texte: 'Google Business Profile est gratuit et c\'est la base absolue du SEO local. Si vous ne l\'avez pas encore réclamé, faites-le aujourd\'hui — c\'est la chose la plus impactante que vous puissiez faire en 30 minutes.',
      },
      {
        type: 'liste',
        titre: 'Les éléments indispensables de votre fiche Google Business :',
        items: [
          'Nom exact de l\'entreprise (sans mots-clés artificiels — c\'est contre les règles Google)',
          'Catégorie principale précise (ex : "Plombier", pas "Services à domicile")',
          'Adresse complète et numéro de téléphone local',
          'Horaires d\'ouverture à jour (y compris jours fériés)',
          'Site web lié',
          'Minimum 10 photos de qualité (extérieur, intérieur, équipe, réalisations)',
          'Description de 750 caractères avec vos mots-clés naturellement intégrés',
        ],
      },
      {
        type: 'h3',
        titre: 'Les avis Google : votre actif SEO local le plus précieux',
        texte: 'Les avis clients influencent à la fois votre classement dans le Pack Local et la décision de vos prospects. Un profil avec 50 avis à 4,7 étoiles surclasse systématiquement un concurrent avec 10 avis à 5 étoiles. Encouragez activement vos clients satisfaits à laisser un avis — envoyez-leur le lien direct vers votre fiche.',
      },
      {
        type: 'h2',
        titre: 'Étape 2 : Créer un site web optimisé pour le SEO local',
        texte: 'Votre site web doit signaler clairement à Google votre localisation et vos services. Ce n\'est pas sorcier, mais ça demande de la rigueur.',
      },
      {
        type: 'liste',
        titre: 'Les éléments SEO locaux indispensables sur votre site :',
        items: [
          'Titre de page (H1) contenant le service + la ville : "Plombier à Lyon — Intervention rapide 7j/7"',
          'Adresse complète dans le footer sur toutes les pages',
          'Page "Zones d\'intervention" listant les villes et quartiers',
          'Contenu mentionnant naturellement votre ville et votre région',
          'Schéma JSON-LD LocalBusiness avec NAP (Nom, Adresse, Téléphone)',
          'Vitesse de chargement optimale (score Google PageSpeed 80+)',
        ],
      },
      {
        type: 'h2',
        titre: 'Étape 3 : Construire votre autorité locale avec les citations',
        texte: 'Une "citation" en SEO local, c\'est chaque endroit sur internet où figure le nom, l\'adresse et le téléphone de votre entreprise (les fameuses NAP). La cohérence de ces informations partout renforce votre positionnement local.',
      },
      {
        type: 'liste',
        titre: 'Les annuaires locaux essentiels où être présent :',
        items: [
          'Google Business Profile (priorité absolue)',
          'Pages Jaunes (pagesjaunes.fr)',
          'Yelp France',
          'TripAdvisor (pour les restaurants, hôtels, loisirs)',
          'Doctolib (pour les professions de santé)',
          'Houzz / Bark (pour les artisans)',
          'Kompass, Société.com (pour le B2B)',
        ],
      },
      {
        type: 'h2',
        titre: 'Étape 4 : Créer du contenu local régulier',
        texte: 'Google favorise les sites qui publient régulièrement du contenu pertinent. Pour une PME locale, ça peut être aussi simple qu\'un article mensuel sur un sujet que vos clients se posent. Pas besoin d\'écrire un roman — un article de 600 mots bien ciblé suffit.',
      },
      {
        type: 'h2',
        titre: 'Combien de temps pour voir les résultats du SEO local ?',
        texte: 'C\'est la question que tout le monde pose. La réalité : comptez 3 à 6 mois pour des résultats significatifs, mais certaines actions (Google Business Profile, avis) peuvent avoir un impact en quelques semaines. Le SEO local est un investissement, pas une dépense — une fois en place, il travaille pour vous 24h/24 sans coût supplémentaire.',
      },
      {
        type: 'faq',
        faqs: [
          {
            question: 'Est-ce que le SEO local est gratuit ?',
            reponse: 'Google Business Profile et les annuaires de base sont gratuits. En revanche, optimiser votre site, créer du contenu et construire votre autorité demande soit du temps (si vous le faites vous-même), soit de l\'argent (si vous déléguez à un professionnel). Un accompagnement SEO local complet coûte généralement entre 300 et 800 €/mois selon la concurrence dans votre secteur.',
          },
          {
            question: 'Puis-je faire le SEO local moi-même ?',
            reponse: 'Pour les bases (Google Business Profile, annuaires), oui. Pour aller plus loin (optimisation technique du site, contenu SEO, netlinking local), faire appel à un expert est souvent plus rentable — le temps que vous passeriez à apprendre et appliquer vaut souvent plus que le coût d\'un professionnel.',
          },
          {
            question: 'Mon concurrent est déjà en première position, puis-je le dépasser ?',
            reponse: 'Presque toujours, oui. La plupart des premières positions locales ne sont pas "invincibles". Avec une stratégie cohérente sur 6 à 12 mois, il est très fréquent de dépasser des concurrents qui n\'ont pas travaillé activement leur SEO. L\'analyse de vos concurrents est la première étape.',
          },
          {
            question: 'Le SEO local fonctionne-t-il sur mobile ?',
            reponse: 'Oui, et c\'est même là où il est le plus important. 70% des recherches locales se font sur mobile, et les "recherches de proximité" (avec les mots "près de moi" ou basées sur la géolocalisation) explosent chaque année. Votre site doit être parfaitement mobile-first.',
          },
          {
            question: 'Ai-je besoin d\'un site web pour le SEO local ?',
            reponse: 'Techniquement, vous pouvez apparaître dans le Pack Local avec seulement Google Business Profile, sans site web. Mais un site web améliore significativement vos chances de positionnement, et permet de convertir les visiteurs en clients. C\'est un investissement indispensable à terme.',
          },
        ],
      },
      {
        type: 'resume',
        titre: 'En résumé — Les 4 étapes du SEO local pour une PME',
        items: [
          '1. Créez et optimisez votre Google Business Profile (nom, catégorie, photos, avis)',
          '2. Construisez un site web avec vos mots-clés locaux, votre adresse et le schema JSON-LD',
          '3. Inscrivez-vous dans les annuaires locaux avec les mêmes informations partout',
          '4. Publiez régulièrement du contenu local utile pour vos clients cibles',
        ],
      },
    ],
  },
  {
    slug: 'site-web-pme-prix-guide',
    titre: 'Combien coûte un site web pour une PME en 2026 ? Le guide transparent',
    description: 'Tarifs réels, ce qui justifie les différences de prix, les pièges à éviter et comment choisir la bonne formule pour votre budget. Guide honnête sans langue de bois.',
    datePublication: '2026-02-20',
    categorie: 'Création de site web',
    tags: ['prix site web', 'budget site web', 'création site web PME', 'coût site internet'],
    image: '/images/blog/prix-site-web-pme.svg',
    tempsLecture: 10,
    contenu: [
      {
        type: 'intro',
        texte: 'Vous avez demandé 3 devis pour votre site web et vous avez reçu des tarifs allant de 500 € à 15 000 €. Normal d\'être perdu. Ce guide vous explique ce qui justifie ces écarts, ce que vous obtenez à chaque niveau de prix, et comment ne pas payer trop cher (ou trop peu).',
      },
      {
        type: 'h2',
        titre: 'Les 4 niveaux de prix pour un site web PME',
        texte: 'Avant tout, comprenez qu\'un "site web" recouvre des réalités très différentes selon qui vous demandez et ce qu\'ils vous livrent.',
      },
      {
        type: 'liste',
        titre: 'Niveau 1 — 0 à 500 € : les solutions DIY (faites vous-même)',
        items: [
          'Wix, Squarespace, Webador : templates clé en main, simple à utiliser',
          'Ce que vous obtenez : un site basique, présentable, fonctionnel',
          'Ce qui manque : SEO avancé, personnalisation, performances, votre temps',
          'Pour qui : auto-entrepreneur qui démarre, besoin très basique',
        ],
      },
      {
        type: 'liste',
        titre: 'Niveau 2 — 500 à 2 000 € : le prestataire low-cost',
        items: [
          'Freelance débutant, offre packagée sur Malt ou 5euros.com',
          'Ce que vous obtenez : un site WordPress avec un thème, livré vite',
          'Ce qui manque souvent : SEO, performance, accompagnement, qualité',
          'Risque : vous recevrez un site générique avec peu de valeur SEO',
        ],
      },
      {
        type: 'liste',
        titre: 'Niveau 3 — 2 000 à 6 000 € : le bon rapport qualité/prix',
        items: [
          'Freelance expérimenté ou petite agence spécialisée PME',
          'Ce que vous obtenez : site sur mesure, SEO intégré, mobile-first, rapide',
          'Inclus généralement : rédaction des textes, formation, 1 an de support',
          'Pour qui : PME sérieuse qui veut un outil commercial efficace',
        ],
      },
      {
        type: 'liste',
        titre: 'Niveau 4 — 6 000 à 20 000 € : la grande agence',
        items: [
          'Agence digitale avec account manager, équipe dédiée',
          'Ce que vous obtenez : processus, structure, garanties contractuelles',
          'Ce qui gonfle le prix : frais de structure, marges, réunions',
          'Pour qui : grands comptes, e-commerce complexe, besoin d\'équipe projet',
        ],
      },
      {
        type: 'h2',
        titre: 'Que doit inclure un bon site web PME entre 2 000 et 5 000 € ?',
        texte: 'À ce niveau de prix, vous êtes en droit d\'exiger un certain nombre d\'éléments. Voici ce qui devrait être inclus sans supplément.',
      },
      {
        type: 'liste',
        titre: 'Ce qui devrait être inclus :',
        items: [
          'Design sur mesure (pas un template de base modifié)',
          'Mobile-first responsive (parfait sur smartphone et tablette)',
          'Optimisation SEO de base (balises, vitesse, structure)',
          'Formulaire de contact fonctionnel',
          'Intégration Google Analytics 4',
          'Mentions légales et politique de confidentialité conformes RGPD',
          'Formation à la mise à jour du contenu',
          'Hébergement et nom de domaine pour 1 an (optionnel selon les prestataires)',
        ],
      },
      {
        type: 'h2',
        titre: 'Les 5 pièges à éviter quand vous achetez un site web',
        texte: 'L\'industrie du web est pleine d\'arnaques soft — pas illégales, mais franchement décevantes. Voici celles que je vois le plus souvent.',
      },
      {
        type: 'liste',
        titre: 'Pièges classiques :',
        items: [
          'Le "site livré en 48h" — impossible de faire du bon travail si vite, il s\'agit d\'un template',
          'L\'abonnement mensuel sans fin — certains vous font payer 50 €/mois à vie pour quelque chose que vous devriez posséder',
          'Le site sur CMS propriétaire — vous serez otage du prestataire si vous voulez changer',
          'Les promesses SEO immédiates — le SEO prend du temps, méfiez-vous de ceux qui promettent la 1ère page en 1 mois',
          'L\'absence de formation — si vous ne savez pas mettre à jour votre site vous-même, vous dépendrez toujours du prestataire',
        ],
      },
      {
        type: 'h2',
        titre: 'Comment calculer le ROI d\'un site web PME ?',
        texte: 'Un site web à 3 000 € semble cher ? Voyons ça autrement. Si ce site vous apporte 2 nouveaux clients par mois, et que votre client moyen vaut 500 € (panier ou contrat), c\'est 1 000 €/mois de chiffre d\'affaires supplémentaire. Le site est rentabilisé en 3 mois. Et il continue de travailler pour vous pendant 3 à 5 ans.',
      },
      {
        type: 'faq',
        faqs: [
          {
            question: 'Est-ce que WordPress est toujours le meilleur choix ?',
            reponse: 'WordPress représente 43% des sites web dans le monde, mais ce n\'est pas toujours le meilleur choix. Pour un site vitrine simple, des alternatives comme Webflow ou un site React/Next.js peuvent offrir de meilleures performances et sécurité. Pour un site e-commerce, Shopify ou PrestaShop sont souvent plus adaptés.',
          },
          {
            question: 'Ai-je besoin d\'un site e-commerce ou d\'un site vitrine ?',
            reponse: 'Site vitrine si vous vendez en physique et voulez être trouvé en ligne. Site e-commerce si vous voulez vendre directement depuis votre site (produits ou services). Les e-commerces sont plus complexes et coûtent 1,5 à 2 fois plus cher qu\'un site vitrine équivalent.',
          },
          {
            question: 'Puis-je créer mon site moi-même avec Wix ou Squarespace ?',
            reponse: 'Oui, et c\'est une bonne option si votre budget est très limité au démarrage. Mais sachez que les sites DIY ont des limites en SEO, en performances et en personnalisation. Ils sont bons pour tester rapidement, moins pour construire une présence digitale sérieuse sur le long terme.',
          },
          {
            question: 'Combien coûte la maintenance d\'un site web ?',
            reponse: 'Comptez 50 à 200 €/mois pour la maintenance (mises à jour de sécurité, hébergement, support). Certains prestataires incluent une version allégée dans leur prix initial. Je propose des contrats de maintenance clairs avec un périmètre défini — pas de mauvaises surprises.',
          },
          {
            question: 'Combien de temps faut-il pour créer un site web PME ?',
            reponse: 'Pour un site vitrine bien fait : 3 à 6 semaines (collecte des informations, design, développement, tests, mise en ligne). Pour un e-commerce : 6 à 12 semaines. Méfiez-vous des délais plus courts — soit le travail est bâclé, soit c\'est un template avec peu de personnalisation.',
          },
        ],
      },
      {
        type: 'resume',
        titre: 'En résumé — Ce qu\'il faut retenir sur les prix des sites web PME',
        items: [
          'Un site web PME sérieux coûte entre 2 000 et 6 000 € — c\'est la fourchette du bon rapport qualité/prix',
          'En dessous de 1 500 €, vous aurez un template, pas un outil commercial',
          'Au-dessus de 8 000 €, vous payez souvent des frais de structure d\'une grande agence',
          'Le ROI d\'un bon site web se calcule sur 3 à 5 ans — c\'est un investissement, pas une dépense',
          'Exigez toujours : propriété du domaine, formation incluse, CMS standard (pas propriétaire)',
        ],
      },
    ],
  },
  {
    slug: 'google-ads-pme-debuter',
    titre: 'Google Ads pour PME : comment démarrer sans se ruiner ni perdre de temps',
    description: 'Guide pratique pour lancer vos premières campagnes Google Ads avec un budget maîtrisé. Les erreurs à éviter, les bonnes pratiques et les résultats réalistes.',
    datePublication: '2026-01-10',
    categorie: 'Publicité en ligne',
    tags: ['Google Ads', 'publicité en ligne PME', 'Google Ads débutant', 'budget Google Ads'],
    image: '/images/blog/google-ads-pme.svg',
    tempsLecture: 11,
    contenu: [
      {
        type: 'intro',
        texte: 'Google Ads peut être le levier le plus rentable de votre marketing digital — ou un gouffre financier si c\'est mal géré. La différence tient souvent à quelques erreurs évitables au démarrage. Ce guide vous donne les bases pour ne pas répéter les erreurs que je vois chaque semaine chez les PME qui se lancent seules.',
      },
      {
        type: 'h2',
        titre: 'Pourquoi Google Ads est différent du SEO',
        texte: 'Le SEO (référencement naturel) est une stratégie long terme : vous construisez une visibilité qui dure, mais ça prend 6 à 12 mois. Google Ads est une stratégie court terme : vous payez pour être visible immédiatement, mais vous arrêtez de payer, vous disparaissez. Les deux sont complémentaires, pas concurrents.',
      },
      {
        type: 'h2',
        titre: 'Quel budget prévoir pour Google Ads en PME ?',
        texte: 'C\'est la question que tout le monde pose en premier. La réponse honnête : ça dépend de votre secteur, de votre zone géographique et de votre objectif. Mais voici des fourchettes réalistes.',
      },
      {
        type: 'liste',
        titre: 'Budgets indicatifs selon les secteurs :',
        items: [
          'Artisan local (plombier, électricien) : 300 à 500 €/mois pour 10 à 20 leads/mois',
          'Restaurant ou commerce local : 200 à 400 €/mois pour 50 à 100 clics qualifiés',
          'PME B2B (services aux entreprises) : 500 à 1 500 €/mois selon la concurrence',
          'Cabinet médical/juridique : 400 à 800 €/mois pour 20 à 40 demandes de RDV',
        ],
      },
      {
        type: 'h2',
        titre: 'Les 5 erreurs les plus fréquentes des PME sur Google Ads',
        texte: 'Ces erreurs sont évitables et peuvent vous faire perdre des centaines d\'euros par mois en clics non pertinents.',
      },
      {
        type: 'liste',
        titre: 'Erreurs classiques :',
        items: [
          '1. Ne pas utiliser de mots-clés négatifs — vous payez pour des requêtes sans rapport (ex: "plombier emploi" pour un plombier qui cherche des clients)',
          '2. Envoyer le trafic sur la page d\'accueil plutôt qu\'une page dédiée — les taux de conversion s\'effondrent',
          '3. Ne pas utiliser la correspondance exacte — votre annonce apparaît pour des requêtes très éloignées',
          '4. Ne jamais regarder les statistiques — les campagnes s\'optimisent si vous les suivez, pas sinon',
          '5. Vouloir des résultats en 48h — il faut au moins 2 à 4 semaines pour qu\'une campagne s\'optimise',
        ],
      },
      {
        type: 'faq',
        faqs: [
          {
            question: 'Puis-je gérer mes Google Ads moi-même ?',
            reponse: 'Oui, mais soyez prêt à y consacrer du temps d\'apprentissage. Google Ads est une plateforme complexe qui s\'apprend sur des mois. Pour un budget inférieur à 500 €/mois, faire gérer vos campagnes par un professionnel peut sembler coûteux proportionnellement — mais les erreurs d\'un débutant coûtent souvent plus cher que les frais de gestion.',
          },
          {
            question: 'Google Ads ou Facebook Ads — lequel choisir ?',
            reponse: 'Google Ads capte une demande existante (la personne cherche déjà votre service). Facebook/Meta Ads crée la demande (vous touchez des personnes susceptibles d\'être intéressées). Pour un artisan ou un service local, commencez par Google Ads. Pour un restaurant, une boutique ou un service grand public, Meta Ads peut être très efficace en complément.',
          },
          {
            question: 'Combien de temps pour voir les premiers résultats avec Google Ads ?',
            reponse: 'Les premières impressions et les premiers clics arrivent dès le premier jour. Mais pour des résultats stables et optimisés, comptez 4 à 8 semaines. Google a besoin de données pour apprendre quels mots-clés et quelles audiences convertissent le mieux pour vous.',
          },
          {
            question: 'Comment savoir si mes Google Ads sont rentables ?',
            reponse: 'La métrique clé est le ROAS (Return On Ad Spend) ou le coût par lead si vous vendez des services. Pour calculer : montant dépensé ÷ nombre de clients acquis = coût d\'acquisition. Comparez ce chiffre à la valeur moyenne d\'un client chez vous. Si vous dépensez 20 € pour acquérir un client qui vous rapporte 200 €, vous avez un ROAS de 10 — excellent.',
          },
          {
            question: 'Faut-il un site web performant avant de lancer Google Ads ?',
            reponse: 'Absolument. Un budget Google Ads gaspillé sur un site lent, mal conçu ou sans appel à l\'action clair, c\'est de l\'argent jeté. Avant de lancer des campagnes, assurez-vous que votre site charge en moins de 3 secondes, que le numéro de téléphone est visible, et que le formulaire de contact fonctionne.',
          },
        ],
      },
      {
        type: 'resume',
        titre: 'En résumé — Google Ads pour PME en 5 points clés',
        items: [
          'Budgétez au minimum 300 €/mois pour avoir des données suffisantes et des résultats significatifs',
          'Définissez des mots-clés négatifs dès le départ pour éviter les clics inutiles',
          'Créez des landing pages dédiées plutôt que d\'envoyer sur la page d\'accueil',
          'Attendez 4 à 8 semaines avant de juger les performances d\'une campagne',
          'Mesurez toujours votre coût par acquisition et comparez à la valeur d\'un client',
        ],
      },
    ],
  },
  {
    slug: 'automatisation-marketing-pme-debutant',
    titre: 'Automatisation marketing pour PME : comment gagner 5h par semaine sans perdre le lien humain',
    description: 'Découvrez les automations marketing accessibles aux PME : emails automatiques, rappels clients, séquences de nurturing. Les outils, les cas d\'usage et les erreurs à éviter.',
    datePublication: '2024-12-05',
    categorie: 'Automatisation',
    tags: ['automatisation marketing', 'email marketing', 'CRM PME', 'marketing automation', 'Make n8n HubSpot'],
    image: '/images/blog/automatisation-marketing-pme.svg',
    tempsLecture: 9,
    contenu: [
      {
        type: 'intro',
        texte: 'L\'automatisation marketing, ça semble réservé aux grandes entreprises avec des équipes tech. Faux. Aujourd\'hui, un artisan, un cabinet médical ou un restaurateur peut automatiser ses rappels clients, ses emails de suivi et sa relance devis en moins d\'une journée de mise en place — et économiser 5 à 10h par semaine.',
      },
      {
        type: 'h2',
        titre: 'Qu\'est-ce que l\'automatisation marketing pour une PME ?',
        texte: 'L\'automatisation marketing, c\'est programmer des actions répétitives pour qu\'elles se déclenchent automatiquement selon des conditions. Exemple concret : quand un client remplit un formulaire de contact sur votre site, il reçoit automatiquement un email de confirmation avec vos tarifs et vos disponibilités — sans que vous ayez à faire quoi que ce soit.',
      },
      {
        type: 'liste',
        titre: 'Les 5 automations les plus utiles pour une PME :',
        items: [
          '1. Email de bienvenue automatique après une première prise de contact',
          '2. Rappel de rendez-vous par SMS 24h avant (réduit les no-shows de 70%)',
          '3. Relance devis automatique si pas de réponse après 5 jours',
          '4. Email d\'anniversaire avec une offre exclusive pour fidéliser',
          '5. Séquence de nurturing pour les prospects qui ne sont "pas encore prêts"',
        ],
      },
      {
        type: 'faq',
        faqs: [
          {
            question: 'Quels outils d\'automatisation marketing sont accessibles pour une PME ?',
            reponse: 'Make (ex-Integromat) et n8n sont parfaits pour connecter vos outils sans coder. HubSpot propose une version gratuite puissante. Brevo (ex-Sendinblue) est excellent pour l\'email marketing automatisé avec des tarifs adaptés aux PME. Selon votre budget et vos besoins, je recommande de commencer par Brevo ou HubSpot Free.',
          },
          {
            question: 'L\'automatisation ne rend-elle pas le marketing trop impersonnel ?',
            reponse: 'Pas si c\'est bien fait. Un email automatique peut être très personnel : il utilise le prénom du client, fait référence au produit ou service qui l\'intéresse, et est écrit dans un ton humain. L\'automatisation ne remplace pas la relation humaine — elle libère votre temps pour vous concentrer sur elle.',
          },
          {
            question: 'Combien coûte une mise en place d\'automatisation marketing pour une PME ?',
            reponse: 'La mise en place d\'un système d\'automatisation de base (email de bienvenue + rappels + relance devis) coûte entre 500 et 1 500 € en one-shot, avec des outils dont les abonnements vont de gratuit à 100 €/mois selon le volume d\'emails. C\'est un investissement rentabilisé en moins de 3 mois.',
          },
        ],
      },
      {
        type: 'resume',
        titre: 'En résumé — L\'automatisation marketing en 4 points',
        items: [
          'Commencez par une seule automation utile (ex: rappel de rendez-vous) plutôt que vouloir tout automatiser d\'un coup',
          'Choisissez des outils adaptés à votre taille : Brevo, HubSpot Free ou Make selon votre cas',
          'Gardez un ton humain dans vos messages automatiques — prénom, personnalisation, clarté',
          'Mesurez l\'impact : taux d\'ouverture, no-shows réduits, devis signés après relance',
        ],
      },
    ],
  },
  {
    slug: 'refonte-site-web-quand-pourquoi',
    titre: 'Refonte de site web : comment savoir si votre site a besoin d\'être refait (et quand)',
    description: 'Les 7 signaux qui montrent qu\'il est temps de refondre votre site web. Ce que comprend une vraie refonte, comment ne pas se faire avoir et combien ça coûte.',
    datePublication: '2024-11-18',
    categorie: 'Création de site web',
    tags: ['refonte site web', 'redesign site', 'site web obsolète', 'mise à jour site web PME'],
    image: '/images/blog/refonte-site-web.svg',
    tempsLecture: 8,
    contenu: [
      {
        type: 'intro',
        texte: 'Votre site web a 5 ans. Il ressemble à ce qu\'il était en 2019. Vos clients ne le trouvent pas sur Google. Il met 8 secondes à charger. Vous avez honte de l\'envoyer à un prospect. Si l\'un de ces éléments vous parle, cet article est pour vous.',
      },
      {
        type: 'h2',
        titre: 'Les 7 signaux qui indiquent qu\'une refonte s\'impose',
        texte: 'Un site web a une durée de vie efficace de 3 à 5 ans. Passé ce délai, il devient souvent un frein plutôt qu\'un atout commercial.',
      },
      {
        type: 'liste',
        titre: '7 signaux d\'alarme :',
        items: [
          '1. Votre site n\'est pas mobile-friendly (testé sur smartphone, c\'est illisible)',
          '2. Il charge en plus de 4 secondes (Google pénalise les sites lents)',
          '3. Il est introuvable sur Google pour vos mots-clés principaux',
          '4. Le design paraît daté (polices, couleurs, mise en page d\'une autre époque)',
          '5. Vous avez du mal à le mettre à jour vous-même',
          '6. Votre offre a évolué mais votre site ne le reflète pas',
          '7. Vous n\'en êtes pas fier — vous hésitez à l\'envoyer à un prospect',
        ],
      },
      {
        type: 'faq',
        faqs: [
          {
            question: 'Faut-il tout refaire ou juste mettre à jour son site ?',
            reponse: 'Si votre site a plus de 4 ans et présente plusieurs des signaux d\'alarme listés ci-dessus, une refonte complète est généralement plus rentable qu\'une succession de corrections. Corriger un site mal construit revient souvent plus cher que repartir sur des bases saines.',
          },
          {
            question: 'Peut-on garder son référencement Google lors d\'une refonte ?',
            reponse: 'Oui, à condition de faire les choses dans l\'ordre : conserver les URLs existantes ou mettre en place des redirections 301, migrer le contenu optimisé, ne pas changer de domaine sans préparation. Une refonte bien planifiée peut au contraire améliorer significativement votre SEO.',
          },
          {
            question: 'Combien de temps dure une refonte de site web PME ?',
            reponse: 'Entre 4 et 8 semaines pour un site vitrine, 8 à 16 semaines pour un site e-commerce. Ce délai comprend la phase de discovery (compréhension de votre métier), le design, le développement, les tests et la mise en ligne.',
          },
        ],
      },
      {
        type: 'resume',
        titre: 'En résumé — Quand refondre son site web ?',
        items: [
          'Si votre site a plus de 4 ans et présente 3+ signaux d\'alarme : refonte complète',
          'Si le site est récent mais mal construit : analyse d\'abord, décision ensuite',
          'Budgétez entre 2 000 et 6 000 € pour une refonte PME sérieuse',
          'Planifiez la migration SEO avant de lancer la refonte pour ne pas perdre vos positions',
        ],
      },
    ],
  },
  {
    slug: 'google-business-profile-guide-pme',
    titre: 'Google Business Profile pour PME : le guide complet pour dominer la recherche locale en 2026',
    description: 'Comment créer, optimiser et exploiter votre fiche Google Business Profile pour attirer des clients locaux. Guide étape par étape pour PME, avec les nouveautés 2026.',
    datePublication: '2026-06-24',
    categorie: 'SEO',
    tags: ['Google Business Profile', 'SEO local', 'PME', 'Google Maps', 'avis Google', 'fiche Google'],
    image: '/images/blog/google-business-profile-pme.svg',
    tempsLecture: 10,
    contenu: [
      {
        type: 'intro',
        texte: 'Votre fiche Google Business Profile est souvent le premier contact entre votre entreprise et un client potentiel. Quand quelqu\'un tape "plombier Lyon" ou "coiffeur près de moi", Google affiche 3 fiches d\'entreprises avec une carte avant même les résultats classiques. Si votre fiche n\'est pas là, ou si elle est mal remplie, vous laissez vos concurrents capter ces clients. Ce guide vous montre comment créer, optimiser et exploiter votre profil Google Business pour générer plus d\'appels, plus de visites et plus de clients.',
      },
      {
        type: 'h2',
        titre: 'Pourquoi Google Business Profile est indispensable pour une PME locale',
        texte: 'Google Business Profile (GBP, anciennement Google My Business) est un outil gratuit de Google qui permet à votre entreprise d\'apparaître dans le Pack Local (les 3 résultats avec carte), sur Google Maps et dans les résultats de recherche classiques. 46% des recherches Google ont une intention locale, et 78% des recherches locales sur mobile aboutissent à un achat dans les 24 heures. Pour une PME qui vit de sa clientèle de proximité, c\'est le levier le plus rentable qui existe.',
      },
      {
        type: 'liste',
        titre: 'Ce que Google Business Profile vous apporte concrètement :',
        items: [
          'Visibilité dans le Pack Local (les 3 fiches au-dessus des résultats organiques)',
          'Présence sur Google Maps (itinéraire direct vers votre commerce)',
          'Bouton d\'appel direct depuis la fiche (conversion immédiate sur mobile)',
          'Affichage de vos horaires, photos, avis et services sans que le client ait besoin de visiter votre site',
          'Données statistiques gratuites : combien de personnes vous trouvent, vous appellent, demandent l\'itinéraire',
        ],
      },
      {
        type: 'h2',
        titre: 'Étape 1 : Créer ou réclamer votre fiche Google Business Profile',
        texte: 'Si votre entreprise existe depuis un moment, il est probable que Google a déjà créé une fiche automatique à partir d\'informations publiques. Votre première action est de la réclamer pour en prendre le contrôle. Rendez-vous sur business.google.com, connectez-vous avec un compte Google et cherchez votre entreprise. Si elle apparaît, cliquez "Réclamer cette entreprise". Sinon, créez une nouvelle fiche. Google vous demandera de vérifier que vous êtes bien le propriétaire, généralement par courrier postal (carte avec code) ou par téléphone.',
      },
      {
        type: 'liste',
        titre: 'Points de vigilance lors de la création :',
        items: [
          'Utilisez le nom exact de votre entreprise, sans ajouter de mots-clés (c\'est contre les règles Google et risque la suspension)',
          'Choisissez la catégorie principale la plus précise possible ("Plombier" plutôt que "Services à domicile")',
          'Si vous vous déplacez chez les clients sans local, cochez "J\'effectue des livraisons et des visites à domicile" et définissez votre zone de service',
          'Renseignez un numéro de téléphone local (pas un 08), c\'est un signal de confiance pour Google',
        ],
      },
      {
        type: 'h2',
        titre: 'Étape 2 : Optimiser chaque section de votre fiche',
        texte: 'Une fiche créée n\'est pas une fiche optimisée. Google classe les fiches locales selon 3 critères : la pertinence (votre fiche correspond-elle à la recherche ?), la distance (êtes-vous proche du chercheur ?) et la prominence (êtes-vous connu et bien noté ?). Vous ne pouvez pas changer votre distance, mais vous pouvez maximiser la pertinence et la prominence en remplissant chaque champ avec soin.',
      },
      {
        type: 'liste',
        titre: 'Les champs à remplir pour une fiche optimisée :',
        items: [
          'Description de l\'entreprise (750 caractères max) : décrivez vos services, votre zone et votre spécialité. Intégrez naturellement vos mots-clés sans forcer.',
          'Horaires d\'ouverture : à jour, y compris les jours fériés et horaires exceptionnels. Les fiches avec horaires incorrects perdent la confiance des utilisateurs et de Google.',
          'Photos : minimum 10 photos de qualité (façade, intérieur, équipe, réalisations). Les fiches avec plus de 10 photos reçoivent 42% de demandes d\'itinéraire en plus.',
          'Services et produits : listez chaque service avec un prix indicatif si possible. Google utilise ces informations pour afficher votre fiche sur des recherches spécifiques.',
          'Attributs : accessibilité, Wi-Fi, parking, paiement, etc. En 2026, Google a ajouté des attributs de durabilité et d\'accessibilité qui renforcent la confiance.',
          'Lien de prise de rendez-vous : si vous avez un formulaire en ligne, ajoutez le lien. Ça réduit la friction entre découverte et conversion.',
        ],
      },
      {
        type: 'h2',
        titre: 'Étape 3 : Obtenir et gérer les avis Google',
        texte: 'Les avis sont le facteur de classement local qui a le plus progressé ces dernières années. En 2026, les signaux comportementaux (clics sur "Appeler", demandes d\'itinéraire) sont passés au 4e rang des facteurs de classement, et les avis restent dans le top 3. Une fiche avec 50 avis à 4,5 étoiles surclassera presque toujours une fiche avec 5 avis à 5 étoiles.',
      },
      {
        type: 'liste',
        titre: 'Stratégie avis en 5 points :',
        items: [
          'Demandez un avis à chaque client satisfait, au moment où il est le plus content (juste après la livraison, la prestation, le rendu). Un SMS avec un lien direct vers la page d\'avis fonctionne mieux qu\'un email.',
          'Répondez à tous les avis, positifs comme négatifs. Google valorise les fiches actives et les clients potentiels lisent vos réponses.',
          'Face à un avis négatif, restez professionnel : remerciez, reconnaissez le problème, proposez une solution. Ne vous justifiez pas en 3 paragraphes.',
          'Depuis 2025, les utilisateurs peuvent laisser des avis sous pseudonyme. Ne vous laissez pas déstabiliser : concentrez-vous sur le volume d\'avis positifs.',
          'N\'achetez jamais de faux avis et ne proposez pas de contrepartie. Google détecte et pénalise ces pratiques.',
        ],
      },
      {
        type: 'h2',
        titre: 'Étape 4 : Publier des posts Google régulièrement',
        texte: 'Google Business Profile permet de publier des posts (actualités, offres, événements) directement sur votre fiche. Ces posts apparaissent quand quelqu\'un consulte votre fiche et signalent à Google que votre entreprise est active. Un post par semaine est un bon rythme.',
      },
      {
        type: 'liste',
        titre: 'Idées de posts GBP pour une PME :',
        items: [
          'Nouvelle réalisation ou cas client avec photo',
          'Offre spéciale ou promotion saisonnière',
          'Changement d\'horaires ou fermeture exceptionnelle',
          'Conseil rapide lié à votre métier (ex: un plombier qui donne un conseil anti-gel en hiver)',
          'Événement local auquel vous participez',
        ],
      },
      {
        type: 'h2',
        titre: 'Les nouveautés Google Business Profile en 2026',
        texte: 'Google fait évoluer GBP en permanence. Voici les changements les plus importants pour les PME en 2026.',
      },
      {
        type: 'liste',
        titre: 'Nouveautés à connaître :',
        items: [
          'Réponses IA aux questions clients : Google propose des réponses automatiques basées sur les informations de votre fiche. Vous pouvez les approuver, modifier ou rejeter avant publication.',
          'Attributs de durabilité et d\'accessibilité : nouveaux champs pour afficher vos pratiques responsables, visibles directement sur la fiche.',
          'Signaux comportementaux renforcés : les clics sur "Appeler" et les demandes d\'itinéraire pèsent davantage dans le classement (passé du 6e au 4e rang).',
          'Signaux sociaux : les réseaux sociaux liés à votre fiche entrent pour la première fois dans le top 5 des facteurs de classement local.',
          'Business Profile Manager : interface unifiée pour gérer plusieurs fiches si vous avez plusieurs établissements.',
        ],
      },
      {
        type: 'h2',
        titre: 'Les 5 erreurs les plus courantes sur Google Business Profile',
        texte: 'Ces erreurs reviennent chez la majorité des PME que j\'accompagne. Elles sont faciles à corriger mais coûtent cher en visibilité si on les ignore.',
      },
      {
        type: 'liste',
        titre: 'Erreurs fréquentes :',
        items: [
          'Bourrer le nom de l\'entreprise de mots-clés ("Plombier Lyon Pas Cher 24h" au lieu du vrai nom). Google suspend les fiches qui font ça.',
          'Ne pas répondre aux avis. Même un simple "Merci pour votre retour" vaut mieux que le silence.',
          'Avoir des horaires obsolètes. Un client qui se déplace et trouve porte close laissera un avis 1 étoile.',
          'Ne jamais publier de posts. Google considère les fiches inactives comme moins fiables.',
          'Ignorer la section Q&R. N\'importe qui peut poser une question sur votre fiche. Si vous ne répondez pas, un inconnu le fera à votre place.',
        ],
      },
      {
        type: 'faq',
        titre: 'Questions fréquentes sur Google Business Profile',
        faqs: [
          {
            question: 'Google Business Profile est-il vraiment gratuit ?',
            reponse: 'Oui, à 100%. La création, l\'optimisation et la gestion de votre fiche sont entièrement gratuites. Google monétise via Google Ads, pas via GBP.',
          },
          {
            question: 'Combien de temps pour apparaître dans le Pack Local ?',
            reponse: 'Après vérification de votre fiche (1 à 2 semaines par courrier), les premiers résultats apparaissent en 2 à 4 semaines. Pour les secteurs concurrentiels, comptez 2 à 3 mois d\'optimisation pour entrer dans le top 3.',
          },
          {
            question: 'Faut-il un site web pour avoir une fiche Google Business Profile ?',
            reponse: 'Non, mais c\'est fortement recommandé. Une fiche GBP liée à un site web optimisé SEO se classera mieux qu\'une fiche seule. Le site renforce votre crédibilité et offre plus d\'informations à Google pour vous classer.',
          },
          {
            question: 'Puis-je avoir une fiche GBP si je travaille de chez moi ?',
            reponse: 'Oui. Si vous vous déplacez chez les clients, choisissez "Zone de service" au lieu d\'afficher une adresse. Votre adresse personnelle ne sera pas visible publiquement.',
          },
          {
            question: 'Combien d\'avis faut-il pour être bien classé ?',
            reponse: 'Il n\'y a pas de nombre magique, mais visez au moins 20 à 30 avis avec une note supérieure à 4,2. Plus important que le nombre : la régularité. 2-3 avis par mois valent mieux que 20 avis d\'un coup suivis de 6 mois de silence.',
          },
        ],
      },
      {
        type: 'cta',
        texte: 'Vous voulez optimiser votre fiche Google Business Profile ou améliorer votre visibilité locale ? Je vous propose un audit gratuit de 30 minutes pour identifier vos opportunités.',
      },
      {
        type: 'resume',
        titre: 'En résumé : Google Business Profile pour PME en 5 étapes',
        items: [
          'Réclamez ou créez votre fiche sur business.google.com — c\'est gratuit',
          'Remplissez chaque champ : description, horaires, photos, services, attributs',
          'Collectez des avis régulièrement et répondez à tous sans exception',
          'Publiez un post par semaine pour montrer à Google que vous êtes actif',
          'Exploitez les nouveautés 2026 : réponses IA, attributs durabilité, signaux sociaux',
        ],
      },
    ],
  },
  {
    slug: 'consultant-digital-ou-agence-lyon',
    titre: 'Consultant digital indépendant ou agence à Lyon : comment choisir en 2026 ?',
    description: 'Prix, délais, qualité d\'accompagnement : comparatif honnête entre consultant indépendant, agence digitale et freelance à Lyon pour bien choisir votre partenaire croissance.',
    datePublication: '2026-07-02',
    categorie: 'Stratégie digitale',
    tags: ['agence digitale Lyon', 'consultant digital Lyon', 'freelance marketing Lyon', 'choisir prestataire digital', 'PME Lyon'],
    image: '/images/blog/consultant-ou-agence-lyon.svg',
    tempsLecture: 9,
    contenu: [
      {
        type: 'intro',
        texte: 'Vous dirigez une PME à Lyon et vous cherchez de l\'aide pour votre présence digitale. Trois options s\'offrent à vous : une agence de communication, un freelance généraliste, ou un consultant indépendant spécialisé. Chacune a ses forces, ses limites et sa fourchette de prix. Voici comment trancher selon votre situation, sans discours commercial.',
      },
      {
        type: 'h2',
        titre: 'Les 3 types de prestataires digitaux à Lyon',
        texte: 'Avant de comparer les prix, il faut comprendre ce que chaque modèle propose réellement. Lyon compte une offre dense — grandes agences du centre-ville, studios spécialisés, freelances et consultants indépendants. Le bon choix dépend moins de la réputation que de la taille de votre besoin.',
      },
      {
        type: 'liste',
        titre: 'Ce qui distingue chaque modèle :',
        items: [
          'Agence digitale — équipe de plusieurs spécialistes (SEO, ads, design, dev), structure avec compte manager, capacité à gérer de gros volumes mais coûts de structure répercutés sur le prix.',
          'Freelance généraliste — un seul indépendant qui touche à tout (site, réseaux, un peu de SEO). Tarifs plus bas, mais expertise souvent diluée sur chaque sujet.',
          'Consultant indépendant spécialisé — un expert unique, dédié à la croissance digitale, qui pilote lui-même vos projets ou coordonne des partenaires de confiance pour ce qu\'il ne fait pas en direct.',
        ],
      },
      {
        type: 'h2',
        titre: 'Combien coûtent une agence, un freelance et un consultant à Lyon ?',
        texte: 'Les écarts de prix à Lyon sont significatifs et reflètent surtout des différences de structure de coûts, pas toujours de qualité.',
      },
      {
        type: 'liste',
        titre: 'Fourchettes de prix observées sur le marché lyonnais :',
        items: [
          'Agence digitale (SEO + Ads + gestion mensuelle) : 1 500 à 5 000 €/mois selon la taille de l\'équipe et le reporting fourni.',
          'Freelance généraliste : 300 à 1 200 €/mois, avec une disponibilité et une profondeur d\'expertise variables.',
          'Consultant indépendant spécialisé : 500 à 2 000 €/mois pour un accompagnement dédié, souvent avec un audit initial gratuit pour cadrer le besoin avant tout engagement.',
        ],
      },
      {
        type: 'h3',
        titre: 'Pourquoi les agences facturent plus cher',
        texte: 'Une agence lyonnaise doit couvrir un loyer, plusieurs salaires et des frais de structure. Ce coût est réparti entre tous ses clients — vous payez donc aussi la marge de l\'agence sur son propre fonctionnement, pas uniquement le travail effectué sur votre compte.',
      },
      {
        type: 'h2',
        titre: '5 critères pour choisir le bon partenaire à Lyon',
        texte: 'Le prix seul ne dit rien de la qualité. Voici les critères qui comptent vraiment pour une PME.',
      },
      {
        type: 'liste',
        titre: 'Critères de décision :',
        items: [
          'Interlocuteur unique ou compte manager ? — Chez une grande agence, vous parlez rarement à la personne qui exécute le travail. Un consultant indépendant, lui, connaît votre dossier dans le détail.',
          'Spécialisation réelle ou polyvalence de façade ? — Demandez des exemples concrets de résultats dans votre secteur, pas juste un portfolio générique.',
          'Transparence du reporting — un bon prestataire vous montre des chiffres (trafic, leads, coût par acquisition), pas des rapports de 40 pages illisibles.',
          'Flexibilité contractuelle — méfiez-vous des engagements de 12 mois sans clause de sortie. Un accompagnement mensuel sans engagement signale la confiance du prestataire dans ses résultats.',
          'Connaissance du marché lyonnais — la concurrence locale, les habitudes de recherche des clients de la métropole et de la région Auvergne-Rhône-Alpes ne s\'improvisent pas.',
        ],
      },
      {
        type: 'h2',
        titre: 'Dans quels cas une agence reste le bon choix',
        texte: 'Une agence a du sens si votre PME a un budget marketing conséquent (plus de 5 000 €/mois), si vous avez besoin de plusieurs expertises en parallèle à fort volume (production vidéo, campagnes multi-canal, dev sur-mesure complexe), ou si vous préférez une structure avec plusieurs interlocuteurs en cas d\'absence.',
      },
      {
        type: 'h2',
        titre: 'Dans quels cas un consultant indépendant est plus rentable',
        texte: 'Pour la majorité des TPE et PME lyonnaises — commerces, artisans, cabinets, PME de services — un consultant indépendant spécialisé offre le meilleur rapport qualité-prix : vous payez pour de l\'expertise directe et de la disponibilité, sans les coûts de structure d\'une agence. C\'est particulièrement vrai pour les projets qui demandent une vraie compréhension de votre activité dans la durée, plutôt qu\'une exécution ponctuelle.',
      },
      {
        type: 'faq',
        titre: 'Questions fréquentes',
        faqs: [
          {
            question: 'Une agence digitale à Lyon est-elle toujours plus chère qu\'un consultant ?',
            reponse: 'Presque toujours, oui, à prestation équivalente — la structure d\'une agence (locaux, salaires de plusieurs personnes, encadrement) se répercute sur les tarifs. Un consultant indépendant a des coûts fixes bien plus bas, qu\'il peut répercuter en tarifs plus compétitifs pour un niveau d\'expertise comparable.',
          },
          {
            question: 'Comment vérifier le sérieux d\'un consultant digital avant de signer ?',
            reponse: 'Demandez des exemples de projets réels avec des résultats chiffrés, vérifiez ses avis Google et LinkedIn, et privilégiez un premier échange gratuit (audit) pour juger de sa compréhension de votre secteur avant tout engagement financier.',
          },
          {
            question: 'Peut-on combiner consultant indépendant et agence ?',
            reponse: 'Oui, c\'est même fréquent : un consultant pilote la stratégie globale et coordonne des spécialistes ponctuels (développeur, vidéaste) selon les besoins, ce qui évite de payer une structure d\'agence complète pour des besoins qui ne le justifient pas.',
          },
          {
            question: 'Quel est le principal risque avec un freelance généraliste low-cost ?',
            reponse: 'La dilution de l\'expertise : un freelance qui fait à la fois du site web, du SEO, des réseaux sociaux et de la pub a rarement le niveau d\'un spécialiste sur chaque sujet. Pour des besoins simples ça suffit ; pour de la croissance sérieuse, ça freine souvent les résultats.',
          },
        ],
      },
      {
        type: 'cta',
        texte: 'Vous hésitez entre agence, freelance et consultant indépendant pour votre projet à Lyon ? Un audit gratuit de 30 minutes pour clarifier votre besoin réel, sans engagement.',
      },
      {
        type: 'resume',
        titre: 'En résumé — Agence, freelance ou consultant à Lyon',
        items: [
          'Agence : pertinente pour les gros budgets et besoins multi-expertises à fort volume',
          'Freelance généraliste : tarifs bas mais expertise souvent diluée sur chaque sujet',
          'Consultant indépendant spécialisé : le meilleur rapport qualité-prix pour la majorité des PME et TPE lyonnaises',
          'Vérifiez toujours les résultats chiffrés et la connaissance réelle du marché lyonnais avant de signer',
        ],
      },
    ],
  },
]

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug)
}

export const categories = [...new Set(articles.map((a) => a.categorie))]
