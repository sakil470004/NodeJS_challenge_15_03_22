import express from 'express';
// const fetch = require('node-fetch');
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


async function run() {
    try {



        // GET API
        app.get('/', async (req, res) => {
            res.json('your node server is running')
        })

        // get all todos
        app.get('/todos', async (req, res) => {
            fetch('https://jsonplaceholder.typicode.com/todos')
                .then(res => res.json())
                .then(todoData => {
                    todoData = todoData.map(tD => {
                        delete tD.userId;
                        return tD
                    })

                    res.json(todoData)
                }).catch(err => {
                    res.json(err)
                })
        })
        // get current user all data and marge it with todo
        app.get('/user/:userId', async (req, res) => {
            const userId = req.params.userId;
            let allUserToDo = [];
            await fetch('https://jsonplaceholder.typicode.com/todos')
                .then(res => res.json())
                .then(data => {
                    allUserToDo = data;
                }).catch(err => {
                    res.json(err)
                })
            let toDoCurrentUser = await allUserToDo.filter(tD => tD.userId = userId
            )
            let userFullDetails = {};
            await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
                .then(res => res.json())
                .then(data =>
                    userFullDetails = data
                ).catch(err => {
                    res.json(err)
                })
            userFullDetails["todos"] = toDoCurrentUser;
            // it can be optimized
            delete userFullDetails.userName;
            delete userFullDetails.address;
            delete userFullDetails.website;
            delete userFullDetails.company;
            delete userFullDetails.username;

            res.json(userFullDetails)



        })



    } finally {
        // await client.close();
    }
}

run().catch(console.dir);




app.listen(port, () => {
    console.log('your node server is running ', port)

})