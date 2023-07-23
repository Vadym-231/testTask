const TournamentBoard = require('../src/Tournament');


test('Test case #1: Creat new Game at board', () => {
    const newTournament = new TournamentBoard();
    newTournament.addGame('Mexico', 'Canada');

    expect(newTournament.getGames()).toHaveLength(1);
    expect(newTournament.getGames()[0]?.homeTeam?.title).toContain('Mexico');
    expect(newTournament.getGames()[0]?.awayTeam?.title).toContain('Canada');
    expect(newTournament.getGames()[0]?.homeTeam?.score).toBe(0);
    expect(newTournament.getGames()[0]?.awayTeam?.score).toBe(0);

    newTournament.addGame('Spain', 'Brazil');
    expect(newTournament.getGames()).toHaveLength(2);
    expect(newTournament.getGames()[1]?.homeTeam?.title).toContain('Spain');
    expect(newTournament.getGames()[1]?.awayTeam?.title).toContain('Brazil');
    expect(newTournament.getGames()[1]?.homeTeam?.score).toBe(0);
    expect(newTournament.getGames()[1]?.awayTeam?.score).toBe(0);

});

test('Test case #2: Update and sort check game at board', () => {
    const newTournament = new TournamentBoard();
    newTournament.addGame('Mexico', 'Canada');
    newTournament.addGame('Spain', 'Brazil');
    newTournament.addGame('Spain', 'Brazil');
    newTournament.addGame('Germany', 'France');
    newTournament.addGame('Urugway', 'Italy');
    newTournament.addGame('Argentina', 'Austria');

    // Update scores..
    const games = newTournament.getGames();
    newTournament.editGame(games[0].id, 0, 5);
    newTournament.editGame(games[1].id, 10, 2);
    newTournament.editGame(games[2].id, 2, 2);
    newTournament.editGame(games[3].id, 6, 6);
    newTournament.editGame(games[4].id, 3, 1);


    // Check is the exception exist
    expect(() => newTournament.editGame( 'some_wrong_id', 3, 1))
        .toThrow(new Error('This game does not exist in list!'));

    // Check is sort and update work...
    const sortedGames = newTournament.getGames();
    expect([sortedGames[0]?.homeTeam.score, sortedGames[0]?.awayTeam.score]).toStrictEqual([10, 2]);
    expect([sortedGames[1]?.homeTeam.score, sortedGames[1]?.awayTeam.score]).toStrictEqual([6, 6]);
    expect([sortedGames[2]?.homeTeam.score, sortedGames[2]?.awayTeam.score]).toStrictEqual([0, 5]);
    expect([sortedGames[3]?.homeTeam.score, sortedGames[3]?.awayTeam.score]).toStrictEqual([2, 2]);
    expect([sortedGames[4]?.homeTeam.score, sortedGames[4]?.awayTeam.score]).toStrictEqual([3, 1]);

});

test('Test case #3: Finish the match', () => {
    const newTournament = new TournamentBoard();
    newTournament.addGame('Mexico', 'Canada');
    newTournament.addGame('Spain', 'Brazil');
    newTournament.addGame('Spain', 'Brazil');

    // Check if all elements was created
    expect(newTournament.getGames()).toHaveLength(3);

    // Finish the game Mexico - Canada
    newTournament.finishGame(newTournament.getGames()[0].id)

    // Check length
    expect(newTournament.getGames()).toHaveLength(2);

    // Check is the correct el was removed
    expect(newTournament.getGames().find(e => e?.homeTeam.title === 'Mexico')).toBe(undefined);

})