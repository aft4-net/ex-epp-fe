

🔎 **Excellerent Enterprize portfolio(EPP)*

This project was generated using [Nx](https://nx.dev). It uses Mono-repo Micro-front end architecture with Webpack 5's Module federation. 
To quickly check the capability, please run the Dockerized build. The
> Run docker-compose up -d

User Name aexcellerent@outlook.com Password : adminAdmin@123

## Quick Start & Documentation
To get started 


## Project details

| Application | Directory | Description |
| ------ | ------ | ------ |
| Micro frontends shell | [apps/epp-dashboard] | Main application to load micro frontends |
| Timesheet | apps/Timesheet] | an employee time sheet management project using angular |
| Usermanagement | [apps/Usermanagement] |user registration managment project created with ng|
| ClientManagement| [apps/ClientManagent] |client management |
| ProjectMangement| [apps/Projectmanagement] Excllerent's Project Mangement |
| ConfigurationModule| [apps/ConfigurationModule] |Configuration management for the whole system |
| ResourceMangement| [apps/ResourceManagement] |Allocate resources to project and client |

# Installation and startup
**Shell**
```
cd excellerent-epp-fe
npm install
npm run start:all
```
```
//Shell application(Epp Dashboard) will run on http://localhost:4200
```

# Building all projects
```
npm run build-all
```

# Building apps
```
npm run build {app-name}
```

```
eg. to build timesheet tun // npm run build timesheet
```

# Building Timesheet
```
npm run build timesheet
```




# Generating Production build
**Shell**
```
npm run deploy
```



## Dockerized Build
To run docekrized build run
```
$ docker-compose up -d
```
```
//Epp-Dashboard runs on http://localhost:3200
```

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:


## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@exec-epp/mylib`.

## Development server

Run `npm run serve {app-Name}` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.


Run `npm run serve:all` to serve all applications with development server.

Run `npm run serve:all` to serve all applications with development server.
## Code scaffolding

> Run `npm run component my-component --project=my-app` to generate a new component.

## Building artifacts

> Run `npm run deploy` 

## Build

Run `npm run build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Running Webpack analyzer

Run `npm run analyze:appname` to see webpack parameters
