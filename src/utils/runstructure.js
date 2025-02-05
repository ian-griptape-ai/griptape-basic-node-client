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
        let text_chunks_concat ='';
        do {
            result = await pollEventEndpoint(runId, offset, apiKey, griptapeApiUrl);
            offset = result.next_offset;
            result.events.forEach(event => {
                if (event.type === "TextChunkEvent") {
                    process.stdout.write(event.payload.token)
                    text_chunks_concat += event.payload.token;
                }
            });
            await new Promise(resolve => setTimeout(resolve, 250)); // Poll every .25 seconds
            if (result.events.length > 0) { 
                if (result.events[result.events.length - 1].type === 'StructureRunCompleted') {
                    finished = true
                    process.stdout.write("\n")
                };
            }
        } while (finished === false);
        
        const output = await getStructureRunOutput(runId, apiKey, griptapeApiUrl);

        return text_chunks_concat;

    } catch (error) {
        console.error('Error:', error.message);
    }
};

module.exports = {
    runStructure
};