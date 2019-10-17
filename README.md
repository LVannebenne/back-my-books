# back-my-books

Back-end - Library manager

## Stack Technique 

* Node.js (Server)
* PostgreSQL (Database)
* Sequelize (ORM)
* Babel (Transpiler)
* Apollo-Server && Apollo Client

Le *Playground* (query testing) est acessible via la route /explore et nécessite un token. La doc complète des schémas y est reprise.

## Utilisation de sequelize-cli

Dans le dossier SRC du project:

*Si besoin* : Copier le dossier config de /src dans /bin (sinon avec un npm run build une première fois)

1. Remplir le config.json du dossier bin avec les infos de connexion a la db.

2. Utiliser les commandes suivante depuis le dossier /src

**Sequelize db:create** => Crée la db "library"
**Sequelize db:migrate** => Crée les tables (
    * books
    * borrows
    * comments
    * opinions
    * users
) depuis les modèles homonymes (noms au singulier)

**Sequelize db:seed** => Optionnel, remplit les tables sans dépendances (users et books) de quelques ittems(3).


### Tables => modèles

La liste des champs, leur type, ainsi que les réfèrences (relations) sont visibles dans le dossier /models

    * books => book
    * borrows => borrow
    * comments => comment
    * opinions => opinion
    * users => user

### Query 

Toutes les query en getAll...() comporte une limite par défaut de 5 résultats. Il est possible de passer une autre valeur en paramètre.

Par exemple: 

    getAllUsers(limit: 10) {...}

Plus d'informations sur les query disponibles dans le playground.
 
### Vérifications Mutations

#### Books

    createBook()

Une erreur est lancée si on tente d'entrer un livre avec un ISBN existant dans la DB (ISBN10 ou ISBN13).

#### Borrows

    createBorrow()

Une erreur est lancée si un utilisateur à déja plus de 5 livres empruntés en simultané.

    bookReturn()

Une erreur est lancée si aucun prêt actif n'est trouvé.

#### Comments

    createComment()

Une erreur est lancée si l'utilisateur à déja posté un commentaire sur le livre

#### Opinions

    giveOpinion()

Une erreur est lancée si l'utilisateur à déja "donné son opinion" sur un commentaire

#### Users

    createUser()

Une erreur est lancée si le nom d'utilisateur ou l'email ont déja été enregistrés

