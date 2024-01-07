import { Component, OnInit } from '@angular/core';
import {Banners} from '../interfaces/vehiclesInterface'
import { InforDataService} from '../service/infor-data.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  banner:Banners[] = []
  constructor(private vehicleData:InforDataService,private router: Router) { }

  ngOnInit(): void {
    this.banner = this.vehicleData.getBanners()
  }

  showContent(alementID:string)
  {
    if($("#"+alementID).attr("style") == "display: block; height: auto; transition: opacity 400ms ease 0s; opacity: 1;")
    {
      $("#"+alementID).removeAttr("style")
    }
    else
    {
      $("#"+alementID).attr("style", "display: block; height: auto; transition: opacity 400ms ease 0s; opacity: 1;")
    }
  }

  filterByDealer(dealershipName:string)
  {
    this.router.navigate(['/listing-dealer', dealershipName ]).then(() => {
     
    });

  }

}
