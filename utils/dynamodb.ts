import { DynamoDB } from "aws-sdk";

type Action = any; // "put" | "get" | "update";

export function call(action: Action, params: any) {
  const dynamoDb = new DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}

export default { call };
