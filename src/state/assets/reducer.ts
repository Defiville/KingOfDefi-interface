import * as actions from "./type";
import coin from "../../images/coin.svg" 

const initialState = {
    asset_loading: false,
    assets: [{
        index: 0,
        name: "USD",
        symbol: "USD",
        decimals: 6,
        logoURI: coin,
        myAssetBalance: 0,
      }]
}

//@ts-ignore
export const assetReducer = (state = initialState, action) => {
    switch (action.type) {
      case actions.ASSET_LIST_LOADING:
      case actions.ASSETLIST_APPEND_LOADING:
          return{
            ...state,
            asset_loading: true
          }
    case actions.ASSET_LIST_SUCCESS:
        return{
            ...state,
            asset_loading: false, 
            assets: action.payload
        }
    case actions.ASSET_LIST_ERROR:
    case actions.ASSETLIST_APPEND_ERROR:
        return{
            ...state,
            asset_loading: false
        }

    case actions.ASSETLIST_APPEND_SUCCESS:
        if (state.assets.filter(e => e.name === action.payload.name).length == 0) {
            return {
                ...state,
                asset_loading: false,
                assets: [...state.assets, action.payload]
            }
        }
        return {
            ...state,
            asset_loading: false,
        }

    case actions.ASSETLIST_CLEAR:
        return {
            ...state,
            assets: initialState.assets
        }

    case actions.SET_USD_BALANCE:
        const newState = state.assets.map(obj => {
            // 👇️ if name equals USD, update assets property
            if (obj.name === "USD") {
                return {...obj, myAssetBalance: action.payload};
            }
            // 👇️ otherwise return object as is
            return obj;
        });
        return {
            ...state,
            assets: newState
        }
    
    default:
        return state;
    }
}