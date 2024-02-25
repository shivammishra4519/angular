import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent {
  constructor(private builder: FormBuilder, private service: ApiServiceService, private router: Router) { }

  addDevice = this.builder.group({
    ownerName: this.builder.control('', Validators.required),
    ownerMoblieNumber: this.builder.control('', [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    imeiNumber1: this.builder.control('', [Validators.required, Validators.pattern("[0-9 ]{15}")]),
    imeiNumber2: this.builder.control('', [Validators.required, Validators.pattern("[0-9 ]{15}")]),
    brandName: this.builder.control('', Validators.required),
    modelName: this.builder.control('', Validators.required),
    lostDate: this.builder.control('', Validators.required),
    lastMobileNumber: this.builder.control('', Validators.required),
    losePlace: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    bill: this.builder.control('', Validators.required),
  });
  // formData=new FormData()

  // onFileSelected(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.formData.append('bill', file);
  //     console.log("hshds",file);
  //     // Optionally, you can update the form control value

  //   }
  // }

  addDeviceMethod() {

    // Ensure that 'bill' in the form data is correctly set
    this.service.addDevice(this.addDevice.value).subscribe({
      next: () => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Device added successfully",
          showConfirmButton: false,
          timer: 1500
        });
        // this.service.payment().subscribe((res)=>{
        //   this.service.data=res;
        //   console.log("hello",this.service.data)
        // })
        console.log("data in add ", this.addDevice.value)
        const role = this.service.findRole();
        // if (role == 'admin') {
        //   // this.router.navigate(['/payment',this.addDevice.value.imeiNumber1])
        //   this.router.navigate(['/admin/home']);
        // }

        this.router.navigate(['/admin/payment', this.addDevice.value.imeiNumber1])


        this.addDevice.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "somtheing went wrong",
        });
      }
    });
  }

}





// addDeviceMethod() {
//   const formData = new FormData();

//   for (const key of Object.keys(this.addDevice.value) as (keyof typeof this.addDevice.value)[]) {
//     const value = this.addDevice.value[key];

//     // Check if the value is not empty or null
//     if (value !== null && value !== undefined && value !== '') {
//       // Check if the value is a File or a string, and append it appropriately
//       if (value instanceof File) {
//         formData.append(key, value, value.name);
//       } else if (typeof value === 'string') {
//         formData.append(key, value);
//       }
//     }
//   }

//   // Continue with HTTP request
//   this.service.addDevice(formData).subscribe(
//     (res) => {
//       console.log('Success:', res);
//     },
//     (error) => {
//       console.error('Error:', error);
//     }
//   );
// }


// onFileSelected(event: any) {
//   const files = event.target.files;

//   if (files && files.length > 0) {
//     const file: File = files[0];
//     console.log('Selected file:', file);

//     // Set the value of the 'bill' form control to the selected file
//     this.addDevice.get('bill')?.patchValue(file);
//   } else {
//     console.error('No file selected.');
//   }
// }




// const object={
//   ownerName:this.addDevice.value['ownerName'],
//   ownerMoblieNumber:this.addDevice.value['ownerMoblieNumber'],
//   imeiNumber1:this.addDevice.value['imeiNumber1'],
//   imeiNumber2:this.addDevice.value['imeiNumber2'],
//   brandName:this.addDevice.value['brandName'],
//   modelName:this.addDevice.value['modelName'],
//   lostDate:this.addDevice.value['lostDate'],
//   lastMobileNumber:this.addDevice.value['lastMobileNumber'],
//   losePlace:this.addDevice.value['losePlace'],
//   bill:this.formData.get('bill') as File
// }
