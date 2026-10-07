import type { PageProbleme } from '../problemes'

export const page: PageProbleme = {
  slug: 'je-ne-recois-plus-les-demandes-de-mon-site',
  famille: 'panne',
  requete: 'je ne reçois plus les mails de mon formulaire de contact',
  title: 'Je ne reçois plus les demandes de mon formulaire de contact',
  description:
    'Formulaire de contact muet : le test en cinq minutes, les quatre causes dans l’ordre (spam et SPF, adresse, anti-spam, envoi fantôme) et la règle à poser.',
  titre: 'Je ne reçois plus les demandes de mon site : le test, les causes, la parade',
  // source : https://support.google.com/a/answer/81126?hl=fr (exigences d’authentification des expéditeurs vers Gmail)
  // source : C:\projet site\ads-os\rag\sources\best-practices\elements-a-fournir-nouveau-site.md (adresse de réception testée en réception réelle, test de lead avant mise en ligne)
  reponse:
    'Remplissez votre propre formulaire depuis un téléphone, hors du wifi du bureau, et regardez si la demande arrive. Si rien n’arrive, cherchez dans cet ordre : un mail classé en spam ou refusé faute d’authentification (SPF, DKIM, DMARC), une adresse de réception changée, pleine ou inexistante, un filtre anti-spam trop strict, un formulaire qui affiche « envoyé » sans rien transmettre. Ensuite, faites écrire chaque demande ailleurs que dans une boîte mail et refaites ce test chaque mois.',
  datePublication: '2026-10-07',
  tempsLecture: 8,
  contenu: [
    {
      type: 'intro',
      texte:
        'Un formulaire en panne ne prévient personne. Le visiteur voit « message envoyé » et attend un rappel qui ne viendra pas. Vous, vous constatez que le téléphone sonne moins et vous l’attribuez à la saison. Aucun des deux ne se plaint, et la panne peut durer des semaines. C’est le problème le plus coûteux que je rencontre sur les sites d’artisans et d’entreprises de service, parce qu’il est invisible. Il se détecte pourtant en cinq minutes.',
    },
    // source : C:\projet site\ads-os\rag\sources\best-practices\elements-a-fournir-nouveau-site.md (« un vrai test de lead, fait par le client » ; boîte « relevée, testée en réception »)
    {
      type: 'h2',
      titre: 'Le test en cinq minutes',
      texte:
        'Le test doit reproduire ce que fait un vrai client, pas ce que vous faites depuis votre poste. Un ordinateur du bureau, connecté au réseau du bureau, avec votre adresse habituelle, peut passer là où un client sur son téléphone échoue.',
    },
    {
      type: 'liste',
      titre: 'La marche à suivre',
      items: [
        '1. Prenez votre téléphone, coupez le wifi et passez en données mobiles.',
        '2. Ouvrez votre site comme un client, depuis une recherche Google.',
        '3. Remplissez le formulaire avec une adresse mail personnelle qui n’appartient pas à l’entreprise, et un message reconnaissable : « Test du 7 octobre, 14 h 10 ».',
        '4. Notez ce qui s’affiche après l’envoi.',
        '5. Vérifiez la boîte de réception, puis le dossier spam, puis tout autre endroit où les demandes sont censées arriver.',
        '6. Recommencez depuis un ordinateur. Si l’un des deux essais n’arrive pas, vous tenez votre panne.',
      ],
    },
    // source : https://knowledge.workspace.google.com/admin/security/about-authentication-methods?hl=fr (rôle de SPF, DKIM, DMARC)
    // source : https://knowledge.workspace.google.com/admin/security/set-up-dmarc?hl=fr (politiques DMARC none, quarantine, reject)
    // source : https://support.google.com/a/answer/81126?hl=fr (depuis le 1er février 2024 : SPF ou DKIM pour tous les expéditeurs vers Gmail ; SPF, DKIM et DMARC au-delà de 5 000 messages par jour)
    {
      type: 'h2',
      titre: 'Cause 1 : le mail part en spam, ou il est refusé',
      texte:
        'Votre formulaire envoie un mail au nom de votre domaine, souvent par un service tiers. Si votre domaine n’a pas déclaré ce service comme expéditeur autorisé, le serveur qui reçoit le mail a de bonnes raisons de s’en méfier. Depuis le 1er février 2024, Google exige de tout expéditeur vers une adresse Gmail qu’il authentifie ses envois par SPF ou DKIM, et des trois protocoles au-delà de 5 000 messages par jour. Trois réglages, posés dans la zone DNS du domaine, règlent la question.',
    },
    {
      type: 'liste',
      titre: 'SPF, DKIM et DMARC, en deux lignes chacun',
      items: [
        'SPF : la liste des serveurs autorisés à envoyer des mails au nom de votre domaine. Il empêche qu’un inconnu se fasse passer pour vous, et il doit inclure le service qui envoie les mails de votre formulaire.',
        'DKIM : une signature numérique ajoutée à chaque message sortant. Elle prouve que le message vient bien de votre domaine et qu’il n’a pas été modifié en route.',
        'DMARC : la consigne que vous donnez aux serveurs de réception pour les messages qui échouent à SPF ou DKIM. Ne rien faire, les placer en spam, ou les rejeter.',
      ],
    },
    // source : C:\projet site\ads-os\clients\aplusaudition\ETAT.md (ancien site relevé le 02/08/2026 : adresse inexistante en pied de page, bloc Email vers l’adresse d’une autre entreprise)
    // source : C:\projet site\123digital\data\etudes-de-cas.ts (ancien site d’un artisan : formulaire qui n’enregistrait plus rien, stockage de la feuille de suivi plein)
    {
      type: 'h2',
      titre: 'Cause 2 : l’adresse de réception a changé, est pleine ou n’existe pas',
      texte:
        'Un formulaire écrit à une adresse fixée le jour de la création du site. Personne ne la relit ensuite. Une boîte supprimée lors d’un changement de messagerie, une adresse d’ancien salarié, une boîte pleine ou un espace de stockage saturé suffisent à tout arrêter. J’en ai trouvé deux exemples en reprenant des sites existants. Sur l’ancien site d’un cabinet, le pied de page affichait une adresse mail qui n’existait pas, et le bloc « Email » de la page Contact renvoyait vers l’adresse d’une autre entreprise. Sur l’ancien site d’un artisan, un test fait au moment de la refonte a montré que le formulaire n’enregistrait plus rien : l’espace de stockage de la feuille de suivi était plein.',
    },
    // source : C:\projet site\ads-os\clients\msds18\ETAT.md (02/09/2026 : 5 des 23 envois d’août étaient du spam, chacun compté en conversion ; anti-spam testé sur 42 leads réels, 5 sur 5 attrapés, 0 client bloqué ; onglet Spam)
    {
      type: 'h2',
      titre: 'Cause 3 : l’anti-spam rejette les vraies demandes, ou laisse tout passer',
      texte:
        'Un formulaire public reçoit du spam : messages en alphabet cyrillique, numéros étrangers, démarchage pour refaire votre site. La tentation est de durcir le filtre jusqu’à ce que le spam disparaisse. Le risque est de rejeter en silence un vrai client dont le message ressemblait à un robot. La règle que j’applique : un envoi rejeté n’est jamais effacé, il est rangé à part, pour qu’on puisse vérifier après coup qu’aucun client n’y est tombé.',
    },
    {
      type: 'resume',
      titre: 'Cas réel, anonymisé',
      items: [
        'Un artisan du chauffage de la métropole lyonnaise, formulaire de devis relié à une feuille de suivi.',
        'En août 2026, 5 des 23 envois du formulaire étaient du spam, et chacun était compté comme une conversion dans la publicité.',
        'Le filtre posé le 2 septembre a été testé sur les 42 envois déjà reçus : 5 spams sur 5 attrapés, aucun client bloqué.',
        'Les envois classés spam partent dans un onglet séparé de la feuille, sans mail : on les relit, on ne les perd pas.',
      ],
    },
    {
      type: 'cta',
      titre: 'Vous avez un doute sur votre formulaire ?',
      texte:
        'Pendant l’audit gratuit de 30 minutes, je fais le test avec vous, je regarde où partent les demandes et ce qui se passe quand l’envoi échoue.',
    },
    // source : C:\projet site\ads-os\clients\msds18\ETAT.md (bug du 04/08 au 02/09/2026 : champs envoyés sous des noms que le script ne lisait pas, perdus sur 24 fiches, irrécupérables)
    {
      type: 'h2',
      titre: 'Cause 4 : le formulaire affiche « envoyé » sans rien transmettre',
      texte:
        'C’est la panne la plus sournoise, parce que le visiteur reçoit sa confirmation. Le message de remerciement s’affiche dans le navigateur, mais la transmission vers la boîte mail ou la feuille échoue derrière. Dans les cas que j’ai vus, elle suivait une modification du site : un champ renommé, un script de réception qui n’a pas suivi. Chez le même artisan du chauffage, une version du formulaire envoyait à partir du 4 août des champs sous des noms que le script de réception ne lisait pas. Le type d’intervention et la description du besoin ont été perdus sur 24 demandes, sans aucun message d’erreur, jusqu’à la correction du 2 septembre. Ces informations sont irrécupérables.',
    },
    // source : C:\projet site\123digital\app\api\contact\route.ts (deux destinations indépendantes, après la réponse ; 8,3 s mesurées le 20/08 dont 7,5 s d’attente ; « LEAD PERDU » ; « REJETÉ anti-spam » écrit dans la feuille)
    // source : C:\projet site\ads-os\clients\123digital\ETAT.md (formulaire branché : Resend vers une boîte Gmail et feuille Google « 123digital · Leads »)
    {
      type: 'h2',
      titre: 'Mon propre formulaire, et les choix que j’y ai faits',
      texte:
        'Sur 123digital.fr, chaque demande part vers deux destinations indépendantes : un mail envoyé par un service d’envoi depuis mon domaine, et une ligne dans une feuille Google. Si l’une échoue, l’autre part quand même. Si les deux échouent, le serveur écrit « LEAD PERDU » dans son journal, avec le contenu de la demande. Les envois piégés par l’anti-spam ne disparaissent pas non plus : ils sont écrits dans la même feuille avec la mention « REJETÉ anti-spam », sans mail, ce qui me permet de vérifier qu’aucun vrai contact n’y figure. J’ai fait un choix qui a un prix. Le 20 août, j’ai mesuré 8,3 secondes de bouton qui tourne sur un envoi réel, dont 7,5 secondes à attendre les deux services tiers. Le formulaire répond donc « envoyé » dès que la demande est validée, et les écritures se terminent après. Le visiteur n’attend plus, mais un échec ne se voit plus de son côté. D’où le journal, et d’où le test mensuel.',
    },
    // source : C:\Users\moche\.claude-ads\projects\C--projet-site-ads-os\memory\feedback_croiser-feuille-leads-avant-coupure.md (feuille des leads contre Google Ads : le dimanche, meilleur jour des formulaires, invisible pour Ads)
    // source : C:\projet site\ads-os\clients\msds18\ETAT.md (22/09/2026 : baisse des leads vérifiée, formulaire pas cassé ; Ads ne voit que 2 formulaires sur 7 depuis le 01/09, cookies refusés)
    {
      type: 'h2',
      titre: 'La règle : chaque demande laisse une trace ailleurs que dans une boîte mail',
      texte:
        'Une boîte mail est un mauvais registre : on y supprime, on y filtre, on y perd. Une feuille de suivi, alimentée automatiquement par le formulaire, donne une liste datée de chaque demande. Elle sert aussi à trancher les fausses alertes. Chez l’artisan du chauffage, une baisse nette des demandes en septembre a été vérifiée ligne par ligne : le formulaire fonctionnait, la baisse venait de jours où la publicité était coupée et de visiteurs qui appelaient plutôt que d’écrire. La même feuille a montré que la publicité ne voyait que 2 formulaires sur 7, faute de consentement aux cookies : juger un jour ou un appareil sur les seuls chiffres de Google Ads aurait coupé un créneau qui produisait des demandes.',
    },
    {
      type: 'liste',
      titre: 'Ce que je mets en place',
      items: [
        'Une feuille de suivi alimentée par le formulaire, indépendante de la boîte mail.',
        'Un onglet à part pour les envois rejetés par l’anti-spam, relu de temps en temps.',
        'SPF, DKIM et DMARC posés sur le domaine qui envoie les mails du formulaire.',
        'Un test complet le premier lundi de chaque mois, depuis un téléphone hors wifi, inscrit au calendrier.',
        'Un nouveau test après chaque modification du site, même minime.',
      ],
    },
    // source : https://support.google.com/a/answer/81126?hl=fr
    // source : https://knowledge.workspace.google.com/admin/security/about-authentication-methods?hl=fr
    // source : C:\projet site\ads-os\clients\msds18\ETAT.md
    // source : C:\projet site\123digital\app\api\contact\route.ts
    {
      type: 'faq',
      faqs: [
        {
          question: 'Pourquoi les mails de mon formulaire arrivent en spam ?',
          reponse:
            'Le plus souvent parce que le domaine qui envoie n’a pas autorisé le service d’envoi dans son enregistrement SPF, ou ne signe pas ses messages avec DKIM. Depuis février 2024, Google exige au minimum l’un des deux pour les envois vers Gmail.',
        },
        {
          question: 'Comment savoir si mon formulaire de contact fonctionne ?',
          reponse:
            'Remplissez-le vous-même depuis un téléphone en données mobiles, avec une adresse personnelle et un message daté. Vérifiez la réception, le dossier spam et la feuille de suivi s’il y en a une. Refaites-le chaque mois et après chaque modification du site.',
        },
        {
          question: 'Mon formulaire affiche « message envoyé » mais je ne reçois rien, pourquoi ?',
          reponse:
            'Le message de confirmation s’affiche dans le navigateur, la transmission se fait derrière. Un champ renommé, un script de réception qui ne suit plus, une adresse supprimée ou une destination pleine coupent la transmission sans rien changer à l’écran du visiteur.',
        },
        {
          question: 'C’est quoi SPF, DKIM et DMARC ?',
          reponse:
            'Trois réglages DNS de votre domaine. SPF liste les serveurs autorisés à envoyer en votre nom, DKIM signe chaque message, DMARC dit au destinataire quoi faire d’un message qui échoue aux deux premiers contrôles.',
        },
        {
          question: 'Faut-il un anti-spam sur un formulaire de contact ?',
          reponse:
            'Oui, sinon le spam pollue vos demandes et vos statistiques de conversion. Mais un envoi rejeté doit être rangé à part, jamais effacé, pour vérifier qu’aucun vrai client n’a été bloqué.',
        },
      ],
    },
    // source : https://support.google.com/a/answer/81126?hl=fr
    // source : https://knowledge.workspace.google.com/admin/security/about-authentication-methods?hl=fr
    // source : C:\projet site\ads-os\clients\msds18\ETAT.md
    // source : C:\projet site\123digital\app\api\contact\route.ts
    {
      type: 'resume',
      titre: 'À retenir',
      items: [
        'Un formulaire en panne ne prévient personne : seul un test régulier la révèle.',
        'Le test : téléphone, données mobiles, adresse personnelle, message daté.',
        'Les causes, dans l’ordre : authentification du domaine, adresse de réception, anti-spam, transmission silencieuse.',
        'Chaque demande doit laisser une trace dans une feuille de suivi, pas seulement dans une boîte mail.',
        'Un test par mois, et un après chaque modification du site.',
      ],
    },
  ],
  liens: [
    { label: 'Un site d’artisan dépannage qui fait appeler', href: '/problemes/site-internet-artisan-depannage-qui-fait-appeler' },
    { label: 'Mes Google Ads ne rapportent rien', href: '/problemes/mes-google-ads-ne-rapportent-rien' },
    { label: 'Automatisation marketing pour PME : par où commencer', href: '/blog/automatisation-marketing-pme-debutant' },
    { label: 'Création de site web', href: '/services/creation-site-web' },
    { label: 'Audit gratuit de 30 minutes', href: '/audit-gratuit' },
  ],
}
