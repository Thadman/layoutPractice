import React from "react";

const GameStats = (props) => {
  // console.log(props);

  // const getStats = async () => {
  //   const response = await fetch(
  //     `https://www.balldontlie.io/api/v1/stats?seasons[]=2020&player_ids[]=${props.id}&per_page=10`
  //   );
  //   const data = await response.json();
  //   getStats();
  //   console.log(data);
  // };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>MIN</th>
            <th>PTS</th>
            <th>AST</th>
            <th>FGM</th>
            <th>FGPCT</th>
            <th>FG3M</th>
            <th>FG3A</th>
            <th>FG3PCT</th>
            <th>FTM</th>
            <th>FTA</th>
            <th>FTPCT</th>
            <th>OREB</th>
            <th>BLK</th>
            <th>DREB</th>
            <th>STL</th>
            <th>TO</th>
            <th>PF</th>
          </tr>
        </thead>
        {props.data.map((item, index) => (
          // this is the data dump for the 10 games, can put this in the table! this is the first 10 games of the season, how to get last 10 games modularly?
          <tbody>
            <tr>
              <td>{item.min}</td>
              <td>{item.pts}</td>
              <td>{item.ast}</td>
              <td>{item.fgm}</td>
              <td>{item.fg_pct}</td>
              <td>{item.fg3m}</td>
              <td>{item.fg3a}</td>
              <td>{item.fg3_pct}</td>
              <td>{item.ftm}</td>
              <td>{item.fta}</td>
              <td>{item.ft_pct}</td>
              <td>{item.oreb}</td>
              <td>{item.blk}</td>
              <td>{item.dreb}</td>
              <td>{item.stl}</td>
              <td>{item.turnover}</td>
              <td>{item.pf}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
};

export default GameStats;
