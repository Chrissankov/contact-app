import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// Create Your First onRequest Function "helloWorldReq"
export const helloWorldReq = functions.https.onRequest((req, res) => {
  res.json({ message: 'Hello world Req' });
});

// Create Your First onCall Function "helloWorldCall"
export const helloWorldCall = functions.https.onCall((data, context) => {
  return { message: `Hello world Call` };
});

// Contact Type
type Contact = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

// Create a Contact Server-Side
export const createContact = functions.https.onCall(async (request) => {
  const contact: Contact = request.data;

  if (
    !contact?.name ||
    !contact?.email ||
    !contact?.phone ||
    !contact?.address
  ) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'All inputs are required'
    );
  }

  const docRef = await db.collection('contacts').add(contact);

  return { id: docRef.id, ...contact };
});
