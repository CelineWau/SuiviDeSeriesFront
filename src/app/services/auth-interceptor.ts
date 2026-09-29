import { HttpInterceptorFn } from "@angular/common/http";
import { Auth } from "./auth";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(Auth);
    const token = authService.getToken();

    if(token) {
        const reqAvecToken = req.clone({
            setHeaders: { Authorization: `Bearer ${token}`}
        });
        return next(reqAvecToken);
    }

    return next(req);
};