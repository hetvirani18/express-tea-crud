# express-tea-api

A beginner-friendly RESTful API built with **Express.js** that allows you to manage a simple list of teas ☕. This is my **first backend project**, and it also includes custom logging using **Winston** and **Morgan**.

---

## 🚀 Features

- Add a new tea (`POST /teas`)
- Get all teas (`GET /teas`)
- Get a tea by ID (`GET /teas/:id`)
- Update a tea (`PUT /teas/:id`)
- Delete a tea (`DELETE /teas/:id`)
- Custom logging with Winston (logs stored in `app.log`)
- Request logging using Morgan middleware

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Morgan (for HTTP logging)
- Winston (for advanced, file-based logging)
- dotenv (for managing environment variables)