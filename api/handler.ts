
import { Dynamo} from "./dynamodb/helper";
import * as Winston from 'winston';
import * as AWS from 'aws-sdk';
import { v4 } from 'uuid';
import {assignmentStatusType} from "aws-sdk/clients/iam";
import {error} from "util";

const iot = new AWS.Iot();
const sts = new AWS.STS();
const roleName = 'NotificationIoT';


export const hello = async (event, context, cb) => {
    let { clientId } = event.pathParameters;
    const params = {
        TableName: 'Clients',
            Key: {

                clientId: clientId
            },
    },
        dynamo = new Dynamo();
        dynamo.getDocClient().get(params, (err, data) => {
            Winston.info('Get Client table item', JSON.stringify(data, null, 2));

            const response = {
                headers: {'Access-Control-Allow-Origin': '*' },
                statusCode: 200,
                body: JSON.stringify('Tenant ID for clientID '+clientId+' = '+data.Item['fmtenantId']),
            };
            cb(null, response);
    });
};

const getRandomInt = () => {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};
export const auth = async (event, context, callback ) =>{
    // get the endpoint address
    iot.describeEndpoint({}, (err, data) => {
        if (err) return callback(err);

        console.log('Endpoint Address >>>>', data.endpointAddress);
        console.log('Data >>>>',data);
        const iotEndpoint = data.endpointAddress;
        const region = 'us-east-1';

        // get the account id which will be used to assume a role
        sts.getCallerIdentity({}, (err, data) => {
            if (err) return callback(err);

            const params = {
                RoleArn: `arn:aws:iam::${data.Account}:role/${roleName}`,
                RoleSessionName: getRandomInt().toString()
            };

            // assume role returns temporary keys
            sts.assumeRole(params, (err, data) => {
                if (err) return callback(err);

                const res = {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        iotEndpoint: iotEndpoint,
                        region: region,
                        accessKey: data.Credentials.AccessKeyId,
                        secretKey: data.Credentials.SecretAccessKey,
                        sessionToken: data.Credentials.SessionToken
                    })
                };

                callback(null, res);
            });
        });
    });
};

export const notifyOthers = async (event, context, callback) => {

    const audience = ['userId1', 'userId2', 'userID3', 'userId4'];

    for(let i=0; i< audience.length; i++){
    const params = {
        TableName: 'NotificationUser',
        Item: {
            notificationId: v4(),
            userId: 'abcduserId',
            notifiedTime: new Date(),
            message: {title: 'First Notifcation', content: event.Records[0].dynamodb.NewImage.message.S},
            status: 'pending',

        }
    },
        dynamo = new Dynamo();
    dynamo.getDocClient().put(params, (data, error) =>{
        Winston.info('Put NotificationUsers table item', JSON.stringify(data, null, 2));

        const response = {
            headers: {'Access-Control-Allow-Origin': '*' },
            statusCode: 200,
            body: data,
        };
        callback(null, response);

    });
    }

};

export const updateClient = async (event, context, callback) => {
    let data = event;
    console.log('Event in updateClient >>>>', JSON.stringify(event.Records[0].dynamodb.NewImage, null, 2));
    console.log('Event 2 in updateClient >>>>', JSON.stringify(event.Records));
    console.log('Event 3 in updateClient >>>>', JSON.stringify(event.Records[0]));
    console.log('Event 4 in updateClient >>>>', JSON.stringify(event.Records[0].dyanamodb));
    data.updatedAt = new Date().getTime();
    const params = {
        TableName: 'ClientUpdates',
        Item: {
            clientId: event.Records[0].dynamodb.NewImage.clientId.S
        },
    },
        dynamo = new Dynamo();
    dynamo.getDocClient().put(params, (err,data) =>{
        Winston.info('Put Client table item', JSON.stringify(data, null, 2));

        const response = {
            headers: {'Access-Control-Allow-Origin': '*' },
            statusCode: 200,
            body: data,
        };
        callback(null, response);
    });



};

export const logger = async (event, context, callback) =>{
    console.log(`The following happend in the DynamoDB database table "Clients":\n${JSON.stringify(event.Records[0].dynamodb, null, 2)}`);
    console.log('Event >>>>', event);

    callback(null, { event });
};
