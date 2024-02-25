import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-view-distributor',
  templateUrl: './view-distributor.component.html',
  styleUrls: ['./view-distributor.component.css']
})

export class ViewDistributorComponent {
  dataSource = new MatTableDataSource<distributorDetails>(); // Specify the interface for UserData
  displayedColumns: string[] = ['Name', 'Number','Address','Email','Active','Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private service:ApiServiceService){
    this.getDistributor()
  }
  getDistributor() {
    this.service.viewDistributor().subscribe((res: any) => {
      this.dataSource.data = res as distributorDetails[]; // Cast the response to UserData array
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  updateStatus(data:any){
this.service.statusUpadte(data).subscribe((res)=>{
  console.log("response",res)
  this.getDistributor();
})
  }


  
  
}


interface distributorDetails {
  name:string;
  number:string;
  address:string;
  email:string;
  active:boolean;
}
