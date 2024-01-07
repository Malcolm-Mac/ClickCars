import { Component, OnInit } from '@angular/core';
import { InforDataService } from '../service/infor-data.service'
import { topNavigation, Vehicles, filterOptions, Banners } from '../interfaces/vehiclesInterface'

@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.css']
})
export class WhoWeAreComponent implements OnInit {

  constructor(private vehicleDataService:InforDataService) { }
  banner: Banners[] = []
  ngOnInit(): void {
    this.banner = this.vehicleDataService.getBanners()
  }

}
