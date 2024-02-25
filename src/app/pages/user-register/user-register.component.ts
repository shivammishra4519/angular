import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  constructor(private builder: FormBuilder, private service: ApiServiceService) { }
  userRegister = this.builder.group({
    userName: this.builder.control('', Validators.required),
    userEmail: this.builder.control('', [Validators.required, Validators.email]),
    mobileNumber: this.builder.control('', [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    city: this.builder.control('', Validators.required),
    passWord: this.builder.control('', Validators.required),
    active: this.builder.control(true, Validators.required)

  })

  registration() {
    if (this.userRegister.value.userName?.trim() && this.userRegister.value.city?.trim()) {

        this.service.registerUser(this.userRegister.value).subscribe({
          next: () => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User registered successfully",
              showConfirmButton: false,
              timer: 1500
            });
            this.userRegister.reset();
          },
          error: (error) => {
            console.log(error);
  
            // Check if the error message contains "Mobile number already exists"
            if (error && error.error && error.error.message && error.error.message.includes("Mobile number already exists")) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Mobile number already exists",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error occurred while registering user",
              });
            }
          }
        });
      
    } else {
      Swal.fire("Enter a valid Name and city!");
    }
  }
  
}
