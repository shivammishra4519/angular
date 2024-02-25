import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewDevicesComponent } from '../view-devices/view-devices.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent {
  imeiNumber:any;
  constructor(private router:Router,private dialogRef: MatDialogRef<ViewDevicesComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service: ApiServiceService,) {
    this.viewReport()
    this.imeiNumber=data;
  }

  result: any;
  payment: any;
isReportUpdated=true;

  viewReport() {

    this.service.viewPaymentStatus(this.data.imeiNumber1).subscribe((res: any) => {
      this.payment = res;
      const obj = {
        imeiNumber1: res.imeiNumber1, transactionId: res.transactionId
      }
      this.service.updateTransactionId(obj).subscribe((res) => {
        console.log("fg", res)

      })
    })
    this.service.viewReport(this.data).subscribe({
      next: data => {
        this.result = data;
      },
      error: err => {
        // Swal.fire("No report updated yet");
        // this.dialogRef.close()
        this.isReportUpdated=false
      }
    })
  }

  proccedPayment() {
    console.log("imeiNumber1:", this.data.imeiNumber1);
    this.router.navigate([`/admin/payment/${this.data.imeiNumber1}`]);
    this.dialogRef.close();
  }
  

  close() {
    this.dialogRef.close()
  }
}
