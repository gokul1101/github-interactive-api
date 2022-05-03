import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  email: string = '';
  isLoggedIn: boolean = this.email ? true : false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.authService.getEmail().subscribe((value: any) => (this.email = value));
    this.authService
      .getValue()
      .subscribe((value: any) => (this.isLoggedIn = value));
  }

  ngOnInit(): void {}

  changeRoute(e: any) {
    e.preventDefault();
    this.router.navigateByUrl(`/${e.currentTarget.id}`);
  }
  async logout() {
    await this.authService.logout();
    this.toastr.success('out Successfully', 'Logged');
    this.router.navigateByUrl(`/signin`);
  }
}
