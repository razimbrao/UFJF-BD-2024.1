import { Request, Response, NextFunction } from 'express';
import { Validator } from 'jsonschema';
import { schemas } from '../interfaces/JSONSchemas';

const v2 = new Validator();
Object.values(schemas).forEach(schema => v2.addSchema(schema));

export const verifyBody = async (
  schemaUri: string,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const selectedSchema = schemas[schemaUri];

    if (!selectedSchema) {
      return res.status(400).json({ message: 'Schema não encontrado' });
    }

    const validationResult = v2.validate(body, selectedSchema);

    if (!validationResult.valid) {
      const errors = validationResult.errors.map((error) => error.stack);

      const missingProperties = errors.filter(error => error.includes('requires property'));
      if (missingProperties.length) {
        const missingPropertiesMessage = missingProperties.map(error => error.replace(/.*"([^"]+)".*/, '$1')).join(', ');
        throw new Error(`${missingPropertiesMessage} está faltando`);
      }

      if (validationResult.errors[0].path[0]) {
        const fieldName = validationResult.errors[0].path.join('.');
        throw new Error(`O campo ${fieldName} não atende aos critérios necessários`);
      }

      throw new Error('O corpo da requisição não atende aos critérios necessários');
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};
