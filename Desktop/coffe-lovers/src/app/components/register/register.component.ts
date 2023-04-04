import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FirestoreService } from 'src/app/service/firestore.service';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent  implements OnInit {

  userData: UserI = {
    uid: null,
    email: null,
    password: null,
    role: 'user'
  };

  userRegister: FormGroup;

  res: any;

  passwordPatern = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*))(?=(?!.*(.)\1)).{8,}/;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private authSvc: AuthService,
    private frservice: FirestoreService,

    ) { 

      this.userRegister = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(this.passwordPatern)]],
      })


    }

  ngOnInit() {}
  
  async register() {
    const email = this.userRegister.value.email;
    const password = this.userRegister.value.password;

    this.authSvc.register(email, password).then(async (result:any) => {
      this.res = result?.user;
      await this.verifyEmail();
      this.userRegister.reset();
      
    
    })
    .catch((error) => {
        console.log(error);
    });

     
  }

  verifyEmail() {
    this.afAuth.currentUser.then(user => user?.sendEmailVerification())
    .then(() => {
      this.authSvc.logout();
      this.router.navigate(['/home'])
      
    });
  }


}
