async function validateMiddleware(req, schema) {
  if (!schema) return;

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const body = await req.json();
  const { error, value } = schema.validate(body, options);

  if (error) {
    throw `Validation error: ${error.details.map((x) => x.message).join(', ')}`;
  }

  req.json = () => value;
}

export { validateMiddleware };
