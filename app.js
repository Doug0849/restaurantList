const express = require('express')
const app = express()
const port = 3000

const restaurants = require('./restaurant.json')

const exphbs = require('express-handlebars')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.results.find(item => {
    return item.id === Number(req.params.id)
  })
  res.render('show', { restaurants: restaurant })
})

app.get('/search', (req, res) => {
  const restaurant = restaurants.results.filter(item => {
    return item.name.toLowerCase().includes(req.query.keyword.trim().toLowerCase()) || item.category.trim().toLowerCase().includes(req.query.keyword.trim().toLowerCase())
  })

  if (restaurant.length === 0) {
    res.render('error', { restaurants: restaurant, keyword: req.query.keyword })
  }
  res.render('index', { restaurants: restaurant, keyword: req.query.keyword.trim() })
})

app.listen(port, () => {
  console.log('Server is started...')
})