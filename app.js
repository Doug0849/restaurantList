const express = require('express')
const app = express()
const port = 3000

const restaurants = require('./restaurant.json')

const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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

app.listen(port, () => {
  console.log('Server is started...')
})