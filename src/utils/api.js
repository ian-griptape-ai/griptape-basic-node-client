// This file contains functions for interacting with the Griptape API.

require('dotenv').config();

//const GRIPTAPE_API_URL = process.env.GRIPTAPE_API_URL;

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
    pollEventEndpoint,
    getStructureRunOutput
};