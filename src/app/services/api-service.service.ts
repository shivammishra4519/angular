import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }
//  url="https://mobilefinder.store/mobi/"
 url="http://localhost:4000/"
  registerUser(data: any) {
    const url = `${this.url}user/register`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.post(url, data, { headers: headers });
  }
  getUserlist() {
    // const url = "http://localhost:4000/user/getuser";
    const url = `${this.url}user/getuser`;
    let header = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`)
    return this.http.post(url, {},{ headers: header })
  }
  login(data: any) {
    const url = "http://localhost:4000/api/login";
    // const url = `${this.url}api/login`;
    return this.http.post(url, data).pipe(
    );
  }
  findRole() {
    const token: any = localStorage.getItem('token');
    const decodeToken: any = jwt_decode.jwtDecode(token) as { [key: string]: any };
    const role = decodeToken.role;
    return role;
  }

  addDevice(data: any) {
    // const url = "http://localhost:4000/api/adddevice";
    const url = `${this.url}api/adddevice`;
    const headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    
    console.log('Request data:', data);
  
    return this.http.post(url, data, { headers: headers }).pipe(
      tap(
        (response) => {
          console.log('API Response:', response);
        },
        (error) => {
          console.error('API Error:', error);
        }
      )
    );
  }

  viewDevice(){
    // const url="http://localhost:4000/api/viewdevice";
    const url = `${this.url}api/viewdevice`;
    const headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.post(url, {}, { headers: headers })
  }

  updateDetails(data:any){
    // const url="http://localhost:4000/api/update";
    const url = `${this.url}api/update`;
    const headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.post(url, data, { headers: headers })
  }

  viewReport(data:any){
    // const url="http://localhost:4000/api/viewreport";
    const url = `${this.url}api/viewreport`;
    const headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.post(url, data, { headers: headers })
  }

  payment(imeiNumber1:any){
    // const url="http://localhost:4000/api/payment";
    const url = `${this.url}api/payment`;
    return this.http.post(url,{ imeiNumber1:imeiNumber1 });
  }

  data:any;

  viewDeviceImei(imeiNumber1: any) {
    // const url = "http://localhost:4000/api/viewdevice/imei";
    const url = `${this.url}api/viewdevice/imei`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.post(url, { imeiNumber1:imeiNumber1 }, { headers: headers });
  }

  updateTransactionId(data:any){
    // const url = "http://localhost:4000/api/payment/update";
    const url = `${this.url}api/payment/update`;
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });
  
    return this.http.post(url, data);
  }

  viewPaymentStatus(imeiNumber1:any){
    // const url="http://localhost:4000/api//user/status";
    const url = `${this.url}api/user/status`;
    return this.http.post(url,{imeiNumber1:imeiNumber1})
  }

  viewDevicesUsers(){
    // const url="http://localhost:4000/admin/view";
    const url = `${this.url}admin/view`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return  this.http.post(url,{},{ headers: headers })
  }
  

  addDistributor(data:any){
    // const url='http://localhost:4000/distributor/register';
    const url = `${this.url}distributor/register`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.post(url, data, { headers: headers });
  }


  viewDistributor(){
    // const url='http://localhost:4000/distributor/get';
    const url = `${this.url}distributor/get`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.post(url, {}, { headers: headers });

  }
  statusUpadte(data:any){
    // const url='http://localhost:4000/distributor/status';
    const url = `${this.url}distributor/status`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.post(url, data, { headers: headers });

  }
  statusUpadteUser(data:any){
    // const url='http://localhost:4000/user/status';
    const url = `${this.url}user/status`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.post(url, data, { headers: headers });

  }

  filteDevices(){
    const url = `${this.url}api/filter/admin`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.post(url, {}, { headers: headers });
  }
  

}
