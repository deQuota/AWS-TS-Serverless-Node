import {Flight} from "./flight";

let msg: string[] = [];
let request = require("request");
let url = "https://opensky-network.org/api/states/all";

export const getAllFlights = async (event, context, callback) => {
    request({
        url: url,
        json: true
    }, (error, response, body) => {

        if (!error && response.statusCode === 200) {

            let j = 0;

            msg = body.states;


            const responseSuccess = {
                headers: {'Access-Control-Allow-Origin': '*'},
                statusCode: 200,
                body: JSON.stringify({
                    count: j + 1,
                    message: msg

                }),
            };
            callback(null, responseSuccess);
        }
        else {
            const responseError = {
                headers: {'Access-Control-Allow-Origin': '*'},
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Error occurred while calling the third party API'

                }),
            };
            callback(null, responseError);
        }


    });

};
export const geoFilteredFlight = async (event, context, callback) => {

    const flights: Flight[] = [];


    request({
        url: url,
        json: true
    }, (error, response, body) => {

        if (!error && response.statusCode === 200) {

            let j = 0;
            for (let i = 0; i < body.states.length; i++) {

                if (body.states[i][5] < 154 && body.states[i][5] > 111) {
                    if (body.states[i][6] < -9 && body.states[i][6] > -39) {

                        msg[j] = body.states[i];
                        j++;
                    }
                }
            }

            const responseSuccess = {
                headers: {'Access-Control-Allow-Origin': '*'},
                statusCode: 200,
                body: JSON.stringify({
                    count: j + 1,
                    message: msg

                }),
            };
            callback(null, responseSuccess);
        }
        else {
            const responseError = {
                headers: {'Access-Control-Allow-Origin': '*'},
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Error occurred while calling the third party API'

                }),
            };
            callback(null, responseError);
        }


    });


};

export const selectedFlight = async (event, context, callback) => {

    let {icao} = event.pathParameters;
    const flights: Flight[] = [];
    let msg: string[] = [];

    request({
        url: url + '?icao24=' + icao,
        json: true
    }, (error, response, body) => {

        if (!error && response.statusCode === 200) {

            const responseSuccess = {
                headers: {'Access-Control-Allow-Origin': '*'},
                statusCode: 200,
                body: JSON.stringify({
                    message: body.states

                }),
            };
            callback(null, responseSuccess);
        }
        else {
            const responseError = {
                headers: {'Access-Control-Allow-Origin': '*'},
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Error occurred while calling the third party API'

                }),
            };
            callback(null, responseError);
        }


    });


};
