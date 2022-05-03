import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}
  githubUrl: string = `https://api.github.com/users`;

  getUser(username: string): Observable<any> {
    return this.http.get<any>(`${this.githubUrl}/${username}`, {
      observe: 'response',
    });
  }
  getUserRepos(repoUrl: string): Observable<any> {
    return this.http.get<any>(repoUrl, {
      observe: 'response',
    });
  }
}
