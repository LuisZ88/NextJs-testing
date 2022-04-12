// /api/new-meetup
// Post /api/new-meetup
require("dotenv").config();
const URL = process.env.MONGODB_URL;
import { MongoClient } from "mongodb";
async function handler(req, res) {
    try { if (req.method === "POST") {
        const data = req.body;
        const client = await MongoClient.connect(URL);
        const db = client.db();
        const meetupsCollection = db.collection("meetups");
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close()
        res.status(201).json({message: 'Reunión creada!'})
      }
      
    } catch (error) {
        console.log(error)
        
    }
 
}
export default handler;
