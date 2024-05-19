const express = require("express")
const connectToMongoDB = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors")
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger'); 
const YAML = require('yamljs');
const docs = YAML.load('./docs.yaml');
const authRoute = require("./routes/authRoute");
const storeRoute = require("./routes/storeRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const clientsRoute = require("./routes/clientsRoute");
const app = express()
const path = require('path')
const fs = require('fs')
connectToMongoDB();
app.use(cors({
    origin: '*',
}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

app.use("/api/auth",authRoute);
app.use("/api/store",storeRoute);
app.use("/api/product",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/order",orderRoute);
app.use("/api/clients",clientsRoute);

app.get('/images/:name',async(req,res) => {
    const name = req.params;
    console.log(name)
    res.render('image.ejs',name)
})
app.get('/allimages', (req, res) => {
    const imagesDir = path.join(__dirname, 'public', 'images');
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        // Filter out non-image files if necessary
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.render('allImages.ejs', { images });
    });
});


const PORT = 5000 || process.env.PORT;
app.get('/',(req,res) => {
    res.send("server is working well")
})

app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:3000");
})