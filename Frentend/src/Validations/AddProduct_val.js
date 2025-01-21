import Joi from "joi"

const AddProduct_val =({data})=>{
const validation_schema = Joi.object({
    name:Joi.string().required().min(2),
    price:Joi.string().required(),
    quantity : Joi.number().required().min(1),
    category: Joi.string().required(),
    description:Joi.string().required(),
    image:Joi.string().required()

});
return validation_schema.validate(data , {abortEarly:false});

}

export default AddProduct_val;