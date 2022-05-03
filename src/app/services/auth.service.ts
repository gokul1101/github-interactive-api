import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: BehaviorSubject<boolean>;
  private email: BehaviorSubject<string>;
  constructor(private firebaseAuth: AngularFireAuth) {
    this.isLoggedIn = new BehaviorSubject<boolean>(
      localStorage.getItem('email') ? true : false
    );
    this.email = new BehaviorSubject<string>(
      localStorage.getItem('email') || ''
    );
  }

  getValue(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
  setValue(newValue: boolean): void {
    this.isLoggedIn.next(newValue);
  }
  getEmail(): Observable<string> {
    return this.email.asObservable();
  }
  setEmail(newValue: string): void {
    this.email.next(newValue);
  }
  async login(email: string, password: string): Promise<any> {
    try {
      await this.firebaseAuth.signInWithEmailAndPassword(email, password);
      localStorage.setItem('email', email);
      this.setEmail(email);
      this.setValue(true);
      return Promise.resolve({
        message: 'Logged In Successfully',
      });
    } catch (err: any) {
      return Promise.reject({
        message: err.message || 'Internal Server Error',
      });
    }
  }
  async signup(email: string, password: string): Promise<any> {
    try {
      await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
      return Promise.resolve({
        message: 'Signed Up Successfully.',
      });
    } catch (err: any) {
      return Promise.reject({
        message: err.message || 'Internal Server Error',
      });
    }
  }
  async logout(): Promise<any> {
    try {
      await this.firebaseAuth.signOut();
      this.setEmail('');
      this.setValue(false);
      localStorage.clear();
      return Promise.resolve({
        message: 'Logged out Successfully.',
      });
    } catch (err: any) {
      return Promise.reject({
        message: err.message || 'Internal Server Error',
      });
    }
  }
}
