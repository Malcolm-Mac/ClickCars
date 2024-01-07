import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../service/httprequest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InforDataService } from '../service/infor-data.service'
import { ValidationServiceService } from '../service/validation-service.service'
@Component({
  selector: 'app-dealer-sign-up',
  templateUrl: './dealer-sign-up.component.html',
  styleUrls: ['./dealer-sign-up.component.css'],
})

export class DealerSignUpComponent implements OnInit {
  showNameError: boolean = false
  showSurnameError: boolean = false
  showBusinessNameError: boolean = false
  showContactError: boolean = false
  showEmailError: boolean = false
  showMessageError: boolean = false
  showLocationError: boolean = false
  showPositionError: boolean = false
  showDealerrName: boolean = false
  showFeedError: boolean = false
  Location: string = "Location"
  City: Array<string> = []
  successfulPopUp: boolean = true
  constructor(private http: HttprequestService,
    private vehicleData: InforDataService, private router: Router, private _Activatedroute: ActivatedRoute, private validation: ValidationServiceService) { }

  ngOnInit(): void {
    this.City = this.vehicleData.getAllcities()
  }

  sendDealerSignUp() {

    this.showNameError = this.validation.lengthOfInput("Name", 1, "Please Enter Name") ? false : true
    this.showSurnameError = this.validation.lengthOfInput("Surname", 1, "Please Enter Surname") ? false : true
    this.showBusinessNameError = this.validation.lengthOfInput("BusinessName", 1, "Please Enter Business Name") ? false : true
    this.showPositionError = this.validation.lengthOfInput("Position", 1, "Please Enter Position") ? false : true
    this.showContactError = this.validation.validateNumberPhones("ContactNumber") ? false : true
    this.showEmailError = this.validation.validateEmail("Mail") ? false : true
    this.showLocationError = this.validation.dropDownSelected("Locations", "Please Enter Location") ? false : true
    this.showMessageError = this.validation.validateDescrtion("Message", 5, "Please Enter Message") ? false : true
    if (!this.showDealerrName && !this.showNameError && !this.showSurnameError && !this.showContactError &&
      !this.showEmailError && !this.showMessageError && !this.showLocationError && !this.showBusinessNameError && !this.showPositionError) {
      $(".loader_div").css("display", "flex")
      $("#LoadingText").html("Sending Enquiry...")
      this.http.sendDealerSingUp($("#BusinessName").val(), $("#Name").val(), $("#Surname").val(), $("#Mail").val(), $("#Message").val(), $("#ContactNumber").val(), $("#Locations").val(),
        $("#Position").val(), "").subscribe((response: any) => {
          $(".loader_div").css("display", "none")
          $(".close_button_new").hide()
          this.clearFields()
          $("#successful_div").css("display", "flex")
          this.successfulPopUp = false
        }
        )
    }

  }

  navigatateToLink(page: string) {
    if (page == "home") {
      this.router.navigate(["/"])
    }
  }

  done() {
    this.closeEnquiryPopup()
    $("#successful_div").css("display", "none")
  }

  showEnquiryPopup() {
    $(".close_button_new").show()
    $(".e-dealer_enquiry_form").css("display", "flex")
  }

  closeEnquiryPopup() {
    this.clearFields()
    $(".e-dealer_enquiry_form").css("display", "none")
  }

  clearFields() {
    $("#BusinessName").val("")
    $("#Name").val("")
    $("#Surname").val("")
    $("#Message").val("")
    $("#ContactNumber").val("")
    $("#Locations").val("")
    $("#Position").val("")
    $("#Mail").val("")
  }

}
