import { Component, OnInit } from '@angular/core';
import { HttprequestService } from 'src/app/service/httprequest.service';
import {InforDataService} from '../../service/infor-data.service'

@Component({
  selector: 'app-received-leads',
  templateUrl: './received-leads.component.html',
  styleUrls: ['./received-leads.component.css']
})
export class ReceivedLeadsComponent implements OnInit {

  userId: any;
  leads: any = []
  leadsLength: any;
  p: number = 1;
  totalLength: any;

  constructor(private http: HttprequestService, private infor: InforDataService) { }

  ngOnInit(): void {
    this.receivedLeads()
  }

  receivedLeads() {
    this.userId = this.infor.getUserId()
    $(".loader_div").css({ "display": "flex" })
    $("#LoadingText").text("Please Wait While Loading Received Leads ...")
    this.http.receivedLeads(this.userId).subscribe(res => {
      this.leadsLength = res.body.aaData.length;
      if (this.leadsLength > 0) {
        this.totalLength = this.leadsLength;
        this.leads = res.body.aaData;
      }
      setTimeout(() => {
        $(".loader_div").css({ "display": "none" })
      }, 3000);
    })
  }

  pageChanged(event: any) {
    this.p = event
    let top = document.getElementById('received_leads');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

}

