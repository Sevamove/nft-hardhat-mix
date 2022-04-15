import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { setContractURI } from "../scripts/collectible/set-contract-uri";
import { copyImagesAndMetadata } from "../scripts/utils/copy-images-and-metadata";
import { COLLECTIBLE } from "../collectible-config";
import {
    BLOCK_CONFIRMATIONS_FOR_VERIFICATION,
    isVerifiableContract,
    verify,
} from "../helper-hardhat";

const deployCollectible: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    // @ts-ignore
    const { getNamedAccounts, deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const constructor = [
        COLLECTIBLE.name,
        COLLECTIBLE.symbol,
        COLLECTIBLE.contractURI,
        COLLECTIBLE.royaltyReceiver,
        COLLECTIBLE.royaltyFraction,
    ];
    const collectible = await deploy("Collectible", {
        from: deployer,
        args: constructor,
        log: true,
        waitConfirmations: BLOCK_CONFIRMATIONS_FOR_VERIFICATION,
    });

    if (await isVerifiableContract()) {
        await verify(collectible.address, constructor);
    }

    await copyImagesAndMetadata();
    await setContractURI();
};

export default deployCollectible;
