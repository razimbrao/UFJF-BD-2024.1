import { Users } from '../../database/models/Users';

export const verifyUserById = async (userId: string) => {
  const user = await Users.findByPk(userId);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return user;
};
