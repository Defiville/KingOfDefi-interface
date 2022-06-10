import { type } from "os";
import * as actions from "./type";


//@ts-ignore
export const getAssetList = (assetList) => (dispatch) => {
    dispatch({type: actions.ASSET_LIST_LOADING})
    if(assetList){
        dispatch({
            type: actions.ASSET_LIST_SUCCESS,
            payload: assetList
        })
    }else{
        dispatch({type: actions.ASSET_LIST_ERROR})
    }
}


    //@ts-ignore
export const appendAssetList = (assets) => (dispatch) => {
    dispatch({type: actions.ASSETLIST_APPEND_LOADING})
    // if(assets.length > 19){
        // if(asset.index === 1){
        //     let newPayload = []
        // }
        // newPayload.push({
        //   ...asset,
        //     //@ts-ignore
        //   index: index,
        // });
        dispatch({
            type: actions.ASSETLIST_APPEND_SUCCESS,
            payload: assets
        })
    // }else{
    //     dispatch({type: actions.ASSETLIST_APPEND_ERROR})
    // }
}

    //@ts-ignore
export const clearAssets = () => (dispatch) => {
    dispatch({type: actions.ASSETLIST_CLEAR})
}

 //@ts-ignore
export const myUsdBalance = (usdBalance) => (dispatch) => {
    dispatch({
        type: actions.SET_USD_BALANCE,
        payload: usdBalance
    })
}

//@ts-ignore
export const getNumberWeek = (weekNumber: number) => (dispatch) => {
    dispatch({ type: actions.WEEK_LOADING})
    if(weekNumber){
        dispatch({
            type: actions.WEEK_SUCCESS,
            payload: weekNumber
        })
    }else{
        dispatch({type: actions.WEEK_ERROR})
    }
}

//@ts-ignore
export const getBalanceOfUser = (totalBalance: number) => (dispatch) => {
    dispatch({ type: actions.USD_LOADING})
    if(totalBalance){
        dispatch({
            type: actions.USD_SUCCESS,
            payload: totalBalance
        })
    }else{
        dispatch({type: actions.USD_ERROR})
    }
}
