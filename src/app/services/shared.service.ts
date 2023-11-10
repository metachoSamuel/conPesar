import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private loggedInUid: string | null = null;
  setLoggedInUid(uid: string | null) {
    this.loggedInUid = uid;
  }

  getLoggedInUid(): string | null {
    return this.loggedInUid;
  }

}
