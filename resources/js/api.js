const api = {
    /*
     * free rpc: 
     * https://routescan.io/rpcs
     * https://thirdweb.com/chainlist
     * 
     * https://docs.etherscan.io/etherscan-v2
     */

    rpc: {
        Etherium: {
            url: "https://api.etherscan.io/api",
            scan: "https://etherscan.io/tx/",
            free_rpc: "https://ethereum.rpc.thirdweb.com",
            free_rpc_id: 1
        },
        Base: {
            url: "https://api.basescan.org/api",
            scan: "https://basescan.org/tx/",
            free_rpc: "https://base.rpc.thirdweb.com",
            free_rpc_id: 8453
        },
        Zora: {
            url: "https://7777777.rpc.thirdweb.com",
            scan: "https://explorer.zora.energy/",
            free_rpc: "https://zora.rpc.thirdweb.com",
            free_rpc_id: 7777777
        },
        Scroll: {
            url: "https://api.scrollscan.com/api",
            scan: "https://scrollscan.com/tx/",
            free_rpc: "https://scroll.rpc.thirdweb.com",
            free_rpc_id: 534352
        },
        Ink: {
            url: "https://explorer.inkonchain.com/api",
            scan: "https://explorer.inkonchain.com/",
            free_rpc: "https://ink.drpc.org",
            free_rpc_id: 57073
        },
        Unichain: {
            url: "https://api.uniscan.xyz/api",
            scan: "https://uniscan.xyz/tx/",
            free_rpc: "https://unichain.drpc.org",
            free_rpc_id: 1301
        },
        Monad: {
            url: "https://testnet-rpc.monad.xyz/api",
            scan: "https://testnet.monadexplorer.com/tx/",
            free_rpc: "https://monad-testnet.drpc.org",
            free_rpc_id: 10143
        },
    },

    /*getTransactionsCount: async (wallet, rpc_url) => {
        const response = await fetch(rpc_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "jsonrpc": "2.0", "method": "eth_getTransactionCount", "params": [wallet, "latest"], "id": 1 })
        });

        if (response.ok) return response.json();
    },*/

    getTransactions: async (wallet, rpc_url, api_key, project_name) => {
        let response;

        // https://routescan.io/rpcs || https://drpc.org/chainlist/
        if (project_name == 'Zora') {
            response = await fetch(`https://api.routescan.io/v2/network/mainnet/evm/${api.rpc[project_name].free_rpc_id}/etherscan/api?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=desc`);
        } else { // blockchain api
            response = await fetch(`${rpc_url}?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=desc` + (api_key.length ? `&apikey=${api_key}` : ''));
        }

        if (response.ok) return await response.json();
    },

    getTransactionsInternal: async (wallet, rpc_url, api_key, project_name) => {
        let response;

        // https://routescan.io/rpcs || https://drpc.org/chainlist/
        if (project_name == 'Zora' /*|| project_name == 'Ink'*/) {
            response = await fetch(`https://api.routescan.io/v2/network/mainnet/evm/${api.rpc[project_name].free_rpc_id}/etherscan/api?module=account&action=txlistinternal&address=${wallet}&startblock=0&endblock=99999999&sort=desc`);
        } else { // blockchain api
            response = await fetch(`${rpc_url}?module=account&action=txlistinternal&address=${wallet}&startblock=0&endblock=99999999&sort=desc` + (api_key.length ? `&apikey=${api_key}` : ''));
        }

        if (response.ok) return await response.json();
    },

    getBalanceETH: async (wallet, rpc_url, api_key, symbol) => {
        const response = await fetch(rpc_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "jsonrpc": "2.0", "method": "eth_getBalance", "params": [wallet, "latest"], "id": 1 })
        });

        if (!response.ok) throw new Error(`Ошибка по адресу ${rpc}, статус ошибки ${response.status}`);

        const response_json = await response.json();

        const coin_count = ethers.utils.formatEther(response_json.result); // Wei to ETH

        return app.ajaxGet('https://api.coinbase.com/v2/exchange-rates?currency=' + symbol)
            .then(response => {
                if (response && response.data && response.data.rates && response.data.rates.USD) {
                    const coin_price = parseFloat(response.data.rates.USDT);
                    const coin_balance_usd = (coin_price * coin_count).toFixed(2);

                    return { coin_count: Number(coin_count).toFixed(4), symbol: symbol, coin_balance_usd: coin_balance_usd };
                }
            })
            .catch(error => alert(error));
    },

    getBlockNumberByTimestamp: async (timestamp) => {
        const response = await fetch(`https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=YourApiKeyToken`);

        if (!response.ok) throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);

        return await response.json();
    },

    getBlockByNumber: async (block_number, api_key) => {
        const response = await fetch(`https://api.scrollscan.com/api?module=proxy&action=eth_getBlockByNumber&tag=${block_number}&boolean=true&apikey=${api_key}`);

        if (!response.ok) throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);

        return await response.json();
    },
}

addEventListener("DOMContentLoaded", () => {
    // ************ https://ethereum.org/ru/developers/docs/apis/json-rpc/ **************
});

