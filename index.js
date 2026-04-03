// Require's.
const express = require('express')
const dotenv = require('dotenv')
const env = process.env

dotenv.config();

// Basic actions to make api working as it should.
const app = express()
const port = env.PORT 

app.use(express.json());

// Making sure api is working.
app.listen(port, () => {
    console.log(`[✅] Api is now working on localhost:${port}/`);
})