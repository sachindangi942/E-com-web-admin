const Router = require("express").Router();

const { check_token } = require("../Middleware/authMiddleware");
const { registration_control,
    login_control,
    add_product_control,
    forgot_password_controler,
    reset_password_controler,
    fetch_product_controler,
    update_product_controler,
    delete_product_controler,
    change_password_controler,
    createUser_controler,
    deleteUser_controler,
    userList_controler,
} = require("../controlers/users_controler");

const { validate } = require("../Middleware/validationMiddleware");

const { createUserSchema,
    registrationSchema,
    loginSchema,
    forgotPasswordSchema,
    restetPasswordSchema,
    addProductSchema,
    delateUserSchema,
    ChangePasswordSchema,
} = require("../validation/schema");

Router.post("/registration", validate(registrationSchema), registration_control);
Router.post("/login", validate(loginSchema), login_control);
Router.post("/changePassword", check_token,validate(ChangePasswordSchema), change_password_controler);
Router.post("/forgotPassword", check_token, validate(forgotPasswordSchema), forgot_password_controler);
Router.post("/resetPassword", check_token, validate(restetPasswordSchema), reset_password_controler);
Router.post("/addProduct", check_token, validate(addProductSchema), add_product_control);
Router.get("/productList", check_token, fetch_product_controler);
Router.post("/updateProduct", check_token, update_product_controler);
Router.post("/deleteProduct", check_token, delete_product_controler);
Router.post("/createUser", check_token, validate(createUserSchema), createUser_controler);
Router.post("/deleteUser", check_token, validate(delateUserSchema), deleteUser_controler);
Router.get("/userList", check_token, userList_controler);

module.exports = Router;