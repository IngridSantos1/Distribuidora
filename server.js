import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Este é o produto!'
})

server.post('/lubrificante', (request, reply) => {
    //const body = request.body//
   //console.log(body)//
   const {nome, marca, litros } = request.body
    database.create({
        nome: nome,
        marca: marca,
        litros: litros
    })
    console.log(database.list())
    return reply.status(201).send()
})

server.get('/lubrificante', (request) => {
    const search = request.query.search

    console.log(search)
    
    const lubrificantes = database.list(search)
   
    return lubrificantes
})

server.put('/lubrificante/:id', (request, reply) => {

    const lubrificanteId = request.params.id
    const {nome, marca, litros} = request.body
    database.update(lubrificanteId, {
        nome,
        marca,
        litros,
    })
    return reply.status(204).send()
})

server.delete('/lubrificante/:id', (request, reply) => {
    const lubrificanteId = request.params.id

    database.delete(lubrificanteId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})