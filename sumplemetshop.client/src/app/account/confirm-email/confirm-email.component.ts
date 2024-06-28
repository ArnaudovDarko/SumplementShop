import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { SharedService } from 'src/app/core/_base/_layout/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from '../models/account/user';
import { ConfirmEmail } from '../models/account/confirm-email';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent implements OnInit {

  success = true;

   constructor(private AccountService:AccountService, private sharedService: SharedService,
    private router: Router, private activatedRoute:ActivatedRoute
   ) {

   }

    ngOnInit(): void {
        this.AccountService.user$.pipe(take(1)).subscribe({
          next: (user: User | null) =>{
             if(user){
              this.router.navigateByUrl('/')
             }else{
              this.activatedRoute.queryParamMap.subscribe({
                next: (params: any) => {
                  const ConfirmEmail : ConfirmEmail = {
                    token: params.get('token'),
                    email: params.get('email'),
                  }
                  
                  this.AccountService.ConfirmEmail(ConfirmEmail).subscribe({
                    next: (response: any) =>{
                      this.sharedService.showNotification(true,response.value.title,response.value.message);
                    }, error:error => {
                        this.success = false;
                        this.sharedService.showNotification(false,"Failed",error.error)
                     }
                  })
                }
              })
             }
          }
        })
    }


    resendEmailConfirmationLink(){
      this.router.navigateByUrl('/account/send-email/resend-email-confirmation-link');
    }

}
