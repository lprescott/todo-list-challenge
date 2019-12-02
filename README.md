# Todo List Challenge
The Todo List Challenge is to build a simple web application that allows users to maintain a list of tasks.

## Getting started

### Cloning

```bash
git clone https://github.com/lprescott/todo-list-challenge
cd todo-list-challenge/web
npm install             # Install javascript package requirements
ng build                # Build the Angular Frontend  
cd ../server    
mvn install             # Install Spring Boot Backend Dependencies
```

### Folder Structure

```bash
.
│  README.md
└──[postman]                           # Sample PostMan requests for testing
│
└──[sql]                               # SQL scripts for database init
│
└──[web]
│  │  package.json                     # node dependencies
│  │  angular-cli.json                 # ng build configurations
│  └──[src]                            # Frontend source files
│
└──[server]
   │  HELP.md                          # Resources for Spring Boot
   │  pom.xml                          # Maven dependencies
   │  mvnw                             # Maven compiliation for Linux Bash
   │  mvnw.cmd                         # '' for Windows environment
   └──[src]
   │  └──[main]
   │     └──[java]                     # Java server files
   │     └──[resources]                # Front end resources for mvn package
   │        │  application.properties  # Contains Spring Boot cofigurations
   │        └──[static]                # Output of ng build --goes here
   │        └──[templates]
   │
   └──[target]                         # Java build files, auto-created after running java build: mvn install
      └──[classes]
      └──[public]
```

### Technology Stack

Component         | Technology                                                         | Server
---               | ---                                                                | ---
Frontend          | [Angular 8](https://github.com/angular/angular)                    |
Backend (REST)    | [SpringBoot 2.2.0](https://projects.spring.io/spring-boot) (Java)  | [Embedded Tomcat Server](https://spring.io/blog/2014/03/07/deploying-spring-boot-applications)
Database          | [MySQL](https://www.mysql.com/)                                    | [Community Server](https://dev.mysql.com/downloads/mysql/)
Security          | Cookie Based JWT (Json Web Token)                                  |
Persistence       | JPA (Using Spring Data)                                            |
Client Build Tools| [angular-cli](https://github.com/angular/angular-cli), Webpack, npm| [webpack-dev-server](https://webpack.js.org/guides/development/#webpack-dev-server)
Server Build Tools| Maven(Java)      

### Installing

- To get `Node.js`, go to [nodejs.org](https://nodejs.org/ "Nodejs.org").
- To get the Angular CLI, run `npm install -g @angular/cli`.
- Run `npm install` to install all node dependencies including [rxjs](https://rxjs-dev.firebaseapp.com/). 
- To download Java, go to [oracle.com](https://www.oracle.com/technetwork/java/javase/downloads/index.html).
- To download Maven, go to [apache.org](https://maven.apache.org/)
- Run `mvn install` to install all maven dependencies.
- To download MySQL, visit [mysql.org/downloads](https://dev.mysql.com/downloads/)

### Development server

#### Database
Running the sql scripts in the following order will allow the backend to compile without failing:
1. `init_schema.sql` - creates a challenge database
2. `set_timezone.sql` - sets the timezone to EST
3. `grant_permissions` - creates a test_user with test_code as its password, and grants permissions to access the newly created challenge database
4. `init_users.sql`  **Should be executed _after_ backend** creates three test users identified by `user1`, `user2` and `user3` that each have access to the todo list app.

#### Backend
Run `mvn spring-boot:run` in `server` for a dev server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

#### Frontend
Run `ng serve` in `web` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running the tests

### Frontend

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Backend

Unit tests are automatically run on `mvn spring-boot: run` but area located in `.\server\src\test\java\com\jahnelgroup\todolist\TodoListApplicationTests.java` and can be run seperately.

## Deployment

### Build

#### Frontend
Run `ng build` in `web` to build the project. The build artifacts will be stored in the `server/src/main/resources/static` directory. Use the `--prod` flag for a production build.
- The [proxy.conf.json](web/src/proxy.conf.json) file must be updated to the port used when deploying the below jar/war 
 package file.
  
#### Backend 
Run `mvn package` in `server` to package the project for production. Remember to run `ng build` first with the `--prod` flag enabled first.
- The database's configuration settings must be updated to the relevant database credentials when deploying. 
- The above sql scripts will also have to run again to correctly initialize the database.                                           |

## Versioning 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17.
This project also uses Maven [3.6.2](https://maven.apache.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Author
- **Luke Prescott**

## Acknowledgments 
- Special thanks to the team at Jahnel Group, and everyone who gave their input.
- <a target="_blank" href="/icons/set/add-list">Add List icon</a> by <a target="_blank" href="https://icons8.com">Icons8</a>.
- [FontAwesome](https://fontawesome.com/) for their list icon.
- I used [gitignore.io](https://www.gitignore.io/) to generate [_this_](.gitignore) gitignore file but otherwise used predefined defaults.
- [LiveReload](http://livereload.com/extensions/) and your browser of choice.
- [PostMan](https://www.getpostman.com/) for REST api testing.
