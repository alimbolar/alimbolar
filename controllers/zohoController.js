const dotenv = require("dotenv").config();
const axios = require("axios");
// dotenv.config({ path: `${__dirname}/.env` });

const zohoController = {};

const crmToken = {};
const creatorToken = {};

const zohoCrmApiUrl = process.env.ZOHO_API_URL.replace(
  "{%REFRESH_TOKEN%}",
  process.env.ZOHO_REFRESH_TOKEN_FOR_CRM
)
  .replace("{%CLIENT_ID%}", process.env.ZOHO_CLIENT_ID)
  .replace("{%CLIENT_SECRET%}", process.env.ZOHO_CLIENT_SECRET);

const zohoCreatorApiUrl = process.env.ZOHO_API_URL.replace(
  "{%REFRESH_TOKEN%}",
  process.env.ZOHO_REFRESH_TOKEN_FOR_CREATOR
)
  .replace("{%CLIENT_ID%}", process.env.ZOHO_CLIENT_ID)
  .replace("{%CLIENT_SECRET%}", process.env.ZOHO_CLIENT_SECRET);

zohoController.getAccessTokenForCrm = async function () {
  if (crmToken && crmToken.expirationDate > Date.now()) {
    // console.log("old Token Expiration", new Date(crmToken.expirationDate));
    // console.log("now", new Date(Date.now()));
    console.log("oldToken", crmToken);
    return crmToken;
  }

  try {
    const { data } = await axios.post(zohoCrmApiUrl, null, {
      method: "POST",
      Authorisation: "Bearer " + process.env.ZOHO_REFRESH_TOKEN_FOR_CRM,
    });

    crmToken.token = data.access_token;
    crmToken.expirationDate = Date.now() + data.expires_in * 1000 - 60 * 1000;

    // console.log("new Token Expiration", new Date(crmToken.expirationDate));
    // console.log("now", new Date(Date.now()));
    console.log("new Token", crmToken);
    return crmToken;
  } catch (error) {
    console.log(error);
  }
};

zohoController.getAccessTokenForCreator = async function () {
  if (creatorToken && creatorToken.expirationDate > Date.now()) {
    // console.log("old Token Expiration", new Date(crmToken.expirationDate));
    // console.log("now", new Date(Date.now()));
    console.log("oldToken", creatorToken);
    return creatorToken;
  }

  try {
    const { data } = await axios.post(zohoCreatorApiUrl, null, {
      method: "POST",
      Authorisation: "Bearer " + process.env.ZOHO_REFRESH_TOKEN_FOR_CREATOR,
    });

    creatorToken.token = data.access_token;
    creatorToken.expirationDate =
      Date.now() + data.expires_in * 1000 - 60 * 1000;

    // console.log("new Token Expiration", new Date(crmToken.expirationDate));
    // console.log("now", new Date(Date.now()));
    console.log("new Token", creatorToken);
    return creatorToken;
  } catch (error) {
    console.log(error);
  }
};

module.exports = zohoController;
