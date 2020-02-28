import dynamoDBUtil from "./utils/dynamodb";
import { success, failure } from "./utils/response";

export async function main(event) {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    await dynamoDBUtil.call("delete", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
