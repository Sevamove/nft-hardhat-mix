// @ts-ignore
import { ethers } from "hardhat";
import { COLLECTIBLE } from "./config";
import { PATH, PINATA, MARKETPLACE } from "../utils/config";
import { dumpToJSON } from "../utils/helper";
import { storeFile, storeJSON } from "../utils/pinata";

export async function setContractURI() {
    // @ts-ignore
    const collectible = await ethers.getContract("Collectible");
    let contractURI = COLLECTIBLE.contractURI;

    console.log("Setting contract URI...");

    const contractUriExists =
        contractURI.startsWith("https://") || contractURI.startsWith("ipfs://")
            ? true
            : false;

    if (contractUriExists) {
        const setContractUriTx = await collectible.setContractURI(contractURI);
        await setContractUriTx.wait(1);
    } else {
        const contractMetadataPath = PATH.contractMetadata + "/collectible.json";

        if (MARKETPLACE.opensea.enabled) {
            const contractMetadata = MARKETPLACE.opensea.contractMetadata;

            if (PINATA.enabled) {
                contractMetadata.image = await storeFile(PATH.collectionLogo);
                dumpToJSON(contractMetadata, contractMetadataPath);
                contractURI = await storeJSON(contractMetadataPath);
            } else {
                contractMetadata.image = "ipfs://HASH/logo.png";
                dumpToJSON(contractMetadata, contractMetadataPath);
                contractURI = "ipfs://Q1234ABC";
            }
        }

        const setContractUriTx = await collectible.setContractURI(contractURI);
        await setContractUriTx.wait(1);
    }

    console.log("Set contract URI successfully.");
}
