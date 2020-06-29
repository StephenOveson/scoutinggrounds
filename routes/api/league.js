const { default: Axios } = require("axios");

const router = require("express").Router();
const axios = require('axios');

router
    .route('/summoner')
    .post((req, res) => {
        axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.body.summoner}?api_key=RGAPI-320398ce-313f-43d1-ab2b-a2d3dc7fb63f`)
            .then(({data}) => 
            {
                axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.id}?api_key=RGAPI-320398ce-313f-43d1-ab2b-a2d3dc7fb63f`).then(({data}) => res.json(data))
            }).catch(err => console.log(err))
            
    })


module.exports = router;