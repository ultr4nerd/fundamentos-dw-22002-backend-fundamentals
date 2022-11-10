const express = require("express")

const router = express.Router()

// /v1/usuarios
router.use("/usuarios", require("./usuarios"))
// /v1/mascotas
router.use("/mascotas", require("./mascotas"))

module.exports = router
