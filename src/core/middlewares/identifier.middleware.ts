import { Validator } from 'jsonschema';
import { Request, NextFunction, Response } from 'express';

const validator = new Validator();

const idSchema = {
  id: '/id',
  type: 'number'
};

export const validateId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const numberId = Number(id);
    const validation = validator.validate(numberId, idSchema);

    if (!validation.valid) {
      throw new Error('Id inválido');
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};
