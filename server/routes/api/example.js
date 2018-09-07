const Joi = require('joi')
const routes = require('express').Router()
const data = require('./example.json')

routes.get('/', (req, res) => {
  res.status(200).send('Connected to the Example Route!')
})

routes.get('/cars', (req, res) => {
  const cars = data.cars
  if (cars.length > 0) return res.status(200).json(cars)
  return res.status(404).send('There are no cars in the database')
})

routes.get('/car/:id', (req, res) => {
  const car = data.cars.find(car => car.id === parseInt(req.params.id))
  if (!car) return res.status(404).send('Cannot find any car with that ID')
  return res.status(200).send(car)
})

routes.post('/cars', (req, res) => {
  const { error } = validateCar(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const car = {
    id: data.cars.length + 1,
    name: req.body.name,
    modelId: req.body.modelId
  }

  data.cars.push(car)
  return res.status(200).send(car)
})

routes.put('/car/:id', (req, res) => {
  const car = data.cars.find(car => car.id === parseInt(req.params.id))
  if (!car) return res.status(404).send('Cannot update nonexistent data')

  const { error } = validateCar(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  if (req.body.name) car.name = req.body.name
  if (req.body.modelId) car.modelId = req.body.modelId
  res.send(car)
})

routes.delete('/car/:id', (req, res) => {
  const car = data.cars.find(car => car.id === parseInt(req.params.id))
  if (!car) return res.status(404).send('Cannot delete nonexistent data')
  else {
    data.cars.splice(car => car.id === parseInt(req.params.id), 1)
    return res.status(200).send('Car data successfully deleted')
  }
})

routes.get('/models', (req, res) => {
  const models = data.models
  if (models.length > 0) return res.status(200).json(models)
  return res.status(404).send('There are no models in the database')
})

routes.get('/model/:id', (req, res) => {
  const model = data.models.find(model => model.id === parseInt(req.params.id))
  if (!model) return res.status(404).send('Cannot find any model with that ID')
  return res.status(200).send(model)
})

routes.post('/models', (req, res) => {
  const { error } = validateModel(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const model = {
    id: data.models.length + 1,
    name: req.body.name,
    modelId: req.body.modelId
  }

  data.cars.push(model)
  return res.status(200).send(model)
})

routes.put('/model/:id', (req, res) => {
  const model = data.models.find(model => model.id === parseInt(req.params.id))
  if (!model) return res.status(404).send('Cannot update nonexistent data')

  const { error } = validateModel(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  if (req.body.name) model.name = req.body.name
  if (req.body.modelId) model.modelId = req.body.modelId
  res.send(model)
})

routes.delete('/model/:id', (req, res) => {
  const model = data.models.find(model => model.id === parseInt(req.params.id))
  if (!model) return res.status(404).send('Cannot delete nonexistent data')
  else {
    data.models.splice(model => model.id === parseInt(req.params.id), 1)
    return res.status(200).send('Model data successfully deleted')
  }
})

function validateCar (data) {
  const schema = {
    name: Joi.string().trim().min(3).regex(/^[a-zA-Z0-9 ]*$/).required(),
    modelId: Joi.number().integer().positive().min(1).required()
  }

  return Joi.validate(data, schema)
}

function validateModel (data) {
  const schema = {
    name: Joi.string().trim().min(3).regex(/^[a-zA-Z]*$/).required()
  }

  return Joi.validate(data, schema)
}

module.exports = routes
