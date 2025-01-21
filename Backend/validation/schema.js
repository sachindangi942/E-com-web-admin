const Joi = require("joi");
const { UpdateProductQuantity } = require("../controlers/Product_controler");

exports.createUserSchema = Joi.object({
    Name: Joi.string().required().min(2),
    Email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

exports.registrationSchema = Joi.object({
    Name: Joi.string().required().min(2).max(15),
    Email: Joi.string().email().required(),
    Mobile: Joi.string().required().pattern(/^\+?[6-9][0-9]{9}$/).message({
        'string.pattern.base': 'Mobile number must be a valid 10-digit number',
        'any.required': 'Mobile number is required'
    }),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
        .messages({
            "any.only": "Passwords do not match",
            "any.required": "Confirm password is required",
        })
});

exports.loginSchema = Joi.object({
    Email: Joi.string().email().required(),
    password: Joi.string().required()
});

exports.ChangePasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required().min(6),
    confirmPassword: Joi.string().required().valid(Joi.ref("newPassword"))
});

exports.forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required()
});
exports.restetPasswordSchema = Joi.object({
    password: Joi.string().required().min(6)
});

exports.addProductSchema = Joi.object({
    name: Joi.string().required().min(1),
    description: Joi.string().required().min(10),
    price: Joi.number().required().min(5),
    image: Joi.string().required(),
    category:Joi.string().required(),
    quantity : Joi.number().required().min(1)
});

exports.delateUserSchema = Joi.object({
    user_id: Joi.string().required()
});

exports.AddToCardSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string(),
    id:Joi.string().required()


});
exports.DeleteProductSchema = Joi.object({
    name: Joi.string().required().min(1),
    description: Joi.string().required().min(10),
    price: Joi.number().required().min(5),
    image: Joi.string().required(),
    category:Joi.string().required(),
    _id:Joi.string().required()
});