import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyJwt } from '../jwt.util.js';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authentication token is required (Authorization: Bearer <token>)');
    }

    const result = verifyJwt(authHeader);
    if (!result.valid || !result.payload) {
      throw new UnauthorizedException(result.error || 'Invalid or expired authentication token');
    }

    // Attach verified user payload to request
    request.user = result.payload;
    return true;
  }
}
