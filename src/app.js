const { runStructure } = require('./utils/runstructure');
const { deleteThreadByAlias } = require('./utils/threads');
require('dotenv').config();

const GRIPTAPE_API_URL = process.env.GRIPTAPE_API_URL;
const API_KEY = process.env.GRIPTAPE_API_KEY;
const STRUCTURE_ID = process.env.STRUCTURE_ID;

const main = async () => {
    try {
        const results = await runStructure('write me a poem', API_KEY, STRUCTURE_ID, GRIPTAPE_API_URL);
        console.log('Output:', results);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

main();