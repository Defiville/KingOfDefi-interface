import { gql } from "@apollo/client";

export const GET_LEADERBOARD = gql`
    query GetGameweek($quantity: Int!, $week:Int!) {
      gameWeeks(first: $quantity, where:{id: $week}) {
        id
        players
        nrPlayers
        king
      }
    }
  `;