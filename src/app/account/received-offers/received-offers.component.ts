import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttprequestService } from 'src/app/service/httprequest.service';

@Component({
  selector: 'app-received-offers',
  templateUrl: './received-offers.component.html',
  styleUrls: ['./received-offers.component.css']
})
export class ReceivedOffersComponent implements OnInit {

  userId: any;
  offers: any = []
  offersLength: any;
  p: number = 1;
  totalLength: any;
  seeAuctionLogs: any;

  constructor(private http: HttprequestService, private router: Router) { }

  ngOnInit(): void {
    let text = "Please Wait While Loading Received Offers ...";
    this.receivedOffers(text)
  }

  receivedOffers(text:any) {
    this.userId = sessionStorage.getItem('currentUser');
    $(".loader_div").css({ "display": "flex" })
    $("#LoadingText").text(text)
    this.http.receivedOffers(this.userId).subscribe(res => {
      this.offersLength = res.body.aaData.length;
      if (this.offersLength > 0) {
        this.offers = res.body.aaData;
      }
      setTimeout(() => {
        $(".loader_div").css({ "display": "none" })
      }, 3000)
    })
  }

  acceptOffer(vehicleID: any) {
    let text = "Please Wait While Accepting The Offer ...";
    this.http.getAcceptedOrDeclined(this.userId, vehicleID, "Accepted").subscribe(res => {
      this.receivedOffers(text)
    })
  }

  declineOffer(vehicleID: any) {
    let text = "Please Wait While Declining The Offer ...";
    this.http.getAcceptedOrDeclined(this.userId, vehicleID, "Declined").subscribe(res => {
      this.receivedOffers(text)
    })
  }

  requestRelist(vehicleID: any) {
    let text = "Please Wait While Requesting Re-listing The Offer ...";
    this.http.getRequestRelist(this.userId, vehicleID, "", "RelistAuction").subscribe(res => {
      this.receivedOffers(text)
    })
  }

  seeAuctionLog(vehicleID: any) {
    this.http.auctionLogs(this.userId, vehicleID).subscribe(res => {
      console.log("See Auction Log", res)
      this.seeAuctionLogs = res.body.aaData;
      this.openLog()
    })
  }

  pageChanged(event: any) {
    this.p = event
    let top = document.getElementById('received_offer');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  openLog() {
    $("#auctionLog").css({ "display": "flex" })
    $("#receive_offer").hide()
  }

  closeLog() {
    $("#auctionLog").hide()
    $("#receive_offer").css({ "display": "block" })
  }

  isNumber(num: any) {
    num = num.slice(0, -3)
    var numb = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return numb;
  }

  refresh() {
    this.router.navigate(['/account/offers'])
      .then(() => {
        window.location.reload();
      });
  }

}
