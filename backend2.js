const mongoose = require('mongoose');
const fs = require('fs');
const url = 'mongodb://localhost:27017/images'; // MongoDB 服务器的连接字符串
const express = require('express');
const axios = require("axios");
const cors = require('cors');

conn = mongoose.connect(url)
const Image = mongoose.model('image', { creator: String, file: String });

const stable_diffusion_machine_api = "http://100.76.16.85:7860/sdapi/v1/txt2img"
const app = express();

app.use(cors());
app.get('/', async (req, res) => {
    let html = fs.readFileSync('./index.html');
    res.setHeader("Content-Type", "text/html");
    res.end(html);
})
app.get('/generate', async (req, res) => {
    console.log("Processing Prompt + " + req.query.prompt)

    data = { prompt: req.query.prompt, width: req.query.width, height: req.query.height, steps: req.query.steps }
    axios.post(stable_diffusion_machine_api, data)
        .then(response => {

            const base64Image = response.data.images[0]

            // mongodb part
            const image = new Image({ creator: req.query.user, file: base64Image });
            image.save().then(() => console.log('Saved Image')).catch(err => console.log(err));

            // return the image to user on the frontend part. 
            const imageBuffer = Buffer.from(base64Image, "base64")

            const filename = Math.random().toString(36).substring(2, 15) + ".png"
            // fs.writeFileSync("generated_images/" + filename, imageBuffer)
            res.set('Content-Type', 'image/png')
            res.send(imageBuffer)
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error occurred while fetching image');
        });


});

app.get('/images', (req, res) => {
    Image.find({})
        .then(images => {
            let count = 0
            let html = '<html lang = "en" > <head><link rel="stylesheet" href="css/base.css"><link rel="stylesheet" href="css/account.css"> </head> <body> <div class="shortcut"><div><h1>Cabinchic</h1><div class="nav"><ul><li><a href="index.html">Home</a></li><li><a href="picture.html">Picture</a></li><li>< a href = "function.html" > Function</></li ><li><a href="account.html">Account</a></li></ul ></div> </div></div ><div class="function-section"><h2>Account</h2><table class="table"><tbody><table class="table"> <tbody> <tr>'
            images.forEach(image => {
                count++;
                html += `<td><img src="data:image/png;charset=utf-8;base64,${image.file}" alt="${image.name} by ${image.creator}" style="width:200px;height:200px;"/></td>`;
                if (count % 3 === 0) {
                    html += '</tr ><tr>'
                }
            });
            html += '</tr><table></html>'
            res.send(html);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('An error occurred while retrieving images.');
        });
});

app.listen(9000, () => {
    console.log('Server is running on port 9000');
});