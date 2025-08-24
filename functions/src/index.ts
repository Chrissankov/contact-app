import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';

admin.initializeApp();
const db = admin.firestore();

const app = express(); // This instance will be used to define routes (app.get, app.post, etc.)
app.use(cors({ origin: true })); // This middleware tells the browser it’s allowed to accept requests from other origins/ports .
app.use(express.json()); // Tells Express to automatically parse incoming request bodies with Content-Type: application/json

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

  await docRef.update({ id: docRef.id });

  return { id: docRef.id, ...contact };
});

// Contact CRUD
app.get('/contacts', async (req, res) => {
  try {
    const snapshot = await db.collection('contacts').get();
    const contacts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// GET contact by ID
app.get('/contacts/:id', async (req, res) => {
  try {
    const doc = await db.collection('contacts').doc(req.params.id).get();
    if (!doc.exists) {
      res.status(404).send('Contact not found');
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// CREATE a contact
app.post('/contacts', async (req, res) => {
  try {
    const newContact = req.body;
    const docRef = await db.collection('contacts').add(newContact);
    res.status(201).json({ id: docRef.id, ...newContact });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// UPDATE a contact
app.put('/contacts/:id', async (req, res) => {
  try {
    const updatedContact = req.body;
    await db.collection('contacts').doc(req.params.id).update(updatedContact);
    res.json({ id: req.params.id, ...updatedContact });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// DELETE a contact
app.delete('/contacts/:id', async (req, res) => {
  try {
    await db.collection('contacts').doc(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Export the Express app as a single Firebase Function
export const api = functions.https.onRequest(app);
