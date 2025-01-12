import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Credentials, LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{

    private fb = inject(FormBuilder)
    private loginService = inject(LoginService)
    private router = inject(Router)

    private loginSubscription: Subscription | null = null

    loginFormGroup = this.fb.group({
    'username': ['', [Validators.required]],
    'password': ['', [Validators.required]],
  })

  invalidCredentials = false

  ngOnDestroy():void {
    this.loginSubscription?.unsubscribe()                
  }

  login(){
    this.loginSubscription = this.loginService.login(
      this.loginFormGroup.value as Credentials
    ).subscribe({
      next: (result: User | null | undefined) => {
        console.log('Utilisateur connecté:', result);
        this.navigateHome()
      },
      error: error => {
        console.log(error)
        this.invalidCredentials = true}
    })
    console.log('login')
  }

  navigateHome() {
    this.router.navigate(['home'])
  }

  navigateRegister(){
    this.router.navigate(['register'])

  }

}
