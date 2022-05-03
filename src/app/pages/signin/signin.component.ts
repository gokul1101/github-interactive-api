import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.router.navigateByUrl('/home');
    }
  }
  async onSubmit(value: any) {
    let { email, password } = value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0) {
      this.toastr.error('Field is Empty', 'Email');
      return;
    }
    if (!emailRegex.test(email)) {
      this.toastr.error('is Invalid', 'Email');
      return;
    }
    if (password.length < 6) {
      this.toastr.error('is Invalid', 'Password');
      return;
    }
    try {
      let { message } = await this.authService.login(email, password);
      this.toastr.success(message, 'Status');
      this.router.navigateByUrl('/home');
    } catch (e: any) {
      this.toastr.error(e.message, 'Status');
    }
  }
}
