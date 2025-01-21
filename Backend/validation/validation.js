const joi = require("joi");

const add_product_val = ({ data }) => {
    const validation_schema = joi.object({
        code: joi.string().required().min(1),
        iteam: joi.string().required().min(2),
        price: joi.number().required().min(5),
        quantity: joi.number()
    });
    return validation_schema.validate(data);
};



const reset_password_val = ({ data }) => {
    const validation_schema = joi.object({
        password: joi.string().required().min(6)
    });
    return validation_schema.validate(data);
};


module.exports = {
    add_product_val,
    reset_password_val,
}