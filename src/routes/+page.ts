import type { PageLoad } from './$types';
import { getEventById } from '../lib/db.ts';

/* ntaEzmLvtu281YKojmDf */

export const load = (async () => {  
    let event = await getEventById("ntaEzmLvtu281YKojmDf") ;
    return {
        event: event,
    };
}) satisfies PageLoad;

