import axios from 'axios';
import { championPlayed } from '../models/user';

interface signup {
    username: string;
    password: string;
    email?: string;
}

export const userService = {
    login: (obj: signup) => axios.post('api/users/login', obj),
    signup: (obj: signup) => axios.post('api/users/', obj),
    addLeagueAccount: (id: string, leagueUsernames: { username: string, championPlayed: championPlayed[] }) => axios.put('api/users/' + id, leagueUsernames),
    addChampionPlayed: (id: string, championPlayed: championPlayed) => axios.put('api/users/' + id, championPlayed)
}

export const leagueApi = {
    getAll: () => axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
        .then(({ data }) => axios.get('https://ddragon.leagueoflegends.com/cdn/' + data[0] + '/data/en_US/championFull.json')),
    getSummonerRank: (summoner: string) => axios.post('api/league/summoner', {summoner})
}



