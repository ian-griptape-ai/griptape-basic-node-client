// This file contains functions for interacting with the Griptape API.

const axios = require('axios');
require('dotenv').config();

const GRIPTAPE_API_URL = process.env.GRIPTAPE_API_URL;
const API_KEY = process.env.GRIPTAPE_API_KEY;
const STRUCTURE_ID = process.env.STRUCTURE_ID;

async function createStructureRun(data) {
    try {
        const response = await axios.post(`${GRIPTAPE_API_URL}/structures/${STRUCTURE_ID}/runs`, data, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            params: {
                'path': { 'structure_id': `${STRUCTURE_ID}` },
            }
        });
        return response.data.structure_run_id;
    } catch (error) {
        console.error('Error creating structure run:', error);
        throw error;
    }
}

async function pollEventEndpoint(runId) {
    try {
        const response = await axios.get(`${GRIPTAPE_API_URL}/structure-runs/${runId}/events`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error polling event endpoint:', error);
        throw error;
    }
}

async function getStructureRunOutput(runId) {
    try {
        const response = await axios.get(`${GRIPTAPE_API_URL}/structure-runs/${runId}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating getting run detail:', error);
        throw error;
    }
}

module.exports = {
    createStructureRun,
    pollEventEndpoint,
    getStructureRunOutput
};