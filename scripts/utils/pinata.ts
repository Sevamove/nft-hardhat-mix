import * as fs from "fs";
import pinataSDK from "@pinata/sdk";
import { PINATA } from "./config";
import { loadFromJSON } from "./helper";

const pinata = pinataSDK(PINATA.apiKey, PINATA.apiSecret);

/* Upload image of an NFT and return the URI. */
export async function storeFile(_filePath: string) {
    const readableStreamForFile = fs.createReadStream(_filePath);
    try {
        const response = await pinata.pinFileToIPFS(readableStreamForFile);
        return response.IpfsHash.toString();
    } catch (error) {
        console.log(error);
        return "";
    }
}

/* Upload JSON metadata and return the URI. */
export async function storeJSON(_filePath: string) {
    const metadata = await loadFromJSON(_filePath);

    try {
        const response = await pinata.pinJSONToIPFS(metadata);
        return response.IpfsHash.toString();
    } catch (error) {
        console.log(error);
        return "";
    }
}

//module.exports = { storeFile, storeJSON };
