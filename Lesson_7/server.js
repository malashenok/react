const cors = require("cors")
const { format } = require("date-fns")
const express = require("express")
const server = express()

server.use(cors())

const conversations = [
  { title: "room1", value: "" },
  { title: "room2", value: "" },
]

const messages = {
  room1: [
    {
      author: "User",
      message: "Как дела?",
      createdTs: format(new Date(), "HH:mm:ss"),
    },
    {
      author: "bot",
      message: "Привет, я бот!",
      createdTs: format(new Date(), "HH:mm:ss"),
    },
  ],
}

const getConversations = (req, res) => {
  res.status(200).send(conversations)
}

const getMessagesById = (req, res) => {
  const { id } = req.params
  res.status(200).send({ messages: messages[id] || [], roomId: id })
}

server.get("/conversations", getConversations)
server.get("/messages/:id", getMessagesById)

server.listen("8000", () => console.log("port 8000"))
