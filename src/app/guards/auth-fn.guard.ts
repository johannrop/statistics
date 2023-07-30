import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { TokenService } from "../services/token.service";

export const authGuardFtn: CanActivateFn = () => {

    const tokenService = inject(TokenService);
    const routerSerive = inject (Router);
    const token = tokenService.getToken();

    if(!token){
        routerSerive.navigate(['/app-login']);
        return false;
    }
    return true;
}