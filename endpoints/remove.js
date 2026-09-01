// Require's
const express = require("express")
const router = express.Router()
const { getInfo } = require("../database.js")

// Important Variables
const regex = new RegExp(/^[a-zA-Z][a-zA-Z0-9]*$/);

// Endpoint code '/remove/:name'
router.get('/remove/:name', async (req, res) => {
    // Validation
    const name = req.params.name ?? null;
    const regexResult = regex.test(name);

    if (name === null || name.length != 6 || !regexResult) {
        res.status(401).json({ 'error': 'Invalid name' })
        return;
    }

    // Checking if exists in database
    const data = await getInfo(name) ?? null

    if (data === null || data.length == 0) {
        res.status(404).json({ 'error': 'Not found' })
        return;
    }

    // Removing record
    const remove = await removeRecord(name) ?? null

    if (remove === null || remove.length == 0) {
        res.status(500).json({ 'error': 'Error removing record' })
        return;
    }

    // Returning data
    res.status(200).json({ 'name': name, 'message': 'Record removed successfully' })
})

module.exports = router