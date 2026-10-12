import type { PageProbleme } from '../problemes'

export const page: PageProbleme = {
  slug: 'un-concurrent-apparait-sur-mon-nom',
  famille: 'reputation',
  requete: 'un concurrent apparaît quand on tape mon nom sur google',
  title: 'Un concurrent apparaît sur mon nom dans Google : que faire',
  description:
    'Un concurrent sort quand on tape votre nom ? Annonce payée, homonyme ou site mal placé : les trois cas, ce que Google autorise et ce que vous pouvez faire.',
  titre: 'Un concurrent apparaît quand on tape mon nom sur Google : trois situations à distinguer',
  // source : https://support.google.com/adspolicy/answer/6118?hl=fr (Google Ads ne restreint pas l'usage des marques comme mots clés ; restriction possible dans le texte après réclamation du propriétaire)
  // source : C:\projet site\ads-os\clients\123digital\06-reports\2026-08-20-strategie-seo.md (section 5 : désambiguïser en accolant nom du dirigeant et ville)
  reponse:
    'Trois situations se ressemblent : un concurrent achète votre nom comme mot clé Google Ads, une autre entité porte le même nom que vous, ou votre propre site ne sort pas en tête sur votre nom. Google autorise l’achat d’une marque comme mot clé ; il peut restreindre son usage dans le texte de l’annonce, après une réclamation du propriétaire de la marque. La règle de Google sur les marques ne s’applique qu’aux annonces : les deux autres situations se traitent en rendant votre nom identifiable sans ambiguïté.',
  datePublication: '2026-10-07',
  tempsLecture: 7,
  contenu: [
    {
      type: 'intro',
      texte:
        'Un client vous dit qu’en tapant le nom de votre entreprise, il est tombé sur un concurrent. La réaction immédiate est de vouloir faire retirer ce résultat. Avant cela, il faut savoir lequel des trois cas vous vivez, parce qu’ils n’ont ni la même cause ni le même remède. Je les ai rencontrés tous les trois, dont un sur mon propre nom. Cette page ne traite pas des avis Google, qui ont leur propre page.',
    },
    {
      type: 'h2',
      titre: 'Reconnaître votre situation en une recherche',
      texte:
        'Tapez votre nom exact dans Google, depuis une fenêtre de navigation privée, et regardez ce qui sort au-dessus de votre site.',
    },
    {
      type: 'liste',
      titre: 'Les trois cas :',
      items: [
        'Le concurrent apparaît dans un résultat signalé comme annonce : il paie pour sortir sur votre nom. C’est la situation 1.',
        'Le résultat est naturel, et il désigne une autre entreprise ou un autre site qui porte le même nom ou un nom très proche : c’est une collision de nom, la situation 2.',
        'Aucun concurrent particulier, mais votre site ou votre fiche n’arrive pas en tête : Google ne vous identifie pas encore clairement sur votre nom. C’est la situation 3.',
      ],
    },
    // source : https://support.google.com/adspolicy/answer/6118?hl=fr (mots clés non restreints ; texte d'annonce : restriction après examen d'une réclamation ; exceptions revendeurs, sites informatifs, usage descriptif ; plainte réservée au propriétaire ayant démontré ses droits ; signalement via la page « signaler un contenu sur Google » en identifiant les annonceurs)
    {
      type: 'h2',
      titre: 'Situation 1 : un concurrent achète votre nom en Google Ads',
      texte:
        'La règle de Google sur les marques est claire sur un point qui surprend : Google Ads ne restreint pas l’utilisation d’une marque comme mot clé. Un concurrent peut donc enchérir sur votre nom. La protection porte sur le texte de l’annonce. Si le propriétaire d’une marque envoie une réclamation, Google l’examine et peut restreindre l’usage de cette marque dans les annonces. Des exceptions existent : un revendeur de vos produits, un site d’information ou un usage descriptif du mot peuvent rester autorisés. La plainte est réservée au propriétaire d’une marque qui démontre ses droits, et elle se dépose par la procédure « signaler un contenu sur Google », en désignant les annonceurs concernés.',
    },
    {
      type: 'liste',
      titre: 'Ce que vous pouvez faire :',
      items: [
        'Lire l’annonce : votre nom figure-t-il dans son texte, ou seulement dans les mots clés achetés ? Dans le second cas, aucune règle de Google n’est enfreinte.',
        'Vérifier que votre nom est bien déposé comme marque, puisque la plainte suppose de démontrer vos droits.',
        'Si votre marque figure dans le texte d’une annonce de concurrent direct, faire le signalement en notant l’adresse du site de l’annonceur.',
        'Envisager une campagne sur votre propre nom, seulement si les conditions décrites plus bas sont réunies.',
      ],
    },
    // source : C:\Users\moche\.claude-ads\projects\C--projet-site-ads-os\memory\feedback_first-degree-no-padding.md (campagne de marque écartée tant que le nom n'est pas cherché : aucune requête sur le nom dans les termes de recherche)
    // source : C:\projet site\ads-os\rag\sources\best-practices\EXEMPLE-structure-compte-leadgen-local.md (1 campagne par ligne de service + 1 campagne brand)
    // source : C:\projet site\ads-os\rag\sources\best-practices\benchmarks-sea-france.md (Brand : CTR 15-30 %, taux de conversion 10-20 %, relevé juin 2026)
    {
      type: 'h2',
      titre: 'Faut-il une campagne publicitaire sur votre propre nom ?',
      texte:
        'Ma règle de méthode : une campagne de marque ne vaut que si des gens cherchent déjà votre nom. Je la vérifie dans la donnée avant de la proposer. Chez un artisan que j’accompagne, j’ai écarté cette campagne : son nom n’apparaissait dans aucune recherche ayant déclenché ses annonces, et il n’y avait donc personne à protéger. Quand la demande existe, la structure que j’utilise pour une entreprise de services locale est une campagne par ligne de service, plus une campagne dédiée au nom. Les campagnes de marque ont des taux de clic et de conversion élevés : de l’ordre de 15 à 30 % de clics et de 10 à 20 % de conversions dans mes repères de juin 2026, parce que la personne vous cherche déjà. C’est aussi pour cela qu’elles ne servent à rien quand personne ne vous cherche.',
    },
    // source : C:\projet site\ads-os\clients\123digital\06-reports\2026-08-20-strategie-seo.md (section 5 : collision à quatre entités, une société française sans rapport)
    // source : C:\projet site\ads-os\clients\123digital\06-reports\2026-08-19-diagnostic-search-console.md (« La requête qui fausse tout » : 3 268 impressions sur 8 275 en 90 jours, soit 39 %, 0 clic, position 7 ; environ 5 000 impressions hors homonyme)
    {
      type: 'h2',
      titre: 'Situation 2 : une autre entité porte votre nom',
      texte:
        'C’est mon cas. « 123 Digital » est partagé : en août 2026, la première page de résultats sur ce nom montrait une agence de publicité britannique, la plateforme d’une fondation, présente en Belgique et en Suisse, une société française sans rapport avec mon métier, et un site dont l’adresse commence aussi par « 123 ». Ce dernier pesait lourd dans mes propres chiffres. Sur 90 jours arrêtés au 18 août 2026, 39 % des impressions de mon site dans Search Console, 3 268 sur 8 275, venaient de personnes qui cherchaient cet autre site. Elles voyaient le mien en septième position et ne cliquaient pas, ce qui est normal quand on cherche autre chose. Une fois ces requêtes retirées, mon site tombait à environ 5 000 impressions.',
    },
    // source : C:\projet site\ads-os\clients\123digital\06-reports\2026-08-20-strategie-seo.md (section 5 : un moteur ne peut résoudre le nom vers une entité ; deux voies ; tableau section 8bis : la désambiguïsation ne produit aucun client à court terme, descend en bas de liste)
    {
      type: 'paragraphe',
      texte:
        'Une collision dans les résultats naturels ne se traite pas par le signalement prévu pour les annonces. Ni Google ni un moteur de réponse génératif ne peuvent alors relier le nom à une seule entreprise, et ils n’ont personne à qui attribuer ce que vous publiez. Deux voies existent. Désambiguïser, en accolant partout le nom du dirigeant et la ville au nom de l’entreprise : c’est du travail éditorial sur plusieurs semaines. Ou accepter que la requête sur le nom ne soit jamais gagnée, et viser les recherches de métier. Pour mon propre site, j’ai mis la désambiguïsation en bas de liste : elle ne compte que le jour où des gens cherchent déjà le nom, et elle ne produit aucun client à court terme.',
    },
    {
      type: 'cta',
      titre: 'Savoir ce qui sort vraiment sur votre nom',
      texte:
        'Lors d’un audit gratuit de 30 minutes, je regarde avec vous ce que Google affiche sur votre nom, d’où vient ce qui vous gêne, et si une action vaut son coût.',
    },
    // source : C:\projet site\ads-os\clients\123digital\06-reports\2026-08-28-bilan-situation.md (section 2 : requête de marque « 123 digital » en position 11, site pas premier sur son propre nom)
    // source : C:\projet site\ads-os\clients\123digital\ETAT.md (fiche Google existante mais vide au relevé du 20/08)
    // source : https://support.google.com/webmasters/answer/7576553?hl=fr (rapport sur les performances, dimension « Requêtes »)
    {
      type: 'h2',
      titre: 'Situation 3 : votre site ne sort pas premier sur votre nom',
      texte:
        'Fin août 2026, mon site sortait en position 11 sur « 123 digital », c’est-à-dire en deuxième page sur son propre nom. Dans mon cas, la cause est le nom partagé : Google ne peut pas relier « 123 Digital » à une seule entreprise. Quand le nom n’est pas partagé, posez-vous la même question : Google dispose-t-il d’assez d’éléments cohérents pour relier ce nom à votre entreprise ? Ma propre fiche existait mais restait vide au relevé du 20 août 2026. Pour mesurer, ouvrez dans Search Console le rapport sur les performances, onglet « Requêtes », et repérez celles qui contiennent votre nom : vous y lirez votre position réelle, sans dépendre de ce que montre votre navigateur.',
    },
    // source : synthèse des sections ci-dessus (règle Google Ads sur les marques, méthode campagne de marque, diagnostic Search Console du 19/08)
    {
      type: 'liste',
      titre: 'Ce que je fais, dans l’ordre :',
      items: [
        'Identifier la situation : annonce, homonyme, ou site mal identifié.',
        'Pour une annonce : lire son texte, et vérifier que le nom est déposé comme marque avant toute plainte.',
        'Mesurer dans Search Console les recherches sur le nom, et en retirer celles qui visent un homonyme.',
        'Ne lancer une campagne sur le nom que si ces recherches existent.',
        'Si le nom est partagé, l’associer partout au nom du dirigeant et à la ville.',
      ],
    },
    {
      type: 'faq',
      faqs: [
        {
          question: 'Un concurrent a-t-il le droit d’acheter mon nom sur Google Ads ?',
          reponse:
            'Comme mot clé, oui : la règle de Google Ads ne restreint pas l’usage d’une marque comme mot clé. L’usage de votre marque dans le texte de son annonce peut en revanche être restreint par Google après une réclamation du propriétaire de la marque.',
        },
        {
          question: 'Comment signaler une annonce qui utilise ma marque ?',
          reponse:
            'Par la procédure « signaler un contenu sur Google », en désignant les annonceurs concernés. Elle est réservée au propriétaire d’une marque qui démontre ses droits sur cette marque.',
        },
        {
          question: 'Pourquoi mon site n’apparaît pas en premier quand on tape mon nom ?',
          reponse:
            'Parce que Google ne relie pas encore clairement ce nom à votre entreprise, par exemple parce qu’une autre entité porte le même nom. Search Console vous donne votre position réelle sur ces recherches.',
        },
        {
          question: 'Une campagne Google Ads sur mon propre nom, est-ce utile ?',
          reponse:
            'Seulement si des gens cherchent déjà votre nom. Vérifiez-le dans vos termes de recherche ou dans Search Console avant de payer pour des recherches qui n’existent pas.',
        },
      ],
    },
    {
      type: 'resume',
      titre: 'À retenir',
      items: [
        'Trois cas distincts : annonce payée sur votre nom, homonyme, site mal identifié.',
        'Google autorise l’achat de votre marque comme mot clé ; seul le texte de l’annonce peut faire l’objet d’une plainte.',
        'La plainte suppose une marque dont vous démontrez la propriété.',
        'Une campagne sur votre nom ne sert que si votre nom est déjà cherché.',
        'Un homonyme fausse vos statistiques : retirez ses requêtes avant de juger votre trafic.',
      ],
    },
  ],
  sources: [
    { label: 'Règles Google Ads : marques déposées', url: 'https://support.google.com/adspolicy/answer/6118?hl=fr' },
    { label: 'Aide Search Console : rapport sur les performances', url: 'https://support.google.com/webmasters/answer/7576553?hl=fr' },
  ],
  liens: [
    { label: 'Avis Google négatif ou faux : que faire', href: '/problemes/avis-google-negatif-ou-faux-que-faire' },
    { label: 'Mes Google Ads ne rapportent rien : les cinq causes', href: '/problemes/mes-google-ads-ne-rapportent-rien' },
    { label: 'Référencement naturel : comment je travaille', href: '/services/seo' },
    { label: 'Publicité en ligne : comment je gère un compte', href: '/services/publicite-en-ligne' },
    { label: 'Demander un audit gratuit de 30 minutes', href: '/audit-gratuit' },
  ],
}
