import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { productRoute } from "./src/routes/product.route.js";
import { dataBase } from "./src/config/db.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use(express.json());
app.use(productRoute)

app.get("/", (req, res) => {
    res.send("Hello World")
})
dataBase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Connected On Port ${PORT}`);
    })
}).catch((err) => {
    console.log(`Error Server`, err.message);

})