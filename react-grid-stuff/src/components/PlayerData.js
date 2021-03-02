import React from "react";

export default PlayerData = (props) => {
  // this will be the player data here, height etc and photo

  const { loading } = props;

  console.log(loading);

  return (
    <div>{loading && <img src={props.pic} alt="this is the image" />}</div>
  );
};
