import React from "react";
import { useState } from "react";
// import PlayerData from "./PlayerData";
import PlayerStats from "./PlayerStats";
import TeamData from "./TeamData";
import TeamStats from "./TeamStats";

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
        // console.log(data);
        setStats(data.data);
        // setId(data.data[0].id);
        const id = data.data[0].id;
        const playerId = await fetch(
          `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
        );
        const playerData = await playerId.json();
        // console.log(playerData);
        setPlayerStats(playerData);

        const teamId = data.data[0].team.id;
        const playerTeam = await fetch(
          `https://www.balldontlie.io/api/v1/teams/${teamId}`
        );
        const teamStats = await playerTeam.json();
        // console.log(teamStats);
        setTeam(teamStats);

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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Here..."
          />
        </form>
      </div>
      <div className="b">
        <div className="b-1">
          <div className="b-1-1">
            <button>James Harden</button>
          </div>
        </div>
        <div className="b-2">
          <div className="b-1-1">
            <button>Steph Curry</button>
          </div>
        </div>
        <div className="b-3">
          <div className="b-1-1">
            <button>Giannis Antetokounmpo</button>
          </div>
        </div>
        <div className="b-4">
          <div className="b-1-1">
            <button>Clear</button>
          </div>
        </div>
      </div>
      <div className="c">
        <div className="c-1">
          <div>
            <h5>James Harden</h5>
            <h6>Position: G | Team: BKN</h6>
          </div>

          <div className="c-1-1">
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
            <div>
              <h6>GP</h6>
              <h6>81</h6>
            </div>
          </div>
        </div>
        <div className="c-2"></div>
        <div className="c-3"></div>
      </div>
      <div className="d">
        <div className="d-1-1">Last 10 games</div>
        <div className="d-1-2">
          <select>
            <option value="James Harden">James Harden</option>
            <option value="Giannis">Steph</option>
            <option value="Steph">Giannis</option>
          </select>
        </div>
      </div>

      {/* <PlayerData data={stats} pic={playerPic} loading={loading} /> */}
      <PlayerStats data={playerStats} loading={loading} />
      <TeamData data={team} />
      <TeamStats data={teamStats} />
    </div>
  );
}
