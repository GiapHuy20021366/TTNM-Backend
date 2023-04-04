import express from "express";

let router = express.Router();



let initWebRouters = (app) => {

    router.get('/', (req, res) => {
        return res.status(200).json({
            message: "Hello"
        })
    })

    return app.use("/", router)

}

module.exports = initWebRouters