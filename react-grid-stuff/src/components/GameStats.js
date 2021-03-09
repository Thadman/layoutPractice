import React from "react";

const GameStats = (props) => {
  console.log(props);
  return (
    <>
      <div className="top-table" style={{ width: "90%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #616161",
            paddingBottom: "10px",
            color: "#616161",
            fontSize: "12px",
          }}
        >
          <div>MIN</div>
          <div>PTS</div>
          <div>FGM</div>
          <div>FGPCT</div>
          <div>FG3M</div>
          <div>FG3A</div>
          <div>FTM</div>
          <div>FTA</div>
          <div>FTPCT</div>
          <div>OREB</div>
        </div>
        {props.data.map((item, index) => (
          // this is the data dump for the 10 games, can put this in the table! this is the first 10 games of the season, how to get last 10 games modularly?
          <div className="table">
            <div>{item.min}</div>
            <div>{item.pts}</div>
            <div>{item.fgm}</div>
            <div>{item.fg_pct}</div>
            <div>{item.fg3m}</div>
            <div>{item.fg3a}</div>
            <div>{item.ftm}</div>
            <div>{item.fta}</div>
            <div>{item.ft_pct}</div>
            <div>{item.oreb}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GameStats;
