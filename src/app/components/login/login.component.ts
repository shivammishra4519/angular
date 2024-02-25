import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private router: Router, private service: ApiServiceService) { }
  loginForm = this.builder.group({
    mobileNumber: this.builder.control('', [Validators.required,]),
    passWord: this.builder.control('', Validators.required)
  })
  login() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          const token = data.token;
          localStorage.setItem('token', token);
          // this.toastr.success('You are logged in successfully.');
          const decodeToken:any = jwt_decode.jwtDecode(token) as { [key: string]: any };
          console.log("decode ",decodeToken)
          this.router.navigate(['/admin']);
          this.loginForm.reset();
        },
        error: (error) => {
          // this.toastr.error(error); // Display the error message from the service
          Swal.fire({
            icon:'error',
            title: 'Oops...',
        text: error.error.message
          })
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter valid details.',
      });
    }
  }
  
}

