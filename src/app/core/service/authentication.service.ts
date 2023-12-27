import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, firstValueFrom } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  APIURL!: string;
  isHomePage = new BehaviorSubject<boolean>(true);
  isLogedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.APIURL = environment.apiUrl;
  }
  async checkEmail(body: { email: string }) {
    try {
      const request = await firstValueFrom(
        this.http.post(`${this.APIURL}/login`, body)
      );
      return request;
    } catch (error) {
      throw error;
    }
  }
}
