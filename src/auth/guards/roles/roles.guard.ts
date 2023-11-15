import { Injectable, CanActivate, ExecutionContext, Req, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //extract user
    const { user } = await context.switchToHttp().getRequest();
    //console.log({userRoleGuard: user})
    if(!user){
      return false
    }
    //required roles
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //console.log(requiredRoles)
    //no required roles needed
    if (!requiredRoles) {
      return true;
    }

    const hasRolesRequired = requiredRoles.some((role) => user.role?.includes(role));

    if(!hasRolesRequired){
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED)
    }

    return hasRolesRequired
  }
}