import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() loginSuccess!: boolean;

  loginForm = this.formBuilder.group({
    userName: '',
    password: ''
  });

  constructor(private formBuilder : FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.value.userName.toLowerCase() == 'mkfab' && this.loginForm.value.password == 'mkfab')
      this.router.navigate(['session']);
    else
      this.loginSuccess = false;
  }

}
