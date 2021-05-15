const mailchimp = require("@mailchimp/mailchimp_marketing");

const LIST_ID = process.env.LIST_ID;

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: "us1",
});

const addSubscriber = async (email) => {
  try {
    const response = await mailchimp.lists.addListMember(LIST_ID, {
      email_address: email,
      status: "subscribed",
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addSubscriber,
};
