# ORM Example Usage

- This repo demonstrate how to use **ORM Sequelize** on MySQL database. It illustrate how to init up database and sync database data.
- The project is structure into multiple components, Model and services.
  - Model: Where we define data types on Database
  - Routes: Entry point, api gate to hit our services
  - Services: Provided the services to access/modify database data using Sequelize
  - Mock: Insertion of temporily testing data into the database for sample queries
- The project explores on time handling via **moment.js**, server logging via **log4js**.
- It also had some basic scalping technique from public website extract and parsed using cheerio.
