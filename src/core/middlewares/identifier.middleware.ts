import { Validator } from 'jsonschema';
import { Request, NextFunction, Response } from 'express';

const validator = new Validator();

const uuidSchema = {
  id: '/uuid',
  type: 'string',
  pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
};

export const validateUuid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validation = validator.validate(id, uuidSchema);

    if (!validation.valid) {
      throw new Error('UUID inválido');
    }

    next();
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};
