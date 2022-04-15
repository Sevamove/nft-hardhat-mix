// @ts-ignore
import { ethers, network } from "hardhat";
import { CHAINS } from "../../helper-hardhat";
import { loadFromJSON } from "../utils/helper";
import { PATH, MARKETPLACE } from "../utils/config";

export async function setTokenURI(_tokenId: number): Promise<boolean> {
    console.log(`Working on ${network.name}`);
    const collectible = await ethers.getContract("Collectible");

    let tokenURI: string = await collectible.tokenURI(_tokenId);
    if (!tokenURI.startsWith("ipfs://")) {
        console.log(`Setting token URI to token ID ${_tokenId}`);

        const tokenUriPath = PATH["tokenURIs"] + `/${_tokenId}.json`;
        tokenURI = await loadFromJSON(tokenUriPath);

        const txSetTokenURI = await collectible.setTokenURI(_tokenId, tokenURI);
        await txSetTokenURI.wait(1);

        console.log(`Set token URI to token ID: ${_tokenId}`);
        await _showMsg(collectible.address, _tokenId);

        return true;
    } else {
        console.log("Failed to set token URI. Seems it's already exist.");
        return false;
    }
}

async function _showMsg(_collectible: string, _tokenId: number) {
    const msg = "Awesome! You can view your NFT at";

    if (MARKETPLACE.opensea.enabled) {
        if (!CHAINS.main.includes(network.name)) {
            console.log(
                msg,
                `${MARKETPLACE.opensea.testURL}${_collectible}${_tokenId}`
            );
        } else {
            console.log(
                msg,
                `${MARKETPLACE.opensea.mainURL}${_collectible}${_tokenId}`
            );
        }
    }

    console.log("Please wait up to 20 minutes, and hit the refresh metadata button");
}
