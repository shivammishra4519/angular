import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data:any={devices: 0 };


  role: any;
  admin = false;
  user=false;
  distributor=false;
  constructor(private router: Router,private service:ApiServiceService) {
    this.role = service.findRole();
    this.isUser();
    service.viewDevicesUsers().subscribe({
      next:res=>{
        this.data=res;
        console.log(res)
      }
    })
  }

  isUser() {
    if (this.role == 'admin') {
      this.admin = true;
      this.distributor=false
    }else if(this.role=='distributor'){
      this.distributor=true
      this.admin = false;
    }
    
    else {
      this.admin = false;
      this.distributor=false
    }
  }




}
