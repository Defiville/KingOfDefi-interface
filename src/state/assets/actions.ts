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
export const appendAssetList = (asset, index) => (dispatch) => {
    dispatch({type: actions.ASSETLIST_APPEND_LOADING})
    if(asset.length > 18 && index){
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
            payload: asset
        })
    }else{
        dispatch({type: actions.ASSETLIST_APPEND_ERROR})
    }
}