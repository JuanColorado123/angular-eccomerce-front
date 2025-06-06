import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  hasError = signal(false);

  loginForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit(){
    if(this.loginForm.invalid){
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return ;
    }

    const { email = ' ', password ='' } = this.loginForm.value;

    this.authService.login(email!,password!)
    .subscribe((isaAuthenticated) => {
      if(isaAuthenticated){
        this.router.navigateByUrl('/')
        return;
      }
      this.hasError.set(true);

      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    });
  }

}
