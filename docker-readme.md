# DEV env: docker-compose

This is a generated README by the [BeCode CLI tool](https://github.com/becodeorg/cli).

If you are completely new to Docker we recommend you to read the [Docker Survival Guide](https://github.com/becodeorg/cli/tree/develop/docs/docker-survival-guide).

## Install `docker` & `docker-compose`

### For macOS

Follow the procedure on [this page](https://docs.docker.com/docker-for-mac/install/)

### For Windows

#### Pro, Enterprise or Education versions

Follow the procedure on [this page](https://docs.docker.com/docker-for-windows/install/)

#### Home version

To use docker on Windows Home, you need to use the [Docker Toolbox](https://docs.docker.com/toolbox/overview/), which use VirtualBox to run docker on your machine.  

##### ⚠️ Important notes for Windows Home version

The Docker Toolbox and the VirtualBox env will change two important things when you use docker : 

1. The host to access the containers isn't `localhost`, but the IP `192.168.99.100` (by default)
2. Due to the nature of VirtualBox, the *volumes* binding between your local system and the containers are kinda limited. Please ensure that **your working folder** is inside the `C:/Users` path.

### For Linux

1. Follow the procedure on [this page](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
1. Run the following command to fix a possible right issue : `sudo usermod -a -G docker $USER`
1. Follow the procedure on [the page](https://docs.docker.com/compose/install/#install-compose)
1. Restart your computer

To test your installation, run the command `docker run hello-world`.

## Run `docker`

When starting your env for the first time, run the following command in yhour repo:

	docker-compose build
	
> **NOTE:** thus you don't need to run this command each time, it may be useful to *re*build your services when you change the configuration of your services.

Then, simply run the following command to get started:

    docker-compose up

The details for all your services is detailed bellow.

## Your services

### Langage: Node.js

#### What is Node.js?

Node.js is a software platform for scalable server-side and networking applications. Node.js applications are written in JavaScript and can be run within the Node.js runtime on Mac OS X, Windows, and Linux without changes.

Node.js applications are designed to maximize throughput and efficiency, using non-blocking I/O and asynchronous events. Node.js applications run single-threaded, although Node.js uses multiple threads for file and network events. Node.js is commonly used for real-time applications due to its asynchronous nature.

Node.js internally uses the Google V8 JavaScript engine to execute code; a large percentage of the basic modules are written in JavaScript. Node.js contains a built-in, asynchronous I/O library for file, socket, and HTTP communication. The HTTP and socket support allows Node.js to act as a web server without additional software such as Apache.

* **Website:** [nodejs.org](https://nodejs.org)
* **Documentation:** [nodejs.org/en/docs/](https://nodejs.org/en/docs/)

#### Container

* **Image used:** [becodeorg/node](https://hub.docker.com/r/becodeorg/node/) (derived from [library/node](https://hub.docker.com/_/node/))

##### Usage

Place your JS files in `./bin` folder, access it your browser at address [localhost](http://localhost).

The container use [nodemon](https://github.com/remy/nodemon) to watch and reload your app on changes.  
You can change the `nodemon` command within your **docker-compose.yml** file according your needs.

**IMPORTANT:** your entry point **must** be defined in your **package.json** `scripts.start` property, and your app's server **must** listen the `12345` port.

**NOTE:** the container expose the debugger on port `9229` to use with [node inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/)


* * *

### Database: PostgreSQL

#### What is PostgreSQL?

PostgreSQL, often simply "Postgres", is an object-relational database management system (ORDBMS) with an emphasis on extensibility and standards-compliance. As a database server, its primary function is to store data, securely and supporting best practices, and retrieve it later, as requested by other software applications, be it those on the same computer or those running on another computer across a network (including the Internet). It can handle workloads ranging from small single-machine applications to large Internet-facing applications with many concurrent users. Recent versions also provide replication of the database itself for security and scalability.

PostgreSQL implements the majority of the SQL:2011 standard, is ACID-compliant and transactional (including most DDL statements) avoiding locking issues using multiversion concurrency control (MVCC), provides immunity to dirty reads and full serializability; handles complex SQL queries using many indexing methods that are not available in other databases; has updateable views and materialized views, triggers, foreign keys; supports functions and stored procedures, and other expandability, and has a large number of extensions written by third parties. In addition to the possibility of working with the major proprietary and open source databases, PostgreSQL supports migration from them, by its extensive standard SQL support and available migration tools. And if proprietary extensions had been used, by its extensibility that can emulate many through some built-in and third-party open source compatibility extensions, such as for Oracle.

* **Website:** [postgresql.org](https://www.postgresql.org/)
* **Documentation:** [postgresql.org/docs/](https://www.postgresql.org/docs/)

#### Container

* **Image used:** [library/postgres](https://hub.docker.com/_/postgres/)

##### Usage

**IMPORTANT:** the first startup of this container is long : the db server needs to be initialized.

**NOTE:** the container create a default `dev` database at startup - but you can create another within your code if you need it (or with pgAdmin)

###### Access from another container

You can access the database **from another container** with the following informations:

* **host:** `postgres`
* **port:** `5432`
* **user:** `dev`
* **pass:** `dev`

###### Access from your host

You can access the database  **from your host** with the following informations:

* **host:** `postgres`
* **port:** `5432`
* **user:** `dev`
* **pass:** `dev`

