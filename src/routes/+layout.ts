import { collection, doc, getDoc, getDocs, query, where, addDoc, setDoc } from "firebase/firestore";
import {db, firebase_auth} from '../lib/firebase.ts';



async function getEventList() {
    try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventIds: string[] = []; // Initialize an empty array to hold event IDs
        querySnapshot.forEach((doc) => {
            // Extract the event ID from each document and push it to the array
            eventIds.push(doc.id); // Assuming the event ID is stored in the document ID
        });
        //console.log(eventIds);
        return eventIds;
    } catch (error) {
        console.error("Error getting documents: ", error);
        throw error; // Rethrow the error or handle it appropriately
    }
}

export async function load({ url, params }) {
    let event_id = params.event_id  || 'default';

    let event_list = await getEventList();
   return {
     event_id,
     event_list
   };
  };
  
  
  export const prerender = false
  export const ssr = false