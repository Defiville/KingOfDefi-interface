import oneinch from '../images/1inch.png'
import aave from '../images/aave.png'
import ada from '../images/ada.png'
import alcx from '../images/alcx.png'
import algo from '../images/algo.png'
import badger from '../images/badger.png'
import balancer from '../images/balancer.png'
import bnb from '../images/bnb.png'
import comp from '../images/comp.png'
import crv from '../images/crv.png'
import doge from '../images/doge.png'
import dot from '../images/dot.png'
import eth from '../images/eth.png'
import ftm from '../images/ftm.png'
import fxs from '../images/fxs.png'
import ghst from '../images/ghst.png'
import link from '../images/link.png'
import matic from '../images/matic.png'
import wbtc from '../images/wbtc.png'







export type SwapTokenDefinition = {
    name: string
    symbol: string,
    decimals: number,
    logoURI: string,
  }
  export type SwapTokenDefinitionCollection = {
    [key: string]: SwapTokenDefinition;
  }

  
export const allTokens:SwapTokenDefinitionCollection = {
    "1INCH":{
        name: "1INCH",
        symbol: "1INCH",
        decimals: 18,
        logoURI: oneinch
    },
    "AAVE":{
        name: "AAVE",
        symbol: "AAVE",
        decimals: 18,
        logoURI: aave
    },
    "ADA":{
        name: "ADA",
        symbol: "ADA",
        decimals: 18,
        logoURI: ada
    },
    "ALCX":{
        name: "ALCX",
        symbol: "ALCX",
        decimals: 18,
        logoURI:alcx
    },
    "LINK":{
        name: "LINK",
        symbol: "LINK",
        decimals: 18,
        logoURI:alcx
    },
    "ALGO":{
        name: "ALGO",
        symbol: "ALGO",
        decimals: 18,
        logoURI:algo
    },
    "BADGER":{
        name: "BADGER",
        symbol: "BADGER",
        decimals: 18,
        logoURI: badger
    },
    "BAL":{
        name: "BAL",
        symbol: "BAL",
        decimals: 18,
        logoURI: balancer
    },
    "BTC":{
        name: "BTC",
        symbol: "BTC",
        decimals: 18,
        logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    },
    "BNB":{
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
        logoURI: bnb
    },
    "COMP":{
        name: "COMP",
        symbol: "COMP",
        decimals: 18,
        logoURI: comp
    },
    "CRV":{
        name: "CRV",
        symbol: "CRV",
        decimals: 18,
        logoURI: crv
    },
    "DOGE":{
        name: "DOGE",
        symbol: "DOGE",
        decimals: 18,
        logoURI: doge
    },
    "DOT":{
        name: "DOT",
        symbol: "DOT",
        decimals: 18,
        logoURI: dot
    },
    "ETH":{
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
        logoURI: eth
    },
    "FTM":{
        name: "FTM",
        symbol: "FTM",
        decimals: 18,
        logoURI: ftm
    },
    "FXS":{
        name: "FXS",
        symbol: "FXS",
        decimals: 18,
        logoURI: fxs
    },
    "GHST":{
        name: "GHST",
        symbol: "GHST",
        decimals: 18,
        logoURI: ghst
    },
    "WBTC":{
        name: "WBTC",
        symbol: "WBTC",
        decimals: 18,
        logoURI: wbtc
    },
    "MATIC":{
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
        logoURI: matic
    },
}
