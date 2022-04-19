import Joi from "joi";

const putValidationSchema = Joi.object(
    { 
        comment: Joi.string()
    }
);

export default putValidationSchema;