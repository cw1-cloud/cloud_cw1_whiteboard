import AWSConfig from "../awsConfig";
const { v4: uuidv4 } = require('uuid');
const documentClient = new AWSConfig.DynamoDB.DocumentClient();

//gets all the data from the database
const fetchCloudMessages = () => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'cloudMessages',
    };

    documentClient.scan(params, (err, data) => {
      if (err) {
        console.error("Error scanning DynamoDB table:", err);
        reject(err);
      } else {
        const items = data.Items;
        console.log("in fetch");
        resolve(items);
      }
    });
  });
};


//adds a new message into the db. Passes in a inputValue
const newMessage = async (inputValue1) => {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'cloudMessages',
        Item: {
          messageId: uuidv4(),
          message: JSON.stringify({ message: inputValue1 }),
        },
      };
  
      documentClient.put(params, (err, data) => {
        if (err) {
          console.error('Error putting item:', err);
          reject(err);
        } else {
          console.log('Item put successfully:', data);
          resolve(data); // Resolve the promise when the operation is successful
        }
      });
    });
  };
  
  export default {fetchCloudMessages, newMessage}
  
