const { Builder, By, until } = require('selenium-webdriver');
const assert = require("assert");
const axios = require('axios');

(async function callTest() {
    let driver;

    const url = 'https://tbkx-core-be-sandbox.up.railway.app/user/connectBE';
    const token = 'YWRtaW46NzNBRENBQTRGRTNDNUNCMzE2OTIxNjI1RjE3OUQ==';
    const telegram_id = "7135476953";


    const boostDataUrl = 'https://tbkx-core-be-sandbox.up.railway.app/boost/boost-data';

    try {
        const response = await axios.post(url, { telegram_id: telegram_id }, {
            headers: {
                'Authorization': `Basic ${token}`,
                'Content-Type': 'application/json',
            }
        });
        const access_token = (response.data.access_token);
        // if (response.status === 201) {
        //     console.log('API Response:', response.data);
        // } else {
        //     console.log('Failed with status:', response.status);
        // }

        const boostData = await axios.get(boostDataUrl, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            }
        });
        console.log(boostData.data);
        
    } catch (error) {
        // In ra lỗi nếu có
        console.error("Error occurred:", error);
    }
})();
