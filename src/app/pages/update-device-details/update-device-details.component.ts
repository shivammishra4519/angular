import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ViewDevicesComponent } from '../view-devices/view-devices.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-device-details',
  templateUrl: './update-device-details.component.html',
  styleUrls: ['./update-device-details.component.css']
})
export class UpdateDeviceDetailsComponent {
  isUpdatedDetails=false;
  constructor(private dialogRef: MatDialogRef<ViewDevicesComponent>, private builder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private service: ApiServiceService) { 
    this.isUpdated()
  }
  mobileDetails = this.builder.group({
    currentNumber: this.builder.control('', Validators.required),
    currentAddress: this.builder.control('', Validators.required),
    imeiNumber1: this.builder.control(this.data.imeiNumber1)
  })

  submit() {
    if (!this.mobileDetails.valid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill all the fields",
      });
    }
    this.service.updateDetails(this.mobileDetails.value).subscribe({
      next: () => {
        Swal.fire({
          title: "Good job!",
          text: "Value Updated Successfully!",
          icon: "success"
        });
        this.mobileDetails.reset();
        this.dialogRef.close();
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Somtheing went wrong",
        });

      }
    })
  }


  isUpdated(){
    this.service.viewReport(this.data).subscribe({
      next:(data:any)=>{
        this.mobileDetails.patchValue({
          currentNumber:data.currentNumber,
          currentAddress:data.currentAddress,
          imeiNumber1:data.imeiNumber1
        })
        this.isUpdatedDetails=true;
      }
    })
  }
  close() {
    this.dialogRef.close()
  }
}
