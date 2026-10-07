export interface EtudeDeCas {
  slug: 'clim69' | 'aplus-audition' | 'habad-etudiants-lyon'
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
  /** « Ce qu'on a jeté en route » : les versions abandonnées, dans l'ordre, avec le pourquoi. */
  iterations?: { titre: string; texte: string }[]
  resultat: string[]
  faq: { question: string; reponse: string }[]
  maquette: string
}

export const etudesDeCas: EtudeDeCas[] = [
  {
    slug: 'clim69',
    titre: 'Site internet climaticien Lyon : Clim69 fait sonner le téléphone à Villeurbanne',
    accroche:
      'Comment on a construit le site, les pages locales et le compte Google Ads d’un artisan climaticien pour que le bon client appelle au bon moment, et les sept versions du site qu’on a jetées avant la bonne.',
    metaTitle: 'Site internet climaticien Lyon : cas Clim69 | 123 Digital',
    metaDescription:
      'Site, une trentaine de pages locales, Google Ads et suivi des appels pour un climaticien de Villeurbanne, avec les sept versions jetées en route.',
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
      'Il a posé une règle dès la première réunion : aucun prix affiché. Il parle tarif au téléphone, une fois le besoin compris. Cette règle a coupé court à plusieurs idées séduisantes, dont un simulateur de prix en soixante secondes, et elle a guidé tout le chantier.',
    ],
    coulisses: [
      'Un climaticien ne vend pas un appareil. Il vend une pièce où l’on dort bien en août et une maison chaude en janvier, puisque la climatisation réversible chauffe aussi. Ce détail change la manière d’en parler : la clim se cherche en été, elle s’installe aussi pour l’hiver. Une extension « pompe à chaleur en panne » attend en pause dans le compte, prête pour le premier froid.',
      'Le dépannage et l’installation attirent deux clients différents. Celui qui dépanne a chaud, il est pressé, il veut un numéro et une réponse en une phrase. Celui qui installe compare, lit, hésite, demande plusieurs devis. Côté annonces, certaines recherches faisaient sonner le téléphone pour rien : des appels pour de la climatisation de voiture, un métier que Clim69 ne fait pas. Le mot « auto » est devenu un négatif définitif.',
      'Le calendrier du client a dicté celui des annonces. Elles se coupent seules pendant ses fermetures d’été et se rallument à la reprise, vérifié par les journaux de Google après chaque bascule. Quand la canicule de juillet s’annonçait, le client a donné son accord pour renforcer le dépannage, là où les appels arrivaient. Un dimanche posait question : Google Ads n’y voyait aucune demande, alors que la feuille de leads du client y montrait des demandes d’installation. On a gardé le dimanche, parce que la feuille compte les chantiers et que Google ne compte que ce qu’il voit.',
      'La mesure a été notre premier chantier de la première semaine. Le compte affichait zéro conversion alors que le patron venait de recevoir une vraie demande de devis. Le coupable était un réglage de liaison entre Google Analytics et Google Ads, désactivé par défaut. Plus tard, un test sur la nouvelle version du site a révélé que le formulaire de l’ancien site n’enregistrait plus rien : l’espace de stockage de la feuille de suivi était plein.',
    ],
    etapes: [
      {
        titre: 'Écouter le métier avant d’ouvrir un ordinateur',
        texte:
          'Une longue conversation avec le patron : quelles pannes reviennent, quelles marques, quelles communes, quels clients il aime servir. On en a tiré la liste des services et des vraies questions que posent ses clients. Ce travail alimente tout le reste, les titres comme les annonces.',
        service: 'seo',
      },
      {
        titre: 'Monter le compte Google Ads de zéro, en visant le dépannage',
        texte:
          'Les annonces Google Ads de ce climaticien visent d’abord le dépannage, là où l’urgence fait décrocher le téléphone. On a listé les recherches à écarter dès le premier jour, dont la clim de voiture, et gardé l’affichage toute la semaine, dimanche compris.',
        service: 'publicite-en-ligne',
      },
      {
        titre: 'Mesurer chaque appel, même quand le réglage casse',
        texte:
          'Première semaine, zéro conversion affichée pour une demande de devis bien réelle. On a retrouvé le réglage fautif, corrigé le comptage des devis, recréé le suivi des clics sur le numéro et posé un test de bout en bout. Depuis, un appel compte pour un appel.',
        service: 'automatisation-marketing',
      },
      {
        titre: 'Refaire le logo et valider la fiche Google',
        texte:
          'Le logo d’origine mélangeait deux polices et une icône générique de vagues. Plusieurs pistes ont défilé, dont un flocon, avant de retenir une unité murale et un groupe extérieur, avec un voyant bleu pour le froid et un voyant orange pour le chaud. La fiche Google Business Profile, la fiche qui s’affiche sur la carte, a été validée avec le nom et les horaires choisis par le client.',
        service: 'creation-site-web',
      },
      {
        titre: 'Reconstruire le site pour qu’il se lise d’un pouce',
        texte:
          'Le nouveau site de climaticien à Lyon est écrit en Next.js, un outil qui produit des pages très rapides. Sur téléphone, le numéro et le devis restent à portée du pouce. Le site a été jugé sur un vrai téléphone, via une adresse de démonstration, et plus sur des captures d’écran.',
        service: 'creation-site-web',
      },
      {
        titre: 'Passer de 19 à une trentaine de pages locales',
        texte:
          'Quelqu’un qui cherche un climaticien à Oullins ne veut pas lire une page générique sur Lyon. Chaque ville a sa page, avec ses particularités : immeubles anciens, maisons de lotissement, copropriétés. Le texte est écrit pour la commune, jamais copié d’une page voisine avec un nom changé.',
        service: 'seo',
      },
      {
        titre: 'Brancher une feuille Google qui trie le vrai du faux',
        texte:
          'Chaque demande de devis atterrit dans une feuille Google que le patron lit sur son téléphone, grâce à un petit programme maison (un Apps Script). Un filtre anti-spam renvoie les envois suspects vers un onglet à part, et un verrou empêche le double clic. Le patron y note la suite : devis envoyé, chantier signé, rien.',
        service: 'automatisation-marketing',
      },
    ],
    choix: [
      {
        titre: 'Garder toutes les marques en avant',
        texte:
          'Clim69 répare Daikin, Mitsubishi, Atlantic, Toshiba et les autres. C’est un argument rare pour un client dont la machine d’une marque rare tombe en panne. On ne ferme donc jamais une recherche sur une marque, même quand elle semble périphérique, et chaque grande marque a sa page.',
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
        titre: 'Écrire les pages locales à la main, avec un seuil',
        texte:
          'Dupliquer une page en changeant le nom de la ville est la voie rapide, et Google la repère. Chaque page s’appuie sur au moins deux sources vérifiables : le terrain du patron, le bâti de la commune, les règles locales. Une mesure de texte propre fixe un plancher, et une page qui n’y arrive pas devient une section de la page voisine. Une phrase locale écrite de mémoire est interdite, même quand elle est exacte.',
      },
    ],
    iterations: [
      {
        titre: 'Le style néo-brutaliste',
        texte:
          'Bordures noires épaisses, ombres dures décalées, jaune vif. Il avait de la personnalité et le client n’arrivait pas à le lire. Un site pour quelqu’un qui cherche un dépanneur en pleine chaleur doit se lire sans effort : on l’a rangé dans un dossier de sauvegarde, avec fierté.',
      },
      {
        titre: 'Le bleu roi et jaune, façon plomberie',
        texte:
          'Pilules, cartes douces, ombres légères : lisible, propre, et mis en ligne à la mi-juillet sur Vercel avec le domaine transféré chez OVH. Il a tenu quelques semaines. En relisant l’ensemble, on y a vu un gabarit bien exécuté plus qu’un site de Clim69, et l’envie d’un site qui change ce que le visiteur fait a gagné.',
      },
      {
        titre: 'Le Relevé et le Thermostat',
        texte:
          'Deux rhabillages de la même architecture, le second avec une idée de thermostat en vedette. Verdict du client : trop similaires. Il avait raison, on avait changé les couleurs et laissé le parcours intact.',
      },
      {
        titre: 'Le diagnostic guidé en cinq écrans',
        texte:
          'Le visiteur décrit son besoin, précise, indique son lieu, reçoit un verdict, laisse un numéro de rappel. L’idée plaisait. Elle a été jetée parce que le reste du site n’avait pas été repensé avec elle, et que sa variante « estimation en soixante secondes » butait sur la règle du prix.',
      },
      {
        titre: 'L’Affiche, puis la recette empruntée',
        texte:
          'L’Affiche était un site de papier typographique avec trois gestes géants pour le métier. La version suivante transposait une recette qui avait réussi sur un autre site de dépannage. Les deux ont été refusées : la première faisait trop de place à la typographie, la seconde sentait la copie. On a repris la méthode au début.',
      },
      {
        titre: 'Les jeux de boutons',
        texte:
          'Quatre jeux proposés, refus en bloc. Six registres capturés chez des sites de référence, puis un jeu à fond blanc choisi. Quelques semaines plus tard, le client a trouvé les boutons blancs et bleus noyés dans le bleu du site. Ils sont aujourd’hui en ambre plein, avec une tranche basse nette, et un seul fichier de style les gouverne.',
      },
      {
        titre: 'Le flocon, première idée de logo',
        texte:
          'Un flocon géométrique sur badge bleu, lisible en favicon. Propre, mais il ne disait que le froid, alors que Clim69 vend aussi le chaud. Les variantes suivantes ont fini en une unité murale et un groupe extérieur, avec deux voyants de couleurs différentes.',
      },
    ],
    resultat: [
      'Le patron ne dépend plus seulement du bouche-à-oreille. Quand un voisin de Villeurbanne ou d’Oullins cherche un dépannage, Clim69 apparaît dans les annonces, dans les pages locales et sur sa fiche Google Business Profile. Les appels qui arrivent concernent son métier, ses marques et sa zone.',
      'Il sait aussi d’où viennent ses chantiers. La feuille de suivi remplace l’intuition par une lecture claire : ce canal amène des devis, celui-là amène des curieux. Ses décisions de publicité reposent sur ce qu’il voit, et il peut les prendre depuis son téléphone.',
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
      {
        question: 'Pourquoi refaire plusieurs fois la maquette d’un site avant de le publier ?',
        reponse:
          'Parce que juger un site sur une capture d’écran ne dit rien de l’usage sur téléphone. Chez Clim69, chaque version a été regardée sur un vrai téléphone, puis commentée par le client.',
      },
    ],
    maquette: '/images/realisations/clim69-maquette.webp',
  },
  {
    slug: 'aplus-audition',
    titre: 'Site internet audioprothésiste Cannes : A+ Audition repart de zéro, section par section',
    accroche:
      'Douze propositions refusées, un déclic, puis un site calme, lisible par tous les âges, pour un cabinet d’audioprothèse du quartier de la Croisette.',
    metaTitle: 'Site audioprothésiste Cannes : cas A+ Audition | 123 Digital',
    metaDescription:
      'Refonte du site d’un audioprothésiste à Cannes : douze propositions rejetées, puis un site médical, sobre et lisible, construit section par section.',
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
      'Le gérant avait déjà vécu une refonte décevante avec un autre prestataire. Sa conviction : un site d’audioprothésiste se juge à la clarté, à la confiance et au sentiment d’être attendu.',
    ],
    coulisses: [
      'Un cabinet d’audition accueille surtout des personnes qui entendent moins bien et qui hésitent depuis longtemps. Elles viennent parfois après des années de repli. Le site doit donc être lu à 18 pixels minimum, avec un contraste fort, de gros boutons et zéro animation qui bouge. Beaucoup de visiteurs utilisent un téléphone ; d’autres sont des enfants qui cherchent pour leurs parents. Une personne de soixante-quinze ans ne lit pas quinze écrans de défilement.',
      'Le métier est aussi encadré. L’audioprothésiste ne pose pas de diagnostic médical : il appareille sur ordonnance. Le site ne peut donc pas promettre de miracle ni afficher d’offre qui ressemble à une promotion. La loi de financement de la Sécurité sociale en préparation vise ce type d’annonces, et on a retiré dès le premier audit la phrase « offres exclusives et réductions exceptionnelles ». On parle du bilan gratuit, de l’essai de 30 jours et des appareils pris en charge à 100 % dans le cadre du 100 % santé, avec des mots neutres et vérifiables. Aucun prix et aucune marque d’appareil ne figurent en ligne.',
      'Le premier audit a trouvé de quoi alarmer : le bouton e-mail de la page contact écrivait à une entreprise de démolition, un numéro inconnu s’affichait à côté du vrai, les horaires du vendredi et du dimanche se contredisaient d’un site à l’autre. On a tout remis d’accord avec la vitrine du centre, photo à l’appui.',
      'Le détail qui a tout fait basculer : pour ce client, le quartier est la première raison de choix. Les gens veulent un audioprothésiste près de chez eux, qu’ils connaissent de vue. La devanture et l’enseigne devaient donc être les héros du site, et le centre physique le modèle de chaque page : mêmes mots que la vitrine, mêmes photos, même ordre que lorsqu’on pousse la porte.',
    ],
    etapes: [
      {
        titre: 'Auditer l’ancien site et le mettre de côté',
        texte:
          'On a archivé les trois anciennes pages avec douze captures, relevé leurs défauts (aucun titre principal, aucune description, une langue déclarée en anglais) et noté ce qu’il fallait garder : le centre, les horaires réels, la photo de la devanture. L’ancien contenu a servi de matériau, jamais de modèle.',
        service: 'seo',
      },
      {
        titre: 'Cadrer avant de dessiner',
        texte:
          'Après huit maquettes en quatre jours, on a tout arrêté pour écrire cinq règles : le visiteur a soixante-seize ans et un téléphone, le site est la boutique du boulevard, rien qu’on ne puisse prouver, une section à la fois, et le site nourrit la fiche Google.',
        service: 'branding',
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
          'Des maquettes en bleu marine avaient été refusées. La couleur est venue de la devanture elle-même : un écru, un sable, un or d’enseigne, un brun profond pour le texte. Une seule police, une échelle de nuances plutôt qu’une palette.',
        service: 'branding',
      },
      {
        titre: 'Écrire la page « bilan auditif à Cannes »',
        texte:
          'Pour le référencement, une page répond à la question que tape un futur patient : où faire un bilan auditif à Cannes, comment ça se passe, combien de temps ça dure. Elle précise que le bilan n’est pas un diagnostic médical. Aucun déroulé n’a été inventé.',
        service: 'seo',
      },
      {
        titre: 'Auditer le référencement avant la bascule',
        texte:
          'Trois audits le même jour, technique, contenu et local. Ils ont trouvé un plan du site mal déclaré, un fichier d’exclusion qui empêchait Google de lire les balises des pages légales, et une adresse de démonstration ouverte à l’indexation. Tout a été corrigé avant que le domaine ne bascule, et le titre principal de l’accueil a gagné les mots « Audioprothésiste à Cannes ».',
        service: 'seo',
      },
      {
        titre: 'Mettre en ligne et déclarer le site à Google',
        texte:
          'Bascule du nom de domaine sans toucher à la messagerie du cabinet, vérification que chaque page répond, déclaration à la Search Console et correction de l’adresse du site sur la fiche Google. Le site vit dans son propre dépôt, que Vercel construit tout seul à chaque publication.',
        service: 'creation-site-web',
      },
    ],
    choix: [
      {
        titre: 'Adopter la structure d’un site médical, pas ses couleurs',
        texte:
          'Les sites de santé ont une grammaire que les gens reconnaissent : une photo pleine largeur, quatre garanties, un parcours en étapes. On a gardé cette grammaire et abandonné le bleu hospitalier pour les teintes du centre. Une seule police, des filets fins, une seule zone sombre.',
      },
      {
        titre: 'Ne rien afficher en prix',
        texte:
          'La loi encadre la publicité des audioprothésistes, et le gérant préfère un devis détaillé en cabinet. Le site parle de bilan gratuit, d’essai et de 100 % santé, sans montant. Aucune marque d’appareil n’est mise en avant non plus.',
      },
      {
        titre: 'Doctolib comme seul canal de rendez-vous',
        texte:
          'Pas de formulaire de plus à surveiller pour un cabinet de quartier. Chaque bouton mène à la prise de rendez-vous en ligne ou au téléphone, deux gestes que les patients connaissent déjà. Le bouton porte le logo de Doctolib, ce qui rassure.',
      },
      {
        titre: 'Accessibilité avant esthétique',
        texte:
          'Un joli détail illisible pour un senior ne vaut rien. Corps de texte large, zones à toucher généreuses, aucune bannière qui défile. Chaque embellissement a dû passer un contrôle automatique d’accessibilité et une mesure de contraste réelle sur capture, pas à l’œil.',
      },
    ],
    iterations: [
      {
        titre: 'Huit maquettes en quatre jours',
        texte:
          'Éditoriale, classique, sur la recette d’un autre client, façon clinique, quatre variantes A à D, un rebranding. Huit habillages d’une même page, jamais une réflexion sur ce que le visiteur vient faire. Le soir du huitième, on a tout rangé dans une archive et on a écrit le cadrage qui manquait.',
      },
      {
        titre: 'Trois concepts d’expérience',
        texte:
          'La devanture, On pousse la porte, Le praticien vous reçoit : trois idées contrastées, avec aperçu sur téléphone, pour choisir ce que le visiteur fait en arrivant. Les trois ont été refusées le même jour. Elles ressemblaient trop au travail d’août, et le client ne s’y reconnaissait pas.',
      },
      {
        titre: 'La copie du site existant',
        texte:
          'Consigne de départ : reprendre le site actuel, mettre de vraies photos, corriger les incohérences. C’était la douzième proposition. Elle a été jugée comme les autres : logo trop grand, pas de menu, bandeau de contact laid, texte de bannière illisible. La conclusion est tombée net : tout était à refaire, composition comprise.',
      },
      {
        titre: 'Le marine emprunté à un site de référence',
        texte:
          'Pour répondre à la demande d’un site de santé, on avait pris le marine et le blanc d’un confrère. Le client n’avait demandé aucune de ces couleurs. On a effacé la charte d’août et reparti des couleurs de l’enseigne : écru, sable, or, brun. Une couleur de l’enseigne vaut mieux qu’une référence.',
      },
      {
        titre: 'Cinq photos de bannière',
        texte:
          'Une photo de banque d’images au fond de la page, un couple jugé trop âgé, une scène qui mettait mal à l’aise, un portrait sur fond blanc qui rendait le titre illisible. Chaque photo a été montée dans la vraie bannière puis mesurée, et celles qui rendaient le titre illisible sont sorties. Le client a choisi lui-même un couple en trench sur une plage. La leçon : changer la photo, jamais la structure d’une section validée.',
      },
      {
        titre: 'Un accueil trop plein',
        texte:
          'La première page d’accueil avait six sections, des cartes, une FAQ. « Trop de choses, trop d’écriture. » On a coupé de plus de la moitié les mots, ramené la hauteur à moins de la moitié et déplacé le détail vers les pages intérieures.',
      },
      {
        titre: 'L’en-tête, la bande de repères et le slogan',
        texte:
          'L’en-tête a été refait trois fois, du logo dessiné à la marque typographique, puis le logo est revenu sans le mot AUDITION, illisible à petite taille. La bande de repères a connu une version sans icône, une version avec, et c’est la seconde qui a gagné. Le slogan a eu trois traitements, signature, plaque, titre roi : la plaque en capitales espacées a été choisie.',
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
      {
        question: 'Pourquoi construire un site section par section plutôt que d’un bloc ?',
        reponse:
          'Parce qu’un refus global ne dit pas ce qui ne va pas. En validant une section à la fois sur un vrai téléphone, on sait où est le problème et on le corrige avant de continuer. Chez A+ Audition, elle a remplacé douze refus par un site assemblé pièce après pièce.',
      },
    ],
    maquette: '/images/realisations/aplusaudition-maquette.webp',
  },
  {
    slug: 'habad-etudiants-lyon',
    titre: 'Communication association étudiante Lyon : l’identité et le suivi de Habad Étudiants Lyon',
    accroche:
      'Une charte graphique, des stories, des formulaires et des messages automatiques pour une association étudiante qui reçoit ses membres dans deux centres de la ville, et tout ce qu’on a essayé avant de trouver la flamme.',
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
      'Le logo existait déjà, une flamme sur une ménorah, en or dégradé dans une pastille bleue. Il disait « Habad » comme des milliers d’autres maisons dans le monde, et pas « les étudiants de Lyon ». L’équipe voulait garder le dessin et changer tout ce qui l’entoure : couleur, composition, usage.',
    ],
    coulisses: [
      'Une association étudiante vit au rythme de l’année universitaire. Septembre est un sprint : des centaines de nouveaux visages, des fêtes, des événements chaque semaine. Puis viennent les examens, les départs en stage, les étudiants qui quittent Lyon mais restent dans les groupes. La communication doit tenir sur la durée avec peu de moyens et peu de temps.',
      'Les étudiants vivent sur leur téléphone, dans Instagram pour découvrir et dans WhatsApp pour décider. Une annonce dans un groupe de plusieurs centaines de membres se perd en quelques minutes. Un visuel soigné, posté au bon moment, se retient. Le public a aussi un mot pour rejeter un contenu : « gênant ». Chaque visuel passe ce test avant de sortir.',
      'L’association a deux centres et un camion, donc plusieurs publics géographiques. Les facs de médecine et de pharmacie sont proches de Grange-Blanche, tandis que les écoles et le tribunal sont proches de Part-D.ieu. Les messages nomment le bon lieu pour chaque campus.',
      'Le calendrier religieux dicte la mécanique. Une soirée sous la soukka ne peut pas recevoir d’inscriptions pendant le Shabbat et les deux jours de fête qui la précèdent : le formulaire ferme donc le vendredi avant l’entrée de la fête, ce qui crée une vraie rareté sans promotion inventée. Les anniversaires hébraïques se souhaitent la veille à 19 h, quand la date commence. Un soir, l’ordinateur de l’équipe était en avion et un créneau a été raté : les envois se calculent désormais à l’heure de Lyon, sur un serveur gratuit qui ne dépend plus d’un portable.',
    ],
    etapes: [
      {
        titre: 'Poser le problème avant le logo',
        texte:
          'On a recensé deux noms, deux comptes Instagram, trois logos et des avatars de groupes qui se confondaient dans la liste WhatsApp. Le premier travail a consisté à choisir un seul nom français partout et un seul avatar pour la communauté. Ensuite seulement, le dessin.',
        service: 'branding',
      },
      {
        titre: 'Dessiner l’identité : une flamme, trois couleurs, un sceau',
        texte:
          'On a construit une charte autour d’une flamme traitée comme une matière, de trois couleurs de base (noir, blanc cassé, braise), d’une couleur du moment qui change avec le calendrier et d’un sceau blanc placé toujours au même endroit. Un étudiant qui fait défiler son fil reconnaît l’association avant d’avoir lu le texte.',
        service: 'branding',
      },
      {
        titre: 'Concevoir des carrousels et des stories pour Instagram',
        texte:
          'Les annonces d’événements prennent la forme de carrousels à faire glisser et de stories en vidéo, toujours avec une musique juive instrumentale. Chaque carrousel a une composition différente du précédent : la flamme change de place et de taille. L’objectif d’une communication d’association étudiante à Lyon : donner envie, pas remplir un tableau d’horaires.',
        service: 'community-management',
      },
      {
        titre: 'Construire le moteur « fenêtre »',
        texte:
          'Un outil maison compose les stories et les statuts : la photo est vue à travers la flamme, comme à travers une vitre. Il sort le même message aux bonnes dimensions pour une story, un statut, un reel ou une affiche A4, en laissant libres les zones que l’interface du téléphone recouvre.',
        service: 'community-management',
      },
      {
        titre: 'Remplacer le « qui vient ? » par des formulaires d’inscription',
        texte:
          'Les inscriptions passent par Kehila, un outil de gestion d’associations. L’étudiant remplit un formulaire court, l’équipe voit qui vient et prépare les repas en conséquence. Le formulaire gère un stock de places et se ferme avant l’entrée de la fête, et personne n’est jamais refusé.',
        service: 'automatisation-marketing',
      },
      {
        titre: 'Suivre les inscrits et fêter les anniversaires',
        texte:
          'Chaque étudiant a une fiche, y compris ceux qui quittent Lyon. Un message d’anniversaire part la veille au soir, jamais pendant le Shabbat ni les fêtes, avec un ton chaleureux et court. Les messages sont envoyés depuis le numéro de l’équipe : la machine prépare, l’humain garde la main.',
        service: 'automatisation-marketing',
      },
      {
        titre: 'Armer une créatrice de contenu',
        texte:
          'Pour que la marque tienne même quand quelqu’un d’autre filme, on a écrit une charte vidéo : deux réglages de couleur (un pour les rushs en profil normal, un pour les rushs en D-Log, le profil plat de la caméra), un grain, une notice en français.',
        service: 'branding',
      },
    ],
    choix: [
      {
        titre: 'Une photo naturelle plutôt qu’un aplat de couleur avec du texte',
        texte:
          'Les premières stories en aplat avec du texte paraissaient froides. On est passé à des photos prises sur le vif, avec une ouverture en forme de fenêtre qui laisse voir la flamme.',
      },
      {
        titre: 'Ne jamais montrer de visage ni de nom sans accord',
        texte:
          'Dans une communauté, l’image de chacun appartient à chacun. Les publications évitent de nommer ou de reconnaître une personne, sauf accord précis, et pas de décompte d’inscrits claironné dans les messages. L’association y gagne la confiance de ses membres.',
      },
      {
        titre: 'Laisser l’humain envoyer, pas la machine',
        texte:
          'Un message d’anniversaire envoyé par un robot sonne creux. L’automatisation prépare le texte et la liste, l’équipe appuie sur « envoyer » et peut ajouter un mot. Le gain de temps reste réel, la chaleur aussi.',
      },
      {
        titre: 'Une couleur du moment, pas une couleur de plus',
        texte:
          'Noir, blanc et orange auraient vite lassé. Le logo ne bouge pas, la couleur raconte le moment : miel et grenat pour Roch Hachana, vert olive pour Souccot, bleu nuit pour Hanouka. Un post sur trois reste dans les couleurs de base pour que le compte garde son identité. La sous-marque Habad Étudiantes, elle, vit en rose vernis.',
      },
    ],
    iterations: [
      {
        titre: 'La planche de six couleurs',
        texte:
          'La première réponse a été de recolorer l’ancien logo en six variantes. L’équipe l’a refusée aussitôt : une planche de couleurs ne se demande pas ce que le logo raconte. On est reparti de l’histoire, la flamme qui dit « Habad » et pas encore « Lyon », avant de toucher une teinte.',
      },
      {
        titre: 'Quatre directions de posts, de Pinterest au scrapbook',
        texte:
          'Pinterest (photo pleine page, titre en serif, mot doré en italique), Notes (une fausse application de notes avec case à cocher), Affiche (capitales condensées, pastille or) et Scrapbook (polaroïd, ruban adhésif, étiquettes manuscrites). Quatre mondes graphiques, tous jolis, tous empruntés à ailleurs. Les quatre dorment dans un dossier d’archives.',
      },
      {
        titre: 'Les photos en noir et blanc',
        texte:
          'Une ville en noir et blanc avec une flamme allumée : le système était élégant sur le papier. L’équipe a objecté que les gens viennent pour se sentir en famille et que le noir et blanc refroidit. Les photos sont revenues en couleur. Seule la flamme porte la couleur de marque.',
      },
      {
        titre: 'Le gabarit rangé, puis la matière',
        texte:
          'Quinze gabarits de placement de la flamme, trois refusés, puis quinze styles graphiques (pop art, affiche suisse, polaroïd, risographe) sont passés par le tamis. Un lot d’éléments tirés du logo a ensuite été invalidé parce qu’il redécoupait le logo sans le transformer. On a retenu les traitements où la flamme cesse de se lire comme un tampon pour devenir une matière : fenêtre, verre, alphabet.',
      },
      {
        titre: 'Douze ronds noirs sur WhatsApp',
        texte:
          'Les avatars des groupes de campus se ressemblaient tellement qu’on n’arrivait plus à les distinguer à 40 pixels. Plusieurs systèmes se sont succédé : rangées de flammes identiques, pictogrammes, emojis sur dégradé, photo du lieu en bichromie. Le ballon dessiné pour le groupe de foot a été refusé deux fois, jusqu’à une vraie photo de ballon avec la flamme posée dessus.',
      },
      {
        titre: 'La story en aplat avec du texte',
        texte:
          'Un fond uni, un titre, une date. Efficace en théorie, froid en pratique. Les stories partent désormais du moteur « fenêtre » : une vraie photo vue à travers la flamme, un petit texte, une vidéo avec musique.',
      },
      {
        titre: 'Le bouton de lien dessiné maison',
        texte:
          'Un premier bouton d’inscription dessiné sur mesure ressemblait à autre chose qu’à Instagram, et les étudiants ne cliquaient pas sur ce qu’ils ne reconnaissaient pas. L’équipe a demandé la copie au pixel du sticker natif : même pilule blanche, même icône de chaîne en dégradé, même texte en capitales. Un texte d’action remplace l’adresse brute.',
      },
    ],
    resultat: [
      'L’association a désormais une identité qu’on reconnaît en une seconde : la flamme, les couleurs, le sceau. Ses publications se ressemblent sans se répéter, chaque événement a son visuel, et les étudiants savent où et comment s’inscrire. Les groupes WhatsApp servent à retrouver les gens, pas à faire passer des annonces noyées.',
      'Le suivi change aussi la vie de l’équipe. Elle sait qui s’est inscrit, qui est parti de Lyon, qui mérite un petit mot. Aucun étudiant ne disparaît dans la masse, ce qui compte beaucoup pour une communauté qui vit de relations personnelles. Chaque test raté a servi à dire ce que cette communication n’est pas.',
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
      {
        question: 'Combien de versions faut-il tester avant de fixer une charte graphique d’association ?',
        reponse:
          'Autant que nécessaire, et on archive chaque version. Chez Habad Étudiants Lyon, quatre directions de posts, une planche de couleurs, plusieurs systèmes d’avatars et deux boutons ont été testés avant de retenir la flamme, le grain et le sceau.',
      },
    ],
    maquette: '/images/realisations/habad-etudiants-lyon-maquette.webp',
  },
]
