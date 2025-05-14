# 📝 Blog API – Built with NestJS & Prisma

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

---

A powerful and scalable RESTful API built using **NestJS** and **Prisma ORM**, designed for blog platforms. This API provides full CRUD functionality for posts, comments, likes, categories, and user authentication using JWT.

---

## 🚀 Features

- 🔐 **Authentication**
  - Register, login, and JWT-based authorization
  - Password hashing using `bcrypt`

- 🧑 **Users**
  - User profile management

- 📝 **Posts**
  - Create, update, delete, and fetch blog posts
  - Filter posts by categories or authors

- 💬 **Comments**
  - Add comments to blog posts
  - Nested structure support possible

- ❤️ **Likes**
  - Like/unlike functionality for posts

- 🗂️ **Categories**
  - Add and assign categories to posts

---

## 🛠️ Tech Stack

| Layer              | Technology                         |
|-------------------|-------------------------------------|
| **Framework**     | [NestJS](https://nestjs.com/)       |
| **ORM**           | [Prisma](https://www.prisma.io/)    |
| **Database**      | PostgreSQL (or any Prisma-supported DB) |
| **Validation**    | class-validator, class-transformer  |
| **Authentication**| JWT, Passport, bcrypt               |
| **Environment**   | dotenv + `@nestjs/config`           |
| **Testing**       | Jest, Supertest                     |
| **Dev Tools**     | Prettier, ESLint                    |
