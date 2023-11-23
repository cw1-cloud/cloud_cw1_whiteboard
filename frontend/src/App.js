import React, { useState } from 'react';
import databaseCalls from './databaseCalls/databaseCalls';
function App() {
  const [inputValue1, setInputValue1] = useState('');

  const saveDataToDb = async () => {
    await databaseCalls.newMessage(inputValue1)
  };

  const fetchMessagesFromDb = async () => {
    console.log("List of JSON documents:", await databaseCalls.fetchCloudMessages());
};

  return (
    <div className="App">
      <h1>Save data to dynamo DB</h1>
      <input
        type="text"
        value={inputValue1}
        onChange={(e) => setInputValue1(e.target.value)}
      />
      <button onClick={saveDataToDb}>Save data to dynamo DB</button> <br/><br/>
      <button onClick={fetchMessagesFromDb}>Fetch from dynamo DB</button> <br/><br/>
    </div>
  );
}

export default App;