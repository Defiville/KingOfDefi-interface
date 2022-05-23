import React, {
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Contract, ContractInterface, ethers } from "ethers";
import kingOfDefiV0Abi from "../../contracts/kingOfDefiV0.json";
import chainLinkHubAbi from "../../contracts/kingOfDefiV0.json";
import Erc20Abi from "../../contracts/erc20.json";

import {
  kingOfDefiV0Network,
  chainLinkHubNetwork,
  daiNetwork,
  usdcNetwork,
  usdtNetwork,
  islaNetwork,
} from "../../helpers/networks";
import { JsonRpcSigner } from "@ethersproject/providers";

export const useContractContext = () => {
  const contractContext = useContext(ContractContext);
  if (!contractContext) {
    throw new Error(
      "useContractContext() can only be used inside of <ContractContextProvider />, " +
        "please declare it at a higher level."
    );
  }
  const contractProvider = contractContext;
  return useMemo(() => {
    return { ...contractProvider };
  }, [contractContext]);
};

const ContractContext = React.createContext<ContractContextData>(null);

export const ContractContextProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  // if (typeof window !== "undefined") {
  const [usdt, setUsdt] = useState<UsableContract>({
    name: usdtNetwork.name,
    address: usdtNetwork.address,
    symbol: usdtNetwork.symbol,
    decimal: usdtNetwork.decimals,
    contract: null,
    logo: usdtNetwork.logoURI,
    abi: Erc20Abi,
    signer: null,
  });
  const [usdc, setUsdc] = useState<UsableContract>({
    name: usdcNetwork.name,
    address: usdcNetwork.address,
    symbol: usdcNetwork.symbol,
    decimal: usdcNetwork.decimals,
    contract: null,
    logo: usdcNetwork.logoURI,
    abi: Erc20Abi,
    signer: null,
  });
  const [dai, setDai] = useState<UsableContract>({
    name: daiNetwork.name,
    address: daiNetwork.address,
    symbol: daiNetwork.symbol,
    decimal: daiNetwork.decimals,
    contract: null,
    logo: daiNetwork.logoURI,
    abi: Erc20Abi,
    signer: null,
  });
  const [kingOfDefiV0, setKingOfDefiV0] = useState<UsableContract>({
    name: kingOfDefiV0Network.name,
    address: kingOfDefiV0Network.address,
    symbol: kingOfDefiV0Network.symbol,
    decimal: kingOfDefiV0Network.decimals,
    contract: null,
    logo: kingOfDefiV0Network.logoURI,
    abi: kingOfDefiV0Abi,
    signer: null,
  });
  const [chainLinkHub, setChainLinkHub] = useState<UsableContract>({
    name: chainLinkHubNetwork.name,
    address: chainLinkHubNetwork.address,
    symbol: chainLinkHubNetwork.symbol,
    decimal: chainLinkHubNetwork.decimals,
    contract: null,
    logo: chainLinkHubNetwork.logoURI,
    abi: chainLinkHubAbi,
    signer: null,
  });

  const [islaToken, setIslaToken] = useState<UsableContract>({
    name: islaNetwork.name,
    address: islaNetwork.address,
    symbol: islaNetwork.symbol,
    decimal: islaNetwork.decimals,
    contract: null,
    logo: islaNetwork.logoURI,
    abi: Erc20Abi,
    signer: null,
  });
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const usdcContract = new ethers.Contract(usdc.address, usdc.abi, provider);
    const usdtContract = new ethers.Contract(usdt.address, usdt.abi, provider);
    const daiContract = new ethers.Contract(dai.address, dai.abi, provider);
    const chainLinkHubContract = new ethers.Contract(
      chainLinkHub.address,
      chainLinkHub.abi,
      provider
    );
    const kingOfDefiV0Contract = new ethers.Contract(
      kingOfDefiV0.address,
      kingOfDefiV0.abi,
      provider
    );

    const islaContract = new ethers.Contract(
      islaToken.address,
      islaToken.abi,
      provider
    );
    setUsdc({ ...usdc, contract: usdcContract, signer: signer });
    setUsdt({ ...usdt, contract: usdtContract, signer: signer });
    setDai({ ...dai, contract: daiContract, signer: signer });
    setChainLinkHub({
      ...chainLinkHub,
      contract: chainLinkHubContract,
      signer: signer,
    });
    setKingOfDefiV0({
      ...kingOfDefiV0,
      contract: kingOfDefiV0Contract,
      signer: signer,
    });

    setIslaToken({
      ...islaToken,
      contract: islaContract,
      signer: signer,
    });
  }, []);

  const contractProvider = useMemo(
    () => ({
      chainLinkHub,
      usdc,
      usdt,
      dai,
      kingOfDefiV0,
      islaToken,
    }),
    [usdc, usdt, dai, chainLinkHub, kingOfDefiV0, islaToken]
  );
  return (
    <ContractContext.Provider
      value={{
        chainLinkHub: contractProvider.chainLinkHub,
        usdc: contractProvider.usdc,
        usdt: contractProvider.usdt,
        dai: contractProvider.dai,
        kingOfDefiV0: contractProvider.kingOfDefiV0,
        islaToken: contractProvider.islaToken,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
  // } else {
  //   //@ts-ignore
  //   return <ContractContext.Provider>{children}</ContractContext.Provider>;
  // }
};

type ContractContextData = {
  [key: string]: UsableContract;
} | null;

export type UsableContract = {
  name: string;
  symbol: string;
  logo: string;
  contract: Contract | null;
  abi: ContractInterface;
  address: string;
  decimal: number | null;
  signer: null | JsonRpcSigner;
};
