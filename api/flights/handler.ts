import {Flight} from "./flight";

let msg:string[];
let jsn: any;
let request = require("request");
let url = "https://opensky-network.org/api/states/all";
export const flight = async (event, context, callback) => {

    const flights: Flight[] = [];


    request({
        url: url,
        json: true
    }, (error, response, body) => {

        if (!error && response.statusCode === 200) {
            // console.log(body) // Print the json response
            msg = body;
        }
      //  jsn = JSON.parse(body);

      //  msg = body.states.length;
        let j =0;
        for(let i=0; i< body.states.length; i++){

            if(body.states[i][5] < 22 && body.states[i][5] > 0){

                msg[j] = body.states[i];
                j++;
            }
        }
        /*const responsee = {
            statusCode: 200,
            body: JSON.stringify({
                message: msg,
                // input: event,
            }),
        };*/
        const responsee = {
            statusCode: 200,
            body: msg,
        };
        callback(null, responsee);
    });


    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
