import * as functions from 'firebase-functions';

// Create Your First onRequest Function "helloWorldReq"
export const helloWorldReq = functions.https.onRequest((req, res) => {
  res.json({ message: 'Hello world Req' });
});

// Create Your First onCall Function "helloWorldCall"
export const helloWorldCall = functions.https.onCall((data, context) => {
  return { message: `Hello world Call` };
});
