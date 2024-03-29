import { BigNumber, Contract } from "ethers";

export async function evaluateTransaction(
  contract: Contract | null,
  methodName: string,
  args: Array<string | number | BigNumber>
): Promise<any> {
try {
  const bcValues = await contract?.[methodName](...args)
  return bcValues
} catch (e) {
   console.log(e)
   return e
}
} 