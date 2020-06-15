const validateRequest = require('@hapi/joi')

const validate = (data, req, next, schema) => {
  console.log('Validating Request...')
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  }

  const { error, value } = schema.validate(data, options)
  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(', ')}`)
  }

  console.log('Request Validated...')
  req.data = value
  next()
}

const newCrendentials = (req, res, next) => {
  const schema = validateRequest.object({
    name: validateRequest.string().required(),
    email: validateRequest.string().required(),
    password: validateRequest.string().required(),
    role: validateRequest.string().required(),
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
    token: validateRequest.string().required(),
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

module.exports = { token, newCrendentials, credentials, verify, forgotPassword, resetPassword }
