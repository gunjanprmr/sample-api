<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#useful-scripts">Useful Scripts</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

This repository is to show a working project and workflow for writing Node code in TypeScript. 

This demonstrates:
* Dependency Injection using InversifyJS
* Folder structure using Repository pattern. This is to decouple database from main project.
* Jest integration for unit and API tests.
* Database connectivity with MS SQL

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

This section list major frameworks/libraries used to bootstrap this project.

* [Node.js](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [InversifyJS](https://inversify.io/)
* [Jest.js](https://jestjs.io/)
* [Auth0](https://auth0.com/)
* [Winston](https://github.com/winstonjs/winston)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Installation
1. Clone the repo
```sh
git clone https://github.com/gunjanprmr/sample-api
```
2.  Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Useful Scripts

* npm run start = To start the application. Here, port 7000 is used. http://localhost:7000/healthStatus should return 200 in case of successful run.
* npm run test = To run unit tests with code coverage
* npm run apiTest = To run API tests

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Add folder structure
- [x] Add repository layer for database connection
- [x] Add unit tests
- [x] Add API tests
- [x] Add Auth0 integration


<p align="right">(<a href="#top">back to top</a>)</p>