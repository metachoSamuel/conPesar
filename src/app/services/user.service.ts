import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider
} from "@angular/fire/auth";
import {addDoc, collection, Firestore} from "@angular/fire/firestore";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) { }

  async register({email, password, name, lastName}: any) {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const uuidUser = credential.user.uid;
    const user: User = {
      uuidUser: uuidUser,
      name: name,
      lastName: lastName,
      email: email,
    };
    this.addUser(user).then(r => {});

    return credential;
  }
  loginUser({ email, password }:any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  logout() {
    return signOut(this.auth);
  }
  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  // Add user firestore db
  addUser(user: User) {
    const userRef = collection(this.firestore, 'usuarios');
    return addDoc(userRef, user);
  }

}
