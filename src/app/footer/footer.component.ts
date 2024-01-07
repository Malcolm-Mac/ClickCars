import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    trigger('hideDealer', [
      state('show',
        style({ height: 'auto', opacity: '1' })
      ),
      state('hide',
        style({ height: '0px', opacity: '0', display: 'none' })
      ),
      transition('show => hide', [
        animate('0.5s')
      ]),
      transition('hide => show', [
        animate('0.5s')
      ])
    ])


  ]
})
export class FooterComponent implements OnInit {
  isOpen: boolean = true
  year:string =""
  constructor(public _routerss: Router) { }

  ngOnInit(): void {
    const d = new Date();
    this.year= d.getFullYear().toString();
    
  }

  hideDealerSignUp() {
    this.isOpen = false
  }


}
