import Joi from "joi"
export const ChangePassword_val = (userData) => {
    const validation_schema = Joi.object({
        oldPassword: Joi.string().min(6).required().messages({
            "string.min": "Password must be at least 6 characters long",
            "any.required": "Password is required"
        }),
        newPassword: Joi.string().min(6).required().messages({
            "string.min": "Password must be at least 6 characters long",
            "any.required": "Password is required"
        }),
        confirmPassword: Joi.string().required().valid(Joi.ref("newPassword"))
            .messages({
                "any.only": "Confirm Password do not match",
                "any.required": "Confirm password is required",
            })
    });

    return validation_schema.validate(userData,{abortEarly:false});
}