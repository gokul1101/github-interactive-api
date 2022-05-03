import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username: string = '';
  githubUser = {
    avatar_url: '',
    name: '',
    bio: '',
    company: '',
    email: '',
    updated_at: '',
  };
  repos: [] = [];
  flag: boolean;
  constructor(
    private router: Router,
    private github: GithubService,
    private toastr: ToastrService
  ) {
    this.flag = false;
  }

  ngOnInit(): void {
    if (!localStorage.getItem('email')) {
      this.router.navigateByUrl('/signin');
    }
  }
  getRepos(reposUrl: string) {
    this.github.getUserRepos(reposUrl).subscribe((data) => {
      if (data.status === 200) {
        this.repos = data.body.map((repo: any) => repo.name);
        this.toastr.success('found', 'User');
      } else {
        this.toastr.success('not found', 'User');
      }
    });
  }
  findUser() {
    if (this.username.length === 0) {
      this.toastr.error('Field is Empty', 'Username');
      return;
    }
    this.github.getUser(this.username).subscribe((data) => {
      if (data.status === 200) {
        let user = {
          avatar_url: '',
          name: '',
          bio: '',
          company: '',
          email: '',
          updated_at: '',
        };
        user.avatar_url = data.body.avatar_url || '*Not mentioned*';
        user.name = data.body.name || '*Not mentioned*';
        user.bio = data.body.bio || '*Not mentioned*';
        user.company = data.body.company || '*Not mentioned*';
        user.email = data.body.email || '*Not mentioned*';
        user.updated_at =
          new Date(data.body.updated_at).toLocaleString() || '*Not mentioned*';
        this.githubUser = user;
        this.flag = true;
        this.getRepos(data.body.repos_url);
      } else if (data.status === 404) {
        console.log('Not found');
      }
    });
  }
}
