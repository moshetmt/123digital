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
    titre: 'SEO local pour PME : le guide complet pour apparaître en tête sur Google en 2025',
    description: 'Tout ce qu\'un patron de PME doit savoir pour être trouvé sur Google par ses clients locaux. De Google Business Profile aux mots-clés locaux, guide pratique étape par étape.',
    datePublication: '2025-03-15',
    dateModification: '2025-04-01',
    categorie: 'SEO',
    tags: ['SEO local', 'Google Business Profile', 'PME', 'référencement local', 'Google Maps'],
    image: '/images/blog/seo-local-pme.jpg',
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
    titre: 'Combien coûte un site web pour une PME en 2025 ? Le guide transparent',
    description: 'Tarifs réels, ce qui justifie les différences de prix, les pièges à éviter et comment choisir la bonne formule pour votre budget. Guide honnête sans langue de bois.',
    datePublication: '2025-02-20',
    categorie: 'Création de site web',
    tags: ['prix site web', 'budget site web', 'création site web PME', 'coût site internet'],
    image: '/images/blog/prix-site-web-pme.jpg',
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
    datePublication: '2025-01-10',
    categorie: 'Publicité en ligne',
    tags: ['Google Ads', 'publicité en ligne PME', 'Google Ads débutant', 'budget Google Ads'],
    image: '/images/blog/google-ads-pme.jpg',
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
    image: '/images/blog/automatisation-marketing-pme.jpg',
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
    image: '/images/blog/refonte-site-web.jpg',
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
]

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug)
}

export const categories = [...new Set(articles.map((a) => a.categorie))]
