import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  // Start Firebase optional CRUD Functions

  createDoc(userData: any, path: string, id: string) {

    const collection = this.firestore.collection(path);
    return collection.doc(id).set(userData);

  }

  getId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string) {

    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getDoc<tipo>(path: string, id: string) {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges()
  }

  // End Firebase optional CRUD Functions

  // start Users CRUD Functions
  
  getUsers() {
    return this.firestore
      .collection("Users")
      .snapshotChanges()
  }

  getUserById(id: string) {
    return this.firestore
      .collection("Users")
      .doc(id)
      .valueChanges()
  }

  createUser(userData: any) {
    return new Promise<any> ( ( resolve, reject ) => {
      this.firestore
        .collection("Users")
        .add(userData)
        .then( (response) => {
          console.log(response)
        },
        (error) => {
          reject(error)
        })
    })
  }

  updateUser(userData: any, id: string) {
     return this.firestore
       .collection("Users")
       .doc(id)
       .update({
        email: userData.email,
        phone: userData.phone,
        fName: userData.fName,
        sName: userData.sName
       });
  }

  delUser(userData: any) {
    return this.firestore
      .collection("Users")
      .doc(userData.uid)
      .delete()
  }

  // End Users CRUD Functions

}