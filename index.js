const express = require('express')
const app = express()
const MOCK_DATA = require('./mockdata.json')

const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.get('/demo', (req, res) => {
    res.render('pages/demo')
})

app.get('/api/v1/search', (req, res) => {
    const { searchText } = req.query
    // should have better protection and some form of sanitization for user input
    if (!searchText || searchText.length < 4 || searchText.length > 30) {
        return res.status(400).json({ error: 'Search queries must be 4 to 30 characters in length' })
    }

    // some calculations to return a random amount of data .start at most at index 5 and return at most 25 results
    const randomStart = Math.round(Math.random() * 5)
    const randomAmount = Math.ceil(Math.random() * 5) * Math.ceil(Math.random() * 5)
    const randomData = MOCK_DATA.slice(randomStart, randomStart + randomAmount + 1) // add 1 to make inclusive
    
    res.json({ data: randomData })
})

// set this last to catch non existent URLs
app.get('*', (req, res) => {
    res.render('pages/404')
})

app.listen(PORT, () => {
    console.log(`app is now running on port ${PORT}`)
})
