import {Component, OnChanges, OnInit} from '@angular/core';
import { ClientService } from "../common/services/client.service";
declare const $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnChanges {

  tenantId: string ;
  constructor(private clientService: ClientService) { }

  ngOnChanges(param: any){
    $(document).ready(function () {
      $('#editor1').jqxEditor({
        tools: 'bold italic underline | left center right'
      });
      $('#editor2').jqxEditor({
        tools: 'bold italic underline | left center right'
      });
      $('#editor3').jqxEditor({ tools: 'bold italic underline | format font size | color background | left center right' });
    });
  }
  ngOnInit() {
  }
  onClickSeeTenantButton(clientId : string){
    this.tenantId = 'Wait, calling API from AWS ....';
    this.clientService.getClient(clientId).subscribe(
      response => {
           this.tenantId = response.toString();
        console.log('TenantID >', this.tenantId);
      }
    )
  }

}
