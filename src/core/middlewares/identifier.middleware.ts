import { Validator } from 'jsonschema';
import { Request, NextFunction, Response } from 'express';

const validator = new Validator();

const idSchema = {
  id: '/uuid',
  type: 'integer'
};

export const validateId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validation = validator.validate(id, idSchema);

    if (!validation.valid) {
      throw new Error('Id inválido');
    }

    next();
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};
