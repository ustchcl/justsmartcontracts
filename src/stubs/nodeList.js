import config from '../../config.js';
import urljoin from 'url-join';

let nodeList = [
    {
        type: "币安",
        nodes: [
            {
                name: "主网",
                key: "币安_主网",
                endpoint: "https://api.myetherapi.com/eth",
                id: "1",
            },
            {
                name: "测试",
                key: "币安_测试",
                endpoint: "https://api.myetherapi.com/rop",
                id: "3",
            }
        ]
    },
]

export default nodeList;