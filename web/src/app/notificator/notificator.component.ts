import { Component, OnInit } from '@angular/core';
import { NotifierService} from "../common/services/notifier.service";

@Component({
  selector: 'app-notificator',
  templateUrl: './notificator.component.html',
  styleUrls: ['./notificator.component.css']
})
export class NotificatorComponent implements OnInit {

  constructor(private notifierService: NotifierService) { }

  message;
  iotKeys;
  ngOnInit() {
  }

  onClickGetKeys(){
    this.notifierService.getIOTConnection().subscribe(
      (key) =>{
        console.log(key);
        this.iotKeys = key;
      }
    );
  }
  onClickConnect(){
    console.log('IoT Endpoint >>>>', this.iotKeys.iotEndpoint,'Region >>>>', this.iotKeys.region,'Access Key' ,this.iotKeys.accessKey,'Secret Key', this.iotKeys.secretKey, 'Session Token',this.iotKeys.sessionToken);
    const iotTopic =  '/serverless/pubsub';
    this.notifierService.IoT.connect(
      iotTopic,
      this.iotKeys.iotEndpoint,
      this.iotKeys.region,
      this.iotKeys.accessKey,
      this.iotKeys.secretKey,
      this.iotKeys.sessionToken
    );
  }
  onClickSend(){
    this.notifierService.IoT.send(this.message);
  }
}
