require('dotenv').config()

const router = require("express").Router();
const axios = require('axios');

router
    .route('/summoner')
    .post((req, res) => {
        axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.body.summoner}?api_key=${process.env.RIOT_API_KEY}`)
            .then(({data}) => 
            {
                axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.id}?api_key=${process.env.RIOT_API_KEY}`).then(({data}) => res.json(data))
            }).catch(err => console.log(err))
            
    })


module.exports = router;