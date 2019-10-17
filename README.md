



# Back my books 📓

Our last (but not least) Becode Project !

Some guy called Jeff asked us for a library manager for his books, so we did it!

*With GraphQL* 

[Our demo website](https://back-my-books-project.herokuapp.com/)
(On Heroku)
## Stack Technique 

* Node.js (Server)
* PostgreSQL (Database)
* Sequelize (ORM)
* Babel (Transpiler)
* Apollo-Server && Apollo Client

 *Playground* (query testing) is [here](https://back-my-books-project.herokuapp.com/explore)

## How to use Sequelize-CLI : 
`npm run build:server`

In the  `src/` folder : 

`npm install --save-dev sequelize-cli`



1. Fill the `bin/config/config.json` with the database credentials.

2. in the `src/` folder : 

`npx sequelize db:create`  - Creates the database
`sequelize db:migrate` -  Creates the following tables : 
    * books
    * borrows
    * comments
    * opinions
    * users
    
**Note :**  *Tables names are **plural***

`Sequelize db:seed` -  Optional, fills the tables with 3 books and their info. 



### Tables and models : 

The entries in the database, type and references *(relations)* are in the  `/models` folder

    * books => book
    * borrows => borrow
    * comments => comment
    * opinions => opinion
    * users => user

## Queries

All the queries, with a `getAll...` will, by *default* render 5 books.

However, you can pass the _limit_ parameter : 

e.g : 

    getAllUsers(limit: 10) {...}

**More informations about our API is in the *Playground***
 
### Mutations (*Queries that change stuff* ) : 

#### Books

    createBook()

An error will occur if the ISBN (10 or 13) exists in the database

#### Borrows

    createBorrow()

An error will occur if a user already borrowed 5 books
*we know we have plenty books, but hey, bring back the 5 others, please*

    bookReturn()

An error will occur if the user tries to give back a book that he never borrowed. 
*maybe he stole it ?*

#### Comments

    createComment()

An error will occur if the user already gave his opinion on the book. 
*No need for bloat in the comment section* 

#### Opinions

    giveOpinion()

An error will occur if the user tries to reply more than once on a comment 
*No need for drama in the comment section* 

#### Users

    createUser()

An error will occur if a user's username **or** email are in the database. 

**For _obvious_ reasons**  

### Have fun !

``` 
🦄- Lindsay Vannebenne
🕶- Michael Jacquemart
🔭- Victor Philippe
```


