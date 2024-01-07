import { Component, OnInit,Input } from '@angular/core';
import {Vehicles} from '../../interfaces/vehiclesInterface'
@Component({
  selector: 'app-similar-cars',
  templateUrl: './similar-cars.component.html',
  styleUrls: ['./similar-cars.component.css']
})
export class SimilarCarsComponent implements OnInit {
  
  @Input() similarCar:Vehicles[]
  
  
  constructor() { }

  ngOnInit(): void 
  {
   
  }
  slideConfig = {"slidesToShow": 5, "slidesToScroll": 4};
}
