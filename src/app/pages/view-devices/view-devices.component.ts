import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { UpdateDeviceDetailsComponent } from '../update-device-details/update-device-details.component';
import * as jwt_decode from 'jwt-decode';
import { ViewReportComponent } from '../view-report/view-report.component';

interface MobileDetails {
  _id: string;
  ownerName: string;
  ownerMoblieNumber: number;
  imeiNumber1: number;
  imeiNumber2: number;
  brandName: string;
  modelName: string;
  lostDate: string; // Assuming the date will be represented as a string in ISO format
  lastMobileNumber: number;
  losePlace: string;
  bill: string;
  registerUser: any;
  update: any;
}

@Component({
  selector: 'app-view-devices',
  templateUrl: './view-devices.component.html',
  styleUrls: ['./view-devices.component.css'],
})
export class ViewDevicesComponent {
  dataSource = new MatTableDataSource<MobileDetails>();
  originalDisplayedColumns: string[] = [
    'ownerName',
    'ownerMoblieNumber',
    'imeiNumber1',
    'imeiNumber2',
    'brandName',
    'modelName',
    'lostDate',
    'lastMobileNumber',
    'losePlace',
    'button',
    'status',
  ];
  role: any=null;

  // Adjusted displayed columns based on the user's role
  displayedColumns: string[] = this.role === 'admin' ? this.originalDisplayedColumns : this.originalDisplayedColumns.filter((column) => column !== 'button');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private service: ApiServiceService, private dialog: MatDialog) {
    this.getDevices();
    this.role = service.findRole();
    this.displayedColumns = this.role === 'admin' ? this.originalDisplayedColumns : this.originalDisplayedColumns.filter((column) => column !== 'button');
  }

  isUpadted = true;
  dataArray: any;

  getDevices() {
    this.service.viewDevice().subscribe((res: any) => {
      this.dataSource.data = res as MobileDetails[];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataArray = res;

      const obj = {
        imeiNumber1: res.imeiNumber1,
      };

      this.service.viewReport(obj).subscribe((res) => {
        if (res) {
          console.log('res', res);
          this.isUpadted = true;
        }
      });
    });
  }

  updateDevice(imei: any) {
    this.dialog.open(UpdateDeviceDetailsComponent, {
      width: '50vw',
      data: {
        imeiNumber1: imei,
      },
    });
  }

  viewReport(imei: any) {
    this.dialog.open(ViewReportComponent, {
      width: '80vw',
      data: {
        imeiNumber1: imei,
      },
    });
  }
}
