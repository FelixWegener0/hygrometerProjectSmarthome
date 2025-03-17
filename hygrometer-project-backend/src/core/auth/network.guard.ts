import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class NetworkGuard implements CanActivate {

    private getClientIp(request: any): string {
        // Prüfe zuerst den X-Forwarded-For Header
        const forwarded = request.headers['x-forwarded-for'];
        if (forwarded) {
          return Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0].trim();
        }
        // Fallback auf direkte Verbindung
        return request.connection.remoteAddress || request.ip;
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const request = context.switchToHttp().getRequest();

        console.log(this.getClientIp(request))

        

        return true;
    }
    
}