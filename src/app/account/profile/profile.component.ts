import { Component, OnInit } from '@angular/core';
import { HttprequestService } from 'src/app/service/httprequest.service';
import { ValidationServiceService } from 'src/app/service/validation-service.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: any = "";
  surname: any = "";
  email: any = "";
  contact: any = "";
  code: any = "";
  newPassword: any = "";
  confirmPassword: any = "";
  image: any;
  userId: any;
  data: any = []
  baseData: any;
  base64Data: any;
  profileLength: any;
  showNameError: boolean = false
  showSurnameError: boolean = false
  showContactError: boolean = false
  showEmailError: boolean = false
  showImageError: boolean = false
  showResetCodeError: boolean = false
  showIncorrectCodeError: boolean = false
  showPasswordError: boolean = false
  showCPasswordError: boolean = false
  showPasswordMatchError: boolean = false
  statusResquest: any;

  constructor(private authentication: HttprequestService, private validation: ValidationServiceService) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('currentUser');
    $(".loader_div").css({ "display": "flex" })
    $("#LoadingText").text("Please Wait While Loading Your Profile ...")
  
    this.authentication.profile(this.userId).subscribe(response => {
      this.profileLength = response.body;
      if (this.profileLength.UserDetails.length > 0) {
        this.data = response.body;
        this.image = this.data.UserDetails[0].Profilepicture === null ? "" : this.data.UserDetails[0].Profilepicture;
        this.name = this.data.UserDetails[0].NAME;
        this.surname = this.data.UserDetails[0].SURNAME;
        this.contact = this.data.UserDetails[0].ContactNumber;
        this.email = this.data.UserDetails[0].Email;
        setTimeout(() => {
          $(".loader_div").css({ "display": "none" })
        }, 3000)
      }
    })

    $("#edit").show()
    $("#save").hide()
    $("#resetCode").hide()
    $("#setCode").hide()

  }

  previewImage() {
    let input;
    input = (<HTMLInputElement>document.getElementById('InterestFile'));
    this.encodeImageFileAsURL(input)
    $("#InterestImage").attr("src", URL.createObjectURL(input.files![0])).next()
  }

  encodeImageFileAsURL(element: any) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onload = () => {
      this.baseData = reader.result
      this.base64Data = this.baseData.split(',')[1]
    };
    reader.readAsDataURL(file);
  }

  editProfile() {
    $("#name").prop("disabled", false);
    $("#surname").prop("disabled", false);
    $("#contact").prop("disabled", false);
    $("#edit").hide()
    $("#save").show()
    $("#imagefile").show()
  }

  saveProfile() {
    this.updateProfileDetails()
  }

  updateProfileDetails() {
    this.showNameError = this.validation.lengthOfInput("name", 1, "Please Enter Name") ? false : true
    this.showSurnameError = this.validation.lengthOfInput("surname", 1, "Please Enter Surname") ? false : true
    this.showContactError = this.validation.validateNumberPhones("contact") ? false : true
    this.showEmailError = this.validation.validateEmail("email") ? false : true
    if (this.base64Data === undefined) {
      this.base64Data = ""
    }

    if (!this.showNameError && !this.showSurnameError && !this.showContactError && !this.showEmailError && this.userId.length !== 0) {
      $("#name").prop("disabled", true);
      $("#surname").prop("disabled", true);
      $("#contact").prop("disabled", true);
      $("#edit").show()
      $("#save").hide()
      $("#imagefile").hide()
      $(".loader_div").css({ "display": "flex" })
      $("#LoadingText").text("Updating Profile ...")
      this.authentication.updateUserProfile(this.name, this.surname, this.email, this.contact, this.userId, this.base64Data).subscribe(res => {
        this.statusResquest = res
        if (this.statusResquest.code == "Success") {
          setTimeout(() => {
            $(".loader_div").css({ "display": "none" })
          }, 3000)
        } else {
          $("#LoadingText").text("Error Occurred While Updating ...")
          setTimeout(() => {
            $(".loader_div").css({ "display": "none" })
          }, 3000)
        }
      })
    }
  }

  passwordReset() {
    this.showEmailError = this.validation.validateEmail("email") ? false : true
    if (!this.showEmailError) {
      $(".loader_div").css({ "display": "flex" })
      $("#LoadingText").text("Sending Password Reset Code ...")
      this.authentication.getCode(this.email).subscribe(response => {
        if (response.status === 200) {
          $("#resetCode").show()
          $("#userDetail").hide()
          $("#setCode").hide()
          $(".openEmail").show()
        } else {
          $("#resetCode").hide()
          $("#setCode").hide()
          $("#userDetail").show()
          alert("User does not exist")
        }
        $(".loader_div").css({ "display": "none" })
      })
    } else {
      $("#userDetail").show()
      $("#resetCode").hide()
      $("#setCode").hide()
    }
  }

  confirmPasswordCode() {
    this.showResetCodeError = this.validation.lengthOfInput("code", 1, "Please Enter Reset Code") ? false : true

    if (!this.showResetCodeError) {
      this.authentication.confirmCode(this.email, this.code).subscribe(response => {
        this.showIncorrectCodeError = this.validation.lengthOfInput("code", 1, "Reset Code Invalid") ? false : true
        if (response.body !== "failed" && response.status === 200) {
          $("#resetCode").hide()
          $("#setCode").show()
          $("#userDetail").hide()
          this.showIncorrectCodeError = false
        } else {
          $("#resetCode").show()
          $("#setCode").hide()
          $("#userDetail").hide()
          this.showIncorrectCodeError = true
        }
      })
    }
  }

  resetPassword() {
    this.showPasswordError = this.validation.lengthOfInput("newPassword", 1, "Please Enter Password") ? false : true
    this.showCPasswordError = this.validation.lengthOfInput("confirmPassword", 1, "Please Enter Password") ? false : true
    
    if (!this.showPasswordError && !this.showCPasswordError) {
      this.showPasswordMatchError = this.validation.passwordMatchReset("newPassword", "confirmPassword")
      if (!this.showPasswordMatchError) {
        this.authentication.resetPassword(this.email, this.newPassword).subscribe(response => {
          if (response.status === 200) {
            $("#resetCode").hide()
            $("#userDetail").show()
            $(".openSuccess").fadeIn("slow")
            setTimeout(() => {
              $(".openSuccess").fadeOut("slow");
            }, 5000);
            $("#setCode").hide()
          } else {
            $("#resetCode").hide()
            $("#setCode").show()
            $("#userDetail").hide()
          }
        })
      } else {
        $("#resetCode").hide()
        $("#setCode").show()
        $("#userDetail").hide()
      }
    } else {
      $("#resetCode").hide()
      $("#setCode").show()
      $("#userDetail").hide()
    }
  }

}
