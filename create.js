import { v1 } from "uuid";

import dynamoDBUtil from "./utils/dynamodb";
import { success, failure } from "./utils/response";

/**
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
export async function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDBUtil.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
