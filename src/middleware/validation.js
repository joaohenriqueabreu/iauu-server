const validateRequest = require('@hapi/joi')
const { ValidationError } = require('@hapi/joi')
const BadRequestException = require('../exception/bad')

const validate = (data, req, next, schema) => {
  console.log('Validating Request...')
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  }

  const { error, value } = schema.validate(data, options)
  if (error) {
    next(new BadRequestException(`Validation error: ${error.details.map((x) => x.message).join(', ')}`))    
  }

  console.log('Request Validated...')
  req.data = value
  next()
}

const newCrendentials = (req, res, next) => {
  const schema = validateRequest.object({
    name: validateRequest.string().required(),
    email: validateRequest.string().email().required(),
    password: validateRequest.string().required(),
  })

  return validate(req.body, req, next, schema)
}

const credentials = (req, res, next) => {
  const schema = validateRequest.object({
    email: validateRequest.string().required(),
    password: validateRequest.string().required(),
  })

  return validate(req.body, req, next, schema)
}

const verify = (req, res, next) => {
  console.log('Validating verify request...')
  const schema = validateRequest.object({
    token: validateRequest.string().required(),
  })

  return validate(req.body, req, next, schema)
}

const token = (req, res, next) => {
  const schema = validateRequest.object({
    token: validateRequest.string().valid('artist, contractor').required(),
  })

  return validate(req.headers, req, next, schema)
}

const forgotPassword = (req, res, next) => {
  const schema = validateRequest.object({
    email: validateRequest.string().required(),
  })

  return validate(req.body, req, next, schema)
}

const resetPassword = (req, res, next) => {
  const schema = validateRequest.object({
    token: validateRequest.string().required(),
    password: validateRequest.string().required(),
    passwordConfirm: validateRequest.string().required(),
  })

  return validate(req.body, req, next, schema)
}

const role = (req, res, next) => {
  const schema = validateRequest.object({
    role: validateRequest.string().required()
  })

  return validate(req.body, req, next, schema)
}

const social = (req, res, next) => {
  const schema = validateRequest.object({
    token: validateRequest.string().required()
  })

  console.log(req.body)
  return validate(req.body, req, next, schema)
}

// const oauth = (req, res, next) => {
//   req.data = { token: req.headers.authorization.replace('Bearer ', '')}
//   next()
// }

const id = (req, res, next) => {
  const schema = validateRequest.object({
    id: validateRequest.string().required()    
  })

  return validate(req.params, req, next, schema)
}

const profile = (req, res, next) => {
  const schema = validateRequest.object({
    profile: validateRequest.object().required()
  })

  return validate(req.body, req, next, schema)
}

const product = (req, res, next) => {
  const schema = validateRequest.object({
    product: validateRequest.object().required()
  })

  return validate(req.body, req, next, schema)
}

const search = (req, res, next) => {  
  const schema = validateRequest.object({})
  return validate(req.query, req, next, schema)
}

module.exports = { 
  id,
  token,
  social,
  newCrendentials, 
  credentials, 
  verify, 
  forgotPassword, 
  resetPassword, 
  profile, 
  role, 
  product,
  search
 }
