const { Configuration, OpenAIApi } = require("openai");
const path = require('path');
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
// const AWS = require('aws-sdk');
// const axios = require('axios');

require('dotenv').config()
// const app = express();

// app.use('/', express.static(__dirname + '/public'));


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/index.html'));
// });

// Endpoint to return our own locally stored data
// app.get('/api', async (req, res) => {
//   console.log('API Request received')
//   const result = await generate()
//   res.send(result)
// }
// );

// app.listen(3002, () => console.log('Express Server on port 3002!'));

// const s3 = new AWS.S3({
//   accessKeyId: process.env.S3_ACCESS_KEY,
//   secretAccessKey: process.env.S3_ACCESS_SECRET,
//   region: 'ap-southeast-2'
// });

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
  // console.log(response.data.data[0].url)

//   const file = fs.createWriteStream(path.join(__dirname, `/public/images/${Math.floor(Math.random()*100000)}.jpg`));
//   const request = https.get(`${image_url}`, function(response) {
//     response.pipe(file);

//     // after download completed close filestream
//     file.on("finish", () => {
//         file.close();
//         console.log("Download Completed");
//     });
//   });
  // axios.get(response.data.data[0].b64_json)
  //   .then(response1 => {
  //     console.log(response1)
  //     const imageData = response1.data;
  //     const params = {
  //       Bucket: 'thoughtbook',
  //       Key: 'image-file-name2222.txt',
  //       Body: imageData
  //     };
  //     s3.upload(params, (err, data) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(`Image uploaded to S3 at ${data.Location}`);
  //         // save the S3 URL to your database or a file
  //       }
  //     });
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  if (response)
  {return response.data.data[0].url}
  else {return "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fbd%2Fdf%2Fd6%2Fbddfd6e4434f42662b009295c9bab86e.gif&f=1&nofb=1&ipt=5af5127ded748da47f888cd44904664d0fed895654911f47cefd23f454970f9e&ipo=images"}

}

module.exports = {generate};


