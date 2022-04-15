import { network, run } from "hardhat";
import { networkConfig } from "./hardhat.config";
import { BlockchainEnvironments } from "./models/models";

export const CHAINS: BlockchainEnvironments = {
    local: ["hardhat", "localhost"],
    test: ["rinkeby", "kovan", "mumbai"],
    main: ["mainnet", "polygon"],
};

export const BLOCK_CONFIRMATIONS_FOR_VERIFICATION: number = CHAINS["local"].includes(
    network.name
)
    ? 1
    : 6;

export const isVerifiableContract = async function (): Promise<boolean> {
    return networkConfig[network.name].verify;
};

export const verify = async (contractAddress: string, args: any[]) => {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!");
        } else {
            console.log(e);
        }
    }
};
