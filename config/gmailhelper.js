const { google } = require('googleapis');
require('dotenv').config();

function createOAuthClient(refreshToken) {
    const client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_CALLBACK_URL || '/auth/google/redirect'
    );
    if (refreshToken) client.setCredentials({ refresh_token: refreshToken });
    return client;
}

async function getAccessTokenFromRefreshToken(refreshToken) {
    const client = createOAuthClient(refreshToken);
    const res = await client.getAccessToken();
    // googleapis may return a string token or an object with token/credentials
    const token = (res && typeof res === 'object' && res.token) ||
                  (res && res.credentials && res.credentials.access_token) ||
                  (typeof res === 'string' ? res : null);
    if (!token) throw new Error('Unable to obtain access token from refresh token');
    client.setCredentials({ access_token: token, refresh_token: refreshToken });
    return { client, token };
}

async function startWatch(refreshToken, topicName, labelIds = ['INBOX']) {
    // Validate refresh token
    if (!refreshToken) throw new Error('Missing refresh token');

    // If topicName not passed, attempt to build from env vars
    let resolvedTopic = topicName;
    if (!resolvedTopic) {
        const projectId = process.env.GCP_PROJECT_ID;
        const pubsubTopic = process.env.PUBSUB_TOPIC_NAME;
        if (!projectId || !pubsubTopic) {
            throw new Error('Missing Pub/Sub configuration: provide topicName or set GCP_PROJECT_ID and PUBSUB_TOPIC_NAME in .env');
        }
        resolvedTopic =`projects/${projectId}/topics/${pubsubTopic}`
;
    }

    const { client } = await getAccessTokenFromRefreshToken(refreshToken);
    const gmail = google.gmail({ version: 'v1', auth: client });

    try {
        const res = await gmail.users.watch({
            userId: 'me',
            requestBody: {
                topicName: resolvedTopic,
                labelIds
            }
        });
        return res.data; // contains historyId, expiration, etc.
    } catch (err) {
        // attach more context and rethrow for upper-level handling/logging
        err.message = `Gmail watch failed: ${err.message}`;
        throw err;
    }
}

module.exports = {
    createOAuthClient,
    getAccessTokenFromRefreshToken,
    startWatch
};
