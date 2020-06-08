const validateRequest = require('@hapi/joi')

const validate = (req, next, schema) => {
    console.log('validating')
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}

const newCrendentials = (req, res, next) => {        
    const schema = validateRequest.object({
      name: validateRequest.string().required(),
      email: validateRequest.string().required(),
      password: validateRequest.string().required()
    });
    
    return validate(req, next, schema);
}

const credentials = (req, res, next) => {
    const schema = validateRequest.object({        
        email: validateRequest.string().required(),
        password: validateRequest.string().required()
      });
      
      return validate(req, next, schema);
}

const token = (req, res, next) => {
    const schema = validateRequest.object({        
        token: validateRequest.string().required(),        
      });
      
      return validate(req, next, schema);
}

module.exports = { newCrendentials, credentials, token }