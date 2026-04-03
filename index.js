// Require's.
const express = require('express')
const dotenv = require('dotenv')
const fs = require('fs')
const env = process.env

dotenv.config();

// Important variables!
const handlersFolder = './handlers/'

// Basic actions to make api working as it should.
const app = express()
const port = env.PORT 
const router = express.Router();

app.use(express.json());

// "Handler of the handlers" ~ Virkyu
fs.readdir(handlersFolder, (err, files) => {
    if (err) {
        console.error(`[❌] Error loading handlers folder! (${handlersFolder})`)
        return
    }

    files.forEach(file => {
        try {
            const handler = require(handlersFolder + file)
            if (typeof handler === "function") {
                handler(app)
            }

            console.log(`[📂] Loaded file ${file}`)
        } catch (error) {
            console.error(`[❌] Error loading handler file! (${file})`)
        }
    })
})

// Making sure api is working.
app.listen(port, () => {
    console.log(`[✅] Api is now working on localhost:${port}/`);
})

module.exports = router, app