import 'dotenv/config'
import express from 'express'
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);


app.use(express.json())

let teaData = [];
let nextId = 1;

//add a new tea
app.post('/teas', (req, res) => {
    logger.info("post request received to add a new tea");
    const {name, price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea);
    res.status(201).send(newTea);
})

//get all tea
app.get('/teas', (req, res) => {
    logger.info("get request received to fetch all teas");
    res.status(200).send(teaData);
})

//get tea by id
app.get('/teas/:id', (req, res) => {
    logger.info(`get request received to fetch tea with id: ${req.params.id}`);
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("404 tea not found");
    }
    res.status(200).send(tea);
})

//update tea
app.put('/teas/:id', (req, res) => {
    logger.info(`put request received to update tea with id: ${req.params.id}`);
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("404 tea not found");
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea);
})

//delete tea
app.delete('/teas/:id', (req, res) => {
    logger.info(`delete request received to delete tea with id: ${req.params.id}`);
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index == -1){
        return res.status(404).send("404 tea not fount");
    }
    teaData.splice(index, 1);
    return res.status(200).send("deleted");
})

app.listen(port, () => {
    console.log(`server i running at port: ${port}...`);
})