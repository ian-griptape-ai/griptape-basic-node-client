async function getThreadIdByAlias(alias, apiKey, griptapeApiUrl) {
    try {
        const url = new URL(`${griptapeApiUrl}/threads`);
        url.search = new URLSearchParams({
            'alias': alias
        });
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error getting conversation memory ID: ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData.threads[0].thread_id;
    } catch (error) {
        console.error('Error getting conversation memory ID:', error);
        throw error;
    }
}

async function deleteThreadById(threadId, apiKey, griptapeApiUrl) {
    try {
        const url = `${griptapeApiUrl}/threads/${threadId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting thread with ID: ${response.statusText}`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting thread with ID:', error);
        throw error;
    }
}

async function deleteThreadByAlias(alias, apiKey, griptapeApiUrl) {
    try {
        const threadId = await getThreadIdByAlias(alias, apiKey, griptapeApiUrl);
        const result = await deleteThreadById(threadId, apiKey, griptapeApiUrl);
        return result;
    } catch (error) {
        console.error('Error deleting thread with ID:', error);
        throw error;
    }
}

module.exports = {
    getThreadIdByAlias,
    deleteThreadById,
    deleteThreadByAlias
};
