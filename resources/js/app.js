const app = {

    ajaxSend: async (url, formData) => {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').getAttribute('content')
            }
        });
        if (!response.ok) { throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`); }
        return await response.json();
    },

    ajaxGet: async (url) => {
        const response = await fetch(url);
        if (!response.ok) { throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`); }
        return await response.json();
    },

    showLeftSidebar: (project_name, id_wallet, wallet, api_key) => {
        const activities_head = `
            <img src="/img/projects/${project_name}.png" alt="" class="show-project-image">
            ${project_name}
            #${id_wallet}: &nbsp;<b id="wallet_address">${wallet}</b>
        `;

        document.querySelector('.sidebar-content__title').innerHTML = activities_head;
        document.querySelector('.activities-table tbody').innerHTML = '';

        const ETHPrice = app
            .ajaxGet('https://api.coinbase.com/v2/exchange-rates?currency=ETH')
            .then(response => {
                if (response && response.data && response.data.rates && response.data.rates.USD) {
                    return parseFloat(response.data.rates.USDT);
                }
            })
            .catch(error => alert(error));

        const newController = new AbortController();
        const newSignal = newController.signal;

        api.getTransactions(api.rpc[project_name].id, wallet, api.rpc[project_name].api_key, project_name, newSignal).then(normal_tx => {
            api.getTransactionsInternal(api.rpc[project_name].id, wallet, api.rpc[project_name].api_key, project_name, newSignal).then(internal_tx => {
                const normal_tx_array = normal_tx.result;
                const internal_tx_array = internal_tx.result;
                const all_tx = [...normal_tx_array, ...internal_tx_array];

                if (all_tx.length == 0) {
                    alert('Нет транзакций!');
                    return;
                }

                document.querySelector(".sidebar").classList.add('show');

                let count_all_tx = all_tx.length;

                document.getElementById('wallet_address').insertAdjacentHTML("afterend", `&nbsp;(${count_all_tx})`);

                console.table(all_tx)
                console.log(all_tx)

                all_tx.sort(function (a, b) { return b.timeStamp - a.timeStamp });

                let num = 1;
                let volume = 0;
                let fee_finally = 0;

                all_tx.forEach((row, i) => {

                    // setTimeout(() => {
                        const date_tx = new Date(row.timeStamp * 1000).toLocaleString("ru-RU");
                        const days_ago = (new Date(new Date().getTime() - new Date(row.timeStamp * 1000).getTime()) / (1000 * 3600 * 24)).toFixed(0);

                        let method_name = '';
                        let fee = '';
                        let gwei = '';
                        let style = '';
                        let value = '';
                        let price = '';
                        let description = '';

                        ETHPrice
                            .then((eth_price) => {
                                if ('functionName' in row) { // normal
                                    style = `style="background-color: ${(row.isError == 1 ? '#ef7c7c' : '#00a15242')}"`;

                                    if (row.functionName.toLowerCase().search('swap') != -1) {
                                        method_name = 'Swap';
                                    } else if (row.functionName.toLowerCase().search('mint') != -1) {
                                        method_name = 'Mint';

                                        if (row.to == '0x74670a3998d9d6622e32d0847ff5977c37e0ec91') {
                                            description = 'Genesis NFT';
                                        } else if (row.to == '0xb3da098a7251a647892203e0c256b4398d131a54') { // base
                                            description = 'NFT "Mint A Penny"';
                                        } else if (row.to == '0x87a701770996b323560e332396b33839482e2641') { // base
                                            description = 'NFT "Jumper Loyalty Pass PFPs"';
                                        }
                                    } else if (row.functionName.toLowerCase().search('approve') != -1) {
                                        method_name = 'Approve';
                                    } else if (row.functionName.toLowerCase().search('purchase') != -1) {
                                        method_name = 'Buy NFT';
                                    } else if (row.functionName.toLowerCase().search('claim') != -1) {
                                        method_name = 'Claim';

                                        // Base
                                        if (row.to == '0x1d6b183bd47f914f9f1d3208edcf8befd7f84e63') {
                                            description = 'NFT "COIN Earnings"';
                                        } else if (row.to == '0xded6e72bde74c7840fade275c3afdb997be47bbf') {
                                            description = 'NFT "Coinbase Pizza Surprise NFT"';
                                        }
                                    } else if (row.functionName.toLowerCase().search('gasrefuel') != -1) {
                                        method_name = 'Gas Refuel';
                                    } else if (row.functionName.toLowerCase().search('vote') != -1) {
                                        method_name = 'Vote';
                                    } else if (row.functionName.toLowerCase().search('supply') != -1) {
                                        method_name = 'Supply';
                                    } else if (row.functionName.toLowerCase().search('deposit') != -1) {
                                        method_name = 'Deposit';

                                        if (row.to == '0x2f59e9086ec8130e21bd052065a9e6b2497bb102') {
                                            description = 'Rhino.fi: Bridge';
                                        }
                                    } else if (row.functionName.toLowerCase().search('redeem') != -1) {
                                        method_name = 'Redeem';
                                    } else if (row.functionName.toLowerCase().search('repay borrow') != -1) {
                                        method_name = 'Repay Borrow';
                                    } else if (row.functionName.toLowerCase().search('repay') != -1) {
                                        method_name = 'Repay';
                                    } else if (row.functionName.toLowerCase().search('borrow') != -1) {
                                        method_name = 'Borrow';
                                    } else if (row.functionName.toLowerCase().search('bridgegas') != -1) {
                                        method_name = 'Bridge Gas';
                                    } else if (row.functionName.toLowerCase().search('withdraw') != -1) {
                                        method_name = 'Withdraw';
                                    } else if (row.functionName.toLowerCase().search('transfer') != -1) {
                                        method_name = 'Transfer';
                                    } else if (row.functionName.toLowerCase().search('addliquidityeth') != -1) {
                                        method_name = 'Add liquidity ETH';

                                        if (row.to == '0x50b6ebc2103bfec165949cc946d739d5650d7ae4') {
                                            description = 'Stargate: Router ETH';
                                        }
                                    }

                                    if (row.methodId == '0x') {
                                        method_name = 'Transfer';
                                    } else if (row.to == '0x00000000000e1a99dddd5610111884278bdbda1d') {
                                        method_name = 'Clusters: Beta';
                                    } else if (row.methodId == '0x5b7d7482') {
                                        method_name = 'Send Mail';
                                    } else if (row.methodId == '0xb2267a7b') {
                                        method_name = 'Scroll off bridge';
                                    } else if (row.methodId == '0xeb672419') {
                                        method_name = 'ZkSync off bridge';
                                    } else if (row.methodId == '0xe9e05c42') {
                                        method_name = 'Base off bridge';
                                    }

                                    if (row.value != 0) {
                                        value = row.value / 10 ** 18; // Wei to ETH
                                        price = `($ ${(value * eth_price).toFixed(2)})`;
                                        volume += value;
                                        value = value.toFixed(5) + ' ETH';
                                    } else {
                                        value = '';
                                    }

                                    fee_in_eth = (row.gasUsed * row.gasPrice / 10 ** 18).toFixed(5);
                                    fee_finally += Number(fee_in_eth); // fee
                                    l2_price_in_usd = (fee_in_eth * eth_price).toFixed(2);

                                    fee = `${fee_in_eth} ($ ${l2_price_in_usd})`;

                                    gwei = `<span>${(row.gasPrice / 10 ** 9).toFixed(1)}</span>`;
                                }

                                // internal 
                                else {
                                    if (project_name == 'Scroll') {
                                        if (row.from == '0x87627c7e586441eef9ee3c28b66662e897513f33') {
                                            description = 'Rhino.fi: Bridge';
                                        } else if (row.from == '0x781e90f1c8fc4611c9b7497c3b47f99ef6969cbc') {
                                            description = 'Scroll: Deployer 3';
                                        } else if (row.from == '0x5300000000000000000000000000000000000004') {
                                            description = 'Scroll: WETH Token';
                                        } else if (row.from == '0xff75a4b698e3ec95e608ac0f22a03b8368e05f5d') {
                                            description = 'Aave: WETH Gateway V3';
                                        } else if (row.from == '0x274c3795dadfebf562932992bf241ae087e0a98c') {
                                            description = 'LayerBank ETH';
                                        }
                                    }

                                    if (project_name == 'Etherium') {
                                        if (row.from == '0x32400084c286cf3e17e7b677ea9583e60a000324') {
                                            description = 'From ZkSync off bridge';
                                        }
                                    }

                                    if (row.from == '0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7') {
                                        description = 'Layer3 CUBE';
                                    } else if (row.from == '0xcb566e3b6934fa77258d68ea18e931fa75e1aaaa') {
                                        description = 'LayerZero: Relayer';
                                    }

                                    if (row.value != 0) {
                                        value = row.value / 10 ** 18; // Wei to ETH
                                        price = `($ ${(value * eth_price).toFixed(2)})`;
                                        value = value.toFixed(5) + ' ETH';
                                    } else {
                                        value = '';
                                    }
                                }

                                const table_row = `<tr ${style}>
                                    <td>${num++}</td>
                                    <td><a href="${api.rpc[project_name].scan}${row.hash}" target="_blank">${date_tx} (${days_ago} d ago)</a></td>
                                    <td>${method_name}</td>
                                    <td>${description}</td>
                                    <td>${value} ${price}</td>
                                    <td><div style="display:flex;justify-content:space-between">${fee} ${gwei}</div></td>
                                </tr>`;

                                document.querySelector('.activities-table tbody').insertAdjacentHTML('beforeend', table_row);

                                if (all_tx.length - 1 == i) { // last row
                                    const volume_$ = (volume * eth_price).toFixed(2);
                                    const fee_finally_$ = (fee_finally * eth_price).toFixed(2);

                                    const last_tr = `
                                        <tr style="background-color: #FFF176; color: black; position: sticky; bottom: -20px;">
                                            <td colspan=4>volume</td>
                                            <td>${volume.toFixed(3)} ($ ${volume_$})</td>
                                            <td>${fee_finally} ($ ${fee_finally_$})</td>
                                        </tr>
                                    `;

                                    // document.querySelector('.sidebar-content__title').insertAdjacentHTML('afterend', volume_$);
                                    document.querySelector('.activities-table tbody').insertAdjacentHTML('beforeend', last_tr);
                                }

                                // document.querySelector('#aside_bottom').scrollIntoView({ behavior: 'smooth' });
                                // document.querySelector('.sidebar').scrollTo(0, document.querySelector('.sidebar').scrollHeight);
                            });

                    // }, i * 100);
                });
            });
        });

        document.body.addEventListener('click', function (event) {
            if (!event.target.closest('.sidebar') && document.querySelector('.sidebar')) {
                document.querySelector('.sidebar').classList.remove('show');

                // app.controller.abort();
                // newController.abort();

                // console.log(newController)
            }
        });
    },

    hideLeftSidebar: () => {
        document.querySelector('.sidebar').classList.remove('show');
    },

    isResizing: false,
    resizeSidebar: () => {
        const container = document.querySelector("body");
        const right = document.querySelector(".sidebar");

        document.onmouseup = () => app.isResizing = false;

        document.onmousemove = function (e) {
            if (app.isResizing) {
                const offsetRight = container.clientWidth - (e.clientX - container.offsetLeft);

                right.style.width = offsetRight + "px";
            }
        }
    },

    controller: new AbortController(),
}

addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll('table tbody tr').forEach((tr, i) => {
        let summ_result = 0;
        let summ_eth = 0;

        const index = () => {
            // setTimeout(() => {
            if (tr.hasAttribute('data-wallet') && tr.getAttribute('data-wallet') != '') {
                const wallet = tr.getAttribute('data-wallet');

                setTimeout(() => {
                    tr.querySelectorAll('td:not(:first-child)').forEach(td => {
                        const project = td.getAttribute('data-project');

                        if (project) {
                            api.getTransactions(api.rpc[project].id, wallet, api.rpc[project].api_key, project).then(normal_tx => {
                                api.getTransactionsInternal(api.rpc[project].id, wallet, api.rpc[project].api_key, project).then(internal_tx => {

                                    if ((normal_tx.result.length > 0 && normal_tx.status == 1) || (internal_tx.result.length > 0 && internal_tx.status == 1)) {
                                        let count_normal_tx = 0;
                                        let count_internal_tx = 0;
                                        let days_ago_html = '';

                                        if (normal_tx && normal_tx.status == 1) {
                                            count_normal_tx = normal_tx.result.length;
                                        }

                                        if (internal_tx && internal_tx.status == 1) {
                                            count_internal_tx = internal_tx.result.length;
                                        }

                                        const tx_all = count_normal_tx + count_internal_tx;

                                        if (tx_all > 0) {
                                            const last_tx_date = normal_tx.result.length > 0 ? new Date(normal_tx.result[0].timeStamp * 1000).toLocaleString("ru-RU", { year: "numeric", month: "2-digit", day: "2-digit" }) : '';

                                            let days_ago = '';

                                            if (normal_tx.result.length > 0) {
                                                days_ago = new Date(new Date().getTime() - new Date(normal_tx.result[0].timeStamp * 1000).getTime()) / (1000 * 3600); // hours

                                                if (days_ago >= 24) {
                                                    const days_ago_num = (days_ago / 24).toFixed(0);

                                                    days_ago = `(${days_ago_num} д.)`;

                                                    if (project == 'Etherium') {
                                                        if (days_ago_num > 24) {
                                                            days_ago_html = `<span style='color:tomato'>${days_ago}</span>`;
                                                        } else {
                                                            days_ago_html = `<span>${days_ago}</span>`;
                                                        }
                                                    } else {
                                                        if (days_ago_num > 5) {
                                                            days_ago_html = `<span style='color:tomato'>${days_ago}</span>`;
                                                        } else {
                                                            days_ago_html = `<span>${days_ago}</span>`;
                                                        }
                                                    }
                                                } else {
                                                    days_ago_html = `<span>(0 д. ${days_ago.toFixed(0)} ч.)</span>`;
                                                }
                                            }

                                            const html = `<div class="td_container"><div class="td_left">tx: ${tx_all} (${count_normal_tx} + ${count_internal_tx}) <br>last tx: ${last_tx_date} ${days_ago_html}</div></div>`;

                                            td.insertAdjacentHTML("beforeend", html);
                                        }
                                    }

                                    if (td.querySelector('.td_container')) {
                                        api.getBalanceETH(api.rpc[project].url, project, 'ETH', wallet).then(response => {
                                            td.querySelector('.td_container').insertAdjacentHTML("beforeend", `<div class="td_right" style="font-size:11px">${`${response.coin_count} ${response.symbol} <br>($ ${response.coin_balance_usd})`}</div>`);

                                            summ_result += Number(response.coin_balance_usd);
                                            summ_eth += Number(response.coin_count);

                                            tr.querySelector('.summ_result').innerHTML = `${summ_result.toFixed(2)} $ <br><span style="color:#a39b9b">${summ_eth.toFixed(3)} ETH</span>`;
                                        });
                                    }
                                });
                            });
                        }
                    });
                }, i * 450);
            }
            // }, i * 850);
        }

        index();

        // setInterval(() => index(), 600);
    });
});