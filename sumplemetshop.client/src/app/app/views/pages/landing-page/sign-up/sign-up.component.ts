import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/core/_base/_layout/services/auth/auth-user.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signUpForm!: FormGroup;
  errors = null;
  constructor(
    private fb: FormBuilder,
    private auth: AuthUserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          alert('Registration successful');
          this.signUpForm.reset();
          this.router.navigate(['/']);
        },
        error: (err) => {
         
          alert(err.error[0]);
          this.errors = err     
          console.log(this.errors)  
        }
      });
    }
  }
}
