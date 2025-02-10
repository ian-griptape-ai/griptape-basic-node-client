# Griptape Node App

This is a standalone Node.js application that interacts with the Griptape API to initiate a structure run, poll for its status, and print the results once the run is completed.

## Project Structure

```
griptape-node-app
├── src
│   ├── app.js          # Entry point of the application
│   └── utils
│       └── api.js     # Functions for interacting with the Griptape API
├── package.json        # npm configuration file
├── .env                # Environment variables for configuration
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

3. Create a `.env` file in the root directory and add your Griptape API key and endpoint URLs:
   ```
   GRIPTAPE_API_KEY=your_Griptape_Cloud_api_key
   GRIPTAPE_API_URL=https://cloud.griptape.ai/api
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
- **Poll for Event Status**: Continuously checks the status of the structure run until it is completed, then retrieves and prints the results.

## License

This project is licensed under the MIT License.
