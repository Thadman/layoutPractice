import React from "react";

export default function PlayerStats(props) {
  // this will be the player stats for the 2020 season

  // console.log(props);

  // need to go over data once, and not have all the divs like this.

  const { playerstats, loading } = props;

  console.log(playerstats, loading);

  return (
    <div className="c">
      <div className="c-1">
        <div className="playerMargin">
          <h5>James Harden</h5>
          <h6>Position: G | Team: BKN</h6>
        </div>
        {props.loading && (
          <>
            {Object.entries(playerstats).map(([key, value]) => {
              <div className="c-1-1">
                <div>
                  <h6>{key}</h6>
                  <h6>{value}</h6>
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
              </div>;
            })}
          </>
        )}
      </div>
      <div className="c-2"></div>
      <div className="c-3"></div>
    </div>
  );
}
