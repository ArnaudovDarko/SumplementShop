import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { SharedService } from 'src/app/core/_base/_layout/services/shared.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  errorMessages: string[] = [];

  constructor(private formBuilder: FormBuilder, 
    private sharedService:SharedService, 
    private router:Router, 
    private accountService: AccountService) {
      this.accountService.user$.pipe(take(1)).subscribe({
        next: (user: User | null) =>{
          if(user){
            this.router.navigateByUrl('/')
          }
        }
      })
     }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  register() {
    this.submitted = true;
    this.errorMessages = [];
    
     if(this.registerForm.valid){
      this.accountService.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          console.log('fleve')
          this.sharedService.showNotification(true, response.value.title,response.value.message);
          this.router.navigateByUrl("/account/login")
          console.log(response.value.message)
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
}
