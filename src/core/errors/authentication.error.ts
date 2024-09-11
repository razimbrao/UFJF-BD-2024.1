import { HttpError, HttpCode, HttpErrorArgs } from '../../common/app.error';

export abstract class AuthenticationError extends HttpError {
  constructor (args: HttpErrorArgs) {
    super({ httpCode: args.httpCode, description: args.description, name: `AUTHENTICATION_ERROR-${args.name}`, isOperational: true });
  }
}

export class TokenNotFoundError extends AuthenticationError {
  constructor (description = 'Token not found') {
    super({ httpCode: HttpCode.UNAUTHORIZED, description, name: 'TOKEN_NOT_FOUND' });
  }
}
