import express from "express"
import { Product } from "../models/product.model.js";

export const productRoute = express.Router();

productRoute.get("/get-product", async (req, res) => {
    try {
        const user = await Product.find({});

        res.json({ message: "Get Product", user })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error })
    }
});

productRoute.post("/create-product", async (req, res) => {
    try {

        const { title, price, context } = req.body;

        const user = await Product.create({
            title,
            price,
            context
        })
        res.json({ message: "Create Product", user })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error })
    }

});

productRoute.put("/put-product/:id", async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;


        const user = await Product.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        res.json({ message: "Update Product", user })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error })
    }
});

productRoute.delete("/delete-product/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const user = await Product.findByIdAndDelete(id);

        res.json({ message: "Deleted Product", user })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error })
    }
})