import * as AWS from 'aws-sdk';
import {ServiceConfigurationOptions} from 'aws-sdk/lib/service';
import { Dynamo} from "./dynamodb/helper";
import * as Winston from 'winston';


export const hello = async (event, context, cb) => {

    const params = {/*
        TableName: 'Clients',
            Key: {

                clientId: 'aa84fb90-12c4-11e1-840d-7b25c5ee775a-bb84fb90-a2c4-bde1-830d'
            },*/
    },
        dynamo = new Dynamo();
        dynamo.getCoreClient().listTables(params, (err, data) => {
            Winston.info('Get Client table item', JSON.stringify(data, null, 2))
            const response = {
                statusCode: 200,
                body: JSON.stringify(data),
            };
            cb(null, response);
    });
};
