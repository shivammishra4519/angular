import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  response:any;
  data: any = {};
  receivedForm = this.builder.group({
    ownerName: ['', Validators.required],
    ownerMoblieNumber: ['', Validators.required],
    imeiNumber1: ['', Validators.required],
    imeiNumber2: ['', Validators.required],
    brandName: ['', Validators.required],
    modelName: ['', Validators.required],
    lostDate: ['', Validators.required],
    lastMobileNumber: ['', Validators.required],
    losePlace: ['', Validators.required],
    email: ['', Validators.required],
  });

  constructor(private builder: FormBuilder, private service: ApiServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve imeiNumber1 from the state
    this.data = this.route.snapshot.paramMap.get('imeiNumber1');
    if (this.data) {
      this.viewDetails();
    }
  }

  // calling API 
  viewDetails() {
    this.service.viewDeviceImei(this.data).subscribe((res) => {
      this.data = res;
      // Set the form controls with the received data
      this.receivedForm.setValue({
        ownerName: this.data.ownerName,
        ownerMoblieNumber: this.data.ownerMoblieNumber,
        imeiNumber1: this.data.imeiNumber1,
        imeiNumber2: this.data.imeiNumber2,
        brandName: this.data.brandName,
        modelName: this.data.modelName,
        lostDate: this.data.lostDate,
        lastMobileNumber: this.data.lastMobileNumber,
        losePlace: this.data.losePlace,
        email:this.data.email,
  
      });
      console.log("getting response from API", res);
      console.log("form data", this.receivedForm.value);
    });
  }

  procced() {
  
    // Handle payment logic
    let htmlbody=`
    <html>
    <body>
    <form action='https://secure.payu.in/_payment' method='post' id="payu_form">
    <input type="hidden" name="key" value="vFKE2M" />
    <input type="hidden" name="txnid" value="${this.response.txnid}" />
    <input type="hidden" name="productinfo" value="${this.receivedForm.value.brandName}" />
    <input type="hidden" name="amount" value="1" />
    <input type="hidden" name="email" value="${this.receivedForm.value.email}" />
    <input type="hidden" name="firstname" value="${this.receivedForm.value.ownerName}" />
    <input type="hidden" name="udf1" value="" />
    <input type="hidden" name="udf2" value="" />
    <input type="hidden" name="udf3" value="" />
    <input type="hidden" name="udf4" value="" />
    <input type="hidden" name="udf5" value="" />
    <input type="hidden" name="lastname" value="" />
    <input type="hidden" name="surl" value="http://localhost:4000/api/payment/success" />
    <input type="hidden" name="furl" value="http://localhost:4000/api/payment/failed" />
    <input type="hidden" name="phone" value="9335792497" />
    <input type="hidden" name="hash" value="${this.response.hash}" />
    <input type="submit" value="submit" style="display: none;">
    </form>
    <script type="text/javascript">document.getElementById("payu_form").submit();</script>
</body>
</html>`;
const winUrl = URL.createObjectURL(
  new Blob([htmlbody], { type: "text/html" })
  );
  window.location.href = winUrl;
const obj={
  transactionId:this.response.txnid,
  imeiNumber1:this.receivedForm.value.imeiNumber1
}
  this.service.updateTransactionId(obj).subscribe((res)=>{
    console.log("res")
  })
}

payment(){
  this.service.payment(this.receivedForm.value.imeiNumber1).subscribe((res)=>{
this.response=res;
if(res){
  this.procced()
}
  })
}

}
