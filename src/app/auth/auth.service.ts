import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.router.navigate(['/contacts']);
      return userCredential.user;
    } catch (error) {
      this.router.navigate(['/error']);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.router.navigate(['/contacts']);
      return userCredential.user;
    } catch (error) {
      this.router.navigate(['/error']);
      throw error;
    }
  }

  get currentUser(): User | null {
    return this.auth.currentUser;
  }
}
