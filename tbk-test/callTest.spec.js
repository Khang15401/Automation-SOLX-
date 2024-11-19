const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const axios = require("axios");
const fs = require('fs');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function callTest() {
  // let driver;

  const url = "https://tbkx-core-be-sandbox.up.railway.app/user/connectBE";
  const token = "YWRtaW46NzNBRENBQTRGRTNDNUNCMzE2OTIxNjI1RjE3OUQ==";
  const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI3MTM1NDc2OTUzIiwidHlwZSI6InRlbGVncmFtIiwidXNlcl9pZCI6ImFjN2U1ZmJhLTI2OTUtNDUzMS05YmFmLTJjYzk3MDRmNDc2YSIsImlhdCI6MTczMDM0NTgzMSwiZXhwIjoxNzMwMzQ5NDMxfQ.zMEfz_zdlU1KkZwTYFUQrZu-N3kUXvs-fsK-Frk4K48'
  const access_token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2MDA3NzQ3OTM5IiwidHlwZSI6InRlbGVncmFtIiwidXNlcl9pZCI6IjNhMDE0NjVmLTg2M2EtNDBhYS04OTc3LTdjNDUzZTY3NDcyNyIsImlhdCI6MTczMDM0Mzg5NCwiZXhwIjoxNzMwMzQ3NDk0fQ.Ar2hLdlyTs9MKYf7aCd9rcGtHTHV62sVAaL5qTjVb3w'

  const telegram_id = "6007747939";
  const telegram_id1 = "7135476953";

  // const userId = 'ac7e5fba-2695-4531-9baf-2cc9704f476a';
  // const userId1 = '3a01465f-863a-40aa-8977-7c453e674727';
  // const userId2 = '4af8519f-1f53-45e2-9f68-ecffb6baef82';
  const boostDataUrl =
    "https://tbkx-core-be-sandbox.up.railway.app/boost/boost-data";
  const preSaleUrl = "https://tbkx-core-be-sandbox.up.railway.app/boost/v2/claim-reward";
  const pocketUrl =
    "https://pocketbase-sandbox-6bd6.up.railway.app/api/admins/auth-with-password";
  const referralUrl = 'https://tbkx-core-be-sandbox.up.railway.app/affiliates/referral-data';

  // Random Signature
  function generateRandomSignature(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let signature = '';
    for (let i = 0; i < length; i++) {
      signature += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return signature;
  }
  const signatureRandom = generateRandomSignature(64);
  console.log("Random Signature:", signatureRandom);

  const bocHashRandom = generateRandomSignature(64);
  console.log("bocHash Signature:", bocHashRandom);


  // Function random blocktime
  function generateRandomBlockTime() {
    const currentTime = Math.floor(Date.now() / 1000);
  
    const fiveDaysInSeconds = 5 * 24 * 60 * 60;
    const startTime = currentTime - fiveDaysInSeconds;
  
    const randomBlockTime = Math.floor(
      Math.random() * (currentTime - startTime + 1) + startTime
    );
  
    return randomBlockTime;
  }
  
  const randomTime = generateRandomBlockTime();
  console.log("Random Block Time:", randomTime);
  

  const pocketFilterCollection = `https://pocketbase-sandbox-6bd6.up.railway.app/api/collections/tli6s8xff4hw88r/records?page=1&perPage=40&sort=-amount_principal&skipTotal=1&filter=hash_fee%20%3D%20%22${signatureRandom}%22&expand=&fields=`;
  // console.log(pocketFilterCollection);

  try {
    // const response = await axios.post(
    //   url,
    //   { telegram_id: telegram_id },
    //   {
    //     headers: {
    //       Authorization: `Basic ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const access_token = response.data.access_token;
    // console.log(access_token);

    // const response1 = await axios.post(url, { telegram_id: telegram_id1 }, {
    //   headers: {
    //     'Authorization': `Basic ${token}`,
    //     'Content-Type': 'application/json',
    //   }
    // });
    // const access_token1 = (response1.data.access_token);
    // console.log(access_token1);

    const getSaleGroup = await axios.get(referralUrl, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': "application/json",
      }
    });
    const Group_Sale_Now = getSaleGroup.data.result.data.group_sales;
    console.log('Group_Sale_Now: ', getSaleGroup.data.result.data.group_sales);



    const loginPocket = await axios.post(pocketUrl, {
      identity: "teknix@gmail.com",
      password: "teknix123456",
    });
    const tokenPocket = loginPocket.data.token;

    const preSale = await axios.post(preSaleUrl,
      {
        "TonTransferFee": {
          "walletFrom": "",
          "walletTo": "",
          "amount": 0,
          "type": ""
        },
        "TonTransfer": {},
        "JettonTransfer": {
          "walletFrom": "EQAOTN6K6uXoz3OW3w2ramezDuIDnGX7YNDuVKIqmfgj3V0M",
          "walletTo": "EQAvUOECK9bkx8Wfgu7cVJcN6WrvAl9SFlW9JLb9jTWB8nSg",
          "amount": 0.03,
          "comment": "3a01465f-863a-40aa-8977-7c453e674727",
          "contractAddress": "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs"
        },
        "TonTransferTemp": [],
        "JettonTransferTemp": [
          {
            "walletFrom": "EQAOTN6K6uXoz3OW3w2ramezDuIDnGX7YNDuVKIqmfgj3V0M",
            "walletTo": "EQAvUOECK9bkx8Wfgu7cVJcN6WrvAl9SFlW9JLb9jTWB8nSg",
            "amount": 0.03,
            "comment": "3a01465f-863a-40aa-8977-7c453e674727",
            "contractAddress": "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs"
          }
        ],
        "feeNetwork": 0.00712322,
        "blockTime": `${randomTime}`,
        "signature": `${signatureRandom}`,
        "type": "boost",
        "typeInternal": "3a01465f-863a-40aa-8977-7c453e674727",
        "bocHash": `${bocHashRandom}`,
        "publicKey": "",
        "isJetton": "true",
        "userId": "3a01465f-863a-40aa-8977-7c453e674727"
      },
      {

        headers: {
          'Authorization': `Bearer ${access_token1}`,
          'Content-Type': 'application/json',
        }
      }
    );

    // console.log('Pre-sale API:', preSale.data);


    await sleep(25000);

    const findTransacion = await axios.get(pocketFilterCollection, {
      headers: {
        Authorization: `Bearer ${tokenPocket}`,
        "Content-Type": "application/json",
      },
    });
      
    const itemsArray = findTransacion.data.items;
    fs.writeFileSync('resultApiAuto.json', JSON.stringify(itemsArray, null, 2), 'utf-8');
    console.log(itemsArray);

    const boostData = await axios.get(boostDataUrl, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      }
    });
    // console.log(boostData.data);

    await sleep(10000);
    const getSaleGroupAfter = await axios.get(referralUrl, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': "application/json",
      }
    });
    const Group_Sale_After = getSaleGroupAfter.data.result.data.group_sales;
    console.log('Group Sale Now: ', Group_Sale_Now);

    console.log('Group Sale After: ',Group_Sale_After);
    console.log("======================================================================");
  } catch (error) {
    console.error("Error occurred:", error);
  }
})();
