// ------------------------------------
// ✅ Gmail Helper Module
// ------------------------------------
require('dotenv').config();
const { google } = require('googleapis');

/**
 * Create OAuth2 client with optional refresh token
 */
function createOAuthClient(refreshToken) {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL || '/auth/google/redirect'
  );

  if (refreshToken) {
    client.setCredentials({ refresh_token: refreshToken });
  }

  return client;
}

/**
 * Exchange refresh token for a fresh access token
 */
async function getAccessTokenFromRefreshToken(refreshToken) {
  if (!refreshToken) throw new Error('Missing refresh token');

  try {
    const client = createOAuthClient(refreshToken);
    const res = await client.getAccessToken();

    const token =
      (res && typeof res === 'object' && res.token) ||
      (res && res.credentials && res.credentials.access_token) ||
      (typeof res === 'string' ? res : null);

    if (!token) throw new Error('Unable to obtain access token from refresh token');

    client.setCredentials({
      access_token: token,
      refresh_token: refreshToken,
    });

    return { client, token };
  } catch (error) {
    if (error.message.includes('invalid_grant')) {
      throw new Error('Refresh token expired or revoked. Please reauthenticate via Google login.');
    }
    throw error;
  }
}

/**
 * Start Gmail push notifications using Pub/Sub
 */
async function startWatch(refreshToken, topicName, labelIds = ['INBOX']) {
  if (!refreshToken) throw new Error('Missing refresh token');

  let resolvedTopic = topicName;
  if (!resolvedTopic) {
    const projectId = process.env.GCP_PROJECT_ID;
    const pubsubTopic = process.env.PUBSUB_TOPIC_NAME;

    if (!projectId || !pubsubTopic) {
      throw new Error(
        'Missing Pub/Sub configuration: provide topicName or set GCP_PROJECT_ID and PUBSUB_TOPIC_NAME in .env'
      );
    }

    resolvedTopic = `projects/${projectId}/topics/${pubsubTopic}`;
  }

  const { client } = await getAccessTokenFromRefreshToken(refreshToken);
  const gmail = google.gmail({ version: 'v1', auth: client });

  try {
    const res = await gmail.users.watch({
      userId: 'me',
      requestBody: {
        topicName: resolvedTopic,
        labelIds,
        labelFilterAction: 'include',
      },
    });

    console.log('✅ Gmail watch started. History ID:', res.data.historyId);
    return res.data;
  } catch (err) {
    console.error('❌ Gmail watch failed:', err.response?.data || err.message);
    err.message = `Gmail watch failed: ${err.message}`;
    throw err;
  }
}

module.exports = {
  createOAuthClient,
  getAccessTokenFromRefreshToken,
  startWatch,
};




























