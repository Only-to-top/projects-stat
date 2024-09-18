const api = {
    // free rpc: https://public.blockpi.io/

    rpc: {
        Etherium: {
            url: "https://api.etherscan.io/api",
            scan: "https://etherscan.com/tx/",
            free_rpc: "https://ethereum.blockpi.network/v1/rpc/public",
            free_rpc_id: 1
        },
        Scroll: {
            url: "https://api.scrollscan.com/api",
            scan: "https://scrollscan.com/tx/",
            free_rpc: "https://scroll.blockpi.network/v1/rpc/public",
            free_rpc_id: 534352
        },
        Base: {
            url: "https://api.basescan.org/api",
            scan: "https://basescan.org/tx/",
            free_rpc: "https://base.blockpi.network/v1/rpc/public",
            free_rpc_id: 8453
        },
        Zora: {
            url: "https://7777777.rpc.thirdweb.com",
            // url: "https://7777777.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
            // https://zora.superscan.network/tx/
            scan: "https://explorer.zora.energy/",
            free_rpc: "https://zora.rpc.thirdweb.com",
            free_rpc_id: 7777777
        }
    },

    getTransactions: async (wallet, rpc_url, api_key) => {
        let response;

        response = await fetch(`${rpc_url}?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${api_key}`);

        if (response.ok) return await response.json();
    },

    getTransactionsInternal: async (wallet, rpc_url, api_key) => {
        let response;

        response = await fetch(`${rpc_url}?module=account&action=txlistinternal&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${api_key}`);

        if (response.ok) return await response.json();
    },

    getBalanceETH: async (wallet, rpc_url, api_key, symbol) => {
        const response = await fetch(rpc_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "jsonrpc": "2.0", "method": "eth_getBalance", "params": [wallet, "latest"], "id": 1 })
        });

        //response = await fetch(`${rpc_url}?module=account&action=balance&address=${wallet}&tag=latest&apikey=${api_key}`);


        if (!response.ok) throw new Error(`Ошибка по адресу ${rpc}, статус ошибки ${response.status}`);

        const response_json = await response.json();

        // const coin_count = (parseInt(response_json.result, 16) / 10 ** 18).toFixed(5); // Wei to ETH
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

    /*getGasPrice: async (rpc_name) => {
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
    },*/

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

