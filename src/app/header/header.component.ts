import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ListingComponent } from '../listing/listing.component';
import { LoginComponent } from '../login/login.component';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { InforDataService } from '../service/infor-data.service';
import { UserInfo } from 'os';
import { profileData } from '../interfaces/vehiclesInterface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ListingComponent, LoginComponent],
  animations: [
    trigger('dimBox', [
      state('notDimmed',
        style({ width: '0%', opacity: 0 })
      ),
      state('dimmed',
        style({ width: '100%', opacity: 1 })
      ),
      transition('notDimmed => dimmed', [
        animate('0.5s')
      ]),
      transition('dimmed => notDimmed', [
        animate('0.5s')
      ])
    ]),
    trigger('viewSubMenu', [
      state("closed",
        style({ display: 'none' })
      ),
      state('open',
        style({ display: 'block' })
      ),
      transition('closed => open', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ]),
    trigger('showMenuText', [
      state('hide',
        style({ opacity: 0 })
      ),
      state('show',
        style({ opacity: 1 })
      ),
      transition('hide => show', [
        animate('1s')
      ]),
      transition('show => hide',
        [
          animate('0.5s')
        ])

    ]),
    trigger('showBottomText', [
      state('hide',
        style({ opacity: 0, height: '0%' })
      ),
      state('show',
        style({ opacity: 1, height: '30%' })
      ),
      transition('hide => show', [
        animate('1s')
      ]),
      transition('show => hide',
        [
          animate('0.5s')
        ])

    ])
  ]
})

export class HeaderComponent implements OnInit {

  loginState: any = [];
  isDimmed: boolean = true;
  userDetails = {} as profileData
  name:any;


  constructor(public router: Router, private infor:InforDataService, private listing: ListingComponent, private login: LoginComponent, private autheticatedService: AuthenticationServiceService) { }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('currentUsername');
    this.name = JSON.parse(this.name);
    this.loginState = sessionStorage.getItem('currentUser');
    this.userDetails = this.infor.getProfileData()
  
  }

  navigatateToLink(page: string) {
    this.isDimmed = true
    this.hideMenu()
    if (page == "home") {
      this.router.navigate(["/"])
      this.cleardata()
    }
    if (page == "listing") {
      this.router.navigate(["/listing"])
      //this.cleardata()
    }
    if (page == "Finance") {
      this.router.navigate(["/finance-calculator"])
      this.cleardata()
    }
    if (page == "faq") {
      this.router.navigate(["/faq"])
      this.cleardata()
    }
    if (page == "who-we-are") {
      this.router.navigate(["/who-we-are"])
      this.cleardata()
    }
    if (page == "contact-us") {
      this.router.navigate(["/contact-us"])
      this.cleardata()
    }

    if (page == "dealership") {
      this.router.navigate(["/dealer-sign-up"])
      this.cleardata()
    }

    if (page == "SellMyCar") {
      this.router.navigate(["/sell-my-car"])
      this.cleardata()
    }

  }

  showMenu() {
    this.isDimmed = false
  }

  hideMenu() {
    this.isDimmed = true
  }

  animationEnd(event: any) {
   
  }

  cleardata() {
    this.listing.clearSearch2()
  }

  logout() {
    this.login.logout()
  }

  refresh(): void {
    window.location.reload();
  }

}
