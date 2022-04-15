// @ts-ignore
import { ethers } from "hardhat";
import { AMOUNT_TO_MINT, COLLECTIBLE } from "./collectible/config";
import { modifyMetadata } from "./utils/modify-metadata";
import { safeMint } from "./collectible/safe-mint";

async function main() {
    const collectible = await ethers.getContract("Collectible");
    let currentTokenId: number = await collectible.totalSupply();
    let tx: object;

    console.log(`Current amount NFTs minted: ${currentTokenId}`);

    while (currentTokenId < AMOUNT_TO_MINT) {
        console.log("========================================================");
        console.log("                           OK                           ");
        console.log("========================================================");

        //let upcomingTokenId: number = Number(currentTokenId) + 1;
        let upcomingTokenId: number = (await collectible.totalSupply()) + 1;

        const tokenURI: string = await modifyMetadata(upcomingTokenId);

        [currentTokenId, tx] = await safeMint(tokenURI);
    }

    console.log(`\n- Nice job! Now you can enjoy NFT ${COLLECTIBLE.name} collection!`);
    console.log(`- New total amount NFTs minted: ${currentTokenId}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
