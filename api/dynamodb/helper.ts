import * as AWS from 'aws-sdk';
import * as Winston from 'winston';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

class Dynamo {

    options?: (AWS.DynamoDB.DocumentClient.DocumentClientOptions & ServiceConfigurationOptions & AWS.DynamoDB.ClientApiVersions) | undefined;
    constructor(options?: (AWS.DynamoDB.DocumentClient.DocumentClientOptions & ServiceConfigurationOptions & AWS.DynamoDB.ClientApiVersions) | undefined) {
            this.options = options;

    }

    getDocClient(): AWS.DynamoDB.DocumentClient {
        let dynamodb: AWS.DynamoDB.DocumentClient;
        try {
            dynamodb = new AWS.DynamoDB.DocumentClient(this.options);
        }
        catch (error) {
            Winston.error("Unable to return dynamodb document client. Error:", JSON.stringify(error, null, 2));
            throw error;
        }
        return dynamodb;
    }

    getCoreClient(): AWS.DynamoDB {
        let dynamodb: AWS.DynamoDB;
        try {
            dynamodb = new AWS.DynamoDB(this.options);

        }
        catch (error) {
            Winston.error("Unable to return dynamodb core client. Error:", JSON.stringify(error, null, 2));
            throw error;
        }
        return dynamodb;
    }

}

export { Dynamo };