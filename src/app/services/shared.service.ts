import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private loggedInUidSubject: BehaviorSubject<string | null>;

  constructor() {
    const storedUid = localStorage.getItem('loggedInUid');
    this.loggedInUidSubject = new BehaviorSubject<string | null>(storedUid);
  }

  setLoggedInUid(uid: string | null) {
    this.loggedInUidSubject.next(uid);
    if (typeof uid === "string") {
      localStorage.setItem('loggedInUid', uid);
    }
  }

  getLoggedInUid(): Observable<string | null> {
    return this.loggedInUidSubject.asObservable();
  }
}
