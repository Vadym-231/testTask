const { v4 } = require('uuid');

class TournamentBoard {
    constructor() {
        this.tournamentBoard = [];
    }

    addGame(homeTeam, awayTeam) {
        const gameExample = {
            homeTeam: {
                title: homeTeam,
                score: 0
            },
            awayTeam: {
                title: awayTeam,
                score: 0
            },
            id: v4(),
            isActive: true
        };
        this.tournamentBoard.push(gameExample);

        return gameExample;
    };

    editGame(id, scoreHomeTeam, scoreAwayTeam) {
        const targetIndex = this.tournamentBoard.findIndex(e => e.id === id);
        if(targetIndex === -1) {
            throw new Error('This game does not exist in list!');
        } else {
            this.tournamentBoard[targetIndex].homeTeam.score = scoreHomeTeam;
            this.tournamentBoard[targetIndex].awayTeam.score = scoreAwayTeam;
        }
    };

    finishGame(id) {
        const targetIndex = this.tournamentBoard.findIndex(e => e.id === id)
        if(targetIndex === -1) {
            throw new Error('This game does not exist in list!');
        }
        this.tournamentBoard[targetIndex].isActive = false;
    };

    getGames() {
        const data = this.tournamentBoard.filter(e => e.isActive);

        return data.sort(({ homeTeam: home_a, awayTeam: away_a }, { homeTeam: home_b, awayTeam: away_b }) => {
            if(home_a.score + away_a.score > home_b.score + away_b.score) return -1;
            else return 1
        });
    };
}

module.exports = TournamentBoard;