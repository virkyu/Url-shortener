// Require's
const express = require("express")
const router = express.Router()

// Endpoint code
router.get('/add', (req, res) => {
    res.json({ name: req.params.name })
})

module.exports = router