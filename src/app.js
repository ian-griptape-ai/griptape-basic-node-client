const axios = require('axios');
require('dotenv').config();
const { createStructureRun, pollEventEndpoint, getStructureRunOutput } = require('./utils/api');

const main = async () => {
    try {
        // Initialize the Griptape API client and create a structure run
        const runId = await createStructureRun({"args": ['Hello, World!']});

        console.log('Run created:', runId);
        
        // Poll the event endpoint for the status of the run
        let result;
        let finished = false;
        do {
            result = await pollEventEndpoint(runId);
            await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 1 seconds
            if (result.events.length > 0) { 
                console.log('Latest Event:', result.events[result.events.length - 1]);
                if (result.events[result.events.length - 1].type === 'StructureRunCompleted') {finished = true};
            }
        } while (finished === false);
        
        
        
        // await new Promise(resolve => setTimeout(resolve, 20000));
        const output = await getStructureRunOutput(runId);

        // Print the results once the run is completed
    //    console.log('Run completed:', result);
        console.log('Output:', output.output.value);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

main();