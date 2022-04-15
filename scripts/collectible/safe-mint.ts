// @ts-ignore
import { ethers, getNamedAccounts } from "hardhat";

export async function safeMint(_tokenURI: string): Promise<[number, object]> {
    const { deployer } = await getNamedAccounts();
    const collectible = await ethers.getContract("Collectible");

    console.log("Minting new NFT by assigning new token ID and token URI ...");

    const txSafeMint = await collectible.safeMint(deployer, _tokenURI);
    await txSafeMint.wait(1);

    const tokenId = await collectible.totalSupply();

    console.log(
        `Minted NFT with the token ID of ${tokenId} and token URI of ${_tokenURI}`
    );

    return [tokenId, txSafeMint];
}

export default safeMint;
