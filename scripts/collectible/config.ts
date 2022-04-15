export const COLLECTIBLE = {
    name: "Super Art Collection",
    symbol: "SAC",
    contractURI: "",
    royaltyReceiver: "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
    royaltyFraction: 250, // e.g. 100 (1%); 1000 (10%)
};

export const SINGLE_EDITION_COLLECTION = {
    enabled: true,
    filename: "image_name.png",
};

export const AMOUNT_TO_MINT = SINGLE_EDITION_COLLECTION["enabled"] ? 1 : 10;

export const SPREADSHEET = {
    enabled: false,
    traitTypes: [
        "1st trait type (eg. Sport)",
        "2nd trait type (eg. Languages)",
        "3rd trait type (eg. Zodiac sign)",
    ],
};

export const COLLECTION = {
    description: "This collection represents ...",
    artwork: {
        name: SPREADSHEET["enabled"] ? null : "Name",
        description: SPREADSHEET["enabled"] ? null : "Description",
        creator: SPREADSHEET["enabled"] ? null : "Creator",
        artist: SPREADSHEET["enabled"] ? null : "Artist",
        additionalMetadata: {
            enabled: false,
            data: {
                extraKey1: "value",
                extraKey2: "value",
                // ...
            },
        },
    },
    externalLink: {
        enabled: false,
        baseURL: "https://yourwebsite.io",
        url: "https://yourwebsite.io/super-art-collection",
        includeTokenId: false,
    },
};
