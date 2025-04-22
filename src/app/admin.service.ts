import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private base_url: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  // projectList (): Observable<any>  {
  //   const url = `${this.base_url}admin/getAllProjectsList`;
  //   return this.http.post(url, null);
  // }

  // uploadFormData(formData: FormData): Observable<any> {
  //   return this.http.post(`${this.base_url}upload`, formData);  // The endpoint where FormData is sent
  // }

  // submitFormData(formData: FormData): Observable<any> {
  //   // return this.http.post(this.base_url, formData); // POST request sending formData to the API
  //       return this.http.post(`${this.base_url}upload`, formData);
  // }

  logout(): void {
    // this.isAuthenticated = false;
    localStorage.removeItem("authToken");
  }

  isLoggedIn() {
    if (localStorage.getItem("authToken")) {
      return true;
    } else {
      return false;
    }
  }

  submitFormData(data: any): Observable<any> {
    const apiUrl = `${this.base_url}/registerUser`; 
    return this.http.post(apiUrl, data); 
  }

  getUserById(userId: any): Observable<any> {
    const apiUrl = `${this.base_url}/getUser/${userId}`;
    return this.http.get<any>(apiUrl, this.getHttpOptions()); 
  }

  getUserData(data: any): Observable<any> {
    const apiUrl = `${this.base_url}/getUsers`;
    return this.http.post(apiUrl, data, this.getHttpOptions());
  }

  userData(data: any): Observable<any> {
    const apiUrl = `${this.base_url}/details`;
    return this.http.post(apiUrl, data, this.getHttpOptions());
  }
  login(data: any): Observable<any> {
    const apiUrl = `${this.base_url}/login`;
    return this.http.post(apiUrl, data, this.getHttpOptions()); 
  }

  deleteUser(id: number) {
    const apiUrl = `${this.base_url}/delete/${id}`;
    const payload = {id}
    return this.http.post(apiUrl,payload, this.getHttpOptions());
  }

  // updateUser(id: number, data: any): Observable<any> {
  //   return this.http.put<any>(`${this.base_url}/${id}`, data);
  // }
  // updateUser(id: string, userData: any): Observable<any> {
  //   const apiUrl = `${this.base_url}/update/${id}`;
  //   return this.http.put(apiUrl, userData, this.getHttpOptions());
  // }
  private getHttpOptions() {
    return {
      headers: {
        "Content-Type": "application/json",
        // Add other headers here if needed
      },
    };
  }
  // getUserData(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.base_url}/users`);
  // }
  // register(data: any): Observable<any> {
  //   const apiUrl = `${this.base_url}/registerUser`;
  //   return this.http.post(apiUrl, data);
  // }
}
