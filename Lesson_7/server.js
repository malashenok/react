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

const profiles = [
  { id: 1, name: "bot", group: "admin" },
  { id: 2, name: "User", group: "user" },
]

const getConversations = (req, res) => {
  res.status(200).send(conversations)
}

const getMessagesById = (req, res) => {
  const { id } = req.params
  res.status(200).send({ messages: messages[id] || [], roomId: id })
}

const getProfilesByUserName = (req, res) => {
  const { name } = req.params
  res.status(200).send({
    profiles: profiles.filter((profile) => profile.name === name) || [],
  })
}

server.get("/conversations", getConversations)
server.get("/messages/:id", getMessagesById)
server.get("/profiles/:name", getProfilesByUserName)

server.listen("8000", () => console.log("port 8000"))
