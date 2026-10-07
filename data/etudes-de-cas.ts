export interface EtudeDeCas {
  slug: 'clim69' | 'aplus-audition' | 'habad-etudiants-lyon' | 'mdj17' | 'cours-anglais-esthetique'
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
  {
    slug: 'mdj17',
    titre: 'Charte graphique association Paris : le logo et l’identité de la Maison des Jeunes 17',
    accroche:
      'Un client graphiste qui juge en pair, trente-quatre versions de logo en trois jours, un 17 caché dans une menorah, une flamme tracée au compas et une story qui ne ressemble à aucune autre.',
    metaTitle: 'Charte graphique association Paris : cas MDJ17 | 123 Digital',
    metaDescription:
      'Logo, typographie, couleurs, flamme et stories pour une maison des jeunes du 17e arrondissement de Paris : le récit d’une charte et de ses versions jetées.',
    client: {
      nom: 'Maison des Jeunes 17',
      metier: 'Association jeunesse',
      ville: 'Paris 17e',
      url: 'https://www.instagram.com/maisondesjeunes17/',
    },
    services: ['branding', 'community-management'],
    commande: [
      'La Maison des Jeunes 17 est la branche jeunesse du Beth Habad Monceau, un centre communautaire du 17e arrondissement de Paris. Elle reçoit des collégiens et des lycéens du quartier autour de repas, de cours, de voyages et de fêtes. Son compte Instagram venait de naître. Il alignait quelques publications aux styles différents, un logo qui circulait en deux versions et un monogramme en J calligraphique, repris un jour en dégradé holographique.',
      'Le client dessine lui-même. Il est graphiste, il a tracé le logo d’origine, et il lit une charte comme on relit le travail d’un confrère : un vide plus large d’un côté, une branche qui penche dans l’autre sens, une police posée à l’arrache, il les voit avant nous. La mission tenait en une ligne : une identité classe et jeune, qui n’a rien en commun avec ce que 123 Digital a déjà fait pour d’autres clients. Ensuite viendraient les posts.',
      'On a posé une règle dès le premier jour : aucune maquette avant la fin des audits. Six rapports sont sortis en une journée et débouchaient sur trois directions typographiques soignées. Le client les a regardées, puis il a dit ce qu’il voulait : un symbole, minimaliste, qui se lit de deux façons, qui se porte comme un badge et qui donne envie de suivre le compte.',
    ],
    coulisses: [
      'Les audits ont dessiné le terrain. Les sites du secteur sont presque tous bleus sur fond blanc, avec une photo de groupe et un ton « chaleureux et inclusif » recopié d’un site à l’autre. Les adolescents viennent surtout des lycées du quartier, dont l’un est à deux cents mètres du local. Pour eux, l’appartenance première est le quartier, et un « 17 » se lit comme un numéro de maillot, donc comme une équipe.',
      'Le client a cité ses références sans détour : les marques de sport et de mode que les adolescents portent, avec leurs couleurs franches et leurs signes simples. Un signe qui tient sur un sweat se pense autrement qu’un logo de plaquette : il doit survivre à 18 pixels comme à deux mètres, et se découper dans un badge, un autocollant, un avatar.',
      'Travailler avec un graphiste oblige à montrer le procédé. Chaque version partait avec ses mesures : longueur de chaque branche, largeur du trait, vide le plus serré entre deux pièces. Un reproche sur les distances nous a envoyés mesurer au pixel : les vides variaient de 0,38 à 0,70 selon l’endroit. On a alors fixé un seul vide pour tout le signe et fait vérifier la règle par un script à chaque version.',
      'Le calendrier a servi de banc d’essai. Roch Hachana tombait dans la semaine, et une charte se juge sur un cas réel plus que sur une planche. La story de cette fête, refaite plusieurs fois, a servi de test final : si la flamme, les couleurs et la police tenaient sur un téléphone, elles tiendraient partout.',
    ],
    etapes: [
      {
        titre: 'Auditer avant de dessiner la première ligne',
        texte:
          'Six rapports en une journée : design existant, secteur, audience, typographie et couleurs avec contrastes calculés, réseaux sociaux, stratégie de marque. C’est le socle d’une charte graphique d’association à Paris qui veut sortir du bleu et blanc : un seul symbole, une seule famille de signes, des photos vraies.',
        service: 'branding',
      },
      {
        titre: 'Cacher un 17 dans une menorah',
        texte:
          'Le signe vient du client : une menorah dont le 1 est le fût et le 7 la branche extérieure droite. Chaque pièce partage le même trait, la même pente et le même vide, mesuré. Le chiffre se lit d’un coup d’œil, la menorah se reconnaît, et le signe seul vit sur un avatar ou un badge.',
        service: 'branding',
      },
      {
        titre: 'Proposer des pistes nommées par leur idée',
        texte:
          'Sept pistes, chacune inspirée d’une marque que les adolescents aiment et baptisée d’après son idée : bloc, galet, élan, brut, biseau, épure, atelier. Le client en retient une, demande plus d’art, nous explorons des gouttes, des pinceaux et des découpes, puis il revient à « Élan », un signe penché qui court vers la droite.',
        service: 'branding',
      },
      {
        titre: 'Choisir une police qui penche comme le logo',
        texte:
          'Geologica pour le latin, réglée à douze degrés pour suivre la diagonale du 7, avec des coupes vives. Suez One pour l’hébreu, avec ses points-voyelles, pour une lecture plus traditionnelle. Le mot-marque tient en deux lignes imbriquées contre la diagonale du signe, à seize degrés. Les capitales ont été écartées : on n’y retrouvait plus la police.',
        service: 'branding',
      },
      {
        titre: 'Prendre les couleurs de ceux que les jeunes suivent',
        texte:
          'Après cinq palettes et une série d’accents sur blanc et sur noir, on a essayé les couleurs de CTeen, le mouvement jeunesse de son monde : un bleu ciel et un pêche sur blanc ou sur noir. Les deux accents se permutent, avec une règle : jamais les deux dans le même rôle au même endroit.',
        service: 'branding',
      },
      {
        titre: 'Tracer la flamme au compas, bâtir la story « fenêtre »',
        texte:
          'La flamme se construit sans un point à la main : un cercle pour le ventre, un grand cercle tangent pour le flanc, un petit pour la lèche, la pointe penchée de seize degrés. Elle découpe ensuite une fenêtre dans une photo sur fond noir, sous un titre penché. Elle change de place d’une story à l’autre.',
        service: 'community-management',
      },
      {
        titre: 'Livrer onze pages plutôt qu’un livre de marque',
        texte:
          'La première charte, complète, a été jugée trop chargée de texte pour un client qui lit avec les yeux. Elle est devenue une présentation PDF de onze pages, un visuel et une ligne par page.',
        service: 'branding',
      },
    ],
    choix: [
      {
        titre: 'Traiter le client en pair et lui montrer le procédé',
        texte:
          'Un graphiste n’achète pas un résultat, il évalue une exécution. Chaque planche portait ses mesures et sa logique, et chaque refus a été traité comme une consigne de métier.',
      },
      {
        titre: 'Nommer les pistes par leur idée, jamais par leur marque',
        texte:
          'Devant le client, une piste s’appelle bloc, galet, élan, brut, biseau, épure ou atelier. Le nom dit ce que le dessin cherche, sans emprunter l’aura d’une marque tierce. La discussion porte sur la forme, pas sur la référence.',
      },
      {
        titre: 'Un seul trait, un seul vide',
        texte:
          'Tout le signe obéit à une seule épaisseur de trait et à une seule distance entre les pièces. Un script écarte les pointes juste ce qu’il faut pour que le vide le plus serré atteigne la valeur voulue, et refuse de dessiner en dessous.',
      },
      {
        titre: 'Deux blocs de logo, pas six',
        texte:
          'Le kit contient un rectangle imbriqué et la menorah seule pour tout format carré. Six essais de carrés avec du texte ont été écartés : le texte flottait, la menorah y perdait sa place.',
      },
    ],
    iterations: [
      {
        titre: 'Les trois directions typographiques et les premiers emblèmes',
        texte:
          'La Maison, Le 17, Nuit : trois directions éditoriales, solides, rangées au bout d’une journée parce que le client voulait un symbole. Les premiers emblèmes, une flamme habitée, un badge, un 17 en flamme, ont suivi.',
      },
      {
        titre: 'La demi-menorah « 1777 » et la chasse au 7',
        texte:
          'Moitié droite d’une menorah, lue 1 puis 7 7 7 : une idée du soir, jolie, dont le 7 ressemblait à une branche. Douze formes de 7 et seize formes de 1 plus tard, une évidence : mêler lettres de police et dessin à la main donne un résultat sale pour un œil de graphiste. La chaîne vectorielle, un trait unique et zéro lettre de police, est née de cette série.',
      },
      {
        titre: 'La menorah de sept bonhommes',
        texte:
          'Le client avait envoyé une référence : une menorah faite de sept petits personnages. On a donc transformé chaque branche en silhouette surmontée d’une tête. Le corps était rond, le 17 restait anguleux. Cette série a appris à dessiner le 1 et le 7 dans la langue des branches, puis le client est revenu au signe droit.',
      },
      {
        titre: 'Les pistes « artistiques »',
        texte:
          'Réserve, Fil, Mosaïque, Taille, Pinceau, Déchirure, Calame : sept manières de rendre le signe plus artistique. Trois n’étaient que des opérations propres sur une géométrie régulière, jetées. Taille et Pinceau avaient une matière et ont été aimées. La Déchirure, jugée sans sens pour une maison de jeunes, a été retaillée aux ciseaux. Le client a pourtant choisi l’élan sans artifice.',
      },
      {
        titre: 'Cinq palettes, puis six accents',
        texte:
          'Encre, Craie, Chantier, Cuivre, Volt : cinq palettes posées sur le vrai kit, à l’endroit et à l’envers, toutes refusées, l’une parce qu’elle ressemblait à une autre commande de la maison. Six accents sur blanc pur ou sur noir ont suivi, puis le bleu ciel de CTeen. Le retour « il manque l’orange » a donné le pêche, en second accent.',
      },
      {
        titre: 'Les flammes tracées à main levée',
        texte:
          'Trois séries de flammes, dont celle du logo d’origine, ont été refusées en bloc : contour posé point par point, aucune relation avec le signe. Une note de méthode a fixé la construction au compas. La flamme obtenue, plus jolie, a paru trop ronde pour un signe de droites fines : une goutte aux flancs parallèles au 1 et au 7 a été essayée, puis la flamme pleine est revenue derrière le 17.',
      },
      {
        titre: 'La première story',
        texte:
          'Une flamme pêche pleine portant le titre sur fond uni : refusée. La seconde, bâtie comme la recette « fenêtre » d’un autre client, a séduit par sa flamme mais ressemblait trop à son modèle, jusqu’à la photo et au grain. Refaite à neuf : photo propre à la maison, mise en page à elle, pastille de date inclinée, barre de bouton pêche.',
      },
    ],
    resultat: [
      'La Maison des Jeunes 17 possède aujourd’hui un kit d’identité qu’un graphiste peut lire et défendre : un signe où le 17 loge dans une menorah, deux blocs de logo, une police qui penche comme le chiffre, deux accents qui s’alternent, une flamme construite au compas et un modèle de story qui ne ressemble à aucun autre compte. Chaque pièce se justifie par une mesure ou par une décision du client.',
      'Une présentation de onze pages est prête, et ce qui a été refusé n’a pas disparu : les versions jetées, rangées et datées, ont servi à éliminer ce que la maison ne voulait pas être. Les posts peuvent commencer sur des gabarits qui tiennent déjà sur un téléphone.',
    ],
    faq: [
      {
        question: 'Que contient une charte graphique d’association à Paris ?',
        reponse:
          'Un logo décliné en blocs, une police pour le latin et, si besoin, une autre pour l’hébreu ou une langue étrangère, des couleurs avec leurs rôles, des règles d’usage et des gabarits de posts. Pour la Maison des Jeunes 17, le tout tient en onze pages, un visuel et une ligne par page.',
      },
      {
        question: 'Pourquoi tester autant de versions d’un logo ?',
        reponse:
          'Chaque refus précise le cahier des charges. Trente-quatre versions en trois jours ont fixé ce que le signe devait faire : se lire en 17, se reconnaître comme menorah, tenir à petite taille, respecter un seul vide. Sans elles, la charte aurait été un goût plus qu’une décision.',
      },
      {
        question: 'Peut-on associer hébreu et latin dans la même identité visuelle ?',
        reponse:
          'Oui, avec deux polices choisies pour leur cohérence : même gabarit, même poids, même tenue. Ici, Geologica penchée pour le latin et Suez One pour l’hébreu, avec ses points-voyelles. Le couple a été validé en regardant les deux alphabets côte à côte.',
      },
      {
        question: 'Comment bâtir des stories reconnaissables sans les répéter ?',
        reponse:
          'Avec un moteur et non un modèle figé : une flamme qui change de place, une photo vraie, une police, une pastille, un bouton. Les éléments restent les mêmes, leur disposition varie, et le texte reste lisible sur l’image grâce à une règle de géométrie plutôt qu’à un réglage à l’œil.',
      },
    ],
    maquette: '/images/realisations/mdj17-maquette.webp',
  },
  {
    slug: 'cours-anglais-esthetique',
    titre: 'Supports de cours sur mesure : Cours 2.0, l’outil d’anglais d’une enseignante en lycée professionnel',
    accroche:
      'Une phrase en français, un PDF prêt à photocopier : l’outil sur mesure d’une professeure d’anglais pour ses classes d’esthétique, et tout ce qu’il a fallu jeter pour que la photocopieuse du lycée lui fasse confiance.',
    metaTitle: 'Supports de cours sur mesure : cas Cours 2.0 | 123 Digital',
    metaDescription:
      'Un outil qui fabrique les fiches d’anglais d’une enseignante de lycée professionnel : une phrase de demande, un PDF en niveaux de gris, une mémoire qui voyage.',
    client: {
      nom: 'Cours 2.0',
      metier: 'Enseignement, anglais en filières esthétique',
      ville: 'Lycée professionnel',
    },
    services: ['automatisation-marketing', 'branding'],
    commande: [
      'L’enseignante donne des cours d’anglais dans un lycée professionnel, auprès de quatre filières de l’esthétique : CAP, bac pro, brevet professionnel et BTS. Ses élèves ont entre quinze et vingt ans. Elles vivent dans leur téléphone, elles lisent peu de texte long, et elles préparent des diplômes qui s’évaluent à l’oral. Elle sait ce qu’elle veut leur faire dire. Ce qui lui manquait, c’était le temps de fabriquer chaque semaine une fiche qui leur parle.',
      'La commande tenait en une phrase : demander un support et recevoir un PDF à photocopier. Pas de logiciel à apprendre, pas de message d’erreur à déchiffrer, pas de mise en page à refaire. Elle dit la classe, le sujet et la durée, comme à une collègue, et l’outil rend une fiche élève, un document professeur et un test.',
      'Le cahier des charges avait trois contraintes. Le support doit se terminer par une prise de parole, parce que tout se joue à l’oral. Il doit ressembler à ce que ces élèves regardent déjà sur leur écran, sans se moquer d’elles. Et il doit survivre à la photocopieuse du lycée, qui imprime en noir et blanc et écrase les couleurs.',
    ],
    coulisses: [
      'Un support de cours n’est pas un article. Une élève le lit une fois, en classe, sous le regard de la prof et de ses voisines. Ce qui n’est pas évident au premier coup d’œil est perdu. Chaque séance suit donc la même progression : un document déclencheur, des tâches de repérage, une banque de phrases, puis une consigne de parole chronométrée. Les consignes sont en français et le matériau en anglais, pour que l’énergie des élèves aille à la langue et pas au décodage de l’énoncé.',
      'Le niveau réel des classes a imposé ses lois. Le premier jeu de rôle demandait de construire ses phrases à partir de cartes et d’une banque de mots : il visait le niveau officiel et dépassait les moyens des élèves. Depuis, un jeu de rôle se livre entièrement rédigé, chaque réplique étiquetée, avec une seule production à fournir : remplacer trois mots surlignés. L’élève joue un vrai dialogue au lieu de rester bloquée devant une page.',
      'Le papier a ses propres pièges. Une page A4 se mesure à 296 millimètres et non 297, parce qu’un arrondi de Chrome pousse chaque feuille sur la suivante. Une ligne à écrire peut disparaître sans erreur quand une règle de style perd sa mise en page. Un dessin vectoriel tombe en noir quand une variable de couleur est supprimée. Le build restait vert dans tous ces cas : la seule parade a été d’ouvrir les PDF et de regarder, puis d’écrire un contrôle qui compare chaque page à celle de la fois précédente.',
      'Le vocabulaire a lui aussi ses faux amis. L’enseignante a banni « cabin », qui désigne une cabane ou une cabine d’avion, au profit de « treatment room », et « institute », calque du français, au profit de « salon ». Les personnages inventés des dialogues portent des prénoms du calendrier, utilisables en anglais. Ces décisions se sont inscrites dans la mémoire du projet et reviennent à chaque support, sans qu’elle ait à les redire.',
    ],
    etapes: [
      {
        titre: 'Écouter les classes avant d’écrire un gabarit',
        texte:
          'Quatre filières, quatre niveaux, quatre épreuves orales. Pour chacune, une fiche de référence dit le niveau d’anglais attendu, la longueur de texte, les temps autorisés et la manière dont l’épreuve se déroule. La réalité de la filière prime sur un texte officiel générique : le brevet professionnel, par exemple, évalue la présentation orale d’un protocole de soins à partir d’une image.',
        service: 'automatisation-marketing',
      },
      {
        titre: 'Demander un support en une phrase',
        texte:
          'Une commande unique suffit : « un support pour les CAP, vocabulaire du maquillage, trente minutes ». L’outil lit d’abord ce qui a déjà été servi, pour ne pas répéter un point de grammaire, cherche dans la bibliothèque personnelle de l’enseignante ce qu’elle possède déjà, vérifie l’actualité du jour et propose une séance complète.',
        service: 'automatisation-marketing',
      },
      {
        titre: 'Habiller le support comme un fil de réseau social',
        texte:
          'Pour le CAP et le bac pro, la fiche emprunte aux feeds : faux posts, commentaires, messages privés. Les créatrices sont inventées, les marques et les faits sont réels et sourcés. Le brevet professionnel garde un registre sobre, parce que ses élèves sont déjà apprenties en institut.',
        service: 'branding',
      },
      {
        titre: 'Dessiner pour la photocopieuse, pas pour l’écran',
        texte:
          'Chaque filière a sa teinte, calée sur la luminance exacte du gris qu’elle remplace. Un seul PDF sort, et sa photocopie en noir et blanc rend comme la fiche en couleur. Les zones à écrire restent en blanc pur. Les pictogrammes sont des icônes vectorielles à trait constant, pas des images générées.',
        service: 'branding',
      },
      {
        titre: 'Écrire une fiche professeur qui se lit debout',
        texte:
          'Le corrigé mot pour mot, la réponse en face de chaque question numérotée, le minutage de chaque activité, la traduction française des termes techniques avec leur prononciation, et la phrase à répondre à la question qu’une élève va poser. Ce document ne part jamais au photocopieur : il n’a pas de limite de densité.',
        service: 'automatisation-marketing',
      },
      {
        titre: 'Installer l’outil sur son ordinateur, avec une clé USB',
        texte:
          'Trois fichiers à double-cliquer, numérotés dans l’ordre : copier sur la clé, installer sur cet ordinateur, envoyer sur le Drive. L’installation vérifie la machine, range les documents et construit l’index de recherche en deux à trois minutes. Un quatrième fichier, « Cours 2.0 », ouvre le programme au bon endroit.',
        service: 'automatisation-marketing',
      },
      {
        titre: 'Faire voyager la mémoire avec les fichiers',
        texte:
          'Les décisions durables et l’état des classes vivent dans deux fichiers à l’intérieur du dossier du projet, pas dans le profil de son concepteur. Copié sur un autre ordinateur, le dossier emporte avec lui ses règles, ses classes et la liste de ce qui a déjà été servi.',
        service: 'automatisation-marketing',
      },
    ],
    choix: [
      {
        titre: 'Consignes en français, matériau en anglais',
        texte:
          'Une élève ne doit jamais dépenser son énergie à comprendre ce qu’on lui demande. Les titres, les consignes et les encadrés de grammaire sont en français. Les posts, les dialogues, les exercices et la banque de phrases sont en anglais, relus avant l’export.',
      },
      {
        titre: 'Une fiche professeur séparée de la fiche élève',
        texte:
          'Le corrigé ne doit jamais partir à la photocopie avec le sujet. Chaque séance donne donc plusieurs fichiers distincts, nommés sans accent ni date : « Seance 03, A day at the salon, fiche de travail », puis « document professeur », puis « test de vocabulaire » et son corrigé.',
      },
      {
        titre: 'Des personnes inventées, des faits réels et des sources',
        texte:
          'Les créatrices qui s’expriment dans le fil sont fictives, les marques, les chiffres et les événements cités sont vérifiés et sourcés. On ne met jamais dans la bouche d’une personne réelle des propos qu’elle n’a pas tenus. Une vraie photo n’entre dans un support qu’avec sa source écrite dessous, pour un usage limité à la classe.',
      },
      {
        titre: 'Chercher dans sa bibliothèque avant de produire',
        texte:
          'Elle possède déjà des manuels complets, des centaines de tests et de corrigés, des fichiers audio et vidéo. Livrer un document qu’elle a déjà, en moins bien, lui fait perdre son temps. L’outil cherche donc d’abord dans le contenu de ses documents, pas seulement dans leurs noms, et ne produit que ce qui manque.',
      },
    ],
    iterations: [
      {
        titre: 'Le jeu de rôle à construire soi-même',
        texte:
          'Des cartes A et B et une banque de phrases : l’idée respectait le niveau visé par le référentiel et dépassait celui de la classe. Les élèves ne savent pas encore fabriquer des phrases. Le dialogue est désormais livré entier, à lire en binôme, avec trois mots à remplacer.',
      },
      {
        titre: 'L’emoji et la mascotte',
        texte:
          'Un personnage récurrent et des emojis pour égayer les pages, essayés puis retirés le jour même. L’habillage du gabarit suffisait, et un support surchargé se photocopie mal.',
      },
      {
        titre: 'Le rose scrapbook',
        texte:
          'Une première charte rose vif, bandes de ruban, nœud noué, serif à gros caractère en titre. Elle fonctionnait à l’écran et virait au gris moyen sous la photocopieuse. Elle a cédé la place à un gabarit sobre, en gris teintés par filière, avec une seule famille de polices.',
      },
      {
        titre: 'Le PDF en couleur et son jumeau en noir et blanc',
        texte:
          'La double sortie semblait prudente. L’enseignante imprime toujours en noir et blanc : le fichier couleur ne servait à rien et doublait le travail. Un seul PDF sort, dessiné pour le niveau de gris dès le départ.',
      },
      {
        titre: 'Les pictogrammes générés par une image',
        texte:
          'Des dizaines d’icônes d’étapes demandées à un générateur d’images : trait d’épaisseur variable, mains aux doigts fondus, et du faux texte qui apparaissait là où on demandait un objet sans lettres. On est revenu à des icônes vectorielles à trait constant, composées à deux quand l’objet seul ne dit pas le geste.',
      },
      {
        titre: 'Le feed social pour le brevet professionnel',
        texte:
          'Des apprenties déjà en poste dans un institut n’ont pas besoin qu’on leur imite un fil de réseau social. Le registre professionnel et sobre a remplacé l’habillage, pour cette filière seulement.',
      },
      {
        titre: 'Le téléchargement automatique des photos',
        texte:
          'Six voies testées pour récupérer les images d’un réseau social, toutes fermées par la plateforme. L’outil ne télécharge plus, il fournit l’adresse exacte du post, que l’enseignante capture à l’écran en cinq secondes, avec la source écrite dessous.',
      },
    ],
    resultat: [
      'L’enseignante demande aujourd’hui un support en une phrase et reçoit une fiche prête à photocopier, une fiche professeur qu’elle lit debout et un test de vocabulaire. La fiche ne dépend ni de son écran ni de son imprimante : elle a été dessinée pour le papier gris d’un photocopieur de lycée.',
      'L’outil retient ce qu’elle lui dit, les mots qu’elle a bannis, les classes de l’année et les sujets déjà servis. Ses décisions se retrouvent d’une séance à l’autre, et le dossier suit le projet partout où on le copie. Son temps reste pour ce qu’elle sait faire mieux que personne : faire parler ses élèves.',
    ],
    faq: [
      {
        question: 'Pourquoi un outil sur mesure plutôt qu’un manuel ou un modèle de fiche ?',
        reponse:
          'Un manuel suit un programme, pas une classe. Un outil sur mesure connaît le niveau de chaque filière, ce qui a déjà été servi, les mots que l’enseignante a bannis et l’actualité du jour. Il fabrique la fiche qu’il faut pour la séance de la semaine, dans le format que sa photocopieuse accepte.',
      },
      {
        question: 'Comment concevoir un support de cours lisible en photocopie noir et blanc ?',
        reponse:
          'Il faut juger le contraste en niveaux de gris, pas en couleur. Un texte rose sur un fond rose pâle passe le test en couleur et disparaît à la copie. Chaque teinte de ce projet a la luminance exacte du gris qu’elle remplace, et un seul PDF sort : sa copie rend comme la version couleur.',
      },
      {
        question: 'Peut-on installer un tel outil sur un ordinateur sans compétence informatique ?',
        reponse:
          'Oui, si l’installation tient en trois fichiers à double-cliquer. Ici, un fichier copie le dossier sur une clé USB, un deuxième l’installe sur l’ordinateur de l’enseignante, un troisième envoie les PDF sur son Drive.',
      },
      {
        question: 'Pourquoi la mémoire de l’outil est-elle rangée dans le dossier du projet ?',
        reponse:
          'Une mémoire rangée dans le profil de son concepteur ne suit pas le projet : elle serait vide chez l’enseignante. En la stockant dans deux fichiers du dossier, on emporte avec lui les décisions, les classes et l’historique à chaque copie. Le test qui le prouve consiste à copier le dossier sur un autre ordinateur et à relancer.',
      },
    ],
    maquette: '/images/realisations/cours-anglais-esthetique-maquette.webp',
  },
]
