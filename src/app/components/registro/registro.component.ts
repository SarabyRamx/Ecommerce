import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  mostrarMensajesError = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zñÑáéíóú ]*[A-Za-z][A-Za-zñÑáéíóú ]*$/)])],
      correo: ['', Validators.compose([Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)])],
      contraseña: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmarContraseña: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    }, {
      validators: [this.passwordMatchValidator('contraseña', 'confirmarContraseña')]
    });
  }

  passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
  
      const password = control.get(controlName);
      const confirmPassword = control.get(matchingControlName);
  
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword?.setErrors(null);
      }
  
      return null;
    }
  }



  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Formulario válido');
      console.log("estos son los datos de tu formulario: ", this.registroForm.value);
    } else {
      this.mostrarMensajesError = true;
      console.error("los datos son invalidos");
    }
  }
}
