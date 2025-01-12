import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Credentials, LoginService } from '../../../services/login.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

      private fb = inject(FormBuilder)
      private loginService = inject(LoginService)
      private router = inject(Router)
  
      private loginSubscription: Subscription | null = null
  
      registerFormGroup = this.fb.group({
      'username': ['', [Validators.required]],
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'password': ['', [Validators.required]],
    })
  
    invalidCredentials = false
  
    ngOnDestroy():void {
      this.loginSubscription?.unsubscribe()                
    }
  
    register(){
        this.loginSubscription = this.loginService.register(
        this.registerFormGroup.value as Credentials
      ).subscribe()
      console.log('registered')
    }

    navigateHome() {
      this.router.navigate(['home'])
    }
  
    navigateLogin(){
      this.router.navigate(['login'])
  
    }

}
