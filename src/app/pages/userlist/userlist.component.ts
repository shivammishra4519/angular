// userlist.component.ts

import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiServiceService } from 'src/app/services/api-service.service';

interface UserData {
  _id: string;
  userName: string;
  userEmail: string;
  passWord: string;
  mobileNumber: string;
  confirmPassword: string;
  city: string;
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  dataSource = new MatTableDataSource<UserData>(); // Specify the interface for UserData
  displayedColumns: string[] = ['userName', 'userEmail', 'city', 'mobileNumber','Active','Action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ApiServiceService) {
    this.getUser();
  }

  getUser() {
    this.service.getUserlist().subscribe((res) => {
      this.dataSource.data = res as UserData[]; // Cast the response to UserData array
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("worked", res);
    });
  }

  updateStatus(data:any){
    this.service.statusUpadteUser(data).subscribe((res)=>{
      console.log("response",res)
      this.getUser();
    })
  }
}
