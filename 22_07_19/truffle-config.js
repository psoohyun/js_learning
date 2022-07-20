const HDWalletProvider = require("truffle-hdwallet-provider-klaytn")

const NETWORK_ID = '1001'
const GASLIMIT = '8500000'

const URL = "https://api.baobab.klaytn.net:8651"
const PRIVATE_KEY = "0x93484adbb925d40925602f290e06b20ce99c703dddc116913dfd2364f6857b4b"

module.exports = {
  networks : {
    baobab : {
      provider : () => new HDWalletProvider(PRIVATE_KEY, URL),
      network_id : NETWORK_ID,
      gas : GASLIMIT,
      pasPrise : null,
      }
    }
}