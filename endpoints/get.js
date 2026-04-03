// Require's
const express = require("express")
const router = express.Router()
const { getInfo } = require("../database.js")

// Important Variables
const regex = new RegExp(/^[a-zA-Z][a-zA-Z0-9]*$/);

// Endpoint code
router.get('/:name', async (req, res) => {
    // Validation
    const name = req.params.name ?? null;
    const regexResult = regex.test(name);

    if (name.length != 6 || name === null || regexResult === false) {
        res.status(401).json({ 'error': 'Invalid name' })
        return;
    }

    // Checking if exists in database
    const data = await getInfo(name) ?? null

    if (data === null || data.length == 0) {
        res.status(404).json({ 'error': 'Not found' })
        return;
    }

    // Returning data
    const url = data.url;

    res.status(200).json({ 'name': name, 'url': url })
})

module.exports = router