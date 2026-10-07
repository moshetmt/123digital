import type { PageProbleme } from '../problemes'

export const page: PageProbleme = {
  slug: 'fiche-google-suspendue-ou-invisible',
  famille: 'panne',
  requete: 'fiche google business suspendue',
  title: 'Fiche Google suspendue ou invisible sur Maps : que faire',
  description:
    'Fiche Google Business suspendue ou absente de Maps : pourquoi Google suspend, comment faire appel avec les bons justificatifs, ce qui rend une fiche invisible.',
  titre: 'Fiche Google suspendue ou invisible sur Maps : le diagnostic et la marche à suivre',
  // source : https://support.google.com/business/answer/4569145?hl=fr (appel, justificatifs, ne pas recréer de fiche pendant l’examen)
  // source : https://support.google.com/business/answer/7091?hl=fr (pertinence, distance, proéminence)
  reponse:
    'Une fiche suspendue se rétablit par un appel déposé dans l’outil de Google, une fois corrigé ce qui enfreint les consignes, avec des justificatifs dont le nom et l’adresse correspondent à la fiche. Ne recréez surtout pas de fiche pendant l’examen. Une fiche active mais absente de Maps relève d’un autre diagnostic : catégorie, zone de service, nom, doublon, ou des concurrents jugés plus pertinents, plus proches ou plus connus.',
  datePublication: '2026-10-07',
  tempsLecture: 8,
  contenu: [
    {
      type: 'intro',
      texte:
        'Deux situations se ressemblent vues de l’extérieur et n’ont rien en commun. Dans la première, Google a suspendu la fiche : elle a disparu pour vos clients, et seul un appel la fera revenir. Dans la seconde, la fiche est en ligne, vos clients la trouvent quand ils tapent votre nom, mais elle ne sort jamais quand ils tapent votre métier. La première se règle en suivant une procédure. La seconde demande de comprendre comment Google classe les fiches. Je commence toujours par établir laquelle des deux est en cause.',
    },
    // source : https://support.google.com/business/answer/4569145?hl=fr (fiche suspendue, restriction de compte)
    {
      type: 'h2',
      titre: 'Suspendue ou invisible : comment savoir dans quel cas vous êtes',
      texte:
        'Ouvrez la gestion de votre fiche depuis le compte Google qui la possède. Une suspension s’y affiche comme telle, avec un motif de modération. Google distingue en plus la suspension d’une fiche isolée et la restriction de compte : dans ce second cas, toutes les fiches que vous gérez sont suspendues et vous ne pouvez plus en créer ni en revendiquer.',
    },
    {
      type: 'liste',
      titre: 'Trois vérifications, dans cet ordre',
      items: [
        'Dans l’espace de gestion : un statut de suspension ou de restriction est-il affiché ? Si oui, vous êtes dans le cas de la suspension.',
        'Sur Google Maps, en tapant le nom exact de votre entreprise : la fiche apparaît-elle ? Si oui, elle est active.',
        'Sur Maps, en tapant votre métier et votre commune : la fiche sort-elle parmi les premiers résultats ? Si non alors qu’elle est active, vous êtes dans le cas de la fiche invisible.',
      ],
    },
    // source : https://support.google.com/business/answer/3038177?hl=fr (consignes de représentation ; « le non-respect de ces consignes peut entraîner la suspension »)
    {
      type: 'h2',
      titre: 'Pourquoi Google suspend une fiche',
      texte:
        'Google publie des consignes de représentation pour les fiches d’établissement et précise que leur non-respect peut entraîner la suspension. Dans les fiches d’artisans que je relis, les écarts se concentrent sur quelques règles, toujours les mêmes.',
    },
    {
      type: 'liste',
      titre: 'Les consignes qui posent le plus souvent problème',
      items: [
        'Le nom : il doit être le nom réel de l’entreprise, tel que vos clients le connaissent et tel qu’il figure sur votre devanture ou vos documents. Pas de mot-clé de service, pas de ville, pas de slogan, pas de mention d’horaires comme « ouvert 24h/24 », pas de numéro ni d’adresse web.',
        'L’adresse : une boîte postale ou un bureau virtuel ne sont pas acceptés. Une entreprise qui se déplace chez ses clients et ne les reçoit pas doit masquer son adresse.',
        'La zone de service : Google demande de la limiter à deux heures de trajet autour de l’établissement, sauf cas justifié.',
        'Les doublons : une seule fiche par établissement. Deux fiches pour la même entreprise, ou une fiche par ville sans local réel, sortent des consignes.',
        'Le téléphone : un numéro local de l’établissement plutôt qu’un centre d’appels, et jamais un numéro surtaxé.',
      ],
    },
    // source : https://support.google.com/business/answer/4569145?hl=fr (étapes de l’appel, justificatifs acceptés, nom et adresse identiques à la fiche, ne pas créer de fiche pendant l’examen)
    {
      type: 'h2',
      titre: 'Rétablir une fiche suspendue : la procédure',
      texte:
        'Google demande de vérifier d’abord que la fiche respecte toutes ses consignes. Faire appel sur une fiche qui porte encore un nom bourré de mots-clés revient à demander un second refus. Je corrige donc la fiche, je rassemble les justificatifs, puis je dépose l’appel dans l’outil dédié. Google ne publie pas de délai d’examen sur sa page consacrée aux fiches suspendues : je ne vous en promettrai donc pas.',
    },
    {
      type: 'liste',
      titre: 'L’appel, étape par étape',
      items: [
        '1. Corrigez ce qui enfreint les consignes : nom, adresse, zone, doublon, téléphone.',
        '2. Ouvrez l’outil d’appel de Google Business Profile, connecté au compte qui gère la fiche.',
        '3. Sélectionnez la fiche concernée et lisez le motif de modération indiqué.',
        '4. Lancez l’appel et joignez vos justificatifs.',
        '5. Envoyez, puis suivez le statut de l’appel dans le même outil.',
      ],
    },
    {
      type: 'liste',
      titre: 'Les justificatifs que Google cite',
      items: [
        'Une preuve d’immatriculation officielle de l’entreprise.',
        'Une licence professionnelle, quand le métier en exige une.',
        'Une attestation fiscale.',
        'Une facture de charges courantes : électricité, eau, téléphone ou internet.',
        'Point commun obligatoire : le nom et l’adresse sur chaque pièce correspondent à ceux de la fiche.',
      ],
    },
    {
      type: 'h3',
      titre: 'Ce qu’il ne faut surtout pas faire',
      texte:
        'Recréer une fiche pour le même établissement pendant que l’appel est examiné : Google le demande expressément. Une nouvelle fiche créerait un doublon, c’est-à-dire une infraction de plus, sans rien rétablir. Je déconseille aussi de modifier la fiche dans tous les sens pendant l’examen : une correction franche avant l’appel, puis on attend.',
    },
    // source : C:\projet site\ads-os\clients\vitre69\ETAT.md (pièces demandées à un artisan le 15/09/2026 pour la fiche et les Annonces Services Locaux : Kbis ou avis SIRENE, RC pro, pièce d’identité ; instruction de 3 à 4 semaines pour les Annonces Services Locaux)
    {
      type: 'paragraphe',
      texte:
        'Un dossier voisin, à ne pas confondre : quand un artisan veut aussi diffuser des Annonces Services Locaux de Google, on lui demande un Kbis ou un avis de situation SIRENE, une attestation d’assurance responsabilité civile professionnelle et une pièce d’identité du gérant, avec trois à quatre semaines d’instruction. Je fais rassembler ces pièces dès l’ouverture d’un dossier : le jour où une fiche pose problème, tout est déjà dans un même dossier.',
    },
    {
      type: 'cta',
      titre: 'Votre fiche a disparu ?',
      texte:
        'Pendant l’audit gratuit de 30 minutes, je regarde l’état de votre fiche, ce qui sort des consignes et l’ordre dans lequel corriger avant tout appel.',
    },
    // source : https://support.google.com/business/answer/7091?hl=fr (pertinence, distance, proéminence ; avis ; aucun classement contre rémunération)
    // source : https://support.google.com/business/answer/3038177?hl=fr (catégories : le moins possible, le plus précis, ce que l’établissement EST)
    {
      type: 'h2',
      titre: 'Fiche active mais invisible sur Maps : ce qui se joue',
      texte:
        'Google classe les fiches locales selon trois critères qu’il nomme lui-même. La pertinence : la fiche correspond-elle à ce que la personne a tapé ? La distance : à quelle distance se trouve l’établissement de la personne qui cherche ? La proéminence : l’entreprise est-elle connue, ce qui passe notamment par les avis. Google précise aussi qu’aucune place ne s’achète. Une fiche active qui ne sort pas souffre presque toujours d’un défaut sur le premier critère, ou d’un retard sur le troisième.',
    },
    {
      type: 'liste',
      titre: 'Les causes que je vérifie',
      items: [
        'La catégorie principale : Google demande de choisir ce que l’établissement est plutôt que ce qu’il propose, aussi précisément que possible, avec le moins de catégories possible. Une catégorie trop large ou à côté du métier coupe la pertinence à la racine.',
        'La zone de service : trop étroite, elle exclut des communes où vous travaillez ; démesurée, elle sort des consignes.',
        'Le nom : un nom non conforme peut tenir quelque temps, puis valoir une suspension.',
        'Un doublon : une ancienne fiche oubliée, créée par un ancien prestataire, qui fait concurrence à la vôtre et sort des consignes.',
        'La distance : une recherche faite loin de votre adresse vous fera reculer face aux fiches plus proches de la personne qui cherche.',
        'La concurrence du pack local : quelques fiches occupent les premières places, et un concurrent peut en occuper plusieurs.',
      ],
    },
    // source : C:\projet site\ads-os\clients\msds18\07-gbp\suivi-classement.md (relevés hebdomadaires du 20/07 au 19/08/2026, anonymisés)
    {
      type: 'resume',
      titre: 'Cas réel, anonymisé',
      items: [
        'Un artisan du chauffage de la métropole lyonnaise, fiche relevée chaque semaine du 20 juillet au 19 août 2026.',
        'Sur son nom : première position à chaque relevé. Sur les deux recherches génériques suivies (son métier et sa ville) : jamais dans les dix premiers résultats visibles.',
        'Au relevé du 19/08, un concurrent occupait deux places sur sept, avec une seconde fiche dans la même catégorie principale que lui.',
        'Mon diagnostic à l’époque : une fiche saine, en retard sur le volume d’avis et l’ancienneté des fiches en tête, donc sur le troisième critère de Google.',
      ],
    },
    // source : C:\projet site\ads-os\.claude\skills\local-seo\SKILL.md (contenu d’une fiche : nom, catégories, NAP, horaires, description, photos, services, zone, avis)
    // source : C:\projet site\ads-os\rag\sources\best-practices\inventaire-creation-site.md (NAP identique entre site, fiche et citations ; réponses aux avis enregistrées)
    {
      type: 'h2',
      titre: 'Ce qu’une fiche d’artisan doit contenir pour sortir',
      texte:
        'Une fiche complète ne garantit rien, une fiche incomplète garantit de rester derrière. Voici la liste que je passe sur chaque fiche d’artisan, dans cet ordre.',
    },
    {
      type: 'liste',
      titre: 'La liste courte',
      items: [
        'Le nom réel, sans rien ajouter.',
        'Une catégorie principale précise, et le moins possible de catégories secondaires, seulement pour de vrais métiers.',
        'Adresse masquée si vous ne recevez pas de clients, et une zone de service qui correspond aux communes où vous intervenez réellement.',
        'Nom, adresse et téléphone identiques à la lettre sur la fiche, le site et les annuaires.',
        'Des horaires réels, y compris les fermetures exceptionnelles.',
        'Les services listés un par un, avec une description courte pour chacun.',
        'Au moins dix photos réelles : chantiers, véhicule, équipe, logo.',
        'Des avis réguliers et une réponse à chacun.',
      ],
    },
    // source : https://support.google.com/business/answer/4569145?hl=fr
    // source : https://support.google.com/business/answer/3038177?hl=fr
    // source : https://support.google.com/business/answer/7091?hl=fr
    {
      type: 'faq',
      faqs: [
        {
          question: 'Combien de temps pour rétablir une fiche Google suspendue ?',
          reponse:
            'Google ne publie pas de délai d’examen sur sa page d’aide consacrée aux fiches suspendues. Ce qui dépend de vous : corriger la fiche avant l’appel et fournir des justificatifs dont le nom et l’adresse correspondent exactement à la fiche.',
        },
        {
          question: 'Ma fiche est suspendue, puis-je en créer une nouvelle ?',
          reponse:
            'Non. Google demande de ne pas créer de fiche pour le même établissement pendant l’examen de l’appel. La nouvelle fiche serait un doublon, donc une infraction de plus.',
        },
        {
          question: 'Ajouter mon métier ou ma ville dans le nom de la fiche aide-t-il ?',
          reponse:
            'Les consignes de Google interdisent les informations superflues dans le nom : mots-clés de service, localisation, slogans. Le gain éventuel est temporaire, le risque est la suspension.',
        },
        {
          question: 'Pourquoi ma fiche sort sur mon nom mais pas sur mon métier ?',
          reponse:
            'Elle est active et Google sait qu’elle répond à votre nom. Sur la recherche de votre métier, elle se compare aux autres fiches selon la pertinence, la distance et la proéminence. Catégorie, zone de service et volume d’avis sont les premiers points à vérifier.',
        },
        {
          question: 'Peut-on avoir une fiche Google sans local ouvert au public ?',
          reponse:
            'Oui. Une entreprise qui intervient chez ses clients sans les recevoir crée une fiche avec une zone de service et doit masquer son adresse. Une boîte postale ou un bureau virtuel ne sont pas acceptés comme adresse.',
        },
      ],
    },
    // source : https://support.google.com/business/answer/4569145?hl=fr
    // source : https://support.google.com/business/answer/3038177?hl=fr
    // source : https://support.google.com/business/answer/7091?hl=fr
    {
      type: 'resume',
      titre: 'À retenir',
      items: [
        'Suspendue : corriger la fiche, puis faire appel dans l’outil de Google avec des justificatifs au nom et à l’adresse de la fiche.',
        'Ne jamais recréer de fiche pendant l’examen : ce serait un doublon.',
        'Invisible mais active : catégorie, zone de service, nom, doublon, puis notoriété et avis.',
        'Aucune place dans Maps ne s’achète : Google l’écrit dans son aide.',
      ],
    },
  ],
  liens: [
    { label: 'Avis Google négatif ou faux : que faire', href: '/problemes/avis-google-negatif-ou-faux-que-faire' },
    { label: 'Le guide de la fiche Google pour les PME', href: '/blog/google-business-profile-guide-pme' },
    { label: 'Le guide du SEO local', href: '/blog/seo-local-pme-guide-complet' },
    { label: 'Mon accompagnement SEO local', href: '/services/seo' },
    { label: 'Audit gratuit de 30 minutes', href: '/audit-gratuit' },
  ],
}
