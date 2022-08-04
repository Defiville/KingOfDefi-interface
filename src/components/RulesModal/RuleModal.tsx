import React from "react";
import CustomModal from "../modal/Modal";

//@ts-ignore
const RuleModal = ({ show, handleClose }) => {
  return (
    <CustomModal show={show} handleClose={handleClose}>
      <form action="">
        <div className="head">
          <h3 style={{ textAlign: "center" }}>Rules</h3>
        </div>
        <div className="rules-explain">
          The kingdom will grant you 100000 v-usd at the beginning of your
          adventure.
        </div>
        <div className="rules-explain">
          <br />
          Each game will be divided into two periods:
        </div>
        <ul className="points-explain">
          <li>
            Wealth period: each player will have 6 days to tame as many
            islarinos as possible. This period will start every Thursday at 00
            UTC and during this period there will be a limitation of 2 minutes
            between each swap.
          </li>
          <br />
          <li>
            Fighting period: every Wednesday the contestants will have to prove
            their worth and claim the crown. During this period, swaps will be
            prohibited. Everyone will have access to the crown, but once it has
            been claimed, only those with the highest net worth will be able to
            steal it.
          </li>{" "}
          <br />
        </ul>
        <div className="rules-explain alert-info">
          The timer will show how much time is left before the crown is
          disputed at the end of which the King can redeem the prize.
          <br/>
          Everyone can top up the game prize and every ERC20 is supported.
        </div>
      </form>
    </CustomModal>
  );
};

export default RuleModal;
