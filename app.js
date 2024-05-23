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


const PORT = 5000 || process.env.PORT;
app.get('/',(req,res) => {
    res.send("server is working well")
})

app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:5000");
})