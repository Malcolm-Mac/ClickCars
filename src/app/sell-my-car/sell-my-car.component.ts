import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';
import { feedStatus, User } from '../interfaces/vehiclesInterface';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { ValidationServiceService } from '../service/validation-service.service';
import {HttprequestService} from '../service/httprequest.service'

@Component({
  selector: 'app-sell-my-car',
  templateUrl: './sell-my-car.component.html',
  styleUrls: ['./sell-my-car.component.css'],
  providers: [User, AuthenticationServiceService]
})
export class SellMyCarComponent implements OnInit {

  loading = false;
  submitted = false;
  username: any;
  password: any;
  cpassword: any;
  firstname: any;
  lastname: any;
  phone: any;

  showNameError: boolean = false;
  showSurnameError: boolean = false;
  showNumberError: boolean = false;
  showUsernameError: boolean = false;
  showPasswordError: boolean = false;
  showCPasswordError: boolean = false;
  showPasswordMatchError: boolean = false;
  errorEmailMessage:string=""

  constructor(private route: ActivatedRoute,
    private router: Router,
    private user: User,
    private authenticationService: AuthenticationServiceService,
    private validation: ValidationServiceService,
    private http:HttprequestService
    ) { }

  ngOnInit(): void {
  }

  register() {
    this.showPasswordMatchError = false
    this.submitted = true;

    this.user.firstName = this.firstname;
    this.user.lastName = this.lastname;
    this.user.phone = this.phone;
    this.user.password = this.password;
    this.user.username = this.username;

    this.loading = true;

    this.showNameError = this.validation.lengthOfInput("firstname", 1, "Please Enter Name") ? false : true
    this.showSurnameError = this.validation.lengthOfInput("lastname", 1, "Please Enter Surname") ? false : true
    this.showNumberError = this.validation.validateNumberPhones("phone") ? false : true
    this.errorEmailMessage = "Please Enter Email Address"
    this.showUsernameError = this.validation.validateEmail("username") ? false : true
    this.showPasswordError = this.validation.passwordValidator("password", 1) ? false : true
    this.showCPasswordError = this.validation.passwordValidator("cpassword", 1) ? false : true
   
    let feedback = {} as feedStatus  

    if (!this.showNameError && !this.showSurnameError &&
      !this.showNumberError && !this.showUsernameError &&
      !this.showPasswordError && !this.showCPasswordError) {
      this.showPasswordMatchError = this.validation.passwordMatch("password", "cpassword")
      if (!this.showPasswordMatchError) {
        console.log("clicked inside")
        $(".loader_div").css({ "display": "flex" })
        $("#LoadingText").text("Please Wait While Your Account Is Been Created ...")
        this.http.register(this.user).subscribe( response => 
           {
             feedback =response
              if(feedback.code == "user already exiest")
              {
                this.showUsernameError  = true
                this.errorEmailMessage = "Email Already Exiest In the System"
                $(".loader_div").css({ "display": "none" })
              }
              else
              {
                this.router.navigate(['/login'], { relativeTo: this.route });
                $(".loader_div").css({ "display": "none" })
              }
          },
          error => {
            this.errorEmailMessage = "Email Already Exiest In the System"
            $(".loader_div").css({ "display": "none" })
          }
          );
      }
    }
  }
}
