import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user?: User ;

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email, 
        password
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return result;
      
    } catch (error) {
      console.log(error);
      return null;
    } 
  }

  async logout() {
    try {
      await this.afAuth.signOut()
    } catch (error) {
      console.log(error);
      
    }
  }

  getCurrentUser() {
    return this.afAuth.authState  
  }

  async getUid() {
    const cuUser = await this.afAuth.currentUser
    cuUser!.uid;
  }
}