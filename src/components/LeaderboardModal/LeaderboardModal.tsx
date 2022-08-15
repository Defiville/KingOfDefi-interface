import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useContractContext } from "../../hooks/contract";
import { GET_LEADERBOARD } from "../../hooks/graphql/querries";
import CustomModal from "../modal/Modal";
import { getTotalUSD } from "../../helpers/swapRead";
import { decimalToExact } from "../../helpers/conversion";

//@ts-ignore
const LeaderboardModal = ({ show, handleClose }) => {
  const quantity = 999;

  const [gameweekData, setGameweekData] = useState({
    totalPlayers: 0,
    players: [],
    king: "",
  });
  //@ts-ignore
  const [playerData, setPlayerData] = useState<IData>({});
  const { kingOfDefiV0 } = useContractContext();
  // const dispatch = useDispatch();
  // const chainId = useChainId();
  // const transactionAdder = useTransactionAdder();
  // const address = useAddress();
  //@ts-ignore
  const { week } = useSelector((state) => state.swapAssets);

  const [getLeaderboard, { data }] = useLazyQuery(GET_LEADERBOARD, {
    variables: { quantity: quantity, week: week },
  });

  //@ts-ignore
  const leaderboardFetch = async (address) => {
    if (kingOfDefiV0 && kingOfDefiV0.contract && kingOfDefiV0.signer && week) {
      const signedContract = kingOfDefiV0.contract.connect(kingOfDefiV0.signer);
      if (signedContract) {
        // const leader = await getLeader(signedContract, week);
        checkUSDBalance(address, signedContract);
      }
    }
  };

  //@ts-ignore
  const checkUSDBalance = async (leader: string, signedContract: Contract) => {
    const leaderUSD = await getTotalUSD(signedContract, leader);
    const decimalLeaderUSD = decimalToExact(leaderUSD, 18);
    //@ts-ignore
    setPlayerData((prev) => ({
      ...prev,
      [leader]: decimalLeaderUSD,
    }));
  };

  useEffect(() => {
    gameweekData?.players?.map((item) => {
      //@ts-ignore
      leaderboardFetch(item);
    });
  }, [gameweekData?.players]);

  useEffect(() => {
    if (!week) return;
    getLeaderboard();
    if (data) {
      // const allPlayers = data.gameWeeks[0].players.map((item) => ({
      //   address: item,
      //   usd: 0,
      // }));
      //@ts-ignore
      setGameweekData({
        ...gameweekData,
        totalPlayers: data.gameWeeks[0]?.nrPlayers,
        players: data.gameWeeks[0]?.players,
        king: data.gameWeeks[0]?.king,
      });
    }
  }, [week, data]);

  return (
    <CustomModal
      show={show}
      handleClose={handleClose}
      class_name="first_modal second_modal"
    >
      <form action="">
        <div className="head">
          <h3 style={{ textAlign: "center" }}>Leaderboard</h3>
        </div>
        <div className="rules-explain">
          <h5>Total Players : {gameweekData?.totalPlayers}</h5>
          <div>
            <h5>Ranking:</h5>
            <ol className="points-explain">
              {Object.keys(playerData)?.length > 0 ? (
                Object.entries(playerData)
                  ?.sort(([, a], [, b]) => b - a)
                  ?.slice(0, 5)
                  ?.map((item) => (
                    <li className="ranking">
                      {item[0]} : ${item[1]}
                    </li>
                  ))
              ) : (
                <>No Players</>
              )}
            </ol>
          </div>
          {/* <div>
            <h5>
              King :{" "}
              {gameweekData?.king == "" ||
              gameweekData?.king == "0x0000000000000000000000000000000000000000"
                ? "TBD"
                : gameweekData?.king}
            </h5>
          </div> */}
        </div>
        <div className="rules-explain"></div>
      </form>
    </CustomModal>
  );
};

export default LeaderboardModal;

interface IData {
  [key: string]: number;
}
