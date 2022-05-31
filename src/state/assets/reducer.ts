import * as actions from "./type";
import coin from "../../images/coin.svg" 

const initialState = {
    asset_loading: false,
    assets: [{
        index: 0,
        name: "USD",
        decimals: 6,
        logoURI: coin,
      },]
}

//@ts-ignore
export const assetReducer = (state = initialState, action) => {
    switch (action.type) {
      case actions.ASSET_LIST_LOADING:
      case actions.ASSETLIST_APPEND_LOADING:
          return{
            asset_loading: true
          }
    case actions.ASSET_LIST_SUCCESS:
        return{
            asset_loading: false, 
            assets: action.payload
        }
    case actions.ASSET_LIST_ERROR:
    case actions.ASSETLIST_APPEND_ERROR:
        return{
            asset_loading: false
        }

    case actions.ASSETLIST_APPEND_SUCCESS:
        // console.log(action.payload)
        
        return {
            ...state,
            asset_loading: false,
            assets: action.payload
        }
    
    default:
        return state;
    }
}