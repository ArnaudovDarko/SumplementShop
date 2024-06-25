import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { take } from 'rxjs';
import { User } from '../models/account/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorMessages: string[] = [];
  returnUrl:string | null = null; 


  ngOnInit(): void {
    this.initializeForm();
  }

  constructor(private formBuilder: FormBuilder, 
    private router:Router, 
    private activatedRoute :ActivatedRoute,
    private accountService: AccountService,
    ) { 
      this.accountService.user$.pipe(take(1)).subscribe({
        next: (user:User | null) =>{
          if(user){
            this.router.navigateByUrl('/')
          } else{
             this.activatedRoute.queryParamMap.subscribe({
              next:(params:any) =>{
                if(params){
                  this.returnUrl = params.get('returnUrl');
                }
              }
             })
          }
        }
      })
    }
  initializeForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login(){
    this.submitted = true;
    this.errorMessages = [];


    if(this.loginForm.valid){
      this.accountService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          if(this.returnUrl){
            this.router.navigateByUrl(this.returnUrl)
          }else{
            this.router.navigateByUrl("/")
          }
        },
        error: error => {
          if (error.error.errors){
            this.errorMessages = error.error.errors;
          }else{
            this.errorMessages.push(error.error)
          }
        }
      })
     }
  }

  resendEmailConfirmationLink(){
    this.router.navigateByUrl('/account/send-email/resend-email-confirmation-link')
  }

}
