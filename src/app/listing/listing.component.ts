import { Component, OnInit } from '@angular/core';
import { InforDataService } from '../service/infor-data.service'
import { vehicleObject, Vehicles, BodyType } from '../interfaces/vehiclesInterface'
import { HttprequestService } from '../service/httprequest.service'
import { flatten } from '@angular/compiler';
import { EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { flatMap, switchMap } from 'rxjs/operators';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  p: number = 1
  // @Output() p =  new EventEmitter<number>();
  //@Output() pageBoundsCorrection: EventEmitter<any> = new EventEmitter();
  vehicleData: Vehicles[] = [];
  dealerData: Vehicles
  searchInput: any;
  totalLength: any;
  delearFilter: boolean = false
  makes: string[] = [];
  model: string[] = [];
  colors: string[] = [];
  minYears: number[] = [];
  maxYears: number[] = []
  minPrice: number[] = [];
  maxPrice: number[] = []
  minKm: number[] = [];
  maxKM: number[] = [];
  FuelType: string[] = []
  showmakeOption: boolean = true
  showModelOption: boolean = false
  showMinYearOption: boolean = false
  showMaxYearOption: boolean = false
  showMinPriceOption: boolean = false
  showMaxPriceOption: boolean = false
  showMinKmOption: boolean = false
  showMaxKmOption: boolean = false
  showFuelOption: boolean = false
  showTransmissionOption: boolean = false
  showColorOption: boolean = false
  viewGrid: boolean = true
  grid: boolean = true
  vehicleInStock: number;
  showEmailDetails: string = "Show E-Mail"
  showwNumberDeatails: string = "087 - Show Number"
  returnHrefNumber: boolean = false
  returnHrefEmail: boolean = false
  eDealerPortal: string = ""
  filterOption = {
    make: "All Makes",
    model: "All Models",
    color: "Colour",
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    minYear: 'Min Year',
    maxYear: 'Max Year',
    minKM: 'Min KM',
    maxKM: 'Max KM',
    FuelType: 'Fuel Types',
    transmission: 'Transmission',
    bodyType: 'Body Types'
  }
  dealername:string=""
  setinterval:any
  tempSearch:string =""
  BodyType: BodyType[] = [{'body':"Sedan", 'index':0 },{'body': "Coupe", 'index':5 },{'body':"SUV",'index':1 },{'body': "Hatchback",'index':2}, {'body':"Convertible", 'index':4 }, 
  {'body':"Bakkie", 'index':7 }] 
  sortBY: string = "Default: Most Relevant"
  constructor(
    private vehicleDataService: InforDataService, private http: HttprequestService,
    private route: Router, private activated: ActivatedRoute) {

  }


  ngOnInit(): void {


    const accessory = this.activated.snapshot.paramMap.get("accessory")
    if (accessory != null) {
      this.searchInput = accessory;
    }
    //const dealername:string = "Citton Cars"
    document.addEventListener('click', this.offClickHandler.bind(this));
    this.vehicleData = this.vehicleDataService.getAllVehicle()
    if (this.vehicleData.length  <=0) {
   //   $(".loader_div").css("display","flex")
      this.getAllStartUpFunction(this.vehicleDataService.startToCallFeed())
     
    }
    else 
    {
     
      this.setDataToUser()

    }
  }

  getAllStartUpFunction(option: number) {
    switch (option) {
      case 1:
        this.http.getVehicleListings("EdealerWebsiteFeed.xml").subscribe(reponse => {
          this.convertXMLToObject(2, reponse, "EdealerWebsiteFeed.xml")
        }
          , errr => {
            this.getAllStartUpFunction(2)
            this.http.sendErrorMessage("Something wrong with api EdealerWebsiteFeed")
          })
        break;
      case 2:
        this.http.getVehicleListings("EdealerWebsiteFeed3.xml").subscribe(reponse => {
          this.convertXMLToObject(3, reponse, "EdealerWebsiteFeed3.xml")
        }
          , errr => {
            this.getAllStartUpFunction(3)
            this.http.sendErrorMessage("Something wrong with api EdealerWebsiteFeed3")
          })
        break;
      case 3:
        this.http.getVehicleListings("EdealerWebsiteFeed2.xml").subscribe(reponse => {
          this.convertXMLToObject(4, reponse, "EdealerWebsiteFeed2.xml")
        }, errr => {
          this.getAllStartUpFunction(4)
          this.http.sendErrorMessage("Something wrong with EdealerWebsiteFeed2")
        })
        break;
      case 4:
        this.http.getVehicleListings("EdealerWebsiteFeed1.xml").subscribe(reponse => {
          this.convertXMLToObject(5, reponse, "EdealerWebsiteFeed1.xml")
        }, errr => {
          this.getAllStartUpFunction(5)
          this.http.sendErrorMessage("Something wrong with EdealerWebsiteFeed1")
        })
        break;
      case 5:
        this.http.getVehicleListing().subscribe(reponse => {
          this.vehicleData = reponse.aaData.sort(() => Math.random() - 0.5)
          this.vehicleDataService.setAllVehicle(this.vehicleData)
          this.setDataToUser()
        },
          errr => {
            this.getAllStartUpFunction(1)
            this.http.sendErrorMessage("Something wrong with api")
          })
        break;
    }
  }

  convertXMLToObject(option: number, reponse: any, xmlName: string) {
    var parseString = require('xml2js').processors.stripPrefix;
    const p: xml2js.Parser = new xml2js.Parser({ explicitArray: false });
    p.parseString(reponse, (err: any, result: any) => {
      if (err) {
        this.getAllStartUpFunction(option)
        this.http.sendErrorMessage(`Something wrong when converting ${xmlName}, error ${err}`)
      }
      else {
        let vehicleData: Vehicles[] = result.WCFVehicleDetails.aaData.VehicleDetails;
        this.vehicleDataService.setAllVehicle(vehicleData)
        this.setDataToUser()
      }
    })
  }
  setDataToUser()
  {
      this.dealername = this.activated.snapshot.paramMap.get('dealershipname') || "";
      this.vehicleData = this.vehicleDataService.getAllVehicle()
      this.totalLength = this.vehicleData.length
      this.makes = this.vehicleDataService.getAllMakes()
      this.model = this.vehicleDataService.getAllModel()
      this.colors = this.vehicleDataService.getColor()
      this.minPrice = this.vehicleDataService.getMinPrice();
      this.maxPrice = this.vehicleDataService.getMaxPrice();
      this.minYears = this.vehicleDataService.generateArrayOfYears();
      this.maxYears = this.minYears
      this.minKm = this.vehicleDataService.getMinKM();
      this.maxKM = this.vehicleDataService.getMaxKM();
      this.FuelType = this.vehicleDataService.getFuelType();

      let filters = this.vehicleDataService.getFilterDateFromHomePage();
      if (filters[0].length) {
        this.filterOption.make = filters[0]
        this.filterBy("make", this.filterOption.make)
      }
      if (filters[1].length) {
        this.filterOption.model = filters[1]
        this.filterBy("model", this.filterOption.model)
      }
      if (filters[2].toString().length) {
        this.filterOption.maxPrice = filters[2]
        this.filterBy("maxPrice", this.filterOption.maxPrice)
      }
      if (this.vehicleDataService.getBodyType() != 10) {
        this.filterBy("bodytype", this.vehicleDataService.getBodyType())
      }
      if( this.dealername  != "" &&  this.dealername  != null)
      {
        this.getDealerDetails( this.dealername )
        this.delearFilter = true
      }
      else {
        this.dealerData = this.vehicleDataService.getAllVehicle()[0]
      }
   
  }


  getDealerDetails(dealerName: string) {
    this.vehicleData = this.vehicleDataService.getDealerVehicles(dealerName)
    this.dealerData =  this.vehicleData[0]
    let phoneNumber = this.dealerData.TELEPHONENUMBER.length ? this.dealerData.TELEPHONENUMBER : this.dealerData.PHONENUMBER
    this.showwNumberDeatails = phoneNumber.substr(0, 3) + " Show Number"
  }

  offClickHandler(event: any) {

    if (!$("#makeDiv:hover").length && !$("#makeDi:hover").length) {
      $("#makeDiv").hide()
    }
    if (!$("#modelDiv:hover").length && !$("#modelDi:hover").length) {
      $("#modelDiv").hide()
    }
    if (!$("#minYearDiv:hover").length && !$("#minYearDi:hover").length) {
      $("#minYearDiv").hide()
    }
    if (!$("#maxYearDiv:hover").length && !$("#maxYearDi:hover").length) {
      $("#maxYearDiv").hide()
    }
    if (!$("#minPriceDiv:hover").length && !$("#minPriceDi:hover").length) {
      $("#minPriceDiv").hide()
    }
    if (!$("#maxPriceDiv:hover").length && !$("#maxPriceDi:hover").length) {
      $("#maxPriceDiv").hide()
    }
    if (!$("#minKMDiv:hover").length && !$("#minKMDi:hover").length) {
      $("#minKMDiv").hide()
    }
    if (!$("#maxKMDiv:hover").length && !$("#maxKMDi:hover").length) {
      $("#maxKMDiv").hide()
    }
    if (!$("#fuelDiv:hover").length && !$("#fuelDi:hover").length) {
      $("#fuelDiv").hide()
    }
    if (!$("#transmissionDiv:hover").length && !$("#transmissionDi:hover").length) {
      $("#transmissionDiv").hide()
    }
    if (!$("#colorDiv:hover").length && !$("#colorDi:hover").length) {
      $("#colorDiv").hide()
    }
    if (!$("#sortBYDiv:hover").length && !$("#sortBYDi:hover").length) {
      $("#sortBYDiv").hide()
    }
    if (!$("#bodyTypeDiv:hover").length && !$("#bodyTypeDi:hover").length) {
      $("#bodyTypeDiv").hide()
    }

  }
  
  filterBy(option: string, data: any) {
    this.vehicleData = this.vehicleDataService.filterBy(option, data)

    switch (option) {
      case "make":
        this.filterOption.make = data;
        if (data == "All Makes") {
          this.model = this.vehicleDataService.getAllModel()
        }
        else {
          this.model = this.vehicleDataService.sortModelByMake(data)
        }
        this.filterOption.model = "All Models"

        $("#makeDiv").css("display", "none")
        break;
      case "model":
        this.filterOption.model = data;
        $("#modelDiv").css("display", "none")
        break;
      case "color":
        this.filterOption.color = data;
        $("#colorDiv").css("display", "none")
        break;
      case "minPrice":
        this.filterOption.minPrice = data;
        $("#minPriceDiv").css("display", "none")
        break;
      case "maxPrice":
        this.filterOption.maxPrice = data;
        $("#maxPriceDiv").css("display", "none")
        break;
      case "maxYear":
        this.filterOption.maxYear = data;
        $("#maxYearDiv").css("display", "none")
        break;
      case "minYear":
        this.filterOption.minYear = data;
        $("#minYearDiv").css("display", "none")
        break;
      case "maxKM":
        this.filterOption.maxKM = data;
        $("#maxKMDiv").css("display", "none")
        break;
      case "minKM":
        this.filterOption.minKM = data;
        $("#minKMDiv").css("display", "none")
        break;
      case "fuel":
        this.filterOption.FuelType = data;
        $("#fuelDiv").css("display", "none")
        break;
      case "transmission":
        this.filterOption.transmission = data;
        $("#transmissionDiv").css("display", "none")
        break;
      case "bodytype":
        this.filterOption.bodyType = this.BodyType.find(x => x.index == data)?.body || 'Body Types';
        this.controlDropDown("bodyTypeDiv")
        break;
    }
    this.p = 1
  }
  
  showOption(option: string) {
    switch (option) {
      case "make":
        this.controlDropDown("makeDiv")
        break;
      case "model":
        this.controlDropDown("modelDiv")
        break;
      case "color":
        this.controlDropDown("colorDiv")
        break;
      case "minPrice":
        this.controlDropDown("minPriceDiv")
        break;
      case "maxPrice":
        this.controlDropDown("maxPriceDiv")
        break;
      case "maxYear":
        this.controlDropDown("maxYearDiv")
        break;
      case "minYear":
        this.controlDropDown("minYearDiv")
        break;
      case "maxKM":
        this.controlDropDown("maxKMDiv")
        break;
      case "minKM":
        this.controlDropDown("minKMDiv")
        break;
      case "fuel":
        this.controlDropDown("fuelDiv")
        break;
      case "transmission":
        this.controlDropDown("transmissionDiv")
        break;
      case "bodytype":
        this.controlDropDown("bodyTypeDiv")
        break;
    }

  }

  controlDropDown(div: string) {
    if ($("#" + div).attr("style") == "display: flex;") {
      $("#" + div).hide()
    }
    else {
      $("#" + div).css("display", "flex")
    }
  }

  clearSearch() {
    this.filterOption = {
      make: "All Makes",
      model: "All Models",
      color: "Colour",
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      minYear: 'Min Year',
      maxYear: 'Max Year',
      minKM: 'Min KM',
      maxKM: 'Max KM',
      FuelType: 'Fuel Types',
      transmission: 'Transmission',
      bodyType: "Body Types"
    }
    this.model = this.vehicleDataService.getAllModel()
    this.vehicleDataService.clearSearch()
    this.vehicleDataService.setBodyType(10)
    this.vehicleData = this.vehicleDataService.getAllVehicle()
    this.route.navigate(['/listing']);
  }

  clearSearch2() {
    this.filterOption = {
      make: "All Makes",
      model: "All Models",
      color: "Colour",
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      minYear: 'Min Year',
      maxYear: 'Max Year',
      minKM: 'Min KM',
      maxKM: 'Max KM',
      FuelType: 'Fuel Types',
      transmission: 'Transmission',
      bodyType: "Body Types"
    }
    this.model = this.vehicleDataService.getAllModel()
    this.vehicleDataService.clearSearch()
    this.vehicleDataService.setBodyType(10)
    this.vehicleData = this.vehicleDataService.getAllVehicle()

  }

  viewSort() {
    if ($("#sortBYDiv").attr("style") == "display: flex;") {
      $("#sortBYDiv").hide()
    }
    else {
      $("#sortBYDiv").css("display", "flex")
    }

  }
  sortByFunction(sortBY: string, data: string) {
    this.tempSearch = this.searchInput;
    this.searchInput = ""
    if( this.dealername  != "" &&  this.dealername  != null)
    {
      this.vehicleData = this.vehicleDataService.sortBy(sortBY).filter(item => item.DEALERNAME.toLowerCase() == this.dealername.toLowerCase())
    }
    else
    {
      this.vehicleData = this.vehicleDataService.sortBy(sortBY)
    }
    this.sortBY = data
    $("#sortBYDiv").css("display", "none")
    this.p = 1;
    this.setinterval = setInterval(this.assingSearchInput.bind(this)
      , 10)

  }

  assingSearchInput() {
    console.log(this.tempSearch)
    this.searchInput = this.tempSearch
    this.tempSearch = ""
    clearInterval(this.setinterval);
  }

  navigateToVehicleDeatis(vehicleID: string) {
    this.vehicleDataService.setVehicleDetails(vehicleID)
    const angularRoute = window.location.host;
    const angularProtocol = window.location.protocol;
    window.open(`${angularProtocol}//${angularRoute}//Vehicle-details;vehicleID=${vehicleID}`, "_blank");
    //this.route.navigate([`/Vehicle-details`,{vehicleID:vehicleID}])
  }

  scrollup() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 14);
  }
  changeview(input: boolean) {
    this.grid = input
    this.viewGrid = input

  }
  openfilter() {
    $(".body_section_grey_filter").css({ "display": "block", "transition": "height 400ms ease 0s, width 400ms ease 0s, opacity 400ms ease 0s", "opacity": "1", "width": "100%", "height": "100%" })
  }

  closefilter() {
    $(".body_section_grey_filter").css({ "display": "none", "transition": "height 0.4s ease 0s, width 0.4s ease 0s, opacity 0.4s ease 0s, height 400ms ease 0s, width 400ms ease 0s, opacity 400ms ease 0s", "opacity": "0", "width": "0px", "height": "100%" })
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

  revelNumber(type: string, contactDetails: string) {
    if (type == "Phone") {
      if (!this.returnHrefNumber) {
        let phoneNumber = this.dealerData.TELEPHONENUMBER.length ? this.dealerData.TELEPHONENUMBER : this.dealerData.PHONENUMBER
        this.showwNumberDeatails = phoneNumber
        this.http.trackerRevelNumber(this.dealerData.VEHICLEID, type, contactDetails).subscribe(response => {

          this.returnHrefNumber = true

        })
      }
    }
    else {
      if (!this.returnHrefEmail) {
        this.showEmailDetails = this.dealerData.DEALEREMAIL
        this.http.trackerRevelNumber(this.dealerData.VEHICLEID, type, contactDetails).subscribe(response => {

          this.returnHrefEmail = true
        })
      }
    }
  }

  onKey(event: any) {
    this.p = 1
  }

  pageChanged(event: any) {
    this.p = event
    let top = document.getElementById('topPage');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

}

