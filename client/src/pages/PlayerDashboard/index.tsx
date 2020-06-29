import React, { useState, useEffect } from 'react';
import { userState } from '../../recoil/userAtom';
import { userService, leagueApi } from '../../utils/api';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

export const PlayerDashboard = () => {
    const [user, setUser] = useRecoilState(userState);
    const [leagueName, setLeagueName] = useState('');
    const [active, setActive] = useState('');
    const [champions, setChampions] = useState([]);
    const [championPlayed, setChampionPlayed] = useState({ champion: '', wins: 0, losses: 0, games: 0 })
    const [err, setErr] = useState('');

    useEffect(() => console.log(user), [user])

    const addLeagueAccount = async () => {
        const {data} = await leagueApi.getSummonerRank(leagueName)
        if(data[0].queueType === "RANKED_SOLO_5x5") {
            const obj = {
                username: leagueName,
                rank: {tier: data[0].tier, division: data[0].rank, lp: data[0].leaguePoints},
                championPlayed: [{ champion: '', wins: 0, losses: 0, games: 0 }]
            }
            userService
                .addLeagueAccount(user._id, obj)
                .then(({ data }) => setUser(data))
        } else {
            setErr('Must have ranking in Ranked Solo 5v5')
        }
    }

    useEffect(() => err !== '' ? console.log(err) : undefined, [err])

    useEffect(() => {
        leagueApi.getAll().then(({ data: { data } }) => setChampions(data))
    }, [])

    useEffect(() => {
        setChampionPlayed({ ...championPlayed, games: championPlayed.wins + championPlayed.losses })
    }, [championPlayed.wins, championPlayed.losses])

    useEffect(() => console.log(championPlayed), [championPlayed])


    const setTab = ({ target }: any) => setActive(target.id)

    const submitChampion = async () => {
        const { data } = await userService.addChampionPlayed(user._id, championPlayed);
        setUser(data);
    }

    return (
        <>
            <div className="container">
                <div className="row m-3">
                    <div className="col-md-12">
                        <input type="text" className="form-control" value={leagueName} onChange={({ target: { value } }) => setLeagueName(value)} />
                        <button className="btn btn-primary form-control" disabled={leagueName === ''} onClick={addLeagueAccount}>Add League Account Name</button>
                    </div>
                </div>
                <ul className="nav nav-tabs m-3 nav-justified" id="nav-tab" role="tablist">
                    {user && user.leagueUsernames.map(account =>
                        <li className="nav-item" key={account.username} role="presentation">
                            <Link className="nav-link" id={account.username} data-toggle="tab" to={`#${account.username}`} role="tab" aria-controls={account.username} onClick={setTab}>{account.username}</Link>
                        </li>
                    )}
                </ul>
                <div className="tab-content" id="nav-tabContent">
                    {user && user.leagueUsernames.map(account =>
                        <div className={active === account.username ? 'd-block' : 'd-none'} key={account.username} id={account.username}>
                            <div className="mb-3">
                                <div className="row m-3">
                                    <select className="form-control" value={championPlayed.champion} onChange={({ target: { value } }) => setChampionPlayed({ ...championPlayed, champion: value })} >
                                        {champions && Object.keys(champions).map(champion => <option key={champion} value={champion}>{champion}</option>)}
                                    </select>
                                </div>
                                <div className="row m-3 justify-content">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <h3>Wins:</h3>
                                            <input type="number" min="0" className="form-control" value={championPlayed.wins} onChange={({ target: { value } }) => setChampionPlayed({ ...championPlayed, wins: parseInt(value) })} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <h3>Losses:</h3>
                                            <input type="number" min="0" className="form-control" value={championPlayed.losses} onChange={({ target: { value } }) => setChampionPlayed({ ...championPlayed, losses: parseInt(value) })} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-3">
                                    <button className="btn btn-primary form-control" onClick={submitChampion}>Submit Champion</button>
                                </div>
                            </div>
                            {account.championPlayed.filter(x => x.games > 0).map(champion =>
                                <div className="row" key={champion.champion}>
                                    <div className="col-3">
                                        <h1>{champion.champion}</h1>
                                    </div>
                                    <div className="col-3">
                                        <input type="number" value={champion.wins}>Wins {champion.wins}</input>
                                    </div>
                                    <div className="col-3">
                                        <input type="number" value={champion.losses}>Losses {champion.losses}</input>
                                    </div>
                                    <div className="col-3">
                                        <h1>Total {champion.games}</h1>
                                    </div>
                                </div>
                            )}
                        </div>)}
                </div>
                {/* Rule booleans */}
            </div>
        </>
    )
}