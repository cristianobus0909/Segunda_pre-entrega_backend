import { Router } from "express";
import productManager from "../classes/ProductManager.js";

const routerViews = Router();

routerViews.get('/', (req, res)=>{

    const products = productManager.getProducts()

    res.render('home',{products})
});
routerViews.get('/realtimeproducts', (req, res) => {
    
    const products = productManager.getProducts();

    res.render('realTimeProducts', { products });
});

export default routerViews;