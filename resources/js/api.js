const api = {

    rpc: {
        // Etherium: "https://ethereum.blockpi.network/v1/rpc/public",

        Etherium: {
            url: "https://ethereum.blockpi.network/v1/rpc/public",
            api_key: "",
            id: 1,
            scan: "https://etherscan.com/tx/"
        },
        L0: {
            url: "",
            api_key: "",
            id: 0,
            scan: ""
        },
        Scroll: {
            url: "https://scroll.blockpi.network/v1/rpc/public",
            api_key: "",
            id: 534352,
            scan: "https://scrollscan.com/tx/"
        },
        ZkSync: {
            url: "https://zksync-era.blockpi.network/v1/rpc/public",
            api_key: "",
            id: 324,
            scan: "https://explorer.zksync.io/tx/"
        },
        Base: {
            url: "https://base.blockpi.network/v1/rpc/public",
            api_key: "",
            id: 8453,
            scan: "https://basescan.org/tx/"
        },
        Zora: {
            url: "https://zora.rpc.thirdweb.com",
            api_key: "",
            id: 7777777,
            scan: "https://zora.superscan.network/tx/"
        }
    },

    getBalanceETH: async (rpc, blockChainName, symbol, address) => {
        const response = await fetch(rpc, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "method": "eth_getBalance",
                "params": [address, "latest"],
                "id": 1
            })
        });

        if (!response.ok) throw new Error(`Ошибка по адресу ${rpc}, статус ошибки ${response.status}`);

        const response_json = await response.json();

        const coin_count = (parseInt(response_json.result, 16) / 10 ** 18).toFixed(5); // Wei to ETH

        return app.ajaxGet('https://api.coinbase.com/v2/exchange-rates?currency=' + symbol)
            .then(response => {
                if (response && response.data && response.data.rates && response.data.rates.USD) {
                    const coin_price = parseFloat(response.data.rates.USDT);
                    const coin_balance_usd = (coin_price * coin_count).toFixed(2);

                    // console.log(`${blockChainName}: ${coin_count} ${symbol} ($ ${coin_balance_usd})`)

                    return { coin_count: coin_count, symbol: symbol, coin_balance_usd: coin_balance_usd };

                    return `${coin_count} ${symbol} ($ ${coin_balance_usd})`;
                }
            })
            .catch(error => alert(error));
    },

    getGasPrice: async (rpc_name) => {
        const response = await fetch(api.rpc[rpc_name], {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "method": "eth_gasPrice",
                "params": [],
                "id": 1
            })
        });

        if (!response.ok) throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);

        const response_json = await response.json();

        const gwei = (parseInt(response_json.result, 16) / 10 ** 9).toFixed(2); // Wei to Gwei

        return gwei;
    },

    getTransactions: async (rpc_id, wallet, api_key, project_name, signal = app.controller.signal) => {
        let response;
        // const signal = app.controller.signal;

        if (project_name == 'L0') {
            return {};
        } else if (project_name == 'Scroll') {
            response = await fetch(`https://api.scrollscan.com/api?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${api_key}`, { signal });

            // response = await fetch(`${api.rpc[project_name].url}?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${api_key}`);

            if (response.ok) return await response.json();
        } else { // evm
            response = await fetch(`https://api.routescan.io/v2/network/mainnet/evm/${rpc_id}/etherscan/api?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=desc`, { signal });
            // &apikey=${api_key}

            if (response.ok) return await response.json();
        }
    },

    getTransactionsInternal: async (rpc_id, wallet, api_key, project_name, signal = app.controller.signal) => {
        let response;
        // const signal = app.controller.signal;

        if (project_name == 'L0') {
            return null;
        } else if (project_name == 'Scroll') {
            response = await fetch(`https://api.scrollscan.com/api?module=account&action=txlistinternal&address=${wallet}&startblock=0&endblock=99999999&apikey=${api_key}`, { signal });

            if (response.ok) return await response.json();
        } else { // evm
            response = await fetch(`https://api.routescan.io/v2/network/mainnet/evm/${rpc_id}/etherscan/api?module=account&action=txlistinternal&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${api_key}`, { signal });

            if (response.ok) return await response.json();
        }
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

    // getLogs: async (block_number) => {
    //     const response = await fetch(api.rpc['Etherium'], {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             "jsonrpc": "2.0",
    //             "method": "eth_getLogs",
    //             "params": [{
    //                 "fromBlock": block_number,
    //                 "toBlock": block_number
    //             }],
    //             "id": 0
    //         })
    //     });

    //     if (!response.ok) throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);

    //     const response_json = await response.json();

    //     const gwei = (parseInt(response_json.result, 16) / 10 ** 9).toFixed(2); // Wei to Gwei

    //     return gwei;
    // },



}

addEventListener("DOMContentLoaded", () => {
    // ************ https://ethereum.org/ru/developers/docs/apis/json-rpc/ **************
});

