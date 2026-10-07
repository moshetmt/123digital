export interface EtudeDeCas {
  slug: 'clim69' | 'rhone-deconstruction' | 'aplus-audition' | 'habad-etudiants-lyon'
  titre: string
  accroche: string
  metaTitle: string
  metaDescription: string
  client: { nom: string; metier: string; ville: string; url?: string }
  services: string[]
  commande: string[]
  coulisses: string[]
  etapes: { titre: string; texte: string; service: string }[]
  choix: { titre: string; texte: string }[]
  resultat: string[]
  faq: { question: string; reponse: string }[]
  maquette: string
}

export const etudesDeCas: EtudeDeCas[] = [
  {
    slug: 'clim69',
    titre: 'Site internet climaticien Lyon : Clim69 fait sonner le téléphone à Villeurbanne',
    accroche:
      'Comment on a construit le site, les pages locales et le compte Google Ads d’un artisan climaticien pour que le bon client appelle au bon moment.',
    metaTitle: 'Site internet climaticien Lyon : cas Clim69 | 123 Digital',
    metaDescription:
      'Site, 19 pages locales, Google Ads et suivi des appels pour un climaticien de Villeurbanne. Le récit complet de la commande, des choix et des coulisses.',
    client: {
      nom: 'Clim69',
      metier: 'Artisan climaticien',
      ville: 'Villeurbanne',
      url: 'https://clim69.fr',
    },
    services: ['creation-site-web', 'seo', 'publicite-en-ligne'],
    commande: [
      'Le patron de Clim69 installe, dépanne et entretient des climatisations depuis plus de dix ans, à Villeurbanne et autour de Lyon. Il travaille sur toutes les marques, il connaît ses machines par cœur et il a un carnet de clients satisfaits. Son problème tenait en une phrase : « Le bouche-à-oreille ne suffit plus, et quand j’ai un trou dans mon planning, je n’ai aucun levier pour le remplir. »',
      'Il voulait trois choses. Un site qui lui ressemble, avec des mots d’artisan et pas des mots de plaquette. Une présence sur Google quand un particulier tape « clim en panne » un soir de canicule. Et la certitude de savoir d’où viennent les appels, parce qu’il avait déjà payé de la publicité sans jamais savoir ce qu’elle lui rapportait.',
    ],
    coulisses: [
      'Un climaticien ne vend pas un appareil. Il vend une pièce où l’on dort bien en août et une maison chaude en janvier, puisque la climatisation réversible chauffe aussi. Ce détail change tout dans la manière d’en parler : la clim se cherche en été, mais elle s’installe aussi pour l’hiver, et le site doit parler aux deux saisons.',
      'Autre découverte de terrain : le dépannage et l’installation attirent deux clients différents. Celui qui dépanne a chaud, il est pressé, il veut un numéro à composer et une réponse en une phrase. Celui qui installe compare, lit, hésite, demande plusieurs devis. Le premier a besoin d’un bouton d’appel visible dès l’écran d’accueil. Le second a besoin d’une page qui répond à ses questions avant qu’il les pose.',
      'On a aussi découvert que certaines recherches font sonner le téléphone pour rien. Des gens appelaient pour de la climatisation de voiture, un métier que Clim69 ne fait pas. Il fallait apprendre au compte Google Ads à les écarter.',
    ],
    etapes: [
      {
        titre: 'Écouter le métier avant d’ouvrir un ordinateur',
        texte:
          'Une longue conversation avec le patron : quelles pannes reviennent, quelles marques, quelles communes, quels clients il aime servir. On en a tiré la liste des services et des vraies questions que posent ses clients. Ce travail alimente tout le reste, les titres comme les annonces.',
        service: 'seo',
      },
      {
        titre: 'Reconstruire le site pour qu’il se lise d’un pouce',
        texte:
          'Le nouveau site de climaticien à Lyon est écrit en Next.js, un outil qui produit des pages très rapides. Sur téléphone, le numéro et le devis restent à portée du pouce. Chaque service a sa page : installation, dépannage, entretien, pompe à chaleur.',
        service: 'creation-site-web',
      },
      {
        titre: 'Ouvrir 19 pages locales, une par territoire',
        texte:
          'Quelqu’un qui cherche un climaticien à Oullins ne veut pas lire une page générique sur Lyon. Chaque ville a sa page, avec ses particularités : immeubles anciens, maisons de lotissement, copropriétés. Le texte est écrit pour la commune, pas copié d’une page voisine avec un nom de ville changé.',
        service: 'seo',
      },
      {
        titre: 'Monter le compte Google Ads de zéro',
        texte:
          'Les annonces Google Ads de ce climaticien visent d’abord le dépannage, là où l’urgence fait décrocher le téléphone. On a listé les recherches à écarter dès le premier jour, dont la clim de voiture, et gardé l’affichage à toute heure de la semaine.',
        service: 'publicite-en-ligne',
      },
      {
        titre: 'Brancher une feuille Google pour suivre les appels et les devis',
        texte:
          'Chaque demande de devis atterrit dans une feuille Google que le patron lit sur son téléphone. Il y note ce qui s’est passé ensuite : devis envoyé, chantier signé, rien. Pour la première fois, il voit quelle publicité lui amène des chantiers et laquelle lui amène des curieux.',
        service: 'automatisation-marketing',
      },
    ],
    choix: [
      {
        titre: 'Garder toutes les marques en avant',
        texte:
          'Clim69 répare Daikin, Mitsubishi, Atlantic, Toshiba et les autres. C’est un argument rare pour un client dont la machine d’une marque rare tombe en panne. On ne ferme donc jamais une recherche sur une marque, même quand elle semble périphérique.',
      },
      {
        titre: 'Écarter les recherches qui ne sont pas du métier',
        texte:
          'La clim de voiture, le froid commercial et certaines recherches de curieux n’apportent rien. On les a exclues de la publicité et on a gardé les mots du dépannage, comme « froid » ou « ne refroidit plus », qui sont le cœur du métier.',
      },
      {
        titre: 'Ne jamais publier de montant',
        texte:
          'Le patron préfère parler prix au téléphone, sur la base d’un besoin précis. Les pages parlent de devis gratuit et de transparence, sans grille tarifaire. Ce choix évite aussi de se faire comparer à un tarif qui ne correspond pas à la maison de la personne.',
      },
      {
        titre: 'Écrire les pages locales à la main, une par une',
        texte:
          'Dupliquer une page en changeant le nom de la ville est la voie rapide, et Google la repère. On a préféré écrire chaque page avec ce qui existe vraiment sur place, puis vérifier qu’elle apporte plus que sa voisine.',
      },
    ],
    resultat: [
      'Le patron ne dépend plus seulement du bouche-à-oreille. Quand un voisin de Villeurbanne ou d’Oullins cherche un dépannage, Clim69 apparaît dans les annonces, dans les pages locales et sur sa fiche Google Business Profile, la fiche qui s’affiche sur la carte. Les appels qui arrivent concernent son métier, ses marques et sa zone.',
      'Il sait aussi d’où viennent ses chantiers. La feuille de suivi remplace l’intuition par une lecture claire : ce canal amène des devis, celui-là amène des curieux. Ses décisions de publicité reposent désormais sur ce qu’il voit, et il peut les prendre depuis son téléphone.',
    ],
    faq: [
      {
        question: 'Combien de temps faut-il pour avoir un site internet de climaticien à Lyon qui apporte des appels ?',
        reponse:
          'Le site se construit en quelques semaines, et les annonces Google Ads peuvent apporter des appels dès leur lancement. Le référencement naturel demande plus de patience : les pages locales mettent plusieurs mois à s’installer. Les deux se complètent, la publicité couvre la période où le site gagne sa place.',
      },
      {
        question: 'Faut-il une page par ville pour un artisan qui intervient dans plusieurs communes ?',
        reponse:
          'Oui, à condition que chaque page dise quelque chose de vrai sur la commune. Une page par ville qui répète le même texte ne sert à rien. Chez Clim69, chaque page décrit le bâti, les habitudes et les besoins locaux, ce qui la rend utile au visiteur comme à Google.',
      },
      {
        question: 'Comment savoir si mes annonces Google Ads de climatisation me rapportent des chantiers ?',
        reponse:
          'Il faut noter ce qui se passe après l’appel. Une feuille de suivi qui relie chaque demande à un devis puis à un chantier suffit pour commencer. Sans elle, on mesure des clics. Avec elle, on mesure des chantiers.',
      },
    ],
    maquette: '/images/realisations/clim69-maquette.webp',
  },
  {
    slug: 'rhone-deconstruction',
    titre: 'Site démolition Lyon : un site vitrine pour Rhône Déconstruction',
    accroche:
      'Comment on a donné un visage et une structure de référencement local à une entreprise de démolition, de curage et de déconstruction de la région lyonnaise.',
    metaTitle: 'Site démolition Lyon : Rhône Déconstruction | 123 Digital',
    metaDescription:
      'Site vitrine et SEO local pour une entreprise de démolition et de déconstruction à Lyon. Découvrez la commande, les choix et la méthode, étape par étape.',
    client: {
      nom: 'Rhône Déconstruction',
      metier: 'Démolition, curage et déconstruction',
      ville: 'Lyon',
      url: undefined,
    },
    services: ['creation-site-web', 'seo'],
    commande: [
      'Rhône Déconstruction démolit, cure et déconstruit des bâtiments à Lyon et dans la région, pour des professionnels comme pour des particuliers. L’entreprise avait du savoir-faire, du matériel et des chantiers, mais presque aucune existence sur Internet. Quand un promoteur ou un propriétaire cherchait une entreprise de démolition, elle n’apparaissait nulle part.',
      'La demande était claire : un site vitrine qui rassure, qui explique les métiers sans jargon de chantier et qui se fasse trouver dans la région. « On fait un travail sérieux et dangereux, disait en substance le dirigeant, et sur Internet, on doit donner la même impression. »',
    ],
    coulisses: [
      'Un chantier de démolition ne ressemble pas à ce qu’on imagine. Avant la première pelle, il y a des diagnostics, des autorisations, la déconnexion des réseaux, le tri des matériaux. Détruire un bâtiment demande de la méthode. Le curage, qui consiste à vider un immeuble de ses cloisons, de ses faux plafonds et de ses installations avant de le rénover, ressemble à un déménagement à l’échelle d’un étage.',
      'On a aussi appris que les clients se divisent en deux familles. Les professionnels, promoteurs, syndics, entreprises du bâtiment, veulent savoir si l’entreprise est organisée et fiable. Les particuliers, eux, ont peur : peur de la poussière, du bruit, des voisins, du reste de la maison. Un site qui parle aux deux doit répondre à des inquiétudes très différentes.',
      'Enfin, le mot « déconstruction » parle peu au grand public, alors que « démolition » est celui qu’on tape sur Google. Le site devait employer les deux, expliquer la différence en une phrase et ne perdre personne en route.',
    ],
    etapes: [
      {
        titre: 'Visiter le métier et lister les chantiers types',
        texte:
          'On a commencé par comprendre les différents travaux : démolition complète, démolition partielle, curage, déconstruction avec tri des matériaux. Chaque type de chantier devient une page, avec ses étapes, ses contraintes et le genre de client qui le demande.',
        service: 'seo',
      },
      {
        titre: 'Choisir un outil que l’entreprise peut tenir seule',
        texte:
          'Le site est fait sous WordPress, un outil que beaucoup de gens savent manier. L’équipe peut ajouter un chantier ou modifier un texte sans nous appeler. Un site vitrine d’entreprise de démolition doit évoluer avec les chantiers.',
        service: 'creation-site-web',
      },
      {
        titre: 'Construire la structure du site pour le référencement local',
        texte:
          'Le site est organisé pour la recherche « démolition Lyon » et pour les communes de la région Auvergne-Rhône-Alpes. Un site démolition à Lyon qui veut se faire trouver s’organise en couches : les métiers, puis les territoires, puis les réponses aux questions courantes.',
        service: 'seo',
      },
      {
        titre: 'Écrire pour deux lecteurs en même temps',
        texte:
          'Chaque page commence par une réponse simple en deux phrases, lisible par un particulier inquiet. Elle se poursuit par le détail technique qu’un conducteur de travaux attend. On a gardé les mots du chantier mais on les a expliqués à chaque première apparition.',
        service: 'creation-site-web',
      },
      {
        titre: 'Poser la demande de devis au bon endroit',
        texte:
          'Le formulaire est court et se trouve sur chaque page. Il demande le type de chantier, l’adresse et un moyen de rappeler. L’entreprise reçoit des demandes qu’elle peut chiffrer sans pose de dix questions supplémentaires.',
        service: 'creation-site-web',
      },
    ],
    choix: [
      {
        titre: 'Employer « démolition » et « déconstruction » ensemble',
        texte:
          'Les clients tapent « démolition ». Les professionnels de la rénovation disent « déconstruction ». Le site emploie les deux mots, définis en une phrase, pour répondre à chacun dans sa langue.',
      },
      {
        titre: 'Parler de méthode avant de parler de machines',
        texte:
          'Une photo de pelleteuse impressionne, mais elle ne rassure pas un propriétaire. On a mis en avant le déroulé : diagnostic, autorisations, sécurisation du site, travaux, tri et évacuation. C’est ce qui montre qu’on sait ce qu’on fait.',
      },
      {
        titre: 'Bâtir un site en couches géographiques',
        texte:
          'On part de Lyon, puis on ouvre vers les communes et les départements voisins. Ce découpage permet de cibler la région sans écrire des dizaines de pages creuses.',
      },
    ],
    resultat: [
      'Rhône Déconstruction dispose d’une vitrine à la hauteur de son travail. Un promoteur qui prépare un projet comprend en quelques minutes ce que l’entreprise fait, comment elle s’organise et comment la joindre. Un particulier trouve des réponses à ses inquiétudes avant même de décrocher.',
      'L’entreprise a aussi une base solide pour le référencement. Sa structure par métiers et par territoires permet d’ajouter des pages au fil des chantiers, sans refaire l’ensemble. Le site se complète au rythme de l’activité.',
    ],
    faq: [
      {
        question: 'Pourquoi une entreprise de démolition a-t-elle besoin d’un site à Lyon ?',
        reponse:
          'Parce que ses clients cherchent sur Google avant d’appeler. Un promoteur ou un propriétaire qui tape « démolition Lyon » compare trois ou quatre entreprises en quelques minutes. Celle qui n’a pas de site, ou un site flou, n’entre pas dans la comparaison.',
      },
      {
        question: 'Quelle différence entre démolition, curage et déconstruction ?',
        reponse:
          'La démolition abat tout ou partie d’un bâtiment. Le curage vide l’intérieur : cloisons, plafonds, installations. La déconstruction démonte le bâtiment en triant les matériaux pour les réemployer ou les recycler. Un bon site explique ces trois mots simplement.',
      },
      {
        question: 'Un site WordPress suffit-il pour un site de démolition qui doit se faire référencer ?',
        reponse:
          'Oui, si la structure est pensée pour le référencement : pages par métier, pages par territoire, vitesse correcte, balises soignées. WordPress offre aussi l’avantage de pouvoir être modifié par l’entreprise elle-même.',
      },
    ],
    maquette: '/images/realisations/rhone-deconstruction-maquette.webp',
  },
  {
    slug: 'aplus-audition',
    titre: 'Site internet audioprothésiste Cannes : A+ Audition repart de zéro, section par section',
    accroche:
      'Douze propositions refusées, un déclic, puis un site calme, lisible par tous les âges, pour un cabinet d’audioprothèse du quartier de la Croisette.',
    metaTitle: 'Site audioprothésiste Cannes : cas A+ Audition | 123 Digital',
    metaDescription:
      'Refonte du site d’un audioprothésiste à Cannes : douze propositions rejetées, puis un site médical, sobre et lisible. Le récit de la commande aux choix.',
    client: {
      nom: 'A+ Audition',
      metier: 'Audioprothésiste',
      ville: 'Cannes',
      url: 'https://aplusaudition.fr',
    },
    services: ['creation-site-web', 'seo', 'branding'],
    commande: [
      'A+ Audition est un cabinet d’audioprothèse installé dans le quartier Croisette et Alexandre III, à Cannes. Son gérant a un diplôme d’État, un centre soigné aux couleurs de sable et d’or, une enseigne qu’on repère de loin. Son site, lui, ne ressemblait à rien de tout cela : un ancien WordPress sans titre principal, sans description, avec des horaires faux et une adresse e-mail qui n’existait pas.',
      'La commande : un site neuf, qui donne envie de pousser la porte du centre et de prendre rendez-vous sur Doctolib. « Je veux que ça me ressemble », a-t-il dit. Cette phrase simple a tenu lieu de cahier des charges pendant des semaines.',
    ],
    coulisses: [
      'Un cabinet d’audition accueille surtout des personnes qui entendent moins bien et qui hésitent depuis longtemps. Elles viennent parfois après des années de repli. Le site doit donc être lu à 18 pixels minimum, avec un contraste fort, de gros boutons et zéro animation qui bouge. Beaucoup de visiteurs utilisent un téléphone ; d’autres sont des enfants qui cherchent pour leurs parents.',
      'Le métier est aussi encadré. L’audioprothésiste ne pose pas de diagnostic médical : il appareille sur ordonnance. Le site ne peut donc pas promettre de miracle ni afficher d’offre qui ressemble à une promotion. On parle du bilan gratuit, de l’essai de 30 jours et des appareils pris en charge à 100 % dans le cadre du 100 % santé, avec des mots neutres et vérifiables.',
      'Le détail qui a tout fait basculer : pour ce client, le quartier est la première raison de choix. Les gens veulent un audioprothésiste près de chez eux, qu’ils connaissent de vue. La devanture et l’enseigne devaient donc être les héros du site.',
    ],
    etapes: [
      {
        titre: 'Auditer l’ancien site et le mettre de côté',
        texte:
          'On a archivé les trois anciennes pages, relevé leurs défauts et noté ce qu’il fallait garder : le centre, les horaires réels, la photo de la devanture. L’ancien contenu a servi de matériau, jamais de modèle.',
        service: 'seo',
      },
      {
        titre: 'Reconstruire une section à la fois, sur téléphone',
        texte:
          'Après plusieurs refus globaux, on a changé de méthode : une seule section à la fois, jugée sur téléphone, validée avant de passer à la suivante. Bannière, centre, parcours, portrait du gérant, avis, accès. Le site s’est assemblé comme un meuble, pièce après pièce.',
        service: 'creation-site-web',
      },
      {
        titre: 'Tirer la palette de l’enseigne',
        texte:
          'Des maquettes en bleu marine avaient été refusées. La couleur est venue de la devanture elle-même : un écru, un sable, un or d’enseigne, un brun profond pour le texte. Une seule police, des angles à peine arrondis, des boutons en pilule.',
        service: 'branding',
      },
      {
        titre: 'Écrire la page « bilan auditif à Cannes »',
        texte:
          'Pour le référencement, une page répond à la question que tape un futur patient : où faire un bilan auditif à Cannes, comment ça se passe, combien de temps ça dure. Elle précise que le bilan n’est pas un diagnostic médical. Aucun déroulé n’a été inventé.',
        service: 'seo',
      },
      {
        titre: 'Mettre en ligne et déclarer le site à Google',
        texte:
          'Bascule du nom de domaine, vérification que chaque page répond, déclaration à la Search Console et correction de l’adresse du site sur la fiche Google. Tout a été relu avant que le public ne voie quoi que ce soit.',
        service: 'creation-site-web',
      },
    ],
    choix: [
      {
        titre: 'Adopter la structure d’un site médical, pas ses couleurs',
        texte:
          'Les sites de santé ont une grammaire que les gens reconnaissent : une photo pleine largeur, quatre garanties, un parcours en étapes. On a gardé cette grammaire et abandonné le bleu hospitalier pour les teintes du centre.',
      },
      {
        titre: 'Ne rien afficher en prix',
        texte:
          'La loi encadre la publicité des audioprothésistes, et le gérant préfère un devis détaillé en cabinet. Le site parle de bilan gratuit, d’essai et de 100 % santé, sans montant. Aucune marque d’appareil n’est mise en avant non plus.',
      },
      {
        titre: 'Doctolib comme seul canal de rendez-vous',
        texte:
          'Pas de formulaire de plus à surveiller pour un cabinet de quartier. Chaque bouton mène à la prise de rendez-vous en ligne ou au téléphone, deux gestes que les patients connaissent déjà.',
      },
      {
        titre: 'Accessibilité avant esthétique',
        texte:
          'Un joli détail illisible pour un senior ne vaut rien. Corps de texte large, zones à toucher généreuses, aucune bannière qui défile : chaque embellissement a dû passer ce test.',
      },
    ],
    resultat: [
      'Le centre a maintenant un site qui lui ressemble. Quand un habitant du quartier tape le nom du cabinet ou cherche un audioprothésiste à Cannes, il trouve une page rassurante avec la vraie devanture, les vrais horaires et un bouton pour réserver. Les informations fausses de l’ancien site ont disparu.',
      'Le gérant a aussi gagné un site qu’il reconnaît. Le sable et l’or de l’enseigne se retrouvent à l’écran, et la présentation du centre garde le ton d’un cabinet de proximité. Les douze refus de départ ont servi : ils ont dessiné, par élimination, ce que ce site devait être.',
    ],
    faq: [
      {
        question: 'Pourquoi un audioprothésiste à Cannes a-t-il besoin d’un site internet dédié ?',
        reponse:
          'Les personnes qui cherchent un audioprothésiste regardent d’abord sur Google, puis sur le site. Un site clair, avec les horaires justes, l’adresse et un bouton de rendez-vous, rassure avant la première visite. La fiche Google et le site se renforcent l’un l’autre.',
      },
      {
        question: 'Peut-on afficher des prix sur le site d’un audioprothésiste ?',
        reponse:
          'La publicité des audioprothésistes est strictement encadrée. Chez A+ Audition, on a choisi de ne publier aucun montant et de présenter les offres de façon factuelle : bilan gratuit, essai de 30 jours, appareils 100 % santé sans reste à charge.',
      },
      {
        question: 'Comment rendre un site lisible pour des seniors ?',
        reponse:
          'Un texte d’au moins 18 pixels, un fort contraste, de grands boutons, aucune animation qui bouge et un vocabulaire simple. Ces règles bénéficient à tous les visiteurs, et Google apprécie aussi les pages rapides et claires.',
      },
    ],
    maquette: '/images/realisations/aplusaudition-maquette.webp',
  },
  {
    slug: 'habad-etudiants-lyon',
    titre: 'Communication association étudiante Lyon : l’identité et le suivi de Habad Étudiants Lyon',
    accroche:
      'Une charte graphique, des stories, des formulaires et des messages automatiques pour une association étudiante qui reçoit ses membres dans deux centres de la ville.',
    metaTitle: 'Communication association étudiante Lyon | 123 Digital',
    metaDescription:
      'Charte, Instagram, WhatsApp, inscriptions et messages d’anniversaire pour une association étudiante à Lyon. Le récit d’une communication de terrain.',
    client: {
      nom: 'Habad Étudiants Lyon',
      metier: 'Association étudiante',
      ville: 'Lyon',
      url: 'https://www.instagram.com/chabadoncampuslyon/',
    },
    services: ['branding', 'community-management', 'automatisation-marketing'],
    commande: [
      'Habad Étudiants Lyon accueille des étudiants juifs de la ville dans deux centres, l’un à Grange-Blanche, l’autre à Part-D.ieu. Au programme : des repas de Shabbat, de la nourriture cachère, des soirées de rentrée et un camion aménagé, le Mitsvah Truck, qui va rencontrer les étudiants sur leurs campus.',
      'La commande tenait à un constat : tout fonctionnait par le bouche-à-oreille, et les messages partaient en vrac dans des groupes WhatsApp. L’équipe voulait une identité reconnaissable, des publications qui donnent envie de venir, un moyen simple de s’inscrire et un suivi qui ne laisse personne sur le côté.',
    ],
    coulisses: [
      'Une association étudiante vit au rythme de l’année universitaire. Septembre est un sprint : des centaines de nouveaux visages, des fêtes, des événements chaque semaine. Puis viennent les examens, les départs en stage, les étudiants qui quittent Lyon mais restent dans les groupes. La communication doit tenir sur la durée avec peu de moyens et peu de temps.',
      'Autre réalité : les étudiants vivent sur leur téléphone, dans Instagram pour découvrir et dans WhatsApp pour décider. Une annonce dans un groupe de plusieurs centaines de membres se perd en quelques minutes. Un visuel soigné, posté au bon moment, se retient.',
      'Enfin, l’association a deux centres et deux publics géographiques. Les facs de médecine et de pharmacie sont proches de Grange-Blanche, tandis que les écoles et le tribunal sont proches de Part-D.ieu. Les messages devaient nommer le bon lieu pour chaque campus.',
    ],
    etapes: [
      {
        titre: 'Dessiner l’identité : une flamme, trois couleurs, un sceau',
        texte:
          'On a construit une charte autour d’une flamme, de trois couleurs de base et d’un sceau placé toujours au même endroit. Un étudiant qui fait défiler son fil reconnaît l’association avant d’avoir lu le texte.',
        service: 'branding',
      },
      {
        titre: 'Concevoir des carrousels et des stories pour Instagram',
        texte:
          'Les annonces d’événements prennent la forme de carrousels à faire glisser et de stories verticales. Pour les temps forts, la story s’appuie sur une vraie photo de la soirée, sans habillage lourd. L’objectif d’une communication d’association étudiante à Lyon : donner envie, pas remplir un tableau d’horaires.',
        service: 'community-management',
      },
      {
        titre: 'Adapter chaque visuel à son support',
        texte:
          'Le même message n’occupe pas la même place sur Instagram, en statut WhatsApp ou dans un groupe. On a fixé les zones à garder libres pour le sceau, le texte et les boutons, afin que rien ne soit coupé par l’interface du téléphone.',
        service: 'community-management',
      },
      {
        titre: 'Remplacer le « qui vient ? » par des formulaires d’inscription',
        texte:
          'Les inscriptions aux événements passent par Kehila, un outil de gestion d’associations. L’étudiant remplit un formulaire court, l’équipe voit qui vient et peut préparer les repas en conséquence.',
        service: 'automatisation-marketing',
      },
      {
        titre: 'Suivre les inscrits et fêter les anniversaires automatiquement',
        texte:
          'Chaque étudiant a une fiche. Un message d’anniversaire part la veille au soir, au bon moment du calendrier, avec un ton chaleureux et court. Les messages sont envoyés par l’équipe depuis son propre numéro, la machine prépare et l’humain garde la main.',
        service: 'automatisation-marketing',
      },
    ],
    choix: [
      {
        titre: 'Une photo naturelle plutôt qu’un aplat de couleur avec du texte',
        texte:
          'Les premières stories en aplat avec du texte paraissaient froides. On est passé à des photos prises sur le vif, avec une ouverture en forme de fenêtre qui laisse voir la flamme. L’ambiance prend le dessus sur l’information.',
      },
      {
        titre: 'Ne jamais montrer de visage ni de nom sans accord',
        texte:
          'Dans une communauté, l’image de chacun appartient à chacun. Les publications évitent de nommer ou de reconnaître une personne, sauf accord précis. L’association y gagne la confiance de ses membres.',
      },
      {
        titre: 'Laisser l’humain envoyer, pas la machine',
        texte:
          'Un message d’anniversaire envoyé par un robot sonne creux. L’automatisation prépare le texte et la liste, l’équipe appuie sur « envoyer » et peut ajouter un mot. Le gain de temps reste réel, la chaleur aussi.',
      },
    ],
    resultat: [
      'L’association a désormais une identité qu’on reconnaît en une seconde : la flamme, les couleurs, le sceau. Ses publications se ressemblent sans se répéter, chaque événement a son visuel, et les étudiants savent où et comment s’inscrire. Les groupes WhatsApp servent à retrouver les gens, pas à faire passer des annonces noyées.',
      'Le suivi change aussi la vie de l’équipe. Elle sait qui s’est inscrit, qui est parti de Lyon, qui mérite un petit mot. Aucun étudiant ne disparaît dans la masse, ce qui compte beaucoup pour une communauté qui vit de relations personnelles.',
    ],
    faq: [
      {
        question: 'Comment faire connaître une association étudiante à Lyon ?',
        reponse:
          'Il faut une identité visuelle reconnaissable, une présence régulière sur Instagram et dans les groupes WhatsApp, et un moyen simple de s’inscrire aux événements. Le bouche-à-oreille reste le meilleur moteur, la communication le rend visible et durable.',
      },
      {
        question: 'Faut-il un site internet pour une association étudiante ?',
        reponse:
          'Pas toujours. Pour une association dont le public vit sur Instagram et WhatsApp, un compte bien tenu, une charte graphique et des formulaires d’inscription couvrent l’essentiel. Un site devient utile quand il faut présenter des services ou recevoir des dons.',
      },
      {
        question: 'Peut-on automatiser des messages sans perdre le côté humain ?',
        reponse:
          'Oui, en automatisant la préparation et pas l’envoi. L’outil repère l’anniversaire et propose un texte, la personne de l’équipe valide et envoie depuis son propre numéro. Le message reste personnel, et personne n’oublie plus rien.',
      },
    ],
    maquette: '/images/realisations/habad-etudiants-lyon-maquette.webp',
  },
]
