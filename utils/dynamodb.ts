import { DynamoDB } from "aws-sdk";

type Action = "put" | "get" | "update";

export function call(action: Action, params) {
  const dynamoDb = new DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}
