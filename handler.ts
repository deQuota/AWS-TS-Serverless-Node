import * as AWS from 'aws-sdk';
import {ServiceConfigurationOptions} from 'aws-sdk/lib/service';
import { Dynamo} from "./dynamodb/helper";
import * as Winston from 'winston';


export const hello = (event, context, cb) => {

    const params = {
        TableName: 'Clients',
        IndexName: 'ADClientIdIndex',
        KeyConditionExpression: 'clientId = :clientId',
        ExpressionAttributeValues: {
            ':clientId': 'bb84fb90-12c4-11e1-840d-7b25c5ee775a-bb84fb90-a2c4-bde1-838d'

        }
    },
        dynamo = new Dynamo();
        dynamo.getDocClient().query(params, (err, data) => {
            Winston.info('Queried the Client table', JSON.stringify(data, null, 2))
            const response = {
                statusCode: 200,
                body: JSON.stringify(data),
            };
            cb(null, response);
    });
};
