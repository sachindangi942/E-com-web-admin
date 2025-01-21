const { GetCart_controler,
    RemoveCart_controler,
    AddToCard_controler,
    AddProduct_controler,
    GetProduct_controler,
    UpdateProductQuantity,
    DeleteProduct_controler,
    UpdateProducts_controler
} = require("../controlers/Product_controler");
const { check_token } = require("../Middleware/authMiddleware");
const { validate } = require("../Middleware/validationMiddleware");
const { AddToCardSchema, addProductSchema, DeleteProductSchema } = require("../validation/schema");

const Router = require("express").Router();


Router.post("/addProducts",check_token,validate(addProductSchema),AddProduct_controler);
Router.post("/getProducts",GetProduct_controler);
Router.post("/addToCard", validate(AddToCardSchema), AddToCard_controler);
Router.post("/deleteProduct",check_token,validate(DeleteProductSchema),DeleteProduct_controler)
Router.get("/cartData", GetCart_controler);
Router.post("/removecart", check_token, RemoveCart_controler);
Router.post("/updateProductQuantity",check_token,UpdateProductQuantity);
Router.post("/updateProducts",check_token,UpdateProducts_controler);

module.exports = Router;