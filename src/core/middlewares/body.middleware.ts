import { Request, Response, NextFunction } from 'express';
import { Validator } from 'jsonschema';
import { schemas } from '../interfaces/JSONSchemas';

const v2 = new Validator();

for (const key in schemas) {
  v2.addSchema(schemas[key], key);
}

export const verifyBody = (schemaUri: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const schema = schemas[schemaUri];

      if (!schema) {
        return res.status(400).json({ message: 'Schema não encontrado' });
      }

      const validationResult = v2.validate(body, schema);
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
};
