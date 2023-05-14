const { Configuration, OpenAIApi } = require("openai");
const path = require('path');
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  // apiKey: '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',
});
const openai = new OpenAIApi(configuration);


async function generate(userThoughtText) {
    console.log(userThoughtText)
    console.log("Entered openAi")
  const response = await openai.createImage({
    prompt: userThoughtText,
    n: 1,
    size: "256x256",
    // response_format: 'b64_json'
  });


  image_url = response.data.data[0].url;
  if (response)
  {return response.data.data[0].url}
  else {return "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fbd%2Fdf%2Fd6%2Fbddfd6e4434f42662b009295c9bab86e.gif&f=1&nofb=1&ipt=5af5127ded748da47f888cd44904664d0fed895654911f47cefd23f454970f9e&ipo=images"}

}

module.exports = {generate};


