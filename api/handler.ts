
import { Dynamo} from "./dynamodb/helper";
import * as Winston from 'winston';


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
