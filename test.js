const {PubSub} = require('@google-cloud/pubsub');
const {GoogleAuth} = require('google-auth-library');

const topicName = 'grpc-node-issue-1347';

if (!process.env.PUBSUB_GCLOUD_PROJECT) {
	throw new Error('Must set PUBSUB_GCLOUD_PROJECT');
}

async function main() {
	const pubSubClient = new PubSub({auth: new GoogleAuth()});
	pubSubTopic = pubSubClient.topic(topicName);
	await pubSubTopic.get({autoCreate: true}).catch((err) => {
		console.log({err}, 'Error getting/creating pubsub topic');
	});

	const payload = Buffer.alloc(1000, 'xyzzy');
	await pubSubTopic.publish(payload);
}

if (require.main === module) {
	main();
}
