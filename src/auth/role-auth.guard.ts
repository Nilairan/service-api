import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { ROLES_KEY } from "../role/role-auth.decorator"

@Injectable()
export class RolesGuard implements CanActivate {
    
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            if (!requiredRoles) {
                throw new UnauthorizedException()
            }
            console.log(requiredRoles)
            const request = context.switchToHttp().getRequest()
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException()
            }
            const verifyToken = this.jwtService.verify(token)
            request.verifyToken = verifyToken
            console.log(verifyToken)
            return verifyToken.rolesValue.some(value => requiredRoles.includes(value))
        } catch (e) {
            throw new UnauthorizedException()
        }
    } 
}