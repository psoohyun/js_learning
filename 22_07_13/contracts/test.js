// smartcontract 배포(주소)
var address = "0xDC68A9E55275bF0c12ddfF6616954Eaa3e726b1E"

// smartcontract abi
var abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_no",
				"type": "string"
			}
		],
		"name": "a_sign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_no",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_content",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			}
		],
		"name": "add_contract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_no",
				"type": "string"
			}
		],
		"name": "b_sign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_no",
				"type": "string"
			}
		],
		"name": "view_contract",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

module.exports = {address, abi}