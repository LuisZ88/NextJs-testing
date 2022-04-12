import MeetupList from "../components/meetups/MeetupList";

import { MongoClient } from "mongodb";

// const DUMMY_LIST = [
//   {
//     id: "m1",
//     title: "el 1",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Zaragoza_-_Estaci%C3%B3n_de_tren_de_Zaragoza-Delicias.jpg/640px-Zaragoza_-_Estaci%C3%B3n_de_tren_de_Zaragoza-Delicias.jpg",
//     address: "algun sito",
//     description: "una dessfasdfsdfsdf",
//   },
//   {
//     id: "m2",
//     title: "el 2",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Espa%C3%B1aLoc.svg/640px-Espa%C3%B1aLoc.svg.png",
//     address: "algun sito",
//     description: "una dessfasdfsdfsdf",
//   },
//   {
//     id: "m4",
//     title: "el 3",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/640px-Bandera_de_Espa%C3%B1a.svg.png",
//     address: "algun sito",
//     description: "una dessfasdfsdfsdf",
//   },
// ];
import Head from "next/head"
const HomePage = (props) => {
  return (
    <><Head><title>Pruebas NextJS</title>
    <meta name="description" content=">Una web arpa testear NEXTJS"/></Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};
export async function getStaticProps() {
  require("dotenv").config();
  const URL = process.env.MONGODB_URL;
  const client = await MongoClient.connect(URL);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // actualiza las props //
  };
}
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch
//   return {
//     props: {
//       meetups: DUMMY_LIST,
//     },
//   };
// }
export default HomePage;
