import * as AWSIoT from 'aws-iot-device-sdk';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class NotifierService{
  constructor(private httpClient: HttpClient){

  }
  client;
  iotTopic;

  IoT = {
  connect: (topic, iotEndpoint, region, accessKey, secretKey, sessionToken) => {

    this.iotTopic = topic;

    this.client = AWSIoT.device({
      region: region,
      protocol: 'wss',
      accessKeyId: accessKey,
      secretKey: secretKey,
      sessionToken: sessionToken,
      port: 443,
      host: iotEndpoint
    });

    this.client.on('connect', this.onConnect);
    this.client.on('message', this.onMessage);
    this.client.on('error', this.onError);
    this.client.on('reconnect', this.onReconnect);
    this.client.on('offline', this.onOffline);
    this.client.on('close', this.onClose);
  },

  send: (message) => {
    this.client.publish(this.iotTopic, message);
  }
};

onConnect = () => {
  this.client.subscribe(this.iotTopic);
  console.log('Connected');
  addLog('Connected');
};

onMessage = (topic, message) => {
  console.log(message);
  addLog(message);
};

onError = () => {};
onReconnect = () => {};
onOffline = () => {};

onClose = () => {
  console.log('Connection failed');
  addLog('Connection Failed!');
};

getIOTConnection(){
  return this.httpClient.get<any>('https://xbmt91wcr0.execute-api.us-east-1.amazonaws.com/dev/iot/keys');
}
}

const addLog = (msg) => {
  const date = (new Date()).toTimeString().slice(0, 8);
  document.getElementById('log').innerHTML = document.getElementById('log').innerHTML+'<br>'+date+ ' >> '+ msg;
};
