import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-add-distributor',
  templateUrl: './add-distributor.component.html',
  styleUrls: ['./add-distributor.component.css']
})
export class AddDistributorComponent {
active=[true,false]
constructor(private builder:FormBuilder,private service:ApiServiceService){}
distributor=this.builder.group({
  name:this.builder.control('',Validators.required),
  email:this.builder.control('',Validators.required),
  number:this.builder.control('',Validators.required),
  address:this.builder.control('',Validators.required),
  password:this.builder.control('',Validators.required),
  active:this.builder.control(true,Validators.required),
})

addDistributor(){
  console.log("data",this.distributor.value)
  this.service.addDistributor(this.distributor.value).subscribe({
    next:(data)=>{
      alert('user added')
    },
    error:(error)=>{
      console.log("error",error);
    }
  })
}

}
