import React from "react";

export default function PlayerStats(props) {
  // this will be the player stats for the 2020 season

  console.log(props);

  const { loading } = props;

  return <div>{loading && <p>assists: {props.data.data[0].ast}</p>}</div>;
}
