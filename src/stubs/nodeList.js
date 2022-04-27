import config from '../../config.js';
import urljoin from 'url-join';

let nodeList = [
    {
        type: "币安",
        nodes: [
            {
                name: "主网",
                key: "币安_主网",
                endpoint: "https://bsc-dataseed1.ninicoin.io",
                id: "56",
            },
            {
                name: "测试",
                key: "币安_测试",
                endpoint: "https://data-seed-prebsc-1-s1.binance.org:8545/",
                id: "97",
            }
        ]
    },
]

export default nodeList;