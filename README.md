<div id="top"></div>

<div align="center">
  
  [![builtwithheart](https://img.shields.io/badge/Build%20with-%E2%99%A5-red?style=for-the-badge)]() &nbsp;
  ![](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge) &nbsp;

  <h2 align="center">Hubbify API</h2>
  <p>
    Simple API with CRUD operations withouth using any framework like Express, Fastify, etc.
    <br />
    <a href="https://github.com/Galactic-Studio-SED/hubbify-api/issues"><strong>Report Bug</strong></a>
    ·
    <a href="https://github.com/Galactic-Studio-SED/hubbify-api/issues"><strong>Request Feature</strong></a>
    <br>
  </p>

  <h3 align="center">Project of security in development of software</h3>
</div>

<br />

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#project-constraints">Project Constraints</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#endpoints">Endpoints</a></li>
        <li><a href="#example">Example</a></li>
      </ul>
    </li>
    <li><a href="#authors">Authors</a></li>
  </ol>

</details>

<br />

<!-- ABOUT THE PROJECT -->
## Built With

* [NodeJS](https://nodejs.org/es/)
* [MySQL](https://www.mysql.com/)
* [JWT](https://jwt.io/)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Morgan](https://www.npmjs.com/package/morgan)
* [Nodemon](https://www.npmjs.com/package/nodemon)

<br />

<!-- PROJECT CONSTRAINTS -->

## Project Constraints

* Use of pure programming languages only (Without Express).
* No ORM or ODM for database operations.
* Avoid XAMPP and LAMPP.
* No content management systems (WordPress, Drupal, Joomla, etc.).
* Prohibited backend frameworks: Spring Boot, Laravel, Django, Symfony.
* No Docker or Kubernetes usage allowed.

<br />

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* [NodeJS](https://nodejs.org/es/)
* [MySQL](https://www.mysql.com/)
* [Postman](https://www.postman.com/)

 You should have installed MySQL and created the database that the script is in the `/scripts` folder. It's important to have the database ready before running the project.


### Installation

1. Clone the repo
   ```
   git clone https://github.com/Galactic-Studio-SED/hubbify-api
    ```
2. Install NPM packages
    ```
    npm install
    ```
3. Create a .env file and add the following variables
    ```
    PORT=3000 
    DEBUG=`app:*` 
    DB_HOST= 
    DB_USER= 
    DB_PASS=
    DB_NAME= 
    DB_PORT= 
    TOKEN_SECRET='your-secret-here' 
    TOKEN_EXP=24 
    TOKEN_PREFIX='Bearer'
    APPLICATION_ADM=admin 
    APPLICATION_USR=user 
    APPLICATION_SDM=superadmin 
    USER_PSWD_SALT_ROUNDS=12 
    DATA_KEY_ENCRYPT='your-secret-here'
    ```
4. Run the project
    ```
    npm run dev
    ```
5. Open Postman and test the endpoints

<br />

<!-- USAGE EXAMPLES -->
## Usage

### Endpoints

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| GET | /api/comments | Get all comments |
| GET | /api/comments/:id | Get a comment by id |
| DELETE | /api/comments/:id | Delete a comment by id |
| GET | /api/comments/own | Get all comments of the user |
| POST | /api/comments/own | Create a comment |
| PUT | /api/comments/own/:id | Update a comment by id |
| DELETE | /api/comments/own/:id | Delete a comment by id |
| GET | /api/users | Get all users |
| GET | /api/users/:id | Get a user by id |
| POST | /api/users | Create a user |
| PUT | /api/users/:id | Update a user by id |
| DELETE | /api/users/:id | Delete a user by id |
| POST | /api/users/singin | Sing in |
| POST | /api/users/adm | Create a user with admin role |

<br />

### Example

#### Create a user
```sh
POST /api/users
```
```json
{
    "username": "John Doe",
    "email": "email@gmail.com",
    "phone": "1234567890",
    "password": "Pa$$w0rdSecur3"
}
```

<br />

<!-- AUTHORS -->

## Authors

Fernanda Vásquez  | Melvin Aguilar | Henry Escobar
:---: | :---: | :---:
<img src="https://avatars.githubusercontent.com/u/82715400?v=4" width="150" />  | <img src="https://avatars.githubusercontent.com/u/90595158?v=4" width="150" /> | <img src="https://avatars.githubusercontent.com/u/90475134?v=4" width="150" />
[Go to GitHub](https://github.com/cam-vasquez)  | [Go to GitHub](https://github.com/MelvinAguilar) | [Go to GitHub](https://github.com/HenryLima07)


<br />

[![builtwithheart](https://forthebadge.com/images/badges/built-with-love.svg)]()




