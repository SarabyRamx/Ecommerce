import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/servicios/cart.service';
import { ToastrService } from 'ngx-toastr';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, formulario: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = formulario && formulario.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, 
    private router: Router,
    private service: CartService,
    private toastr: ToastrService) { 
      this.form = this.fb.group({
        mail: ['', Validators.compose([Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)])],
        pass: ['', Validators.required]
      });
    }
  ngOnInit(): void {
    console.log('Hola amigo...');
  }

  ingresar(){
    this.service.loginService(this.form.value).subscribe({
      next: (resultData) => {
        //Asignar el valor del token retornado al localStorage
        this.service.setToken(resultData.data);
        this.toastr.success('Bienvenido... compadre!!!', '', {
          positionClass: 'toast-bottom-left',
        });
        this.router.navigate(['/comprar']);
      }, error: (error) => {
        console.log(error);
        this.toastr.error(error, 'Error', {
          positionClass: 'toast-bottom-left',
        });
      }
    });
  }
}
