const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./router/router");
const morgan = require("morgan");
const createHttpError = require("http-errors")

class Application {
    #app = express();
    #DB_URL;
    #PORT;
    constructor(PORT, DB_URL) {
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;
        this.configApplication()
        this.connectToMongoDB()
        this.createRoutes()
        this.errorHandling()
        this.createServer()
    }

    async configApplication() {
        this.#app.use(morgan("dev"))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({extended: true}))
        this.#app.use(express.static(path.join(__dirname, "..", "public")))
    }

    async createServer() {
        const http = require("http")
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log("server > http://localhost:" + this.#PORT)
        })
    }

    async connectToMongoDB() {
        mongoose.connect(this.#DB_URL)
            .then (db => db.connection.readyState && console.log("mongoDB connected"))
            .catch (error => console.log(error));
        // برای قطع ارتباط با دیتابیش بعد از پایین اومدن پروژه
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            process.exit(0)
        })
    }
    
    async createRoutes() {
        this.#app.use(AllRoutes)
    }

    async errorHandling() {
        this.#app.use((req, res, next) => {
            next(createHttpError.NotFound("Page Not Found"))
        })

        this.#app.use((error, req, res, next) => {
            const statusCode = error.status || 500;
            const message = error.message || createHttpError.InternalServerError();
            return res.status(statusCode).json({ message })
        })
    }
}


module.exports = Application