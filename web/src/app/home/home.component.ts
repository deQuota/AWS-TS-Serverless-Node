import { Component, OnInit } from '@angular/core';
import { ClientService } from "../common/services/client.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tenantId: string;
  constructor(private clientService: ClientService) { }

  ngOnInit() {
  }
  onClickSeeTenantButton(clientId : string){
    this.clientService.getClient(clientId).subscribe(
      response => {
           this.tenantId = response.toString();
        console.log('TenantID >', this.tenantId);
      }
    )
  }

}
