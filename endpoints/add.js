// Require's
const express = require("express")
const router = express.Router()
const { getInfo, addNew } = require("../database.js")

// Important Variables
const regex = new RegExp(/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/);

// --- Important functions
// Url valid checkout
const isValidUrl = (textUrl) => {
    try {
        new URL(textUrl.startsWith("http") ? textUrl : `https://${textUrl}`)
        return true
    } catch {
        return false
    }
}

// Generate name
const generateName = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    let result = ""

    for (var i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength)).toString()
    }

    return result;
}


// Endpoint code '/add'
router.post('', async (req, res) => {
    // Validation
    const givenUrl = req.body.url ?? null
    const regexResult = regex.test(givenUrl)
    const validUrl = isValidUrl(givenUrl)

    if (givenUrl === null || givenUrl.length < 3 || !regexResult || !validUrl) {
        res.status(400).json({ 'error': 'Invalid url' })
        return;
    }

    // Loop to check if name already exists and add new to db
    while (true) {
        const name = generateName();
        const data = await getInfo(name) ?? null

        if (data === null || data.length === 0) {
            const newUrl = await addNew(name, givenUrl)

            if (newUrl) {
                res.status(200).json({ 'Status': 'Added new shortcut link', 'name': name })
            } else {
                res.status(500).json({ 'Status': 'Unexpected error occured' })
            }
            break;
        } else {
            continue;
        }
    }
})

module.exports = router