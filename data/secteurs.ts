export interface SecteurData {
  slug: string
  nom: string
  nomPluriel: string
  icon: string
  description: string
  problemes: string[]
  solutions: string[]
  keywords: string[]
  faqs: Array<{ question: string; reponse: string }>
}

export const secteurs: SecteurData[] = [
  {
    slug: 'restaurant',
    nom: 'Restaurant',
    nomPluriel: 'Restaurants',
    icon: 'UtensilsCrossed',
    description: 'Remplissez vos tables grâce à une présence digitale qui donne faim : site web appétissant, réservations en ligne et avis clients gérés.',
    problemes: [
      'Tables vides en semaine malgré une bonne cuisine',
      'Site web vieillissant ou inexistant',
      'Mauvaises critiques non gérées sur Google',
      'Concurrence des plateformes de livraison qui mangent la marge',
    ],
    solutions: [
      'Site vitrine avec menu en ligne et réservation directe',
      'Google Business Profile optimisé avec photos professionnelles',
      'SEO local pour apparaître en tête sur "restaurant [ville]"',
      'Campagnes Meta Ads ciblant les habitants du quartier',
    ],
    keywords: ['site web restaurant', 'marketing restaurant', 'SEO restaurant', 'réservation en ligne restaurant'],
    faqs: [
      {
        question: 'Combien coûte un site web pour un restaurant ?',
        reponse: 'Un site vitrine restaurant avec menu en ligne et système de réservation est proposé à partir de 1 500 €. Ce tarif inclut le design, le développement, l\'optimisation SEO et la formation à la mise à jour du menu.',
      },
      {
        question: 'Comment attirer plus de clients dans mon restaurant grâce au digital ?',
        reponse: 'La combinaison la plus efficace pour un restaurant est : Google Business Profile bien rempli avec des photos de qualité, un site web rapide avec réservation en ligne, des campagnes Meta Ads géolocalisées et une gestion active des avis Google. Les résultats sont visibles en 4 à 8 semaines.',
      },
      {
        question: 'Est-ce que les publicités Facebook fonctionnent pour les restaurants ?',
        reponse: 'Oui, Meta Ads (Facebook et Instagram) sont très efficaces pour les restaurants car vous pouvez cibler précisément les personnes vivant dans un rayon de 5 km. Les formats vidéo de vos plats et les offres "table disponible ce soir" convertissent particulièrement bien.',
      },
      {
        question: 'Comment gérer les mauvais avis Google pour mon restaurant ?',
        reponse: 'Je vous accompagne dans la mise en place d\'une stratégie de gestion des avis : répondre professionnellement aux avis négatifs, encourager les clients satisfaits à laisser un avis positif, et améliorer votre note globale progressivement. Une note de 4,5+ sur Google augmente significativement le trafic.',
      },
      {
        question: 'Puis-je vendre mes menus en ligne ou proposer le click & collect ?',
        reponse: 'Absolument. Je peux intégrer un système de commande en ligne directement sur votre site, évitant ainsi les commissions des plateformes comme Uber Eats (15 à 30%). Vous gardez la relation client et toute la marge.',
      },
    ],
  },
  {
    slug: 'cabinet-medical',
    nom: 'Cabinet médical',
    nomPluriel: 'Cabinets médicaux',
    icon: 'Stethoscope',
    description: 'Facilitez la prise de rendez-vous, renforcez votre crédibilité en ligne et réduisez les no-shows, pour vous concentrer sur vos patients.',
    problemes: [
      'Secrétariat submergé d\'appels pour des rendez-vous',
      'Patients qui ne trouvent pas le cabinet sur Google',
      'Informations obsolètes sur les pages jaunes ou Doctolib',
      'Difficultés à attirer de nouveaux patients dans un secteur concurrentiel',
    ],
    solutions: [
      'Site web professionnel avec prise de rendez-vous en ligne',
      'Google Business Profile médical optimisé',
      'SEO local "médecin [spécialité] [ville]"',
      'Intégration Doctolib ou Calendly pour la gestion des créneaux',
    ],
    keywords: ['site web cabinet médical', 'SEO médecin', 'rendez-vous en ligne médecin', 'marketing cabinet médical'],
    faqs: [
      {
        question: 'Est-ce qu\'un médecin a le droit de faire de la publicité ?',
        reponse: 'En France, les médecins sont soumis au Code de déontologie médicale qui encadre strictement la publicité. Il est interdit de faire de la publicité commerciale, mais un site web informatif et professionnel, un profil Google Business et une présence sur Doctolib sont parfaitement légaux et recommandés.',
      },
      {
        question: 'Comment référencer mon cabinet médical sur Google ?',
        reponse: 'Le SEO pour un cabinet médical repose sur 3 piliers : un site web optimisé avec vos spécialités, votre adresse et vos horaires ; un Google Business Profile complet avec photos du cabinet ; des avis patients positifs. En 3 à 6 mois, vous pouvez apparaître en tête pour "médecin [spécialité] [ville]".',
      },
      {
        question: 'Quelle est la différence entre Doctolib et un site web propre ?',
        reponse: 'Doctolib est une plateforme de rendez-vous qui vous donne de la visibilité mais vous rend dépendant et prend un abonnement mensuel. Un site web propre vous appartient, vous contrôlez votre image, votre SEO et la relation patient. L\'idéal est d\'avoir les deux : votre site en vitrine principale, Doctolib intégré pour la prise de rendez-vous.',
      },
      {
        question: 'Puis-je avoir un site web pour plusieurs praticiens d\'un même cabinet ?',
        reponse: 'Oui, je crée des sites multi-praticiens avec une page dédiée par médecin, des agendas individuels et une gestion des spécialités. C\'est particulièrement efficace pour les maisons de santé pluridisciplinaires.',
      },
      {
        question: 'Combien de temps faut-il pour créer un site web médical ?',
        reponse: 'Un site web pour un cabinet médical est livré en 2 à 4 semaines selon la complexité. Cela inclut le design aux couleurs de votre cabinet, les textes optimisés SEO, la fiche Google Business mise à jour et la formation à la gestion des rendez-vous en ligne.',
      },
    ],
  },
  {
    slug: 'artisan-btp',
    nom: 'Artisan BTP',
    nomPluriel: 'Artisans BTP',
    icon: 'Hammer',
    description: 'Votre téléphone qui sonne en continu avec des chantiers qualifiés, sans dépendre des comparateurs qui vendent vos leads à 5 concurrents.',
    problemes: [
      'Dépendance aux leads achetés sur des plateformes (Houzz, Bark...)',
      'Pas de site web ou site non visible sur Google',
      'Clients qui ne comprennent pas la différence de prix avec un concurrent',
      'Manque de photos et de références pour rassurer',
    ],
    solutions: [
      'Site web portfolio avec galerie de réalisations',
      'SEO local "plombier/électricien/maçon [ville]"',
      'Google Ads pour les urgences (dépannage)',
      'Fiche Google avec photos de chantiers et avis clients',
    ],
    keywords: ['site web artisan', 'SEO artisan BTP', 'leads chantier', 'marketing plombier électricien maçon'],
    faqs: [
      {
        question: 'Est-ce que Google Ads fonctionne vraiment pour un artisan ?',
        reponse: 'Oui, c\'est l\'un des secteurs où Google Ads est le plus rentable. Quand quelqu\'un cherche "plombier urgence Lyon" à 22h, il veut quelqu\'un tout de suite. Avec une campagne bien ciblée, vous payez 5 à 15 € par appel qualifié. C\'est souvent un chantier de plusieurs centaines d\'euros.',
      },
      {
        question: 'Comment sortir de la dépendance aux plateformes de leads ?',
        reponse: 'La solution est de construire votre propre canal d\'acquisition : un site web bien référencé localement + une fiche Google Business avec des avis + éventuellement des Google Ads. En 6 mois, vous pouvez avoir suffisamment de demandes directes pour ne plus dépendre des plateformes.',
      },
      {
        question: 'J\'ai déjà assez de travail, pourquoi aurais-je besoin d\'un site web ?',
        reponse: 'Un site web professionnel sert aussi à justifier vos tarifs, à attirer des chantiers plus rentables (rénovation complète plutôt que petite réparation), à fidéliser vos clients et à leur faciliter la recommandation. Quand votre bouche-à-oreille envoie quelqu\'un vers vous, la première chose qu\'il fait est de chercher votre nom sur Google.',
      },
      {
        question: 'Combien coûte un site web pour un artisan du BTP ?',
        reponse: 'Un site web artisan avec galerie de réalisations, formulaire de devis et optimisation SEO locale est proposé à partir de 1 200 €. C\'est un investissement rentabilisé dès les 2 premiers chantiers supplémentaires générés.',
      },
      {
        question: 'Comment obtenir plus d\'avis Google pour mon activité d\'artisan ?',
        reponse: 'Je mets en place un système simple : à la fin de chaque chantier, vous envoyez un SMS ou email avec un lien direct vers votre fiche Google. On peut l\'automatiser avec un outil simple. Un artisan avec 30+ avis positifs reçoit 3x plus de demandes qu\'un concurrent sans avis.',
      },
    ],
  },
  {
    slug: 'commerce-de-proximite',
    nom: 'Commerce de proximité',
    nomPluriel: 'Commerces de proximité',
    icon: 'ShoppingBag',
    description: 'Ramenez les clients dans votre boutique et vendez aussi en ligne, sans sacrifier votre relationnel qui fait votre force.',
    problemes: [
      'Concurrence d\'Amazon et des grandes enseignes en ligne',
      'Pas de présence digitale pour capter les recherches locales',
      'Horaires et stock non visibles en ligne',
      'Difficultés à fidéliser et à faire revenir les clients',
    ],
    solutions: [
      'Site e-commerce ou vitrine avec catalogue en ligne',
      'Google Business Profile optimisé avec horaires et photos',
      'SEO local et campagnes Google Shopping',
      'Programme de fidélité digital et email marketing',
    ],
    keywords: ['site web commerce', 'e-commerce petite boutique', 'SEO commerce local', 'marketing boutique'],
    faqs: [
      {
        question: 'Est-ce que ça vaut le coup d\'ouvrir une boutique en ligne pour un petit commerce ?',
        reponse: 'Absolument, et c\'est même urgent. Les Français cherchent en ligne avant d\'aller en boutique. Un site simple avec votre catalogue, vos horaires et la possibilité de commander en click & collect peut représenter 15 à 30% de chiffre d\'affaires supplémentaire en moins d\'un an.',
      },
      {
        question: 'Comment rivaliser avec Amazon en tant que petit commerce ?',
        reponse: 'Vous ne rivalisez pas sur le prix : vous rivalisez sur la relation humaine, le conseil expert, la proximité et la qualité. Votre site web doit mettre en avant ces avantages : votre histoire, votre sélection de produits, vos conseils, et faciliter la commande locale. C\'est votre différenciation.',
      },
      {
        question: 'Combien coûte une boutique en ligne pour un petit commerce ?',
        reponse: 'Un site e-commerce simple avec jusqu\'à 100 produits, paiement en ligne et gestion des stocks est proposé à partir de 2 500 €. Pour un site vitrine avec click & collect uniquement, compter à partir de 1 500 €. Ces investissements se rentabilisent généralement en 6 à 12 mois.',
      },
      {
        question: 'Est-ce que les réseaux sociaux sont importants pour un commerce de proximité ?',
        reponse: 'Oui, Instagram et Facebook sont très efficaces pour les commerces de proximité, surtout avec des publications régulières de nouveaux produits, des promotions locales et des événements en boutique. Je propose un accompagnement community management pour gérer ces réseaux à votre place.',
      },
      {
        question: 'Comment garder mes clients fidèles et les faire revenir ?',
        reponse: 'La fidélisation digitale passe par l\'email marketing (newsletter mensuelle avec offres exclusives), un programme de fidélité numérique, et les SMS pour les offres flash. Je mets en place des séquences automatisées qui gardent le contact sans que vous y passiez du temps chaque semaine.',
      },
    ],
  },
  {
    slug: 'cabinet-juridique',
    nom: 'Cabinet juridique',
    nomPluriel: 'Cabinets juridiques',
    icon: 'Scale',
    description: 'Attirez des clients qualifiés prêts à payer pour votre expertise, pas des curieux qui veulent juste un conseil gratuit.',
    problemes: [
      'Site web vieillissant qui ne reflète pas la qualité du cabinet',
      'Difficultés à se démarquer de la concurrence en ligne',
      'Clients potentiels qui ne comprennent pas votre spécialisation',
      'Manque de visibilité pour les recherches locales ciblées',
    ],
    solutions: [
      'Site web institutionnel sobre et rassurant',
      'SEO sur les mots-clés spécialisés "avocat [domaine] [ville]"',
      'Contenu d\'expertise (articles juridiques vulgarisés) pour le SEO',
      'Formulaire de premier contact qualifiant et confidentiel',
    ],
    keywords: ['site web avocat', 'SEO cabinet juridique', 'marketing avocat', 'référencement notaire'],
    faqs: [
      {
        question: 'Un avocat peut-il faire de la publicité en France ?',
        reponse: 'Oui, depuis 2014, les avocats peuvent faire de la publicité fonctionnelle (information sur leurs services et tarifs) mais pas comparative ni tapageuse. Un site web professionnel, des articles de blog juridiques, une fiche Google Business et des publicités Google Ads informatives sont tous autorisés et très efficaces.',
      },
      {
        question: 'Quels sont les mots-clés les plus recherchés pour un cabinet d\'avocats ?',
        reponse: 'Les recherches les plus fréquentes suivent le schéma "avocat [domaine] [ville]" : avocat divorce Lyon, avocat droit du travail Grenoble, avocat immobilier Clermont-Ferrand... Je réalise une analyse de mots-clés spécifique à votre spécialisation et votre zone géographique.',
      },
      {
        question: 'Est-ce que les articles de blog aident un cabinet d\'avocats à être mieux référencé ?',
        reponse: 'Absolument. Les articles de blog vulgarisant des sujets juridiques ("Comment se passe une procédure de licenciement ?") attirent des personnes en phase de recherche d\'information qui deviennent ensuite des clients. C\'est le contenu qui crée le plus de valeur SEO long terme pour un cabinet.',
      },
      {
        question: 'Combien de temps pour voir des résultats SEO pour un cabinet juridique ?',
        reponse: 'Le SEO pour un cabinet juridique est modérément concurrentiel selon les spécialités. En 4 à 6 mois de travail régulier (optimisation du site + articles de blog + netlinking), vous pouvez atteindre la première page Google pour vos mots-clés cibles dans votre ville.',
      },
      {
        question: 'Comment protéger la confidentialité des échanges sur mon site ?',
        reponse: 'Le site est conçu avec HTTPS obligatoire, les formulaires de contact ne transmettent pas de données sensibles en clair, et les échanges détaillés se font ensuite par email sécurisé ou en rendez-vous. Je respecte scrupuleusement les exigences déontologiques de la profession.',
      },
    ],
  },
  {
    slug: 'agence-immobiliere',
    nom: 'Agence immobilière',
    nomPluriel: 'Agences immobilières',
    icon: 'Home',
    description: 'Captez les vendeurs et acheteurs en ligne avant qu\'ils contactent vos concurrents, et construisez une réputation locale incontournable.',
    problemes: [
      'Dépendance aux grands portails (SeLoger, Leboncoin) qui absorbent les leads',
      'Site web non référencé localement',
      'Manque de différenciation dans un marché saturé',
      'Difficultés à capter les mandats exclusifs',
    ],
    solutions: [
      'Site web avec moteur de recherche de biens immobiliers',
      'SEO local "agence immobilière [ville]" et "estimation immobilière [ville]"',
      'Outil d\'estimation en ligne pour capter des vendeurs',
      'Campagnes Google Ads sur les recherches d\'acheteurs qualifiés',
    ],
    keywords: ['site web agence immobilière', 'SEO immobilier', 'marketing agence immo', 'leads immobilier'],
    faqs: [
      {
        question: 'Comment générer des mandats vendeurs grâce au digital ?',
        reponse: 'L\'outil le plus efficace est un estimateur immobilier en ligne sur votre site. Le propriétaire entrez son adresse, reçoit une estimation approximative, et vous récupérez ses coordonnées. En échange d\'une estimation précise gratuite (en rendez-vous), vous avez un rendez-vous mandat à fort taux de conversion.',
      },
      {
        question: 'Vaut-il mieux investir dans SeLoger ou dans son propre site ?',
        reponse: 'Les deux sont complémentaires mais les priorités diffèrent : SeLoger vous donne une visibilité immédiate sur les acheteurs, mais votre propre site construit votre marque locale à long terme, capte les vendeurs (plutôt que les acheteurs) et vous appartient sans abonnement croissant. Je recommande d\'investir d\'abord dans votre site propre.',
      },
      {
        question: 'Comment se démarquer des autres agences immobilières sur Google ?',
        reponse: 'En vous positionnant sur des recherches de niche géographique ("appartement à vendre Lyon 3e", "maison avec jardin Caluire") et sur des contenus locaux (guides des quartiers, prix au m² par secteur). C\'est une stratégie de contenu SEO à 12-18 mois mais qui crée une barrière à l\'entrée forte.',
      },
      {
        question: 'Les réseaux sociaux fonctionnent-ils pour une agence immobilière ?',
        reponse: 'Instagram est excellent pour mettre en scène des biens avec des photos et vidéos de qualité. Facebook pour toucher les 40-60 ans qui vendent souvent leur résidence principale. LinkedIn pour le commercial B2B (syndics, promoteurs). Je crée une stratégie multicanale adaptée à votre positionnement.',
      },
      {
        question: 'Combien coûte un site web pour une agence immobilière ?',
        reponse: 'Un site immobilier avec moteur de recherche de biens, connexion aux portails, outil d\'estimation et pages SEO locales est proposé à partir de 3 500 €. C\'est plus complexe qu\'un site vitrine classique, mais le ROI est très rapide dans l\'immobilier.',
      },
    ],
  },
  {
    slug: 'garage-automobile',
    nom: 'Garage automobile',
    nomPluriel: 'Garages automobiles',
    icon: 'Wrench',
    description: 'Remplissez votre atelier et fidélisez vos clients pour l\'entretien annuel, grâce à une présence locale imparable sur Google.',
    problemes: [
      'Concurrence des chaînes nationales (Norauto, Midas) mieux référencées',
      'Pas de site web ou site non trouvable localement',
      'Clients qui ne reviennent pas pour l\'entretien annuel',
      'Difficultés à se positionner sur les urgences (crevaison, panne)',
    ],
    solutions: [
      'Site web avec prise de rendez-vous en ligne',
      'SEO local "garagiste [ville]", "révision voiture [ville]"',
      'Google Ads pour les recherches urgentes',
      'Emails automatiques de rappel d\'entretien',
    ],
    keywords: ['site web garage auto', 'SEO garagiste', 'marketing garage automobile', 'rendez-vous garage en ligne'],
    faqs: [
      {
        question: 'Comment attirer plus de clients dans mon garage grâce à Google ?',
        reponse: 'La clé est d\'apparaître en premier quand quelqu\'un cherche "garagiste [votre ville]" ou "révision voiture [votre ville]". Cela passe par un Google Business Profile complet avec photos, horaires et avis, et un site web optimisé avec vos services et votre localisation. En 3 à 4 mois, vous pouvez atteindre le top 3 local.',
      },
      {
        question: 'Est-ce que la prise de rendez-vous en ligne est vraiment utile pour un garage ?',
        reponse: 'Oui, 35% des prises de rendez-vous se font désormais en dehors des heures d\'ouverture. Un système de réservation en ligne disponible 24h/24 capte ces clients qui, autrement, iraient chez un concurrent plus accessible. C\'est aussi un gain de temps pour votre secrétariat.',
      },
      {
        question: 'Comment fidéliser mes clients pour l\'entretien annuel ?',
        reponse: 'Je mets en place des rappels automatiques par email ou SMS : "Il y a un an, vous avez fait votre révision chez nous. Votre prochain contrôle technique est dans 3 mois." Ces rappels automatisés ont un taux d\'ouverture de 40%+ et génèrent des réservations sans effort de votre part.',
      },
      {
        question: 'Comment me différencier des grandes chaînes comme Norauto ou Midas ?',
        reponse: 'Votre avantage est le relationnel, la connaissance de l\'historique du véhicule et la transparence sur les réparations. Le digital doit valoriser ces points : photos de votre équipe, témoignages clients authentiques, explications des réparations en vidéo. Les clients qui cherchent un garagiste de confiance ne veulent pas d\'une chaîne anonyme.',
      },
      {
        question: 'Quel budget faut-il prévoir pour le marketing d\'un garage automobile ?',
        reponse: 'Pour un garage qui veut être visible localement : site web (1 200 à 2 000 €) + Google Business Profile optimisé (inclus) + Google Ads (300 à 500 €/mois selon la ville) + rappels automatiques (100 à 200 €/mois). L\'ensemble génère en général 20 à 40 nouveaux clients/mois selon la zone.',
      },
    ],
  },
  {
    slug: 'salon-beaute',
    nom: 'Salon de beauté',
    nomPluriel: 'Salons de beauté',
    icon: 'Sparkles',
    description: 'Agenda toujours plein, zéro no-show, avec un site qui prend les réservations et des réseaux qui font rêver vos clientes.',
    problemes: [
      'Agenda avec des créneaux vides impossibles à remplir en urgence',
      'No-shows fréquents sans système de confirmation',
      'Visibilité insuffisante sur Instagram et Google',
      'Dépendance au bouche-à-oreille uniquement',
    ],
    solutions: [
      'Site web avec réservation en ligne et confirmation automatique',
      'SEO local "coiffeur/esthéticienne [ville]"',
      'Instagram professionnel avec portfolio de réalisations',
      'SMS de rappel 24h avant chaque rendez-vous',
    ],
    keywords: ['site web salon coiffure', 'SEO esthéticienne', 'réservation en ligne salon beauté', 'Instagram salon beauté'],
    faqs: [
      {
        question: 'Comment réduire les no-shows dans mon salon ?',
        reponse: 'La combinaison la plus efficace est : confirmation automatique par email à la réservation + SMS de rappel 24h avant + SMS de rappel 2h avant. Cette séquence réduit les no-shows de 70 à 80% selon les salons. Je mets en place ce système automatisé qui ne nécessite aucune action de votre part.',
      },
      {
        question: 'Quelle plateforme de réservation en ligne choisir pour un salon de beauté ?',
        reponse: 'Planity, Treatwell et Booksy sont les leaders pour les salons. L\'avantage de les intégrer à votre site plutôt que de renvoyer sur leur plateforme : vous gardez la relation client et évitez les commissions. Je recommande Planity pour les petits salons et Treatwell pour les instituts qui veulent de la visibilité plateforme.',
      },
      {
        question: 'Instagram est-il vraiment indispensable pour un salon de beauté ?',
        reponse: 'Oui, Instagram est le canal numéro 1 pour les salons de beauté. 80% des décisions de réservation sont influencées par des photos de réalisations vues sur Instagram. Je vous aide à créer un feed cohérent et attractif, et à utiliser les Reels pour toucher de nouveaux clients.',
      },
      {
        question: 'Comment attirer de nouveaux clients dans mon salon grâce au digital ?',
        reponse: 'La stratégie complète : Google Business Profile avec photos (capte les recherches "coiffeur près de chez moi") + Instagram actif (fidélise et attire par recommandation) + Google Ads pour les lancements ou creux saisonniers + programme de parrainage digital. Ensemble, ces canaux peuvent vous amener 20 à 40 nouveaux clients/mois.',
      },
      {
        question: 'Puis-je vendre des produits de beauté en ligne sur mon site ?',
        reponse: 'Absolument, et c\'est une source de revenus complémentaires intéressante. Je peux créer une boutique en ligne simple avec vos produits phares (shampoings, soins, cosmétiques). Vos clientes fidèles achèteront volontiers les produits que vous leur recommandez en consultation.',
      },
    ],
  },
  {
    slug: 'cabinet-comptable',
    nom: 'Cabinet comptable',
    nomPluriel: 'Cabinets comptables',
    icon: 'BarChart3',
    description: 'Attirez des entrepreneurs qui cherchent un expert-comptable de confiance en ligne, pas juste le moins cher.',
    problemes: [
      'Site web inexistant ou qui ne génère aucun contact',
      'Difficulté à expliquer votre valeur ajoutée vs un comptable classique',
      'Nouveaux clients qui viennent uniquement du réseau',
      'Manque de visibilité sur les recherches Google locales',
    ],
    solutions: [
      'Site web professionnel avec présentation des services et secteurs',
      'SEO local "expert-comptable [ville]" et spécialités',
      'Contenu de confiance : guides fiscaux, conseils entrepreneurs',
      'Formulaire de premier contact qualifiant',
    ],
    keywords: ['site web expert-comptable', 'SEO cabinet comptable', 'marketing expert-comptable', 'référencement comptable'],
    faqs: [
      {
        question: 'Un expert-comptable a-t-il le droit de faire de la publicité ?',
        reponse: 'Oui, depuis 2016, les experts-comptables peuvent faire de la publicité, sous réserve qu\'elle soit loyale, honnête et ne portant pas atteinte à la dignité de la profession. Un site web informatif, des articles de blog, une fiche Google Business et des publicités Google Ads sont tous autorisés.',
      },
      {
        question: 'Comment un expert-comptable peut-il attirer des clients en ligne ?',
        reponse: 'La stratégie la plus efficace est le contenu d\'expertise : guides pratiques sur la création d\'entreprise, les charges sociales, la TVA... Ces articles positionnent votre cabinet comme référence, attirent des entrepreneurs en phase de recherche, et convertissent naturellement en prospects qualifiés.',
      },
      {
        question: 'Quels secteurs d\'activité cibler en priorité pour un cabinet comptable ?',
        reponse: 'Je recommande de vous spécialiser digitalement sur 2 à 3 secteurs que vous maîtrisez bien (restauration, BTP, professions médicales...) et de créer des pages dédiées. Un entrepreneur de restaurant qui cherche un comptable spécialisé restaurant sera bien plus enclin à vous contacter qu\'un cabinet généraliste.',
      },
      {
        question: 'Combien de temps pour avoir les premiers résultats SEO pour un cabinet comptable ?',
        reponse: 'Le SEO pour un cabinet comptable est modérément concurrentiel selon les villes. En 4 à 6 mois de travail régulier, vous pouvez atteindre la première page pour "expert-comptable [votre ville]". Les mots-clés de niche (secteurs spécifiques) sont souvent plus rapides à positionner.',
      },
      {
        question: 'Est-ce que le digital peut remplacer le réseau pour trouver des clients ?',
        reponse: 'Non, les deux sont complémentaires. Votre réseau reste votre meilleur canal, mais le digital multiplie votre portée : quand quelqu\'un vous recommande, la première chose qu\'il fait est de chercher votre nom sur Google. Un site professionnel et des avis positifs rassurent et convertissent ces prospects déjà chauds.',
      },
    ],
  },
  {
    slug: 'entreprise-transport',
    nom: 'Entreprise de transport',
    nomPluriel: 'Entreprises de transport',
    icon: 'Truck',
    description: 'Obtenez des demandes de devis qualifiées en ligne et construisez une réputation de fiabilité qui justifie vos tarifs.',
    problemes: [
      'Site web inexistant ou non référencé localement',
      'Difficultés à se démarquer sur un marché très concurrentiel sur les prix',
      'Pas de présence digitale pour les recherches B2B',
      'Manque d\'outils pour les devis et la gestion des demandes',
    ],
    solutions: [
      'Site web professionnel avec formulaire de devis détaillé',
      'SEO sur "transport [type] [région]" et mots-clés B2B',
      'Google Ads ciblant les directeurs logistiques et acheteurs',
      'LinkedIn pour la prospection commerciale',
    ],
    keywords: ['site web transport', 'SEO entreprise transport', 'marketing transport logistique', 'devis transport en ligne'],
    faqs: [
      {
        question: 'Comment trouver de nouveaux clients pour une entreprise de transport ?',
        reponse: 'Le digital offre plusieurs canaux efficaces : SEO local pour les recherches "transport [ville]", Google Ads pour les recherches commerciales urgentes, LinkedIn pour la prospection directe auprès des directeurs achats et logistique, et un site avec formulaire de devis qualifiant. La combinaison génère des contacts B2B qualifiés de manière régulière.',
      },
      {
        question: 'Est-ce que LinkedIn est utile pour une entreprise de transport ?',
        reponse: 'Oui, LinkedIn est particulièrement adapté au transport B2B. C\'est là que se trouvent les directeurs logistique, les acheteurs et les responsables supply chain des entreprises. Je vous aide à optimiser votre profil, créer du contenu de confiance (ponctualité, certifications, zones desservies) et prospecter directement.',
      },
      {
        question: 'Comment se différencier d\'un concurrent moins cher en transport ?',
        reponse: 'Votre site web et vos communications doivent mettre en avant ce qui justifie votre tarif : fiabilité prouvée (témoignages, taux de livraison à l\'heure), certifications (ISO, ADR...), technologies de suivi, disponibilité du service client. Les clients B2B ne choisissent pas toujours le moins cher : ils choisissent le plus fiable.',
      },
      {
        question: 'Un formulaire de devis en ligne est-il vraiment efficace dans le transport ?',
        reponse: 'Oui, à condition qu\'il soit bien conçu : questions précises sur le type de marchandise, le volume, les délais, la régularité. Un formulaire qualifiant vous évite les appels chronophages pour des demandes incompatibles avec votre activité, et vous met en contact direct avec des prospects sérieux.',
      },
      {
        question: 'Combien coûte un site web pour une entreprise de transport ?',
        reponse: 'Un site web transport avec formulaire de devis, présentation des services et zones d\'intervention, et optimisation SEO locale est proposé à partir de 1 800 €. Pour une entreprise avec plusieurs services (messagerie, affrètement, déménagement), compter 2 500 à 4 000 €.',
      },
    ],
  },
]

export function getSecteurBySlug(slug: string): SecteurData | undefined {
  return secteurs.find((s) => s.slug === slug)
}
