import React from "react";

export default function PlayerData(props) {
  // console.log(props);
  return (
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
      {props.loading && (
        <>
          <div className="b-1-1">
            <button onClick={props.reset}>
              {props.stat.first_name} {props.stat.last_name}
            </button>
          </div>
        </>
      )}
      <div className="b-4">
        <div className="b-1-1">
          <button>Clear All</button>
        </div>
      </div>
    </div>
  );
}
