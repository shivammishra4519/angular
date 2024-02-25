import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  role: any;
  admin = false;
  user=false;
  distributor=false;
  constructor(private router: Router, private service: ApiServiceService) {
    this.role = service.findRole();
    this.isUser();
  }

  isUser() {
    if (this.role == 'admin') {
      this.admin = true;
      this.distributor=false
      this.user=false;
    }else if(this.role=='distributor'){
      this.distributor=true
      this.admin = false;
      this.user=false;
    }
    
    else if(this.role=='user') {
      this.admin = false;
      this.distributor=false
      this.user=true;

    }
  }
  logOut() {
    this.router.navigate(['/login'])
    localStorage.clear()
  }
}
