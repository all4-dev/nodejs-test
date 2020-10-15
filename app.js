const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

const dbInfo = { host: `127.0.0.1`, port: `27017`, dataBase: `tested` }
const dbPath = `mongodb://${dbInfo.host}:${dbInfo.port}/${dbInfo.dataBase}`
const client = new MongoClient(dbPath)

const menu = "<a href='/'>Home</a> -- <a href='/testDb'>Test Connection</a> -- <a href='createDb'>Create Database</a> -- <a href='dropDb'>Drop Database</a><hr/>"
let _log

app.get('/', (req, res) => {
    res.send(`${menu} Yeah! NodeJs is working, now try MongoDB`)
})

app.get("/testDb", (req, res) => {
    const iam = 'I am on Test Database'
    _log = ''

    client.connect(async function (err) {
        if (err) {
            myLog(`Error:: ${err.message}`)
            res.send(`${menu} ${iam} <hr/>${_log}`)
        } else {
            myLog(`Connected successfully to server`)

            const collection = await client.db(dbInfo.dataBase).listCollections({}, { nameOnly: true }).toArray()
            if(collection.length === 0){
                myLog(`It appears that the database has not been created or has been deleted`)
            } else {
                myLog(`All collections :: ${JSON.stringify(collection)}`)
            }

            res.send(`${menu} ${iam} <hr/>${_log}`)
        }
    });
})

app.get('/createDb', (req, res) => {
    const iam = 'I am on Create Database'
    _log = ''

    client.connect(async function (err) {
        if (err) {
            myLog(`Error:: ${err.message}`)
            res.send(`${menu} ${iam} <hr/>${_log}`)
        } else {
            myLog(`Connected successfully to server`)
            const myCollection = 'all4dev'
            const db = client.db(dbInfo.dataBase)

            const collection = await client.db(dbInfo.dataBase).listCollections({}, { nameOnly: true }).toArray()
            if(collection.length === 0){
                await db.createCollection(myCollection, { capped : true, size : 5242880, max : 5000 } )

                myLog(`Database ${dbInfo.dataBase} created with collection ${myCollection}`)

                const doc = await db
                            .collection(myCollection)
                            .insertOne({ wyd: 'testing my server with NodeJs + Express + MongoDb'})

                myLog(`Document added to ${myCollection}`)
                myLog(`Data:  <pre id="json">${JSON.stringify(doc, undefined, 2)}</pre>`)
            } else {
                myLog(`Database ${dbInfo.dataBase} with collection ${myCollection} already exist`)
            }

            res.send(`${menu} ${iam} <hr/>${_log}`)
        }
    });
})

app.get('/dropDb', (req, res) => {
    const iam = 'I am on Drop Database'
    _log = ''

    client.connect(async function (err) {
        if (err) {
            myLog(`Error:: ${err.message}`)
            res.send(`${menu} ${iam} <hr/>${_log}`)
        } else {
            myLog(`Connected successfully to server`)
            await client.db(dbInfo.dataBase).dropDatabase()

            myLog(`Database deleted`)
            res.send(`${menu} ${iam} <hr/>${_log}`)
        }
    });
})

function myLog(msg){
    console.log(msg)
    _log += `${msg}<br/>`
}

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
})