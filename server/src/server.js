const app = require('./app')

app.set('port', process.env.APP_PORT || 4000)

const server = app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${server.address().port}`)
})
