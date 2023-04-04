import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent  implements OnInit {

  loginUser: FormGroup;
  registerUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.loginUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
    this.registerUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passConf: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login() {
    const email = this.loginUser.value.email;
    const password = this.loginUser.value.password;

    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      if(user.user?.emailVerified) {
        this.router.navigate(['/home'])
      } else {
        console.log('Verifica tu cuenta')
        // this.router.navigate(['/home'])
      }
      
    }).catch((error) => {
      console.log(error);
    })
  }

  reg(){
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const confPassword = this.registerUser.value.passConf;
    
    console.log(password+' '+confPassword)
    if (password==confPassword) {
      this.router.navigate(['/home'])
      return this.afAuth.createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });

    } else {
      alert('La contraseña no coincide')
      return false
    }
  }

}