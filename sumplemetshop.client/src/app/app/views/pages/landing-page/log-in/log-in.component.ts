import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/core/_base/_layout/services/auth/auth-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  public loginForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  constructor(
    private fb: FormBuilder,
    private auth: AuthUserService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.toast.success('Login successful');
          this.auth.storeToken(res.token)
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.toast.danger('Failed', 'Failed again',5000)
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.isText = !this.isText;
    this.type = this.isText ? 'text' : 'password';
    this.eyeIcon = this.isText ? 'fa-eye' : 'fa-eye-slash';
  }
}
