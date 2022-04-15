import { storeFile, storeJSON } from "./pinata";
import { dumpToJSON, loadFromJSON } from "./helper";
import { HASHLIPS, PATH, PINATA } from "./config";
import { CHAINS } from "../../helper-hardhat";
import { network } from "hardhat";
import {
    COLLECTION,
    SPREADSHEET,
    SINGLE_EDITION_COLLECTION,
} from "../collectible/config";
import { getNftSpreadsheetData } from "./spreadsheet";

export async function modifyMetadata(_tokenId: number) {
    const imagePath = HASHLIPS.enabled
        ? PATH.images + `/${_tokenId}.png`
        : PATH.images + `${SINGLE_EDITION_COLLECTION.filename}`;

    const metadataPath = PATH.tokenMetadata + `/${_tokenId}.json`;
    const tokenUriPath = PATH.tokenURIs + `/${_tokenId}.json`;

    let metadata = await loadFromJSON(metadataPath);
    let tokenURI = await loadFromJSON(tokenUriPath);

    console.log(`Medifying metadata of token ID: ${_tokenId} ...`);

    // Delete unnecessary keys made by hashlips engine.
    if (HASHLIPS.enabled) {
        try {
            delete metadata["dna"];
            delete metadata["date"];
            delete metadata["edition"];
            delete metadata["compiler"];
        } catch (err) {
            console.log(`--Error occured. Working further on token ID ${_tokenId}---`);
            console.log(err);
        }
    }

    /* Inserting spreadsheet data to the metadata. */
    if (SPREADSHEET.enabled) {
        const ssData /*: SpreadsheetData*/ = await getNftSpreadsheetData(
            PATH.spreadsheet,
            _tokenId
        );
        console.log(ssData);

        //metadata.name = ssData.NAME;
        //metadata.description = ssData.DESCRIPTION;
        //metadata.creator = ssData.CREATOR
        //metadata.artist = ssData.ARTIST

        if (HASHLIPS.enabled && !HASHLIPS.includeGeneratedMetadataAttributes) {
            metadata.attributes = [];
        }

        //for (let [key, value] of Object.entries(ssData)) {
        //    if (SPREADSHEET["traitTypes"].includes(key)) {
        //        value.forEach((v: string) => {
        //            metadata["attributes"].push({
        //                traitType: key,
        //                value: v.toUpperCase(),
        //            });
        //        });
        //    }
        //}
    } else {
        if (SINGLE_EDITION_COLLECTION.enabled) {
            metadata.name = COLLECTION.artwork.name;
            metadata.name = COLLECTION.artwork.description;
        } else {
            metadata.name = COLLECTION.artwork.name + ` #${_tokenId}`;
            metadata.description = COLLECTION.artwork.description;
        }

        metadata.creator = COLLECTION.artwork.creator;
        metadata.artist = COLLECTION.artwork.artist;
    }

    /* Inserting external link to the metadata. */
    if (COLLECTION.externalLink.enabled) {
        metadata.externalLink = _getNftExternalLink(_tokenId);
    }

    /* Inserting additional key/value to the metadata. */
    if (COLLECTION.artwork.additionalMetadata.enabled) {
        for (let [key, value] of Object.entries(
            COLLECTION.artwork.additionalMetadata.data
        )) {
            metadata[key] = value;
        }
    }

    if (PINATA.enabled && CHAINS.local.includes(network.name)) {
        //metadata["image"] = uploadToIpfs(imagePath)
        metadata["image"] = storeFile(imagePath);
        dumpToJSON(metadata, metadataPath);

        //tokenURI[_tokenId.toString()] = uploadToIpfs(metadataPath)
        tokenURI[_tokenId.toString()] = storeJSON(metadataPath);
        dumpToJSON(tokenURI, tokenUriPath);
    } else {
        metadata["image"] = `ipfs://YourImageUri/${_tokenId}.png`;
        dumpToJSON(metadata, metadataPath);

        tokenURI[_tokenId.toString()] = `ipfs://YourTokenUri/${_tokenId}.json`;
        dumpToJSON(tokenURI, tokenUriPath);
    }

    console.log(`Finished with token ID: ${_tokenId}`);

    //console.log(tokenURI);
    //console.log(tokenURI[_tokenId.toString()]);

    return tokenURI[_tokenId.toString()];
}

async function _getNftExternalLink(_tokenId: number) {
    if (COLLECTION.externalLink.includeTokenId) {
        return COLLECTION.externalLink.url + _tokenId.toString();
    }
    return COLLECTION.externalLink.url;
}

//export default modifyMetadata;
