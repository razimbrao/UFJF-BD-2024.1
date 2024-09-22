import { Usuarios } from '../../database/models/Usuarios';

export const verifyUserById = async (userId: string) => {
  const user = await Usuarios.findByPk(userId);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return user;
};
