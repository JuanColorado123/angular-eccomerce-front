import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public hasError = signal(false)

  registerForm = this.fb.group({
    email: ['', [Validators.required,Validators.email ]],
    fullName: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit() {
    if(this.registerForm.invalid){
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return ;
    }

    const {email, fullName, password} = this.registerForm.value;
    if(!email || !fullName || !password) return;

    this.authService.register(email,fullName,password).subscribe((isAuthenticated) => {
      if(isAuthenticated){
        this.router.navigateByUrl('/auth/login');
        return ;
      }

      this.hasError.set(true)
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    })
  }
}
