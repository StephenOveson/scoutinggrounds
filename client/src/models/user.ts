type cycles = {
    cycleOne: boolean;
    cycleTwo: boolean;
    cycleThree: boolean;
    cycleFour: boolean;
    cycleFive: boolean;
    cycleSix: boolean;
    cycleSeven: boolean;
}

export type championPlayed = {
    champion: string;
    games: number;
    wins: number;
    losses: number;
}

type rank = {
    tier: string;
    lp: number;
}

type leagueUsername = {
    _id: string;
    username: string;
    rank: rank;
    championPlayed: championPlayed[]
}

const cyclesObject = {
    cycleOne: false,
    cycleTwo: false,
    cycleThree: false,
    cycleFour: false,
    cycleFive: false,
    cycleSix: false,
    cycleSeven: false,
}

export class User {
    _id: string;
    username: string;
    leagueUsernames: leagueUsername[];
    email: string;
    twoSplits: boolean;
    sixSplits: boolean;
    emergingRegion: boolean;
    threeSG: boolean;
    surveySent: boolean;
    cycles: cycles;

    constructor(obj?: User){
        this._id = obj?._id || '';
        this.username = obj?.username || '';
        this.email = obj?.email || '';
        this.leagueUsernames = obj?.leagueUsernames || [];
        this.twoSplits = obj?.twoSplits || false;
        this.sixSplits = obj?.sixSplits || false;
        this.emergingRegion = obj?.emergingRegion || false;
        this.threeSG = obj?.threeSG || false;
        this.surveySent = obj?.surveySent || false;
        this.cycles = obj?.cycles || cyclesObject;
    }
}
