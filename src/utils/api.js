// This file contains functions for interacting with the Griptape API.

require('dotenv').config();

const GRIPTAPE_API_URL = process.env.GRIPTAPE_API_URL;
const API_KEY = process.env.GRIPTAPE_API_KEY;
const STRUCTURE_ID = process.env.STRUCTURE_ID;

async function createStructureRun(data) {
    try {
        const url = new URL(`${GRIPTAPE_API_URL}/structures/${STRUCTURE_ID}/runs`);
        url.search = new URLSearchParams({
            'path': JSON.stringify({ 'structure_id': `${STRUCTURE_ID}` })
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
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

async function pollEventEndpoint(runId, offset) {
    try {
        const url = new URL(`${GRIPTAPE_API_URL}/structure-runs/${runId}/events`);
        url.search = new URLSearchParams({
            'offset': offset,
            'limit': 100
        });

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
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

async function getStructureRunOutput(runId) {
    try {
        const url = `${GRIPTAPE_API_URL}/structure-runs/${runId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
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