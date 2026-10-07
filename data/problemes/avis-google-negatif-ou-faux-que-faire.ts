import type { PageProbleme } from '../problemes'

export const page: PageProbleme = {
  slug: 'avis-google-negatif-ou-faux-que-faire',
  famille: 'reputation',
  requete: 'avis google négatif que faire',
  title: 'Avis Google négatif ou faux avis : que faire, dans l’ordre',
  description:
    'Avis Google négatif ou faux avis : répondre en quatre lignes, savoir ce que Google retire, le signaler, puis obtenir plus d’avis sans enfreindre ses règles.',
  titre: 'Avis Google négatif ou faux avis : que faire, et dans quel ordre',
  // source : https://support.google.com/business/answer/4596773?hl=fr (signalement, examen « généralement plusieurs jours »)
  // source : C:\projet site\ads-os\clients\msds18\07-gbp\pack-gbp.md (règle interne : répondre sous 48 h)
  reponse:
    'Un avis négatif mais réel ne se supprime pas : vous y répondez en public, sous 48 heures, en quatre lignes calmes. Un faux avis (expérience inventée, concurrent, ancien salarié, contenu hors sujet) se signale depuis votre fiche, Google l’examine en général en quelques jours et ne retire que ce qui enfreint ses règles. Le levier qui pèse le plus sur la durée reste le nombre d’avis réels, demandés à tous vos clients et sans contrepartie.',
  datePublication: '2026-10-07',
  tempsLecture: 8,
  contenu: [
    {
      type: 'intro',
      texte:
        'Un avis à une étoile tombe un mardi soir, et vous le relisez dix fois. La première envie est de le faire disparaître, la seconde de répondre tout de suite pour rétablir la vérité. Les deux réflexes coûtent cher. Je vous donne ici la méthode que j’applique pour les artisans et les entreprises de service que j’accompagne : trier l’avis, répondre ou signaler, puis travailler le seul levier qui change vraiment la note sur un an.',
    },
    // source : https://support.google.com/contributionpolicy/answer/7400114?hl=fr (contenus interdits et restreints)
    {
      type: 'h2',
      titre: 'Premier tri : l’avis est-il vrai ou faux ?',
      texte:
        'Google ne retire pas un avis parce qu’il est injuste, sévère ou mal écrit. Il retire un avis qui enfreint ses règles de contenu. Avant toute action, je classe donc l’avis dans l’une des deux colonnes. Un client réel qui raconte mal une vraie intervention reste un avis réel, même si les faits vous semblent déformés. Un avis qui ne correspond à aucune intervention, ou qui vient de quelqu’un qui a un intérêt à vous nuire, relève des règles de Google.',
    },
    {
      type: 'liste',
      titre: 'Les cas que les règles de Google visent explicitement',
      items: [
        'Faux engagement : un avis qui ne reflète pas une expérience réellement vécue, un avis payé, ou plusieurs avis publiés par la même personne depuis plusieurs comptes.',
        'Conflit d’intérêts : un avis laissé par un concurrent, un salarié actuel ou ancien, un proche, ou toute personne liée à l’entreprise par un contrat ou une relation qui fausse son jugement.',
        'Contenu hors sujet : un commentaire politique, social ou personnel qui ne parle pas de l’expérience vécue chez vous.',
        'Contrepartie : un avis obtenu, modifié ou supprimé en échange d’un avantage, remise, prestation gratuite ou paiement.',
      ],
    },
    // source : https://support.google.com/business/answer/3474122?hl=fr (ton aimable, pas d’argument vendeur, signer de son nom)
    // source : C:\projet site\ads-os\clients\msds18\07-gbp\pack-gbp.md (répondre sous 48 h, ne jamais confirmer un prix)
    // source : C:\projet site\ads-os\clients\msds18\06-reports\2026-10-01-reponses-avis-google.txt (structure des réponses : un détail repris de l’avis, une ouverture, trois phrases maximum, jamais de prix)
    {
      type: 'h2',
      titre: 'L’avis est vrai et négatif : répondre, et comment',
      texte:
        'Votre réponse s’adresse moins à l’auteur de l’avis qu’aux personnes qui liront la fiche avant de vous appeler. Elles regardent deux choses : le délai, visible sous chaque avis, et le ton. Je réponds sous 48 heures, jamais à chaud. Google recommande lui-même une réponse claire, polie, sans argument commercial, et signée d’un nom ou d’initiales pour qu’elle sonne vrai.',
    },
    {
      type: 'liste',
      titre: 'Ma méthode de réponse en quatre lignes',
      items: [
        'Ligne 1 : remercier en reprenant un détail précis de l’avis, pour montrer que vous l’avez lu.',
        'Ligne 2 : reconnaître ce qui a manqué, sans vous justifier ni contredire le client point par point.',
        'Ligne 3 : proposer une suite hors de la fiche, par téléphone, avec un interlocuteur nommé.',
        'Ligne 4 : signer d’un prénom, pas d’un service client anonyme.',
      ],
    },
    {
      type: 'h3',
      titre: 'Exemple de réponse rédigée',
      texte:
        'Avis à deux étoiles : « Technicien arrivé avec une heure de retard et facture plus élevée que ce que j’imaginais. » Réponse : « Bonjour Sophie, merci d’avoir pris le temps d’écrire. Une heure de retard sans prévenir, je le regrette, et je l’ai repris avec l’équipe. Sur la facture, chaque intervention part d’un devis signé avant de commencer : si une ligne vous paraît floue, appelez-moi directement, je la détaille avec vous. Julien. » Aucun montant, aucune leçon, une porte ouverte.',
    },
    {
      type: 'liste',
      titre: 'Ce qu’une réponse ne doit jamais contenir',
      items: [
        'Un prix ou un montant, même pour corriger celui du client : écrit en public, il devient un tarif de référence que d’autres vous opposeront.',
        'Un argumentaire commercial ou une liste de vos services : Google le déconseille et le lecteur le repère.',
        'Un texte collé en série. Sur une fiche que je suivais, des réponses publiées par lot après plusieurs semaines d’attente ont fini avec le texte destiné à un client sous l’avis d’une autre cliente, visible de tous. Répondre au fil de l’eau évite cet accident.',
      ],
    },
    {
      type: 'cta',
      titre: 'Une fiche à remettre d’aplomb ?',
      texte:
        'Je relis votre fiche, vos avis et vos réponses pendant l’audit gratuit de 30 minutes, et je vous dis ce qui se signale, ce qui se répond et ce qui se laisse.',
    },
    // source : https://support.google.com/business/answer/4596773?hl=fr (étapes de signalement, outil de gestion des avis, examen « généralement plusieurs jours », recours, « ne signalez pas un avis uniquement parce que vous n’êtes pas d’accord »)
    {
      type: 'h2',
      titre: 'L’avis est faux : le signaler, et ce que Google retire vraiment',
      texte:
        'Le signalement se fait depuis votre fiche, connecté au compte qui la gère. Google précise que l’examen prend généralement plusieurs jours, et que vous suivez l’avancement dans son outil de gestion des avis. Si l’avis reste en ligne après examen, l’outil propose un recours. Je documente chaque signalement : date, motif choisi, capture de l’avis, raison pour laquelle il enfreint une règle précise. Un motif bien choisi vaut mieux qu’un long plaidoyer.',
    },
    {
      type: 'liste',
      titre: 'La procédure, étape par étape',
      items: [
        '1. Ouvrez votre fiche d’établissement depuis le compte qui la gère.',
        '2. Affichez les avis et repérez celui qui pose problème.',
        '3. Cliquez sur l’icône de signalement à côté de l’avis.',
        '4. Choisissez le motif qui correspond à la règle enfreinte (faux engagement, conflit d’intérêts, hors sujet, langage injurieux).',
        '5. Envoyez, puis suivez le statut dans l’outil de gestion des avis.',
        '6. Si Google conclut qu’aucune règle n’est enfreinte, faites appel depuis le même outil.',
      ],
    },
    // source : https://support.google.com/business/answer/4596773?hl=fr (ne pas signaler par simple désaccord)
    // source : https://support.google.com/business/answer/7091?hl=fr (aucun moyen d’obtenir un meilleur classement contre rémunération)
    // source : https://support.google.com/business/answer/2622994?hl=fr (sollicitation sélective, avantages en échange d’avis, personnel)
    {
      type: 'h2',
      titre: 'Ce qui ne marche pas, ou se retourne contre vous',
      texte:
        'Plusieurs réflexes courants n’ont aucun effet, et certains exposent la fiche elle-même. Les règles de Google sont publiques : je préfère les lire que croire une promesse de « nettoyage d’avis ».',
    },
    {
      type: 'liste',
      titre: 'À éviter',
      items: [
        'Signaler un avis parce que vous n’êtes pas d’accord : Google le dit en toutes lettres, ce n’est pas un motif de retrait.',
        'Payer un prestataire qui promet de faire disparaître des avis ou de remonter la fiche : Google indique qu’aucune place au classement local ne s’obtient contre rémunération.',
        'Faire publier des avis par vos proches, vos salariés ou un partenaire : c’est un conflit d’intérêts au sens des règles.',
        'Offrir une remise, un geste ou un cadeau contre un avis, ou contre le retrait d’un avis négatif : c’est une contrepartie, interdite.',
        'Accuser publiquement le client de mentir dans votre réponse : le lecteur suivant retient le ton, pas vos arguments.',
      ],
    },
    // source : https://support.google.com/business/answer/7091?hl=fr (plus d’avis et de notes positives, meilleur classement local)
    // source : C:\projet site\ads-os\clients\msds18\07-gbp\suivi-classement.md (relevés du 20/07 au 19/08/2026, anonymisés)
    {
      type: 'h2',
      titre: 'Le vrai levier : le nombre d’avis réels',
      texte:
        'Un avis négatif pèse lourd sur une fiche qui en compte dix, presque rien sur une fiche qui en compte cent. Google l’écrit dans son aide sur le classement local : plus une fiche reçoit d’avis et de notes positives, plus elle progresse. Le meilleur traitement d’un mauvais avis est donc un flux régulier de bons avis réels, qui le repousse en bas de la liste et dilue son effet sur la note.',
    },
    {
      type: 'resume',
      titre: 'Cas réel, anonymisé',
      items: [
        'Un artisan du chauffage de la métropole lyonnaise, fiche suivie chaque semaine en juillet et août 2026.',
        '32 avis au premier relevé du 20/07, 44 au 10/08 : douze avis de plus en trois semaines.',
        'Au relevé du 19/08, sur la recherche générique de son métier et de sa ville, les deux premières fiches affichaient 76 et 239 avis.',
        'Les réponses publiées par lot ont produit une erreur visible (une réponse sous le mauvais avis), d’où la règle de répondre sous 48 heures.',
      ],
    },
    // source : https://support.google.com/business/answer/3474122?hl=fr (demander via un lien ou un QR code ; avantages interdits)
    // source : https://support.google.com/business/answer/2622994?hl=fr (sollicitation sélective interdite ; demander des avis réels sans avantage est permis)
    {
      type: 'h2',
      titre: 'Demander des avis sans enfreindre les règles',
      texte:
        'Google autorise et encourage la demande d’avis, à deux conditions : la demande ne s’accompagne d’aucun avantage, et elle ne trie pas les clients. Demander un avis aux seuls clients contents, ou décourager ceux qui ont eu un souci, est interdit au même titre que la remise contre une étoile. Je demande donc à tout le monde, de la même façon, au moment où le travail est fini.',
    },
    {
      type: 'liste',
      titre: 'Comment je l’organise',
      items: [
        'Un lien court vers le formulaire d’avis de la fiche, et un QR code, les deux moyens que Google cite.',
        'Le même message pour chaque client, envoyé par SMS ou par mail après l’intervention, sans condition ni filtre.',
        'Aucune remise, aucun tirage au sort, aucun cadeau associé à l’avis.',
        'Aucun objectif chiffré d’avis imposé aux techniciens : Google cite ce cas parmi les pratiques interdites.',
        'Une réponse à chaque nouvel avis, positif ou négatif, sous 48 heures.',
      ],
    },
    // source : https://support.google.com/business/answer/4596773?hl=fr
    // source : https://support.google.com/contributionpolicy/answer/7400114?hl=fr
    // source : https://support.google.com/business/answer/2622994?hl=fr
    // source : https://support.google.com/business/answer/3474122?hl=fr
    // source : C:\projet site\ads-os\clients\msds18\07-gbp\pack-gbp.md
    {
      type: 'faq',
      faqs: [
        {
          question: 'Peut-on supprimer un avis Google négatif ?',
          reponse:
            'Vous ne pouvez pas le supprimer vous-même. Google ne le retire que s’il enfreint ses règles : faux engagement, conflit d’intérêts, contenu hors sujet, contrepartie, propos injurieux. Un avis négatif mais réel reste en ligne, et la réponse publique est votre seul outil.',
        },
        {
          question: 'Combien de temps pour qu’un faux avis soit retiré ?',
          reponse:
            'Google indique que l’examen d’un signalement prend généralement plusieurs jours. Vous suivez le statut dans l’outil de gestion des avis, et un recours est possible si l’avis est maintenu.',
        },
        {
          question: 'Faut-il répondre à un avis sans texte, juste une étoile ?',
          reponse:
            'Oui. Une réponse courte, polie, qui invite la personne à vous appeler pour comprendre ce qui a manqué. Elle montre aux lecteurs suivants que la fiche est suivie.',
        },
        {
          question: 'Un concurrent m’a laissé un faux avis, que faire ?',
          reponse:
            'Signalez-le avec le motif conflit d’intérêts, en notant ce qui vous permet de l’identifier. Répondez en parallèle, sobrement, en indiquant que vous ne retrouvez aucune intervention correspondante, sans accuser personne.',
        },
        {
          question: 'Ai-je le droit d’offrir une remise contre un avis ?',
          reponse:
            'Non. Google interdit tout avantage en échange de la publication, de la modification ou de la suppression d’un avis, positif comme négatif. Demander un avis sans rien offrir est en revanche autorisé.',
        },
      ],
    },
    // source : https://support.google.com/business/answer/4596773?hl=fr
    // source : https://support.google.com/contributionpolicy/answer/7400114?hl=fr
    // source : https://support.google.com/business/answer/2622994?hl=fr
    // source : https://support.google.com/business/answer/3474122?hl=fr
    // source : C:\projet site\ads-os\clients\msds18\07-gbp\pack-gbp.md
    {
      type: 'resume',
      titre: 'À retenir',
      items: [
        'Avis réel et négatif : une réponse publique en quatre lignes, sous 48 heures, sans prix ni argumentaire.',
        'Faux avis : un signalement depuis la fiche, avec le motif exact de la règle enfreinte, puis un recours si besoin.',
        'Payer, faire écrire des proches ou offrir une remise exposent la fiche et ne retirent rien.',
        'Le levier durable : demander un avis à chaque client, de la même façon, sans contrepartie.',
      ],
    },
  ],
  liens: [
    { label: 'Fiche Google suspendue ou invisible sur Maps', href: '/problemes/fiche-google-suspendue-ou-invisible' },
    { label: 'Un concurrent apparaît quand on tape mon nom', href: '/problemes/un-concurrent-apparait-sur-mon-nom' },
    { label: 'Le guide de la fiche Google pour les PME', href: '/blog/google-business-profile-guide-pme' },
    { label: 'Mon accompagnement SEO et SEO local', href: '/services/seo' },
    { label: 'Audit gratuit de 30 minutes', href: '/audit-gratuit' },
  ],
}
