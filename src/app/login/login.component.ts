import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { ValidationServiceService } from '../service/validation-service.service';
import {InforDataService} from '../service/infor-data.service'
import { profileData } from '../interfaces/vehiclesInterface';
import { HttprequestService } from '../service/httprequest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  username: any = "";
  password: any = "";
  information: any[];
  showUsernameError: boolean = false
  showPasswordError: boolean = false
  profileData = {} as profileData
  profileLength: any;
  data: any = []
  userNameError:string = ""
  @Output() userna: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttprequestService,
    private authenticationService: AuthenticationServiceService,
    private validation: ValidationServiceService,
    private infor: InforDataService) {

    // redirect to account if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/account/your-vehicles']);
    }

  }

  ngOnInit(): void {

  }


  onSubmit() {
    this.userNameError = "Please Enter Username"
    this.showUsernameError = this.validation.validateEmail("username") ? false : true
    this.showPasswordError = this.validation.lengthOfInput("password", 1, "Please Enter Password") ? false : true
    if (!this.showUsernameError && !this.showPasswordError) {
      $(".loader_div").css({ "display": "flex" })
      $("#LoadingText").text("Please Wait While We You Logging In ...")
      
      this.http.userLogIn(this.username, this.password)
        .subscribe(
          data => 
          {
            let userData = JSON.parse(data)[0]
            console.log(userData)
           if(userData.length > 1)
           {
             this.authenticationService.setUserAnthentication(userData[0],userData[1] )
             this.refresh('/account/your-vehicles')
           }
           else
           {
              this.showUsernameError = true
              this.userNameError = userData[0]
           }
           $(".loader_div").css({ "display": "none" })

          },
          error => {
            this.error = error;
            this.loading = false;
          });
    }
  }


  loadProfile()
  {
    let userID =  sessionStorage.getItem('currentUser') || ""
    this.http.profile(JSON.parse(userID)).subscribe(response => {
      this.profileLength = response.body;
      if (this.profileLength.UserDetails.length > 0) {
        this.data = response.body;
        this.profileData.imagePath = this.data.UserDetails[0].Profilepicture === null ? "" : this.data.UserDetails[0].Profilepicture;
        this.profileData.name = this.data.UserDetails[0].NAME;
        this.profileData.surname = this.data.UserDetails[0].SURNAME;
        this.profileData.contactNumber = this.data.UserDetails[0].ContactNumber;
        this.profileData.email = this.data.UserDetails[0].Email;
        this.infor.setProfileData(this.profileData)
        setTimeout(() => {
          $(".loader_div").css({ "display": "none" })
        }, 3000)
      }
    })
  }
  

  logout() {
    this.authenticationService.logout()
    $(".loader_div").css({ "display": "flex" })
    $("#LoadingText").text("Please Wait While We Logging You Out ...")
    this.refresh('/login')
  }

  refresh(url: any): void {
    this.router.navigate([url])
      .then(() => {
       
         window.location.reload();
          $(".loader_div").css({ "display": "none" })
      }
       
      );
  }
 
}
