import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { flatMap } from 'rxjs/operators';
import { parseNumbers } from 'xml2js/lib/processors';
import {Banners} from '../interfaces/vehiclesInterface'
import { InforDataService} from '../service/infor-data.service'
@Component({
  selector: 'app-finance-calculator',
  templateUrl: './finance-calculator.component.html',
  styleUrls: ['./finance-calculator.component.css']
})
export class FinanceCalculatorComponent implements OnInit {

  Car_Price: number = 0;
  Interest_Rate: number = 9;
  Months: number = 60;
  Deposit: number = 0;
  Residual_Rate: number = 0;
  Residual_Amount: number = 0;
  Total_Interest: number = 0;
  Total_Payment: number = 0;
  Estimated_Instal: number = 0;
  banner:Banners[] = []
  months: number[]=[12,24,36,48,60,72]
  constructor(private vehicleData:InforDataService,private router: Router) { }

  ngOnInit(): void {
    this.banner = this.vehicleData.getBanners()
    document.addEventListener('click', this.offClickHandler.bind(this));
  }


  totalInterest() {
    this.Total_Interest = this.Total_Payment + this.Deposit - this.Car_Price;
  }

  totalPayment() {
    this.Total_Payment = this.Estimated_Instal * this.Months
  }

 

  EstimatedInstal() 
  {  
    // let pvif =(Math.pow(1 + ((this.Interest_Rate / 100) / 12), this.Months));
    let rate = (this.Interest_Rate / 100) / 12;
    let montly = rate * ((this.Residual_Amount * Math.pow(1 + rate, this.Months) - this.Residual_Amount) + (this.Car_Price - this.Deposit - this.Residual_Amount) * Math.pow(1 + rate, this.Months))
      / ((Math.pow(1 + (rate), this.Months) - 1) * (1 + (rate * 0)));
    //var sssss = (this.Car_Price*((this.Interest_Rate / 100)))/(pvif-1);
    if (this.Residual_Amount > 0) {
      this.Residual_Rate = parseNumbers(((this.Residual_Amount / this.Car_Price) * 100).toFixed(2))
    }
    if (typeof montly == 'number' && !isNaN(montly) && isFinite(montly)) {
      var Residual_Amount= this.Residual_Amount;
      if(this.Residual_Amount){

      }else{
        Residual_Amount=0;
      }
      var Deposit= this.Deposit;
      if(this.Deposit){

      }else{
        Deposit=0;
      }
      this.Estimated_Instal = Math.round(montly);
      let dummyTotalpayment = Math.round(montly * this.Months) - Residual_Amount;
      //this.Depositpercent=Math.round((Deposit/this.Car_Price  ) *100)
     var l=(dummyTotalpayment + parseFloat(Deposit.toString()))
     var k=(dummyTotalpayment + parseFloat(Deposit.toString())) - this.Car_Price
     var j=(2 *  parseFloat(Residual_Amount.toString()))
     this.Total_Interest= k+j
      //this.Total_Interest = Math.round((dummyTotalpayment + this.Deposit) - this.Car_Price + (2 *  parseFloat(Residual_Amount.toString())))
      this.Total_Payment = Math.round(montly * this.Months) + parseFloat(Residual_Amount.toString())

    }
    else {
      this.Estimated_Instal = 0
      this.Total_Payment = 0
      this.Total_Interest = 0
    }
   }

   onKey(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if(charCode == 188 || charCode == 110 || charCode == 119 || charCode == 44 || charCode == 46){
     
    }else{
      if(this.Interest_Rate){
      var f= this.Interest_Rate.toString();
     f=f.replace(",",".");
     this.Interest_Rate= parseNumbers(f);

     if(this.Interest_Rate<=100){

     }else{
      this.Interest_Rate=100;
     }


      }
    this.EstimatedInstal()
    }
  }

  calculatorResdifual(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if(charCode == 188 || charCode == 110 || charCode == 119 || charCode == 44 || charCode == 46){
     
    }else{
    if(this.Residual_Rate){
      var f= this.Residual_Rate.toString();
     f=f.replace(",",".");
     this.Residual_Rate= parseNumbers(f);
      }
      if (this.Residual_Rate <= 60) {
    
      }else{
       this.Residual_Rate=parseNumbers(this.Residual_Rate.toString().slice(0, -1));
      }
    this.Residual_Amount = Math.round((this.Residual_Rate / 100) * this.Car_Price)
    this.EstimatedInstal()
    }
  }
  calculatorDeposit(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if(charCode == 188 || charCode == 110 || charCode == 119 || charCode == 44 || charCode == 46){
     
    }else{


    if(this.Deposit){
      var f= this.Deposit.toString();
     f=f.replace(",",".");
     this.Deposit= parseNumbers(f);
      }
   if (this.Deposit <= (this.Car_Price)) {
    
   }else{
    this.Deposit=parseNumbers(this.Deposit.toString().slice(0, -1));
   }
   this.EstimatedInstal()
    }
  }
  
  //calculatorResdifual() 
  //{
  //  this.Residual_Amount = (this.Residual_Rate / 100) * this.Car_Price
  //  this.EstimatedInstal()
  //}n
  calculatorResdifualPercentage() 
  {
    this.Residual_Rate = Math.round((this.Residual_Amount / this.Car_Price) * 100)
    this.EstimatedInstal()
  }

  filterByDealer(dealershipName:string)
  {
    this.router.navigate(['/listing-dealer', dealershipName ]).then(() => {
     
    });

  }

  viewMonths()
  {
    if($("#monthDiv").attr("style") == "display: flex;")
    {
      $("#monthDiv").hide()
    }
    else
    {
      $("#monthDiv").css("display", "flex")
    }
  }
  selectMonths(number:number)
  {
    this.Months = number
    this.EstimatedInstal()
    $("#monthDiv").css("display","none")
  }

  isNumber(num: any) {
    if(typeof num == "undefined")
    {
      return 0
    }
    else
    {
      num = num.toString()
    }
    if(num.includes(","))
    {
      num = num.substring(0,num.indexOf(","))
    }
    
    var result = "";
    var gap_size = 3;
    var numb = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return numb;
  }

  offClickHandler(event:any) {
    if(!$("#monthDiv:hover").length && !$("#monthDi:hover").length)
    {
      $("#monthDiv").hide()
    }
  }
  DepositnumberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (this.Deposit > (this.Car_Price)) {
      return false;

    }
    if( charCode == 44 || charCode == 46){
      return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
     
      return false;
    }
    return true;
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if( charCode == 44 || charCode == 46){
      return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  isThanCarPrice(event:any):boolean
  {
    if(this.Residual_Amount  > this.Car_Price)
    {
      return false
    }
    else
    {
      return true
    }
  }

}
