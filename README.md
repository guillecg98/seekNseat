<h1 align="center">
  🍽 SeekNSeat 🍽
  <br>
</h1>

<h4 align="center"> Restaurants Booking Manager System built on top of <a href="https://nestjs.com/" target="_blank" style="color:#ED1543;">NestJS</a> and <a href="https://reactnative.dev/" target="_blank" style="color:##0276E8;">React Native</a>.</h4>

## Table of Contents
* [About the Project](#about-the-project)
* [Key Features](#key-features)
* [Install, build and run!](#download)
* [Built With](#build)
* [License](#license)
* [Contact](#contact)


## About the project
 Here you will find my final degree thesis at University of Córdoba, Spain. This project tries to manage user/business bookings at real time and offering a pleasant user experience through different mobile apps

The purpose of this project is to learn new technologies like NestJS and React Native using mono-repo with Nx.dev and apply concepts about Software Desing like Event Modeling, Domain-Driven-Desing, CQRS, Event Sourcing, Clean code, Test Driven Development, etc.

## Key Features

* **Design**: Event modeling.
* **Arquitecture**: Hexagonal Arquitecture following Domain-Driven-Design concepts.
* **Database management**: CQRS and Event Sourcing patterns.
  * **Read model**: MongoDB.
  * **Write model**: Event Store.
* **Unit and integration testing**: Jest.

## Install, build and run!

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone git@github.com:gecoga98/seekNseat.git

# Go into the repository
$ cd seekNseat

# Install dependencies
$ npm install

# Start docker containers (MongoDB and Event Store)
$ docker-compose up  -d

# Run the server app
$ npm nx run api:serve

# Start the metro-bundle for mobile apps
$ npm nx start <mobile-app-name>

# Build mobile apps in android device
$ npm nx run-android <mobile-app-name>

# Build mobile apps in ios device
$ npm nx run-ios <mobile-app-name>
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.


## Built With

This software uses the following packages:

- [NestJS](https://nestjs.com/)
- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)

## License

[GNU Affero General Public License v3 (AGPL)](https://www.gnu.org/licenses/agpl-3.0.en.html)

## Contact

> GitHub - [@gecoga98](https://github.com/gecoga98)
> LinkedIn - [Guillermo Cosano](https://www.linkedin.com/in/gecoga-98/)