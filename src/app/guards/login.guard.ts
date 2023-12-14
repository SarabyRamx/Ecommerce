import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../servicios/cart.service";

export const loginGuard = () => {
    //Manejar la navegacion del usuario
    const router = inject(Router);
    //Manejar el sevicio correspondiente a la validacion del token
    const servicio = inject(CartService);

    //Validar existencia de token en localStorage
    if (localStorage.getItem('data')) {
        if (servicio.validToken(localStorage.getItem('data')!)) {
            return true;
        }
        return false;
    } else {
        router.navigate(['/productos']);
        return false;
    }
}
//https://www.youtube.com/watch?v=SKBZWfwcfWY&t=9s