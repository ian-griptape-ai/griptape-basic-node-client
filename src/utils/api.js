// This file contains functions for interacting with the Griptape API.

async function createStructureRun(data, apiKey, structureId, griptapeApiUrl) {
    try {
        const url = new URL(`${griptapeApiUrl}/structures/${structureId}/runs`);
        url.search = new URLSearchParams({
            'path': JSON.stringify({ 'structure_id': `${structureId}` })
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error creating structure run: ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData.structure_run_id;
    } catch (error) {
        console.error('Error creating structure run:', error);
        throw error;
    }
}

async function listenForEvents(runId, apiKey, griptapeApiUrl) {
    try {
        const response = await fetch(`${griptapeApiUrl}/structure-runs/${runId}/events/stream`, { 
            method: "GET", 
            headers: {
            'Authorization': `Bearer ${apiKey}`
            } 
        });
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let concatenatedText = "";
        let buffer = "";

        function processBuffer(bufferStr) {
            const parts = bufferStr.split("\n\n");
            // Process complete events
            for (let i = 0; i < parts.length - 1; i++) {
              processEvent(parts[i]);
            }
            // Return last (possibly incomplete) part
            return parts[parts.length - 1];
        }

        function processEvent(eventStr) {
            const lines = eventStr.split("\n");
            let eventName = "";
            let dataStr = "";
            lines.forEach(line => {
                if (line.startsWith("data:")) {
                dataStr += line.substring("data:".length).trim();
                const eventData = JSON.parse(dataStr);
                if (eventData.payload.token !== undefined) {
                    process.stdout.write(eventData.payload.token) 
                    concatenatedText += eventData.payload.token;
                }
              }
            });
        }

        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                if (buffer.length) {
                  buffer = processBuffer(buffer);
                }
                return concatenatedText;
              }
              buffer += decoder.decode(value)
              buffer = processBuffer(buffer);
        }
    } catch (error) {
        console.error('Error listening for events:', error);
        throw error;
    }
}


// pollEventEndpoint is no longer used. We now stream events using listenForEvents.
async function pollEventEndpoint(runId, offset, apiKey, griptapeApiUrl) {
    try {
        const url = new URL(`${griptapeApiUrl}/structure-runs/${runId}/events`);
        url.search = new URLSearchParams({
            'offset': offset,
            'limit': 100
        });

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error polling event endpoint: ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error polling event endpoint:', error);
        throw error;
    }
}

async function getStructureRunOutput(runId, apiKey, griptapeApiUrl) {
    try {
        const url = `${griptapeApiUrl}/structure-runs/${runId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error getting run detail: ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error getting run detail:', error);
        throw error;
    }
}

module.exports = {
    createStructureRun,
    listenForEvents,
    pollEventEndpoint,
    getStructureRunOutput
};
