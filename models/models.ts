/* ./hardhat.config.ts */

export type RpcUrl = {
    mainnet: string;
    rinkeby: string;
    kovan: string;
    polygon: string;
};

export type Explorer = {
    etherscan: string;
    polygonscan: string;
};

export type NetworkConfigItem = {
    chainId: number;
    verify: boolean;
};

export type NetworkConfigMap = {
    [network: string]: NetworkConfigItem;
};

/* ./helper-hardhat.ts */

export type BlockchainEnvironments = {
    local: string[];
    test: string[];
    main: string[];
};

/* ./scripts/collectible/config.ts */

export type CollectibleConstructor = {
    name: string;
    symbol: string;
    contractURI: string;
    royaltyReceiver: string;
    royaltyFraction: number;
};
