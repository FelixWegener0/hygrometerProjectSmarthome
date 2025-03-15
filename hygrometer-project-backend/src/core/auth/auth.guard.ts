import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers;

        if (authHeader.token === process.env.BACKEND_TOKEN) {
            return true;
        } else {
            return false;
        }
    }
}