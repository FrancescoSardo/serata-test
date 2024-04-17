import { collection, doc, getDoc, getDocs, query, where, addDoc, setDoc } from "firebase/firestore";
import {db, firebase_auth} from './firebase.ts';
type EventType = {
    id: string,
    titolo: string,
    descrizione: string,
    start: Date,
    end: Date,
    location: string,
    ticket: {
        nome: string,
        descrizione: string,
        start: Date,
        end: Date,
    }[],
    info: {
        nome: string,
        descrizione: string,
        mail: string,
    },
}


export async function addUserToEvent(event_id: string): boolean {
    // Ensure the current user is logged in
    if (!firebase_auth.currentUser) {
        console.error("No user is currently logged in.");
        return;
    }

    // Construct the user object
    let user = {
        id: firebase_auth.currentUser.uid,
        email: firebase_auth.currentUser.email,
        name: firebase_auth.currentUser.displayName,
    };
    try {
        // Reference to the 'users' subcollection of the specified event
        const usersCollectionRef = collection(doc(db, "events", event_id), "users");

        // Create a document reference with the user ID as the document ID
        const userDocRef = doc(usersCollectionRef, user.id);

        // Attempt to get the user document
        const userDocSnapshot = await getDoc(userDocRef);

        // Check if the user document exists
        if (userDocSnapshot.exists()) {
            console.log("User already exists in the event.");
            return false;
        }

        // If the user document does not exist, add the user
        await setDoc(userDocRef, user);
        console.log("User added with ID: ", userDocRef.id);
        add_mail_to_db();
        return true;
    } catch (error) {
        console.error("Error adding user to event: ", error);
    }
}
/* 
A function that add to the mail firestore database collaction a elmeent that contain a message : {
    html: string,
    subject: string,
    text: string,
}
end to : [mails]

set a default value for the message
*/
export function add_mail_to_db(/* mail: {html: string, subject: string, text: string} */) {
    // Check if a user is logged in
    const user = firebase_auth.currentUser;
    let html = `Complimenti!
    Sei Dentro!
    In questa mail trovi in codice QR che sarà valido come accesso.
    MESSAGGIO PERSONALIZZATO DALL UTENTE
    MESSAGGIO PERSONALIZZATO DALL UTENTE
    Controlla sull APP tutti gli aggiornamenti.`;
    if (user) {
        let mail : {message: {html: string, subject: string, text: string}, to: string[] } = {
            message: {
                html: html,
                subject: "Email di Conferma",
                text: "text",
            },
            to: [user.email] // Use the current user's email
        }
        const mailCollection = collection(db, "mail");
        addDoc(mailCollection, mail)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    } else {
        console.error("No user is currently logged in.");
    }
}

export async function getEventById(id: string) {
    let event;
    try {
        const eventRef = doc(db, "events", id); // Reference to the document in the "events" collection
        const eventSnapshot = await getDoc(eventRef); // Fetch the document

        if (eventSnapshot.exists()) {
            const eventData = eventSnapshot.data() as EventType; // Get the event data

            // Fetch the tickets subcollection
            const ticketsRef = collection(eventRef, "ticket");
            const ticketsSnapshot = await getDocs(ticketsRef);
            const tickets = ticketsSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    nome: data.nome,
                    descrizione: data.descrizione,
                    start: data.start.toDate(), // Assuming 'start' is a Firestore Timestamp
                    end: data.end.toDate(), // Assuming 'end' is a Firestore Timestamp
                };
            });

            // Add the tickets to the event data
            eventData.ticket = tickets;

            return eventData; // Return the event data including the tickets
        } else {
            console.log("No such event!");
            return null; // Return null if the event does not exist
        }
    } catch (error) {
        console.error("Error getting event:", error);
        return null; // Return null in case of an error
    }
}

