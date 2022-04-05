const { response } = require("express")
const express = require("express")
const { status } = require("express/lib/response")
const res = require("express/lib/response")
const cors = require("cors")


server = express()
server.use(express.json())
const uuid = require("uuid")
server.use(cors())

users = []

const CheckId = (request, response, next) => {

    const { id } = request.params

    console.log(id)
    const index = users.findIndex(user => user.id === id)

    if (index <= -1) {

        return response.status(401).json({
            Message: "User not found"
        })
    }

    request.userIndex = index

    next()

}

server.get("/users/", (request, response) => {

    return response.json(users)

})

server.post("/users/", (request, response) => {
    try { //Serve para continuar o servidor sem quebrar, mostrando assim onde foi o erro para o criente.
        const { Name, Age } = request.body
        //  if (Age < 18) 

        // {
        //throw new Error("Menor de idade") //Serve para simular algum erro, colocando alguma condição

        // }
        const user = {
            id: uuid.v4(), Name, Age
        }

        if (user.Name == "" || user.Age == "") {
            return response.status(500).json({ Error: error.message })

        }
        else {
            users.push(user)

            return response.json(user)
        }

    } catch (error) {
        return response.status(500).json({ Error: error.message })

    }
})

server.put("/users/:id", CheckId, (request, response) => {

    index = request.userIndex

    const { Name, Age } = request.body

    const Update_user = { id, Name, Age }



    users[index] = Update_user


    { return response.json(users[index]) }
})

server.delete("/users/:id", CheckId, (request, response) => {

    index = request.userIndex
    users.splice(index, 1)
    console.log(index)

    return response.status(204).json(users[index])

})


server.listen(3001, () => {
    console.log("Servidor rodando")
})