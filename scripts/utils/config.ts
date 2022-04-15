import { network } from "hardhat";
import { CHAINS } from "../../helper-hardhat";
import { COLLECTIBLE, COLLECTION } from "../collectible/config";

//export const IPFS = { enabled: false };

export const PATH = {
    images: "./img",
    tokenMetadata: `./metadata/${network.name}/tokens`,
    hashlipsImages: `./hashlips_art_engine/build/images`,
    hashlipsMetadata: `./hashlips_art_engine/build/json`,
    tokenURIs: `./metadata/${network.name}/token_URIs`,
    contractMetadata: `./metadata/${network.name}/contract`,
    spreadsheet: "./metadata/nft-spreadsheet-data.xlsx",
    collectionLogo: "./metadata/logo.png",
};

export const PINATA = {
    enabled: false,
    apiKey: CHAINS.main.includes(network.name)
        ? process.env.PINATA_API_KEY_MAIN || ""
        : process.env.PINATA_API_KEY_TEST || "",
    apiSecret: CHAINS.main.includes(network.name)
        ? process.env.PINATA_API_SECRET_MAIN || ""
        : process.env.PINATA_API_SECRET_TEST || "",
};

export const MARKETPLACE = {
    opensea: {
        enabled: true,
        mainURL: "https://opensea.io/assets/",
        testURL: "https://testnets.opensea.io/assets/",
        contractMetadata: {
            name: COLLECTIBLE.name,
            description: COLLECTION.description,
            image: PATH.collectionLogo,
            external_link: COLLECTION.externalLink.baseURL,
            seller_fee_basis_points: COLLECTIBLE.royaltyReceiver,
        },
    },
};

export const HASHLIPS = {
    enabled: false,
    includeGeneratedMetadataAttributes: false,
};
