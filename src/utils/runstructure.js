const { createStructureRun, pollEventEndpoint, getStructureRunOutput, listenForEvents } = require('./api');

async function runStructure(prompt, apiKey, structureId, griptapeApiUrl) {
    try {
        // Initialize the Griptape API client and create a structure run
        const runId = await createStructureRun({"args": [prompt]}, apiKey, structureId, griptapeApiUrl);
        console.log('Run created:', runId);

        const result = await listenForEvents(runId, apiKey, griptapeApiUrl);

        const output = await getStructureRunOutput(runId, apiKey, griptapeApiUrl);

        return output.output.value;

    } catch (error) {
        console.error('Error:', error.message);
    }
};

module.exports = {
    runStructure
};