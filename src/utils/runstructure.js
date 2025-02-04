const { createStructureRun, pollEventEndpoint, getStructureRunOutput } = require('./api');

async function runStructure(prompt, apiKey, structureId, griptapeApiUrl) {
    try {
        // Initialize the Griptape API client and create a structure run
        const runId = await createStructureRun({"args": [prompt]}, apiKey, structureId, griptapeApiUrl);

        console.log('Run created:', runId);
        
        // Poll the event endpoint for the status of the run
        let result;
        let finished = false;
        let offset = 0;
        do {
            result = await pollEventEndpoint(runId, offset, apiKey, griptapeApiUrl);
            offset = result.next_offset;
            await new Promise(resolve => setTimeout(resolve, 250)); // Poll every 5 seconds
            if (result.events.length > 0) { 
                if (result.events[result.events.length - 1].type === 'StructureRunCompleted') {finished = true};
            }
        } while (finished === false);
        
        const output = await getStructureRunOutput(runId, apiKey, griptapeApiUrl);

        return output.output.value;

    } catch (error) {
        console.error('Error:', error.message);
    }
};

module.exports = {
    runStructure
};