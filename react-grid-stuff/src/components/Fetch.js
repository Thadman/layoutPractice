import React, { useEffect } from "react";
import { useState } from "react";
import PlayerStats from "./PlayerStats";
import TeamData from "./TeamData";
import TeamStats from "./TeamStats";
// import Search from "./Search";
import PlayerData from "./PlayerData";
import { data } from "autoprefixer";

export default function FetchData() {
  const [stats, setStats] = useState([]);
  const [query, setQuery] = useState("");
  // const [id, setId] = useState("");
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

  const getHarden = async () => {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${192}`
    );
    const harden = await response.json();

    setHarden(harden.data);
  };

  const getNamesAndTeamOnEffectHarden = async () => {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/players/192`
    );
    const team = await response.json();
    setHardenTeam(team);
    console.log(team.team.abbreviation);
  };

  const getSteph = async () => {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${115}`
    );
    const steph = await response.json();
    setSteph(steph.data);
    // console.log(steph);
  };

  const getNamesAndTeamOnEffectCurry = async () => {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/players/115`
    );
    const team = await response.json();
    setStephTeam(team);
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
  };

  useEffect(() => {
    getHarden();
    getSteph();
    getGiannis();
    getNamesAndTeamOnEffectHarden();
    getNamesAndTeamOnEffectCurry();
    getNamesAndTeamOnEffectGiannis();
  }, []);

  const handleReset = () => {
    setQuery("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const getData = async () => {
      try {
        const response = await fetch(
          `https://www.balldontlie.io/api/v1/players?search=${query}`
        );
        const data = await response.json();
        setStats(data.data);
        // console.log(data);
        const id = data.data[0].id;
        const playerId = await fetch(
          `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
        );
        const playerData = await playerId.json();
        // console.log(playerData);
        setPlayerStats(playerData.data);
        setLoading(true);

        const teamId = data.data[0].team.id;
        const playerTeam = await fetch(
          `https://www.balldontlie.io/api/v1/teams/${teamId}`
        );
        const teamStats = await playerTeam.json();
        // console.log(teamStats);
        setTeam(teamStats.data);

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
    <div className="wrapper">
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
      <div className="title">
        <h1 style={{ fontSize: "30px", marginTop: "35px" }}>
          '20 - '21' SEASON AVERAGES
        </h1>
      </div>
      <PlayerData stat={stats} />
      <div className="c">
        <div className="c-1">
          <>
            <div className="playerMargin">
              <h5>
                {hardenTeam.first_name} {hardenTeam.last_name}
              </h5>
              <h6 key={hardenTeam}>Position: {hardenTeam.position} | Team: </h6>
            </div>
          </>
          <>
            {harden.map((item, index) => (
              <div className="c-1-1">
                <div>
                  <h6>GP</h6>
                  <h6>{item.games_played}</h6>
                </div>
                <div>
                  <h6>AST</h6>
                  <h6>{item.ast}</h6>
                </div>
                <div>
                  <h6>BLK</h6>
                  <h6>{item.blk}</h6>
                </div>
                <div>
                  <h6>DREB</h6>
                  <h6>{item.dreb}</h6>
                </div>
                <div>
                  <h6>FGM3PT</h6>
                  <h6>{item.fg3_pct}</h6>
                </div>
                <div>
                  <h6>FG3A</h6>
                  <h6>{item.fg3a}</h6>
                </div>
                <div>
                  <h6>FG3M</h6>
                  <h6>{item.fg3m}</h6>
                </div>
                <div>
                  <h6>FGA</h6>
                  <h6>{item.fga}</h6>
                </div>
                <div>
                  <h6>FGM</h6>
                  <h6>{item.fgm}</h6>
                </div>
                <div>
                  <h6>FTPCT</h6>
                  <h6>{item.ft_pct}</h6>
                </div>
                <div>
                  <h6>FTA</h6>
                  <h6>{item.fta}</h6>
                </div>
                <div>
                  <h6>FTM</h6>
                  <h6>{item.ftm}</h6>
                </div>
                <div>
                  <h6>MIN</h6>
                  <h6>{item.min}</h6>
                </div>
                <div>
                  <h6>OREB</h6>
                  <h6>{item.oreb}</h6>
                </div>
                <div>
                  <h6>PTS</h6>
                  <h6>{item.pts}</h6>
                </div>
                <div>
                  <h6>REB</h6>
                  <h6>{item.reb}</h6>
                </div>
                <div>
                  <h6>STL</h6>
                  <h6>{item.stl}</h6>
                </div>
                <div>
                  <h6>TO</h6>
                  <h6>{item.turnover}</h6>
                </div>
                <div>
                  <h6>PF</h6>
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
              <h6>Position: {stephTeam.position} | Team: </h6>
            </div>
          </>
          <>
            {steph.map((item, index) => (
              <div className="c-1-1">
                <div>
                  <h6>GP</h6>
                  <h6>{item.games_played}</h6>
                </div>
                <div>
                  <h6>AST</h6>
                  <h6>{item.ast}</h6>
                </div>
                <div>
                  <h6>BLK</h6>
                  <h6>{item.blk}</h6>
                </div>
                <div>
                  <h6>DREB</h6>
                  <h6>{item.dreb}</h6>
                </div>
                <div>
                  <h6>FGM3PT</h6>
                  <h6>{item.fg3_pct}</h6>
                </div>
                <div>
                  <h6>FG3A</h6>
                  <h6>{item.fg3a}</h6>
                </div>
                <div>
                  <h6>FG3M</h6>
                  <h6>{item.fg3m}</h6>
                </div>
                <div>
                  <h6>FGA</h6>
                  <h6>{item.fga}</h6>
                </div>
                <div>
                  <h6>FGM</h6>
                  <h6>{item.fgm}</h6>
                </div>
                <div>
                  <h6>FTPCT</h6>
                  <h6>{item.ft_pct}</h6>
                </div>
                <div>
                  <h6>FTA</h6>
                  <h6>{item.fta}</h6>
                </div>
                <div>
                  <h6>FTM</h6>
                  <h6>{item.ftm}</h6>
                </div>
                <div>
                  <h6>MIN</h6>
                  <h6>{item.min}</h6>
                </div>
                <div>
                  <h6>OREB</h6>
                  <h6>{item.oreb}</h6>
                </div>
                <div>
                  <h6>PTS</h6>
                  <h6>{item.pts}</h6>
                </div>
                <div>
                  <h6>REB</h6>
                  <h6>{item.reb}</h6>
                </div>
                <div>
                  <h6>STL</h6>
                  <h6>{item.stl}</h6>
                </div>
                <div>
                  <h6>TO</h6>
                  <h6>{item.turnover}</h6>
                </div>
                <div>
                  <h6>PF</h6>
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
              <h6>Position: {giannisTeam.position} | Team: </h6>
            </div>
          </>
          <>
            {giannis.map((item, index) => (
              <div className="c-1-1">
                <div>
                  <h6>GP</h6>
                  <h6>{item.games_played}</h6>
                </div>
                <div>
                  <h6>AST</h6>
                  <h6>{item.ast}</h6>
                </div>
                <div>
                  <h6>BLK</h6>
                  <h6>{item.blk}</h6>
                </div>
                <div>
                  <h6>DREB</h6>
                  <h6>{item.dreb}</h6>
                </div>
                <div>
                  <h6>FGM3PT</h6>
                  <h6>{item.fg3_pct}</h6>
                </div>
                <div>
                  <h6>FG3A</h6>
                  <h6>{item.fg3a}</h6>
                </div>
                <div>
                  <h6>FG3M</h6>
                  <h6>{item.fg3m}</h6>
                </div>
                <div>
                  <h6>FGA</h6>
                  <h6>{item.fga}</h6>
                </div>
                <div>
                  <h6>FGM</h6>
                  <h6>{item.fgm}</h6>
                </div>
                <div>
                  <h6>FTPCT</h6>
                  <h6>{item.ft_pct}</h6>
                </div>
                <div>
                  <h6>FTA</h6>
                  <h6>{item.fta}</h6>
                </div>
                <div>
                  <h6>FTM</h6>
                  <h6>{item.ftm}</h6>
                </div>
                <div>
                  <h6>MIN</h6>
                  <h6>{item.min}</h6>
                </div>
                <div>
                  <h6>OREB</h6>
                  <h6>{item.oreb}</h6>
                </div>
                <div>
                  <h6>PTS</h6>
                  <h6>{item.pts}</h6>
                </div>
                <div>
                  <h6>REB</h6>
                  <h6>{item.reb}</h6>
                </div>
                <div>
                  <h6>STL</h6>
                  <h6>{item.stl}</h6>
                </div>
                <div>
                  <h6>TO</h6>
                  <h6>{item.turnover}</h6>
                </div>
                <div>
                  <h6>PF</h6>
                  <h6>{item.pf}</h6>
                </div>
              </div>
            ))}
          </>
        </div>
      </div>

      <div className="d-1">
        <div className="d-1-1">Last 10 games</div>
        <div className="d-1-2">
          <select>
            <option value="James Harden">James Harden</option>
            <option value="Giannis">Steph</option>
            <option value="Steph">Giannis</option>
          </select>
        </div>
      </div>
      <div className="e">
        <div className="e-1">
          <div>A</div>
          <div>B</div>
          <div>C</div>
          <div>D</div>
          <div>E</div>
          <div>F</div>
          <div>G</div>
          <div>H</div>
          <div>I</div>
          <div>J</div>
          <div>K</div>
          <div>L</div>
          <div>M</div>
          <div>N</div>
          <div>O</div>
          <div>P</div>
          <div>Q</div>
          <div>R</div>
          <div>S</div>
          <div>T</div>
        </div>
      </div>
    </div>
  );
}
