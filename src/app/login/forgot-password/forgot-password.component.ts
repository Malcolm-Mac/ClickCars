import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttprequestService } from 'src/app/service/httprequest.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotEmail: any = "";
  forgotCode: any = "";
  forgotNewPassword: any = "";
  confirmNewPassword: any = "";

  constructor(private router: Router, private authentication: HttprequestService) { }

  ngOnInit(): void {
  }

  passwordsReset() {

    if (this.forgotEmail.length != 0) {

      $(".loader_div").css({ "display": "flex" })
      $("#LoadingText").text("Sending Password Reset Code ...")
      this.authentication.getCode(this.forgotEmail).subscribe(response => {
        if (response.status === 200) {
          $("#reset_email").hide()
          $("#reset_code").show()
          $("#no_account").hide()
          $("#set_password").hide()
        } else {
          $("#reset_email").hide()
          $("#reset_code").hide()
          $("#no_account").show()
          $("#set_password").hide()
          //$("#LoadingText").text("Sending Password Reset Code ...")
        }
        $(".loader_div").css({ "display": "none" })
      })
    } else {
      $("#reset_email").show()
      $("#reset_code").hide()
      $("#no_account").hide()
      $("#set_password").hide()
      alert("We can't process this without an email.")
    }
  }

  confirmPasswordCode() {
    if (this.forgotCode.length != 0) {
      this.authentication.confirmCode(this.forgotEmail, this.forgotCode).subscribe(response => {
        if (response.body !== "failed" && response.status === 200) {
          $("#reset_email").hide()
          $("#reset_code").hide()
          $("#no_account").hide()
          $("#set_password").show()
        } else {
          $("#reset_email").hide()
          $("#reset_code").show()
          $("#no_account").hide()
          $("#set_password").hide()
        }
      })
    } else {
      alert("Please provide your code.")
    }
  }

  resetPassword() {

    if (this.forgotNewPassword.length === this.confirmNewPassword.length) {
      this.authentication.resetPassword(this.forgotEmail, this.forgotNewPassword).subscribe(response => {
        if (response.status === 200) {
          $("#reset_email").hide()
          $("#reset_code").hide()
          $("#no_account").hide()
          $("#set_password").hide()
          this.router.navigate(["/login"])
        } else {
          $("#reset_email").hide()
          $("#reset_code").hide()
          $("#no_account").hide()
          $("#set_password").show()
        }
      })
    } else {
      alert("Can't reset password does not match.")
      $("#reset_email").hide()
      $("#reset_code").hide()
      $("#no_account").hide()
      $("#set_password").show()
    }

  }

}
