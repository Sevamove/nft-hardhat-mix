import "hardhat-deploy";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/types";
import { RpcUrl, Explorer, NetworkConfigMap } from "./models/models";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RPC_URL: RpcUrl = {
    mainnet: process.env.MAINNET_RPC_URL || "",
    rinkeby: process.env.RINKEBY_RPC_URL || "",
    kovan: process.env.KOVAN_RPC_URL || "",
    polygon: process.env.POLYGON_RPC_URL || "",
};

const PRIVATE_KEY = {
    main: process.env.PRIVATE_KEY_MAIN,
    test: process.env.PRIVATE_KEY_TEST,
};

const BLOCKCHAIN_EXPLORER: Explorer = {
    etherscan: process.env.ETHERSCAN_API_TOKEN || "",
    polygonscan: process.env.POLYGONSCAN_API_TOKEN || "",
};

const REPORT_GAS: boolean = Boolean(process.env.REPORT_GAS) || false;

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        kovan: {
            url: RPC_URL.kovan,
            accounts: PRIVATE_KEY.test !== undefined ? [PRIVATE_KEY.test] : [],
            saveDeployments: true,
            chainId: 42,
        },
        rinkeby: {
            url: RPC_URL.rinkeby,
            accounts: PRIVATE_KEY.test !== undefined ? [PRIVATE_KEY.test] : [],
            saveDeployments: true,
            chainId: 4,
        },
        mainnet: {
            url: RPC_URL.mainnet,
            accounts: PRIVATE_KEY.main !== undefined ? [PRIVATE_KEY.main] : [],
            saveDeployments: true,
            chainId: 1,
        },
        polygon: {
            url: RPC_URL.polygon,
            accounts: PRIVATE_KEY.main !== undefined ? [PRIVATE_KEY.main] : [],
            saveDeployments: true,
            chainId: 137,
        },
    },
    etherscan: {
        // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        // or just use a custom script
        apiKey: {
            mainnet: BLOCKCHAIN_EXPLORER.etherscan,
            rinkeby: BLOCKCHAIN_EXPLORER.etherscan,
            kovan: BLOCKCHAIN_EXPLORER.etherscan,
            polygon: BLOCKCHAIN_EXPLORER.polygonscan,
        },
    },
    gasReporter: {
        enabled: REPORT_GAS,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
    },
    solidity: "0.8.8",
    namedAccounts: {
        deployer: {
            default: 0,
        },
        beneficiary: {
            default: 1 || "0x",
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
};

export const networkConfig: NetworkConfigMap = {
    hardhat: {
        chainId: 31337,
        verify: false,
    },
    localhost: {
        chainId: 31337,
        verify: false,
    },
    mainnet: {
        chainId: 1,
        verify: false,
    },
    rinkeby: {
        chainId: 4,
        verify: false,
    },
    kovan: {
        chainId: 42,
        verify: false,
    },
    polygon: {
        chainId: 137,
        verify: false,
    },
};

export default config;
