# Griptape Node App

This is a standalone Node.js application that interacts with the Griptape API to initiate a structure run, poll for its status, and print the results once the run is completed.

## Project Structure

```
griptape-node-app
├── src
│   ├── app.js          # Entry point of the application
│   └── utils
│       └── api.js      # Functions for interacting with the Griptape API
│       └── threads.js  # Functions to interact with Conversation Threads via the Griptape API
├── package.json        # npm configuration file
├── env.example         # Example file containing environment variables for configuration
└── README.md           # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd griptape-node-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` based on the `example.env` file in the root directory and add your Griptape API key and endpoint URLs:
   ```
   GRIPTAPE_API_URL=https://cloud.griptape.ai/api
   GRIPTAPE_API_KEY=your_Griptape_Cloud_api_key
   STRUCTURE_ID=the Structure ID of the Structure that you wish to invoke
   ```

## Usage

To run the application, use the following command:
```
node src/app.js
```

## Griptape API Integration

This application utilizes the Griptape API to perform the following actions:

- **Create a Structure Run**: Initiates a structure run using the Griptape API.
- **Listen for Events**: Streams events from the structure run until it is completed, then retrieves and prints the results.
- **Get Thread ID by Alias**: Retrieves the thread ID associated with a given alias.
- **Delete Thread by ID**: Deletes a thread using its ID.
- **Delete Thread by Alias**: Deletes a thread using its alias.

### Functions

#### createStructureRun

Initiates a structure run using the Griptape API.

```javascript
async function createStructureRun(data, apiKey, structureId, griptapeApiUrl) {
    // Implementation
}
```

#### listenForEvents

Streams events from the structure run until it is completed.

```javascript
async function listenForEvents(runId, apiKey, griptapeApiUrl) {
    // Implementation
}
```

#### getThreadIdByAlias

Retrieves the thread ID associated with a given alias.

```javascript
async function getThreadIdByAlias(alias, apiKey, griptapeApiUrl) {
    // Implementation
}
```

#### deleteThreadById

Deletes a thread using its ID.

```javascript
async function deleteThreadById(threadId, apiKey, griptapeApiUrl) {
    // Implementation
}
```

#### deleteThreadByAlias

Deletes a thread using its alias.

```javascript
async function deleteThreadByAlias(alias, apiKey, griptapeApiUrl) {
    // Implementation
}
```

## License

This project is licensed under the MIT License.
