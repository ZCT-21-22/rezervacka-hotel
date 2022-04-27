const PORT = process.env.PORT;
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')
const { response } = require('express')

const app = express()
app.use(cors())
app.use(express.json())


// https://327d8cc4-4af8-4dff-bade-cd7ee5cd3209-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/reservations/collections/tasks ANOTHER TASK OBJECT
// https://327d8cc4-4af8-4dff-bade-cd7ee5cd3209-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/reservations/collections/reservations  OBJECT
// const url = 'https://327d8cc4-4af8-4dff-bade-cd7ee5cd3209-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/reservations/collections' COLLECTION
// const url = 'https://327d8cc4-4af8-4dff-bade-cd7ee5cd3209-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/reservations/collections/reservations'
// const token = 'AstraCS:yEyEvbzIAJdHUxsWoTpnXNsq:0e1b69aa4221bf12a67c69655b84e28ba5b63622b5fcf2900d855ce8811e0aa0'

const url=process.env.URL
const token=process.env.ASTRA_TOKEN

// ALL TASKS 
app.get('/reservations', async (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': token,
        }
    }
    try {
        const response = await axios(`${url}?page-size=20`, options)
        res.status(200).json(response.data)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
})
// SINGLE TASK
app.get('/reservations/:documentId', async (req, res) => {
    const id = req.params.documentId
    const data = req.body.data

    const options = {
        method: 'GET',
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': token,
        }
    }

    try {
        const response = await axios(`${url}/${id}`, options)
        res.status(200).json(response.data)
    } catch {
        console.log(err)
        res.status(500).json({ message: err })
    }
})


// CREATE 
app.post('/reservations', async (req, res) => {
    const formData = req.body.formData

    const options = {
        method: 'POST',
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': token,
            'Content-Type': 'application/json'
        },
        data: formData
    }

    try {
        const response = await axios(url, options)
        res.status(200).json(response.data)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
})

// UPDATE
app.put('/reservations/:documentId', async (req, res) => {
    const id = req.params.documentId
    const data = req.body.data

    const options = {
        method: 'PUT',
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': token,
        },
        data
    }

    try {
        const response = await axios(`${url}/${id}`, options)
        res.status(200).json(response.data)
    } catch {
        console.log(err)
        res.status(500).json({ message: err })
    }
})


// DELETE
app.delete('/reservations/:documentId', async (req, res) => {
    const id = req.params.documentId
    const options = {
        method: 'DELETE',
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': token,
        }
    }

    try {
        const response = await axios(`${url}/${id}`, options)
        res.status(200).json(response.data)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
})


app.listen(PORT || 8000, () => console.log('server running on PORT' + PORT))

