const express =  require('express')
const data = require('./data/persons.json')
const validateFields = require('./utils/validateFields')
const generateId = require('./utils/generateId')
const requestLogger = require('./middlewares/requestLogger')
const morgan = require('morgan')

let persons = [...data]

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(requestLogger)

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (_, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    if (!id) {
        return res.status(400).json({errorMessage: `The id provided isn't a valid number`})
    }

    const person = persons.find(p => p.id === id)

    if (!person) {
        return res.status(404).json({errorMessage: `Person with id ${id} not found`})
    }

    res.json(person)
})

app.post('/api/persons', (req, res) => {
    const person = req.body
    if (!person) {
        return res.status(400).json({errorMessage: 'No body was provided'})
    }

    const requiredFields = [{name: 'name', type: 'string'},{name: 'phone', type: 'string'}]
    const {isValid, errors} = validateFields(person, requiredFields)
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const nameExists = persons.find(p => p.name === person.name)
    if (nameExists) {
        return res.status(400).json({errorMessage: 'The name provided already exists'})
    }

    persons.push({id: generateId(), ...person})

    return res.status(200).json({message: 'The person was created successfully', data: persons})
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    if (!id) {
        return res.status(400).json({errorMessage: `The id provided isn't a valid number`})
    }


    if (!persons.find(p => p.id === id)) {
        return res.status(404).json({errorMessage: `Person with id ${id} not found`})
    }

    persons = persons.filter(p => p.id !== id)

    res.status(200).json({message: 'The person was deleted successfully', updatedPersons: persons})
})

app.get('/info', (_, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people. <br/>${new Date().toString()} </p>`)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(PORT, () => console.log(`Server running on port {${PORT}}`))