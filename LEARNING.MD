LEARNING.md - Apprentissages et Interactions avec le LLM

Ce document documente les expériences d'apprentissage lors du développement de TicketMaster, incluant les prompts utilisés, les erreurs rencontrées et les corrections apportées.


PROMPTS UTILISÉS

Prompt 1 : Structure du Projet et Données

On a commencé par se demander comment structurer le projet pour séparer le backend (API Python) et le frontend (React). 

On a demandé au LLM: "Comment je dois structurer mon projet pour séparer le backend (API Python) et le frontend (React)? Et quels champs minimums je dois mettre dans un ticket?"

Le LLM a proposé une arborescence avec des dossiers backend et frontend séparés. Il a donné des indices sur les champs nécessaires: id, title, description, status, priority, tags, et timestamps (createdAt et updatedAt). Mais le LLM n'a pas donné le code - seulement les concepts et les questions pour nous orienter.

On a appris que c'est important de penser à la structure AVANT de coder. Comprendre pourquoi chaque dossier existe et comment les champs de données doivent être cohérents dans toute l'application.


Prompt 2 : Filtrer les Données - Mode Pédagogique

Après avoir créé la structure, il fallait implementer un système de filtrage pour les tickets selon plusieurs critères optionnels.

On a demandé: "Explique-moi juste comment un backend filtre une liste de données selon plusieurs critères optionnels. Quoi faire si le filtre n'est pas fourni? Indice seulement, pas de code complet."

Le LLM a répondu avec seulement des questions: Comment vérifier si une valeur est fournie? Qu'est-ce qui se passe si le filtre est None? List comprehensions peuvent être chaînées comment? Comment tester plusieurs conditions?

Grâce à ces indices, on a compris qu'il fallait d'abord vérifier si chaque paramètre était fourni avant de filtrer. On a réalisé qu'on pouvait enchaîner les filtres plutôt que de faire des boucles imbriquées compliquées. C'était clairement plus lisible.

On a appris que demander au LLM seulement des indices force vraiment à comprendre le problème soi-même. On n'oublie pas le code si on l'a écrit soi-même.


Prompt 3 : API REST avec FastAPI - Bien Comprendre l'Archi

Ensuite il fallait construire l'API pour que le frontend puisse faire des opérations CRUD (créer, lire, modifier, supprimer les tickets).

On a posé la question: "Comment je dois construire une API REST pour que le frontend puisse chercher tous les tickets (GET), en ajouter un nouveau (POST), modifier un existant (PATCH), et en supprimer un (DELETE)? Juste explique l'architecture, pas le code complet"

Le LLM a répondu en posant d'autres questions: Qu'est-ce qu'un endpoint vs une route? GET retourne des données alors que POST/PATCH/DELETE modifient les données, c'est quoi la différence? Comment différencier une création (POST avec status 201) d'une mise à jour (PATCH avec 200)? Qu'est-ce qu'une erreur 404? Quels imports faut-il pour FastAPI?

Après avoir pensé à ces questions, on a compris l'architecture REST. Chaque endpoint devrait charger les données depuis le fichier, faire l'opération demandée, puis sauvegarder. Les status codes HTTP ont du sens: 201 quand on crée quelque chose, 200 quand c'est bon, 404 quand on ne trouve pas ce qu'on cherche.

On a appris que les imports et les décorateurs changent beaucoup en FastAPI. Il faut bien comprendre comment FastAPI organise les routes avant de commencer à taper du code.


ERREURS RENCONTRÉES ET CORRECTIONS

Erreur 1 : Hardcoding de l'adresse IP Backend

Pendant qu'on lisait le code du frontend, on a remarqué que l'adresse IP du backend était écrite en dur: 172.16.112.75:8000. En plus, il y avait aussi une référence à localhost:8000 dans le même fichier, ce qui était incohérent.

C'était clairement pas bon d'avoir l'adresse IP codée en dur. Si on veut changer le serveur, on doit modifier le code du frontend. Et il y avait deux URLs différentes, ce qui créait de la confusion.

On a détecté ce problème en lisant le code et en remarquant que l'URL n'était pas centralisée. Ça devrait être une variable d'environnement ou au moins une constante au lieu d'être partout dans le code.

La solution était de créer une constante ou un fichier .env pour configurer l'URL du backend. Ainsi, on pourrait changer l'adresse en un seul endroit sans toucher au reste du code.

Ce qu'on a appris: Il faut toujours utiliser des constantes ou des variables plutôt que du hardcoding. Les adresses IP doivent être configurables.  


Erreur 2 : Timestamp Inconsistency

En examinant le code du backend, on a remarqué quelque chose d'étrange. La fonction qui ajoute un ticket utilise un timestamp UTC normal. Mais la fonction qui met à jour un ticket ajoute une heure supplémentaire au timestamp.

Cela signifie que si on crées un ticket à 10:00, la createdAt sera 10:00Z. Mais si on mets à jour ce même ticket quelques minutes après, updatedAt sera 11:00Z au lieu de 10:05Z. C'est incohérent.

On a découvert ce bug en comparant les deux fonctions côte à côte. On a remarqué que add_ticket utilisait datetime.utcnow() directement, mais update_ticket ajoutait un timedelta(hours=1).

La correction est simple: il faut utiliser le même format UTC partout dans l'application. Pas de décalages, pas de +1 heure. Juste UTC standard.

Ce qu'on a appris: Les timestamps doivent être cohérents partout dans l'application. Faut vérifier que toutes les fonctions qui manipulent les dates utilisent le même format. C'est un bon exemple de bug qui se cache facilement si on ne regarde pas attentivement.


EXEMPLE : LE LLM S'EST TROMPÉ

Situation : Gestion des Status Codes HTTP dans l'API

Au début du développement, on a demandé au LLM: "Quels status codes je dois retourner pour chaque opération CRUD?"

Le LLM a proposé: Utiliser toujours 200 pour toutes les opérations réussies (GET, POST, PATCH, DELETE).

On a implémenté ça et l'API marchait au premier abord. Mais quand on a regardé la sortie, on a vu que POST (créer un ticket) retournait 200 au lieu de 201. Le problème c'est que 201 Created est le standard HTTP pour les créations, et les clients REST s'attendent à ça.

Comment on a vérifié l'erreur: On a lu la spec HTTP REST et on a cherché les codes standards. On a vu que 201 est explicitement pour "Created" et que c'est différent de 200 OK. On a comparé avec d'autres APIs.

La correction: On a changé POST pour retourner status_code=201. DELETE retourne 204 No Content si c'est vide, ou 200 si on retourne le ticket supprimé. GET retourne 200. PATCH retourne 200.

Ce qu'on a appris: Le LLM peut faire des suggestions générales mais ne connaît pas toujours les conventions précises. Faut toujours vérifier les standards officiels (spec HTTP, best practices REST) même quand le LLM propose quelque chose. Les codes d'erreur/succès matière pour les clients qui consomment l'API.



