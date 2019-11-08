
# Todo List Challenge
The Todo List Challenge is to build a simple web application that allows users to maintain a list of tasks.

## Getting started

### Development server

#### Frontend
Run `ng serve` in `web` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Backend
Run `mvn spring-boot:run` in `server` for a dev server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

### Prerequisites
- Node.js 12.13.0 - (LTS)
- Angular CLI - 8.3.17
- Java - 11.0.5 (LTS)
- Maven - 3.6.2
- MySQL Server 8.0.18

## Installing

- To get `Node.js`, go to [nodejs.org](https://nodejs.org/ "Nodejs.org").
- To get the Angular CLI, run `npm install -g @angular/cli`.
- Run `npm install` to install all node dependencies including [rxjs](https://rxjs-dev.firebaseapp.com/). 
- To download Java, go to [oracle.com](https://www.oracle.com/technetwork/java/javase/downloads/index.html).
- To download Maven, go to [apache.org](https://maven.apache.org/)
- Run `mvn install` to install all maven dependencies.
- To download MySQL, visit [mysql.org/downloads](https://dev.mysql.com/downloads/)

## Running the tests

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deployment

### Build

#### Database
Running the sql scripts in the followig order will allow the backend to compile with out failing:
1. `init_schema.sql` - creates a challenge database
2. `set_timezone.sql` - sets the timezone to EST
3. `grant_permissions` - creates a test_user with test_code as its password, and grants permissions to access the newly created challenge database

#### Frontend
Run `ng build` in `web` to build the project. The build artifacts will be stored in the `server/src/main/resources/static` directory. Use the `--prod` flag for a production build.

#### Backend 
Run `mvn package` in `server` to package the project for production. Remember to run `ng build` first with the `--prod` flag enabled first.


## Built with
- Angular - The web framework used
- Angular CLI - The command line interface
- NPM - The package manager used
- VSCode and IntelliJ - The text-editor and IDE used for developement

## Versioning 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17.
This project also uses Maven [3.6.2](https://maven.apache.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Author
- **Luke Prescott**

## Acknowledgments 
- Special thanks to the team at Jahnel Group, and everyone who gave their input
