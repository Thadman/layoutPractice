import React from "react";

const GameStats = (props) => {
  console.log(props);
  return (
    <>
      <div className="top-table" style={{ width: "90%" }}>
        {props.data.map((item, index) => (
          // this is the data dump for the 10 games, can put this in the table! this is the first 10 games of the season, how to get last 10 games modularly?
          <div className="table">
            <div>{item.min}</div>
            <div>{item.fgm}</div>
            <div>{item.fg_pct}</div>
            <div>{item.fg3m}</div>
            <div>{item.fg3a}</div>
            <div>{item.ftm}</div>
            <div>{item.fta}</div>
            <div>{item.ft_pct}</div>
            <div>{item.oreb}</div>
            <div>{item.pts}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GameStats;

//  <p key={index} style={{ color: "white" }}>
//             {item.game.home_team_score}
//             {item.game.date} vs {item}
//           </p>
