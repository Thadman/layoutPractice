import React, { useEffect } from "react";
import { useState } from "react";
// import Search from "./Search";
import PlayerData from "./PlayerData";
import GameStats from "./GameStats";

export default function FetchData() {
  const [stats, setStats] = useState([]);
  const [query, setQuery] = useState("");
  const [id, setId] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);
  const [team, setTeam] = useState([]);
  const [teamStats, setTeamStats] = useState([]);
  const [playerPic, setPlayerPic] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [harden, setHarden] = useState([]);
  const [steph, setSteph] = useState([]);
  const [giannis, setGiannis] = useState([]);
  const [hardenTeam, setHardenTeam] = useState([]);
  const [stephTeam, setStephTeam] = useState([]);
  const [giannisTeam, setGiannisTeam] = useState([]);
  const [hardenTeamName, setHardenTeamName] = useState([]);
  const [stephTeamName, setStephTeamName] = useState([]);
  const [giannisTeamName, setGiannisTeamName] = useState([]);
  const [tenGames, setTenGames] = useState([]);
  const [value, setValue] = useState("Steph Curry");

  // this is the data for the players season averages
  const getHarden = async () => {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${192}`
    );
    const harden = await response.json();

    setHarden(harden.data);
  };

  // this gets the players height, weight, name etc, and also the team information.
  const getNamesAndTeamOnEffectHarden = async () => {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/players/192`
    );
    const team = await response.json();
    setHardenTeam(team);
    setHardenTeamName(team.team);
  };

  // stephs season averages
  const getSteph = async () => {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${115}`
    );
    const steph = await response.json();
    setSteph(steph.data);
    // console.log(steph);
  };

  // his info and team info also
  const getNamesAndTeamOnEffectCurry = async () => {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/players/115`
    );
    const team = await response.json();
    setStephTeam(team);
    setStephTeamName(team.team);
  };

  const getGiannis = async () => {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${15}`
    );
    const giannis = await response.json();
    setGiannis(giannis.data);
  };

  const getNamesAndTeamOnEffectGiannis = async () => {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/players/15`
    );
    const team = await response.json();
    setGiannisTeam(team);
    setGiannisTeamName(team.team);
  };

  const getTenGames = async () => {
    // this is getting the last 10 games for steph, change to ${id}
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/stats?seasons[]=2020&player_ids[]=${115}&per_page=10`
    );
    const data = await response.json();
    // console.log(data.data);
    setTenGames(data.data);
  };

  useEffect(() => {
    getHarden();
    getSteph();
    getGiannis();
    getNamesAndTeamOnEffectHarden();
    getNamesAndTeamOnEffectCurry();
    getNamesAndTeamOnEffectGiannis();
    getTenGames();
  }, []);

  // resetting the data
  const handlePlayerReset = (event) => {
    event.preventDefault();
    setLoading(false);
  };

  // resetting the query
  const handleReset = () => {
    setQuery("");
  };

  // for the select tag
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // handling the request when the query is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    const getData = async () => {
      try {
        // getting the information of the queried player, gets back name, weight, and team also
        const response = await fetch(
          `https://www.balldontlie.io/api/v1/players?search=${query}`
        );
        const data = await response.json();
        // console.log(data);
        setStats(data.data[0]);
        setId(data.data[0].id);
        const id = data.data[0].id;
        console.log(id);

        // getting the season averages for the player that was queried
        const playerId = await fetch(
          `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
        );
        const playerData = await playerId.json();
        // console.log(playerData);
        setPlayerStats(playerData.data);
        setLoading(true);

        const teamId = data.data[0].team.id;
        // getting the team info, dont think i need this? can get the info from the first query?
        const playerTeam = await fetch(
          `https://www.balldontlie.io/api/v1/teams/${teamId}`
        );
        const teamStats = await playerTeam.json();
        // console.log(teamStats);
        setTeam(teamStats.data);

        // this is the data of the games that the team has played, with results etc.
        const teamGames = await fetch(
          `https://www.balldontlie.io/api/v1/games?seasons[]=2020&team_ids[]=${teamId}&per_page=50`
        );
        const teamGameStats = await teamGames.json();
        // console.log(teamGameStats);
        setTeamStats(teamGameStats);

        // need to swap the query around so i can send off in the correct format.

        let correctFormat = query.split(" ").reverse().join("/");
        // console.log(correctFormat);

        const playerPic = await fetch(
          `https://nba-players.herokuapp.com/players/${correctFormat}`
        );

        const playerPicShow = await playerPic;
        // console.log(playerPicShow);
        setPlayerPic(playerPicShow.url);
        // console.log(playerPic);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
      return getData;
    };

    getData();
    handleReset();
  };

  return (
    <div className="wrapper font-mono">
      <div className="header-wrapper ">
        <div className="a">
          <div className="a-1">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Here..."
              />
            </form>
          </div>
        </div>

        <PlayerData
          stat={stats}
          loading={loading}
          harden={harden}
          reset={handlePlayerReset}
        />
      </div>

      <div className="c">
        <h1 style={{ fontSize: "30px", color: "#fff", textAlign: "center" }}>
          '20 - '21' SEASON AVERAGES
        </h1>
        <div className="c-1">
          <div className="playerMargin">
            <h5>
              {hardenTeam.first_name} {hardenTeam.last_name}
            </h5>
            <h6 key={hardenTeam}>
              Position: {hardenTeam.position} | Team:{" "}
              {hardenTeamName.abbreviation}{" "}
            </h6>
          </div>

          <>
            {harden.map((item, index) => (
              <div className="c-1-1">
                <div>
                  <h5>GP</h5>
                  <h6>{item.games_played}</h6>
                </div>
                <div>
                  <h5>AST</h5>
                  <h6>{item.ast}</h6>
                </div>
                <div>
                  <h5>BLK</h5>
                  <h6>{item.blk}</h6>
                </div>
                <div>
                  <h5>DREB</h5>
                  <h6>{item.dreb}</h6>
                </div>
                <div>
                  <h5>FGM3PT</h5>
                  <h6>{item.fg3_pct}</h6>
                </div>
                <div>
                  <h5>FG3A</h5>
                  <h6>{item.fg3a}</h6>
                </div>
                <div>
                  <h5>FG3M</h5>
                  <h6>{item.fg3m}</h6>
                </div>
                <div>
                  <h5>FGA</h5>
                  <h6>{item.fga}</h6>
                </div>
                <div>
                  <h5>FGM</h5>
                  <h6>{item.fgm}</h6>
                </div>
                <div>
                  <h5>FTPCT</h5>
                  <h6>{item.ft_pct}</h6>
                </div>
                <div>
                  <h5>FTA</h5>
                  <h6>{item.fta}</h6>
                </div>
                <div>
                  <h5>FTM</h5>
                  <h6>{item.ftm}</h6>
                </div>
                <div>
                  <h5>MIN</h5>
                  <h6>{item.min}</h6>
                </div>
                <div>
                  <h5>OREB</h5>
                  <h6>{item.oreb}</h6>
                </div>
                <div>
                  <h5>PTS</h5>
                  <h6>{item.pts}</h6>
                </div>
                <div>
                  <h5>REB</h5>
                  <h6>{item.reb}</h6>
                </div>
                <div>
                  <h5>STL</h5>
                  <h6>{item.stl}</h6>
                </div>
                <div>
                  <h5>TO</h5>
                  <h6>{item.turnover}</h6>
                </div>
                <div>
                  <h5>PF</h5>
                  <h6>{item.pf}</h6>
                </div>
              </div>
            ))}
          </>
        </div>
        <div className="c-2">
          <>
            <div className="playerMargin">
              <h5>
                {stephTeam.first_name} {stephTeam.last_name}
              </h5>
              <h6>
                Position: {stephTeam.position} | Team:{" "}
                {stephTeamName.abbreviation}{" "}
              </h6>
            </div>
          </>
          <>
            {steph.map((item, index) => (
              <div className="c-1-1">
                <div>
                  <h5>GP</h5>
                  <h6>{item.games_played}</h6>
                </div>
                <div>
                  <h5>AST</h5>
                  <h6>{item.ast}</h6>
                </div>
                <div>
                  <h5>BLK</h5>
                  <h6>{item.blk}</h6>
                </div>
                <div>
                  <h5>DREB</h5>
                  <h6>{item.dreb}</h6>
                </div>
                <div>
                  <h5>FGM3PT</h5>
                  <h6>{item.fg3_pct}</h6>
                </div>
                <div>
                  <h5>FG3A</h5>
                  <h6>{item.fg3a}</h6>
                </div>
                <div>
                  <h5>FG3M</h5>
                  <h6>{item.fg3m}</h6>
                </div>
                <div>
                  <h5>FGA</h5>
                  <h6>{item.fga}</h6>
                </div>
                <div>
                  <h5>FGM</h5>
                  <h6>{item.fgm}</h6>
                </div>
                <div>
                  <h5>FTPCT</h5>
                  <h6>{item.ft_pct}</h6>
                </div>
                <div>
                  <h5>FTA</h5>
                  <h6>{item.fta}</h6>
                </div>
                <div>
                  <h5>FTM</h5>
                  <h6>{item.ftm}</h6>
                </div>
                <div>
                  <h5>MIN</h5>
                  <h6>{item.min}</h6>
                </div>
                <div>
                  <h5>OREB</h5>
                  <h6>{item.oreb}</h6>
                </div>
                <div>
                  <h5>PTS</h5>
                  <h6>{item.pts}</h6>
                </div>
                <div>
                  <h5>REB</h5>
                  <h6>{item.reb}</h6>
                </div>
                <div>
                  <h5>STL</h5>
                  <h6>{item.stl}</h6>
                </div>
                <div>
                  <h5>TO</h5>
                  <h6>{item.turnover}</h6>
                </div>
                <div>
                  <h5>PF</h5>
                  <h6>{item.pf}</h6>
                </div>
              </div>
            ))}
          </>
        </div>
        <div className="c-3">
          <>
            <div className="playerMargin">
              <h5>
                {giannisTeam.first_name} {giannisTeam.last_name}
              </h5>
              <h6>
                Position: {giannisTeam.position} | Team:{" "}
                {giannisTeamName.abbreviation}
              </h6>
            </div>
          </>
          <>
            {giannis.map((item, index) => (
              <div className="c-1-1">
                <div>
                  <h5>GP</h5>
                  <h6>{item.games_played}</h6>
                </div>
                <div>
                  <h5>AST</h5>
                  <h6>{item.ast}</h6>
                </div>
                <div>
                  <h5>BLK</h5>
                  <h6>{item.blk}</h6>
                </div>
                <div>
                  <h5>DREB</h5>
                  <h6>{item.dreb}</h6>
                </div>
                <div>
                  <h5>FGM3PT</h5>
                  <h6>{item.fg3_pct}</h6>
                </div>
                <div>
                  <h5>FG3A</h5>
                  <h6>{item.fg3a}</h6>
                </div>
                <div>
                  <h5>FG3M</h5>
                  <h6>{item.fg3m}</h6>
                </div>
                <div>
                  <h5>FGA</h5>
                  <h6>{item.fga}</h6>
                </div>
                <div>
                  <h5>FGM</h5>
                  <h6>{item.fgm}</h6>
                </div>
                <div>
                  <h5>FTPCT</h5>
                  <h6>{item.ft_pct}</h6>
                </div>
                <div>
                  <h5>FTA</h5>
                  <h6>{item.fta}</h6>
                </div>
                <div>
                  <h5>FTM</h5>
                  <h6>{item.ftm}</h6>
                </div>
                <div>
                  <h5>MIN</h5>
                  <h6>{item.min}</h6>
                </div>
                <div>
                  <h5>OREB</h5>
                  <h6>{item.oreb}</h6>
                </div>
                <div>
                  <h5>PTS</h5>
                  <h6>{item.pts}</h6>
                </div>
                <div>
                  <h5>REB</h5>
                  <h6>{item.reb}</h6>
                </div>
                <div>
                  <h5>STL</h5>
                  <h6>{item.stl}</h6>
                </div>
                <div>
                  <h5>TO</h5>
                  <h6>{item.turnover}</h6>
                </div>
                <div>
                  <h5>PF</h5>
                  <h6>{item.pf}</h6>
                </div>
              </div>
            ))}
          </>
        </div>

        {/* this will come up after a search */}
        <div className="newItem">
          {loading && (
            <div className="c-3">
              <>
                <div className="playerMargin">
                  <h5>
                    {stats.first_name} {stats.last_name}
                  </h5>
                  <h6>
                    Position: {stats.position} | Team: {stats.team.abbreviation}
                  </h6>
                </div>
              </>
              <>
                {playerStats.map((item, index) => (
                  <div className="c-1-1">
                    <div>
                      <h5>GP</h5>
                      <h6>{item.games_played}</h6>
                    </div>
                    <div>
                      <h5>AST</h5>
                      <h6>{item.ast}</h6>
                    </div>
                    <div>
                      <h5>BLK</h5>
                      <h6>{item.blk}</h6>
                    </div>
                    <div>
                      <h5>DREB</h5>
                      <h6>{item.dreb}</h6>
                    </div>
                    <div>
                      <h5>FGM3PT</h5>
                      <h6>{item.fg3_pct}</h6>
                    </div>
                    <div>
                      <h5>FG3A</h5>
                      <h6>{item.fg3a}</h6>
                    </div>
                    <div>
                      <h5>FG3M</h5>
                      <h6>{item.fg3m}</h6>
                    </div>
                    <div>
                      <h5>FGA</h5>
                      <h6>{item.fga}</h6>
                    </div>
                    <div>
                      <h5>FGM</h5>
                      <h6>{item.fgm}</h6>
                    </div>
                    <div>
                      <h5>FTPCT</h5>
                      <h6>{item.ft_pct}</h6>
                    </div>
                    <div>
                      <h5>FTA</h5>
                      <h6>{item.fta}</h6>
                    </div>
                    <div>
                      <h5>FTM</h5>
                      <h6>{item.ftm}</h6>
                    </div>
                    <div>
                      <h5>MIN</h5>
                      <h6>{item.min}</h6>
                    </div>
                    <div>
                      <h5>OREB</h5>
                      <h6>{item.oreb}</h6>
                    </div>
                    <div>
                      <h5>PTS</h5>
                      <h6>{item.pts}</h6>
                    </div>
                    <div>
                      <h5>REB</h5>
                      <h6>{item.reb}</h6>
                    </div>
                    <div>
                      <h5>STL</h5>
                      <h6>{item.stl}</h6>
                    </div>
                    <div>
                      <h5>TO</h5>
                      <h6>{item.turnover}</h6>
                    </div>
                    <div>
                      <h5>PF</h5>
                      <h6>{item.pf}</h6>
                    </div>
                  </div>
                ))}
              </>
            </div>
          )}
        </div>
      </div>

      <div className="d-1">
        <>
          <div className="d-1-2">
            <h1
              style={{ fontSize: "30px", color: "#fff", textAlign: "center" }}
            >
              LAST TEN GAMES
            </h1>
          </div>
          <div className="d-1-2">
            <select value={value} onChange={handleChange}>
              <option value="James Harden">James Harden</option>
              <option value="Steph Curry">Steph Curry</option>
              <option value="Giannis">Giannis Anteto..</option>
              {loading && <option value={query}>{query}</option>}
            </select>
          </div>
        </>
      </div>
      <div className="e">
        <div className="e-1">
          <GameStats data={tenGames} value={value} id={id} />
        </div>
      </div>
    </div>
  );
}
