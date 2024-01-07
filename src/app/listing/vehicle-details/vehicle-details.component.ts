import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service'
import { InforDataService } from '../../service/infor-data.service'
import { Vehicles, vehicleObject, Banners } from '../../interfaces/vehiclesInterface'
import { ViewChild } from '@angular/core'
import { DragScrollComponent } from 'ngx-drag-scroll';
import { ValidationServiceService } from '../../service/validation-service.service'
import { flatten } from '@angular/compiler';
import { FormGroup } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import * as xml2js from 'xml2js';
import { parseNumbers } from 'xml2js/lib/processors';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})

export class VehicleDetailsComponent implements OnInit {
  vehicleDetailArray: Vehicles[] = [];
  SimilarCars: Vehicles[] = [];
  vehicleDetail = {} as Vehicles;
  numberOfSlide: number[] = []
  PMTT: number = 0
  Name: string = ""
  City: string[]
  Location: string = "Location"
  totalInterest: number
  totalPayment: number
  vehicleID: string = ""
  Surname: string = ""
  Number: string = ""
  Mail: string = ""
  Message: string = ""
  Finance: boolean = false
  Insurance: boolean = false
  TestDrive: boolean = false
  showNameError: boolean = false
  showSurnameError: boolean = false
  showContactError: boolean = false
  showEmailError: boolean = false
  showLocationError: boolean = false
  showMessageError: boolean = false
  successfulPopUp: boolean = true
  numberPhone: string = "012 - Reveal Number"
  returnHrefNumber: boolean = false
  Car_Price: number = 0;
  Interest_Rate: number = 9;
  Months: number = 60;
  Deposit: number = 0;
  Depositpercent: number = 0.0;
  Residual_Rate: number = 0;
  Residual_Amount: number = 0;
  Total_Interest: number = 0;
  Total_Payment: number = 0;
  Estimated_Instal: number = 0;
  banner: Banners[] = []
  start: number = 0
  end: number = 4
  months: number[] = [12, 24, 36, 48, 60, 72]
  @ViewChild('nav', { read: DragScrollComponent, static: true }) ds: DragScrollComponent;
  constructor(private http: HttprequestService,
    private vehicleData: InforDataService,
    private validation: ValidationServiceService, private router: Router, private _Activatedroute: ActivatedRoute) {
    document.addEventListener('click', this.offClickHandler.bind(this));
  }

  hideScrollBar: boolean = true

  ngOnInit(): void {
    this.banner = this.vehicleData.getBanners()
    let searchParams = new URLSearchParams(this.router.url)
    let vehicleID = this._Activatedroute.snapshot.paramMap.get('vehicleID');
    this.vehicleData.setVehicleDetails(vehicleID)
    this.getVehicleDetails()
    this.City = this.vehicleData.getAllcities()
  }

  getAllStartUpFunction(option: number, assingToVehicleDetails: boolean) {
    switch (option) {
      case 1:
        this.http.getVehicleListings("EdealerWebsiteFeed.xml").subscribe(reponse => {
          this.convertXMLToObject(2, reponse, "EdealerWebsiteFeed.xml", assingToVehicleDetails)
        }
          , errr => {
            this.getAllStartUpFunction(2, assingToVehicleDetails)
            this.http.sendErrorMessage("Something wrong with api EdealerWebsiteFeed")
          })
        break;
      case 2:
        this.http.getVehicleListings("EdealerWebsiteFeed3.xml").subscribe(reponse => {
          this.convertXMLToObject(3, reponse, "EdealerWebsiteFeed3.xml", assingToVehicleDetails)
        }
          , errr => {
            this.getAllStartUpFunction(3, assingToVehicleDetails)
            this.http.sendErrorMessage("Something wrong with api EdealerWebsiteFeed3")
          })
        break;
      case 3:
        this.http.getVehicleListings("EdealerWebsiteFeed2.xml").subscribe(reponse => {
          this.convertXMLToObject(4, reponse, "EdealerWebsiteFeed2.xml", assingToVehicleDetails)
        }, errr => {
          this.getAllStartUpFunction(4, assingToVehicleDetails)
          this.http.sendErrorMessage("Something wrong with EdealerWebsiteFeed2")
        })
        break;
      case 4:
        this.http.getVehicleListings("EdealerWebsiteFeed1.xml").subscribe(reponse => {
          this.convertXMLToObject(5, reponse, "EdealerWebsiteFeed1.xml", assingToVehicleDetails)
        }, errr => {
          this.getAllStartUpFunction(1, assingToVehicleDetails)
          this.http.sendErrorMessage("Something wrong with EdealerWebsiteFeed1")
        })
        break;
      case 5:
        this.http.getVehicleListing().subscribe(reponse => {
          this.vehicleData.setAllVehicle(reponse.aaData.sort(() => Math.random() - 0.5))
          this.SimilarCars = this.vehicleData.getSimilarVehicle(this.vehicleID).sort(() => Math.random() - 0.5)
          if (assingToVehicleDetails) {
            this.vehicleDetail = this.vehicleData.getVehicleDetailsPage(this.vehicleID)
          }
        }, errr => {
          this.getAllStartUpFunction(1, assingToVehicleDetails)
          this.http.sendErrorMessage("Something wrong with api")
        })
        break;
    }
  }

  convertXMLToObject(option: number, reponse: any, xmlName: string, assingToVehicleDetails: boolean) {
    var parseString = require('xml2js').processors.stripPrefix;
    const p: xml2js.Parser = new xml2js.Parser({ explicitArray: false });
    p.parseString(reponse, (err: any, result: any) => {
      if (err) {
        this.getAllStartUpFunction(option, assingToVehicleDetails)
        this.http.sendErrorMessage(`Something wrong when converting ${xmlName}, error ${err}`)
      }
      else {
        let vehicleData: Vehicles[] = result.WCFVehicleDetails.aaData.VehicleDetails;
        this.vehicleData.setAllVehicle(vehicleData)
        this.SimilarCars = this.vehicleData.getSimilarVehicle(this.vehicleID).sort(() => Math.random() - 0.5)
        if (assingToVehicleDetails) {
          this.vehicleDetail = this.vehicleData.getVehicleDetailsPage(this.vehicleID)
          $(".loader_div").css("display", "none")
        }
      }
    })
  }



  offClickHandler(event: any) {
    if (!$("#Location:hover").length && !$("#Locatio:hover").length) {
      $("#Location").hide()
    }
    if (!$("#monthDiv:hover").length && !$("#monthDi:hover").length) {
      $("#monthDiv").hide()
    }
  }
  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveTo(index: number) {
    this.ds.moveTo(index);
  }
  getVehicleDetails() {
    this.vehicleID = this.vehicleData.getVehicleDetails()
    $(".loader_div").css("display", "flex")
    this.http.getVehicleDeatails(this.vehicleData.getVehicleDetails()).subscribe(response => {

      this.vehicleDetailArray = response.aaData

      if (this.vehicleDetailArray.length > 0) {

        this.vehicleDetail = this.vehicleDetailArray[0]

        if (!this.vehicleDetail.vehicleImageList.some(item => item.IMAGEANGLE == "Side view of the vehicle – right hand side")) {
          this.vehicleDetail.vehicleImageList[0].IMAGEANGLE = "Side view of the vehicle – right hand side"
        }

        let lengthOfArray = Math.ceil((this.vehicleDetail.vehicleImageList.length / 4))
        this.numberOfSlide = Array.from({ length: lengthOfArray }, () => Math.floor(Math.random() * lengthOfArray))
        this.PMTT = Math.ceil((0.09 / 12) * (0 + parseInt(this.vehicleDetail.PRICE) *
          Math.pow(1 + (0.09 / 12), 60)) / ((Math.pow(1 + (0.09 / 12), 60) - 1) * (1 + (0.09 / 12) * 0)));
        this.Car_Price = parseFloat(this.vehicleDetail.PRICE)
        this.getAllStartUpFunction(this.vehicleData.startToCallFeed(), false)
        let phoneNumber = this.vehicleDetail.TELEPHONENUMBER != "undefined" && this.vehicleDetail.TELEPHONENUMBER.length ? this.vehicleDetail.TELEPHONENUMBER : this.vehicleDetail.PHONENUMBER
        this.numberPhone = phoneNumber.substring(0, 3) + " - Reveal Number"
        this.EstimatedInstal()
        $(".loader_div").css("display", "none")
      }
      else {
        //this.getAllStartUpFunction(1, true)
        this.navigateToNoVehicleFound()
      }

    },
      error => this.navigateToNoVehicleFound()
    )
  }

  navigateToNoVehicleFound() {
    const angularRoute = window.location.host;
    const angularProtocol = window.location.protocol;
    window.open(`${angularProtocol}//${angularRoute}//no-vehicle-found;`, "_self");
  }

  FinancerCalculator(price: Number, Interest: Number, Period: string, depositor: string) {

  }

  slideConfig = { "slidesToShow": 5, "slidesToScroll": 4 };
  breakpoint(e: any) {
  }

  afterChange(e: any) {
  }

  beforeChange(e: any) {
  }
  slickInit(e: any) {
  }

  revelNumber() {
    let phoneNumber = this.vehicleDetail.TELEPHONENUMBER != "undefined" && this.vehicleDetail.TELEPHONENUMBER.length ? this.vehicleDetail.TELEPHONENUMBER : this.vehicleDetail.PHONENUMBER
    this.numberPhone = phoneNumber
    if (!this.returnHrefNumber) {
      this.http.trackerRevelNumber(this.vehicleDetail.VEHICLEID.toString(), "Phone", this.numberPhone).subscribe(response => {
        this.returnHrefNumber = true
      })
    }
  }
  OpenEnquire() {
    $("#enquiry_form").attr("style", "opacity: 1; display: block; width: auto; transition: opacity 400ms ease 0s;")
  }
  CloseEnquire() {
    $("#enquiry_form").removeAttr("style")
  }
  SendEnquery() {

    let Name = $("#Name").val();
    let surname = $("#Surname").val();
    let contact = $("#Contact-Number").val();
    let mail = $("#E-Mail").val();
    let message = $("#Message").val();
    let location = $("#location").val();
    this.Finance = $("#FinanceID").is(":checked")
    this.Insurance = $("#InsuranceID").is(":checked")
    this.TestDrive = false
    this.showNameError = this.validation.lengthOfInput("Name", 1, "Please Enter Name") ? false : true
    this.showSurnameError = this.validation.lengthOfInput("Surname", 1, "Please Enter Surname") ? false : true
    this.showContactError = this.validation.validateNumberPhones("Contact-Number") ? false : true
    this.showEmailError = this.validation.validateEmail("E-Mail") ? false : true
    this.showMessageError = this.validation.validateDescrtion("Message", 1, "Please Enter Message") ? false : true
    this.showLocationError = this.Location != "Location" ? false : true
    if (!this.showNameError && !this.showSurnameError && !this.showContactError && !this.showEmailError && !this.showMessageError && !this.showLocationError) {
      $(".loader_div").css("display", "flex")
      this.http.sendEnquiry(this.vehicleDetail.DEALERID, this.vehicleDetail.VEHICLEID, this.vehicleDetail.VEHICLEID, Name, surname, mail,
        contact, message, this.vehicleDetail.MAKE, this.vehicleDetail.MODEL, this.vehicleDetail.PRICE, this.vehicleDetail.DEALERNAME,
        this.vehicleDetail.MILEAGE, this.vehicleDetail.YEAR, this.Finance, this.Insurance, this.TestDrive, this.Location).subscribe((response: any) => {

          if (response.status == 200) {
            $("#enquiry_form").removeAttr("style")
          }
          $("#enquiry_form").removeAttr("style")
          $("#Name").val("");
          $("#E-Mail").val("")
          $("#Surname").val("");
          $("#Contact-Number").val("");
          $("#FinanceID").prop("checked", false)
          $("#InsuranceID").prop("checked", false)
          $("#TestDriveID").prop("checked", false)
          $("#Message").val("");
          $(".loader_div").css("display", "none")
          this.successfulPopUp = false;
        })
    }
  }
  showCalculator() {
    $("#calculatorDiv").show().parent().css("display", "flex")
    $("#hideCalcula").show()
    $("#hideCalcula > a").show()
    $("#showCalcula").hide()
  }
  hideCalculator() {
    $("#calculatorDiv").hide().parent().css("display", "none")
    $("#hideCalcula").hide()
    $("#showCalcula").show()
  }

  EstimatedInstal() {
    // let pvif =(Math.pow(1 + ((this.Interest_Rate / 100) / 12), this.Months));
    let rate = (this.Interest_Rate / 100) / 12;
    let montly = rate * ((this.Residual_Amount * Math.pow(1 + rate, this.Months) - this.Residual_Amount) + (this.Car_Price - this.Deposit - this.Residual_Amount) * Math.pow(1 + rate, this.Months))
      / ((Math.pow(1 + (rate), this.Months) - 1) * (1 + (rate * 0)));
    //var sssss = (this.Car_Price*((this.Interest_Rate / 100)))/(pvif-1);
    if (this.Residual_Amount > 0) {
      this.Residual_Rate = ((this.Residual_Amount / this.Car_Price) * 100)
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
      this.Depositpercent=Math.round((Deposit/this.Car_Price  ) *100)
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
  calculatorResdifualPercentage() {
    if (this.Residual_Amount > (this.Car_Price* 0.6)) {
    }else{
    this.Residual_Rate = Math.round((this.Residual_Amount / this.Car_Price) * 100)
    this.EstimatedInstal()
    }
  }
  isNumber(num: any) {
    if (typeof num == "undefined") {
      return 0
    }
    else {
      num = num.toString()
    }
    if (num.includes(",")) {
      num = num.substring(0, num.indexOf(","))
    }

    var result = "";
    var gap_size = 3;
    var numb = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return numb;
  }

  imageSelected(path: string, number: number) {

    $(".mainSlide").removeClass("active")
    $("#imageID" + number).addClass("active")

  }

  redirectToComponents(vehicleID: string) {
    this.vehicleData.setVehicleDetails(vehicleID)
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`/Vehicle-details`, { vehicleID: vehicleID }])
  }

  showCities() {

    if ($("#Location").attr("style") == "display: flex;") {
      $("#Location").hide()
    }
    else {
      $("#Location").css("display", "flex")
    }
  }
  selectCity(city: string) {
    this.Location = city;
    $("#Location").css("display", "none")
  }

  moveright() {
    if (this.end < 12) {
      this.start += 4
      this.end += 4
    }
    else {
      this.start = 0
      this.end = 4
    }
    if (window.navigator.userAgent.toLowerCase().includes("mobi")) {
      let top = document.getElementById('SimilarCars');
      if (top !== null) {
        top.scrollIntoView();
        top = null;
      }
    }
  }
  moveleft() {
    if (this.start > 0) {
      this.start -= 4
      this.end -= 4
    }
    else {
      this.start = 8
      this.end = 12
    }
    if (window.navigator.userAgent.toLowerCase().includes("mobi")) {
      let top = document.getElementById('SimilarCars');
      if (top !== null) {
        top.scrollIntoView();
        top = null;
      }
    }
  }
  viewMonths() {

    if ($("#monthDiv").attr("style") == "display: flex;") {
      $("#monthDiv").hide()
    }
    else {
      $("#monthDiv").css("display", "flex")
    }
  }
  selectMonths(number: number) {
    this.Months = number
    this.EstimatedInstal()
    $("#monthDiv").css("display", "none")
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
  isThanCarPrice(event: any): boolean {

    if (this.Residual_Amount > (this.Car_Price* 0.6)) {
      return false
    }
    else {
      return true
    }
  }
  sortyByAccessories(accessory: string) {
    this.router.navigate(["listing", { accessory: accessory }])
  }
  closeSuccessfuly() {
    this.successfulPopUp = true
  }

  makeUpperCaseAfterCommas(str: string) {
    if (str.length > 0) {
      str = str[0].toUpperCase() + str.substr(1)
    }
    return str
  }
}
