const axios = require('axios')

function sentPayload(payload,test) {
    return axios.post("http://localhost:9001/message", payload)
        .then(response => console.log(response.status, response.statusText, test))
        .catch(err => console.log(test, err.response.status, err.response.statusText, err.response.data))
}

//destination podria ser un email en vez de un string
//si el payload es demasiado grande, tmb da error

sentPayload({ destination: '@.com', body: 'hola' },"Piloto:\t")
//este esta bien

sentPayload({ destination: '@.com', body: '' },"Body \"\":\t") //200 pero esta mal
//este esta mal porque ninguno de los campos deberia estar vacio

sentPayload({ destination: '', body: '' },"Body and destination \"\":\t") //200 pero esta mal
//este esta mal porque ninguno de los campos deberia estar vacio

sentPayload({ destination: 'hola', body: "hola", client: 'client' },"Campo extra:\t")
//este a veces me daba bien a veces y a veces no

sentPayload({ body: 'hola' },"Missing destination key:\t") //500
//este esta mal porque falta uno de los campos (deberia estar mal si faltasen los dos)

sentPayload({ destination: 'hola', client: 'client' },"Missing body key:\t") //500
//falta uno de los campos

sentPayload({ body: 'hola', destination: 4444 },"Wrong body type \"number\":\t") //500
//este esta mal porque los valores no deberian ser numeros

sentPayload({ body: 'hola', destination: true },"Wrong body type \"boolean\":\t") //500
// este esta mal porque los valores no deberian ser booleanos

sentPayload({ body: 'hola', destination: ['hola'] },"Wrong body type \"array\":\t") //500
//este esta mal porque los valores no deberian ser arrays

sentPayload({ body: 'hola', destination: { mensaje: 'hola' } },"Wrong body type \"object\":\t") //500
//este esta mal porque los valores no deberian ser objectos

sentPayload({ destination: 'hola', body: null },"Wrong body type \"null\":\t") //500
//este esta mal porque los valores no deberian ser null

sentPayload({ destination: 'hola', body: undefined },"Wrong body type \"undefined\":\t") //500
//este esta mal porque los valores no deberian ser undefined
