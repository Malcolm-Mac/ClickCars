import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../service/httprequest.service';
import {ValidationServiceService} from '../service/validation-service.service'

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  Name:string;
  Surname:string;
  Email:string;
  Contact:string;
  Message:string;
  errorMsg:string;
  formObject ={
    Name:true,
    Surname:true,
    ContactNumber:true,
    Email:true,
    Message:true
  }

  constructor(private contactus:HttprequestService, private validation:ValidationServiceService) { }

  ngOnInit(): void {
  }

  SendContactMessages() {

    this.formObject.Name = this.validation.lengthOfInput("Name", 1, "Please Enter Name") == true ? true : false;
    this.formObject.Surname = this.validation.lengthOfInput("Surname", 1, "Please Enter Surname") == true ? true : false
    this.formObject.ContactNumber = this.validation.validateNumberPhones("ContactNumber") == true ? true : false
    this.formObject.Email = this.validation.validateEmail("Email") == true ? true : false
    this.formObject.Message = this.validation.validateDescrtion("Message", 1, "Please Enter Message") == true ? true : false
    if (Object.values(this.formObject).every(item => item == true)) {
      $(".loading_section.loading_page").css("display", "flex")
      this.contactus.sendmessage(this.Name + " " + this.Surname, this.Email, this.Contact, this.Message).subscribe((response: any) => {

        $(".loading_section.loading_page").css("display", "none")
        if (response.status == 200) {
          $("#SuccessfullyPopUp").css("display", "flex");
          $("#successMessage").html("Enquiry has been sent successful, We will contact you shortly")
        }
        else {
          $("#failedPopUp").css("display", "flex");
          $("#unsuccessMessage").html("Something wrong happened, please try again")
        }

        this.Name = ""
        this.Surname = ""
        this.Email = ""
        this.Contact = ""
        this.Message = ""

      }, error => { this.errorMsg = error }
      );

   }
  }


}
