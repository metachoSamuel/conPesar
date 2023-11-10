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
import {SharedService} from "./shared.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private sharedService: SharedService
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
  async loginUser({ email, password }:any) {
    const credentials = await signInWithEmailAndPassword(this.auth, email, password);
    const uid = credentials.user.uid;
    this.sharedService.setLoggedInUid(uid);
    return credentials;
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
