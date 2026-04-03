// Require's
const fs = require('fs')
const path = require("path")

module.exports = (app) => {

    const endpointsFolder = path.join(__dirname, "../endpoints/")

    fs.readdir(endpointsFolder, (err, files) => {
        if (err) {
            console.error(`[❌] Error loading handlers folder! (${endpointsFolder})`)
            return
        }

        files.forEach(file => {
            try {
                const route = require(path.join(endpointsFolder, file))
                const name = file === "get.js" ? "" : file.replace(/\.js$/, "")

                app.use("/" + name, route)

                console.log(`[📂] Loaded endpoint file ${file}`)
            } catch (error) {
                console.error(`[❌] Error loading endpoints file! (${file})\n${error}`)
            }
        })
    })
}