import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders} from "@angular/common/http";


@Injectable()
export class ClientService {

  constructor(private http: HttpClient) {

  }

  getClient(clientId : string) {

   return this.http.get(`https://xbmt91wcr0.execute-api.us-east-1.amazonaws.com/dev/clients/${clientId}`, (req, res) => {
     req.header = 'Access-Control-Allow-Origin';
     res.header = 'Access-Control-Allow-Origin';
   });
  }
}
