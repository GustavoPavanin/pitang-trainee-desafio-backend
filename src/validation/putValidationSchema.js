import Joi from "joi";

const putValidationSchema = Joi.object(
    { 
        comment: [Joi.string().optional(), Joi.allow(null)]
    }
);

export default putValidationSchema;