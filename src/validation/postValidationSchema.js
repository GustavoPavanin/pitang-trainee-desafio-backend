import Joi from "joi";

const validationSchema = Joi.object({ 
    name: Joi.string().required(), 
    email: Joi.string().email({ tlds: { allow: false } }).required(), 
    birthdate: Joi.string().required(), 
    appointmentDate: Joi.string().required()
  })

export default validationSchema;