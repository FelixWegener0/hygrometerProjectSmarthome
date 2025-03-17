import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class NetworkGuard implements CanActivate {

    private getClientIp(request: any): string {
        const forwarded = request.headers['x-forwarded-for'];
        if (forwarded) {
          return Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0].trim();
        }
        return request.connection.remoteAddress || request.ip;
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const ip = this.getClientIp(request);

        if (ip === process.env.ALLOWED_NETWORK_IP) {
            return true;
        } else {
            console.log(`try to post data with ip: ${ip} was rejected`);
            return false;
        }
    }
    
}