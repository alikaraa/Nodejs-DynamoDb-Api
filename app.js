const express = require('express');
const { getCharacters, getCharacterById, addOrUpdateCharacter } = require('./dynamo')
const app = express();

app.use(express.json())

app.get('/', (req,res) => {
    res.send('hello world')
});

app.get('/characters/:id', async (req,res) => {
    const id = req.params.id
    try {
        const characters = await getCharacterById()
        res.json(characters)
    } catch (error) {
        console.error(err)
        res.status(500).json({err: 'Something went wrong'})
    }
})

app.post('/characters', async (req, res) => {
    const character = req.body
    try {
        const newCharacter = await addOrUpdateCharacter(character)
        res.json(newCharacters)
    } catch (error) {
        console.error(err)
        res.status(500).json({err: 'Something went wrong'})
    }
})
app.put('/characters/:id', async (req, res) => {
    const character = req.body;
    const {id} = req.params;
    character.id = id;
    try {
        const uptatedCharacter = await addOrUpdateCharacter(character)
        res.json(uptatedCharacter)
    } catch (error) {
        console.error(err)
        res.status(500).json({err: 'Something went wrong'})
    }
})

app.delete('/characters/:id', async (req, res)=> {
    const {id} = req.params
    try {
        const uptatedCharacter = (await deleteCharacter(id))
        
    } catch (error) {
        console.error(err)
        res.status(500).json({err: 'Something went wrong'})
    }
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening On Port')
})