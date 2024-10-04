const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const axios = require("axios");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function callTest() {
  // let driver;

  const url = "https://tbkx-core-be-sandbox.up.railway.app/user/connectBE";
  const token = "YWRtaW46NzNBRENBQTRGRTNDNUNCMzE2OTIxNjI1RjE3OUQ==";
  const telegram_id = "7135476953";
  const telegram_id1 = "6007747939";
  const userId = "d37b6c5f-b96c-4632-9a32-84dce3191ff3";
  const boostDataUrl =
    "https://tbkx-core-be-sandbox.up.railway.app/boost/boost-data";
  const preSaleUrl = "https://tbkx-core-be-sandbox.up.railway.app/boost/fake";
  const pocketUrl =
    "https://pocketbase-sandbox-6bd6.up.railway.app/api/admins/auth-with-password";

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

  // const signatureRandom ='ocNjkaYBIBhL9qzqgxjd9La8vP2LVPoufmxmIEvL6qQvV8vmeuWnZB64q5RVJJxt';
  
  
  const pocketFilterCollection = `https://pocketbase-sandbox-6bd6.up.railway.app/api/collections/tli6s8xff4hw88r/records?page=1&perPage=40&sort=-amount_principal&skipTotal=1&filter=hash_fee%20%3D%20%22${signatureRandom}%22&expand=&fields=`;
  // console.log(pocketFilterCollection);

  try {
    const response = await axios.post(
      url,
      { telegram_id: telegram_id },
      {
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const access_token = response.data.access_token;
    // console.log(access_token);

    // const response1 = await axios.post(url, { telegram_id: telegram_id1 }, {
    //   headers: {
    //     'Authorization': `Basic ${token}`,
    //     'Content-Type': 'application/json',
    //   }
    // });
    // const access_token1 = (response.data.access_token);
    // console.log(access_token1);
    const loginPocket = await axios.post(pocketUrl, {
      identity: "teknix@gmail.com",
      password: "teknix123456",
    });
    const tokenPocket = loginPocket.data.token;

    const preSale = await axios.post(preSaleUrl,
      {
        "JettonTransfer": {
          "contractAddress": "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
          "walletFrom": "EQDKXNR2xopctqwjKhN6AT9WqGdOK0XB2CveoTYEc4oMRVG7",
          "walletTo": "EQAvUOECK9bkx8Wfgu7cVJcN6WrvAl9SFlW9JLb9jTWB8nSg",
          "amount": 0.01
        },
        "feeNetwork": 0.008407052,
        "blockTime": 1726822698,
        "signature": `${signatureRandom}`,
        "type": "boost",
        "typeInternal": "j:false--u:bafac4df-51b7-4301-aa91-d5018fbacf61--t:boost--j:true--a:false--n:1e-8",
        "bocHash": "b21df0bde0b12eb82fd0a681b5f1490dc2827029e7fd3a9eec7ccf7321711449",
        "publicKey": "",
        "isJetton": "true",
        "userId": `${userId}`,
      },
      {

        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    // console.log('Pre-sale API:', preSale.data);


    await sleep(30000);

    const findTransacion = await axios.get(pocketFilterCollection, {
      headers: {
        Authorization: `Bearer ${tokenPocket}`,
        "Content-Type": "application/json",
      },
    });
    console.log(findTransacion.data.items);

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
