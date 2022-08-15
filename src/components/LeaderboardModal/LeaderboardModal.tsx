import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GET_LEADERBOARD } from "../../hooks/graphql/querries";
import CustomModal from "../modal/Modal";

//@ts-ignore
const LeaderboardModal = ({ show, handleClose }) => {
  const quantity = 999;

  const [gameweekData, setGameweekData] = useState({
    totalPlayers: 0,
    players: [],
    king: "",
  });
  //@ts-ignore
  const { week } = useSelector((state) => state.swapAssets);

  const [getLeaderboard, { data }] = useLazyQuery(GET_LEADERBOARD, {
    variables: { quantity: quantity, week: week },
  });

  useEffect(() => {
    if (!week) return;
    getLeaderboard();
    if (data) {
      console.log(data);
      setGameweekData({
        ...gameweekData,
        totalPlayers: data.gameWeeks[0]?.nrPlayers,
        players: data.gameWeeks[0]?.players,
        king: data.gameWeeks[0]?.king,
      });
    }
  }, [week, data]);
  console.log(gameweekData);

  return (
    <CustomModal show={show} handleClose={handleClose}>
      <form action="">
        <div className="head">
          <h3 style={{ textAlign: "center" }}>Leaderboard</h3>
        </div>
        <div className="rules-explain">
          <h5>Total Players : {gameweekData?.totalPlayers}</h5>
          <div>
            <h5>Players</h5>
            <ul className="points-explain">
              {gameweekData?.players?.length > 0 ? (
                gameweekData?.players.map((item) => <li>{item}</li>)
              ) : (
                <>No Players</>
              )}
            </ul>
          </div>
          <div>
            <h5>
              King :{" "}
              {gameweekData?.king == "" ||
              gameweekData?.king == "0x0000000000000000000000000000000000000000"
                ? "TBD"
                : gameweekData?.king}
            </h5>
          </div>
        </div>
        <div className="rules-explain"></div>
      </form>
    </CustomModal>
  );
};

export default LeaderboardModal;
