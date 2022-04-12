import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from 'next/head'
const MeetupDetails = (props) => {

    return <><Head><title>{props.meetupData.title}</title>
    <meta name="description" content={props.meetupData.description}/></Head><MeetupDetail meetupData={props.meetupData}/></>
};
export async function getStaticPaths(){
    require("dotenv").config();
  const URL = process.env.MONGODB_URL;
  const client = await MongoClient.connect(URL);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
  client.close();
    return {
        fallback: false, // para definir las rutas posibles, si es false solo estas, si es true se generan dinamicamente las que no estan //
        paths: meetups.map((meetup)=>({params: {meetupId: meetup._id.toString()}}))
    }
}
export async function getStaticProps (context){
    const meetupId = context.params.meetupId;
    // fetch para los datos con la id
    require("dotenv").config();
    const URL = process.env.MONGODB_URL;
    const client = await MongoClient.connect(URL);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)},);
    
    client.close();
    return{
        props:{
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.title,
                description: selectedMeetup.description,
              }
        }
    }
}
export default MeetupDetails;
