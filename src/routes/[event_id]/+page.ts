import {getEventById} from "../../lib/db"


export async function load({ url, params }) {
    let event_id = params.event_id  || 'default';

    let data = await getEventById(event_id);
      console.log(data)
    return {
     data
   };
  };
  