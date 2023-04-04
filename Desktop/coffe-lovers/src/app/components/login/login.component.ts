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
    // validate if the user is logged in localstorage
    if(localStorage.getItem('user')) {
      console.log('Hay usuario');
      this.router.navigate(['/home'])
    }else {
      console.log('No hay usuario');
    }
  }

  login() {
    const email = this.loginUser.value.email;
    const password = this.loginUser.value.password;

    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      if(user.user?.emailVerified) {
        // save user in localstorage
        localStorage.setItem('user', JSON.stringify(user.user));
        this.router.navigate(['/home'])
      } else {
        localStorage.setItem('user', JSON.stringify(user.user));
        console.log('Verifica tu cuenta')
        this.router.navigate(['/home'])
      }

    }).catch((error) => {
      console.log(error);
    })
  }

  // funtion for register user on firebase
  register(): boolean|void{
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const confPassword = this.registerUser.value.passConf;
    if (password==confPassword) {
      // validate if the password is the same, register user and redirect to home
      this.afAuth.createUserWithEmailAndPassword(email, password).then((user) => {
        // redirect to home
        this.router.navigate(['/home'])
        // save user in localstorage
        localStorage.setItem('user', JSON.stringify(user.user));
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        return false
      });
    } else {
      alert('La contraseña no coincide')
      console.log(password, confPassword)
    }
  }
}