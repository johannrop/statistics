import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { TokenService } from "../services/token.service";

export const authGuardFtn: CanActivateFn = () => {

    /**
     * @param tokenService
     * Inject the services Token and router required for the auth.
     * @param routerSerive
     * Inject the services Token and router required for the auth.
     */
    const tokenService = inject(TokenService);
    const routerSerive = inject (Router);

    const token = tokenService.getToken();

    if(!token){
        routerSerive.navigate(['/app-login']);
        return false;
    }
    return true;
}

export const authGuardHd: CanActivateFn = () => {

    const tokenService = inject(TokenService);
    const token = tokenService.getToken();

    if(!token){
        return false;
    }
    return true;
}