import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // 1. Get required roles from metadata (attached using @Roles)
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(), // check if @Roles is applied to method
            context.getClass(),   // if not found on method, check controller level
        ]);

        if (!requiredRoles) {
            return true;
        }


        const request: any = context.switchToHttp().getRequest();
        const user = request?.user;

        // 4. If no user info or user role not matching required roles => Forbidden
        if (!user || !requiredRoles.includes(user.role)) {
            throw new ForbiddenException('You do not have permission to perform this action');
        }

        // 5. If everything ok, allow access
        return true;
    };
}