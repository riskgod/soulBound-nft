import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const GOERLI_PRIVATE_KEY = '';

// npx hardhat run scripts/deploy.ts --network goerli

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/U6OMFmvzf0C7Kh8k7t4S-um14rBA_4nb`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};

export default config;
