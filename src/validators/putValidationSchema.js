import Joi from "joi";

const putValidationSchema = Joi.object(
    { 
        comment: [Joi.string().allow(null)]
    }
);

export default putValidationSchema;