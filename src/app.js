const { runStructure } = require('./utils/runstructure');
require('dotenv').config();

const main = async () => {
    try {
        const results = await runStructure('write me a poem');

        console.log('Output:', results);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

main();