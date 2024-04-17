<script lang="ts">
  import { goto } from "$app/navigation";
  import { loginWithGoogleOrGetUser, log_out } from "../lib/firebase";
  import { add_mail_to_db, addUserToEvent } from "../lib/db";

  export let data;

  let event  = data.event;
  let ticker_start = event.start.toDate(); // Start date of the ticket
  let ticker_end = event.end.toDate(); // End date of the ticket
  let nome = event.nome; // Name of the event
  let des = event.descrizione; // Description of the event
  let address = event.location; // Replace with your address
  let googleMapsLink = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCaCV_ZmbzOsYcxVGpHn3Lc31DbGUjwXrA&q=${encodeURIComponent(address)}`;

  let ticket =  event.ticket; // Ticket object
  
  async function prenota() {
    const currentDate = new Date();
    if (currentDate >= ticker_start && currentDate <= ticker_end) {
      await loginWithGoogleOrGetUser();
      await addUserToEvent("ntaEzmLvtu281YKojmDf").then(() => {
        goto("confirm-page")
      });
    } else {
      alert("Ticket is not available at this time.");
    }
  }
</script>

<div class="page">
  <div class="mobile-wrap">
    <div class="wrapper_intro">
      <div class="title">{nome}</div>
      <div class="descrizione">
        {des}
      </div>
    </div>

    <div class="location">
      <div class="title">Location</div>
      <iframe
        class="map"
        frameborder="0"
        style="border:0"
        src={googleMapsLink}
        allowfullscreen
      >
      </iframe>
    </div>
    <div class="wrapper_start_end">
      <div class="start">{ticker_start}</div>
      <div class="end">{ticker_end}</div>
    </div>

   
    {#each ticket as tick}
      <div
      class="ticket_wrapper"
      on:click={() => {
        prenota();
      }}
    >
      <div class="title">{tick.nome}</div>
      <div class="descrizione">
        {tick.descrizione}
      </div>
    </div>
    {/each}

    <!-- <button
      on:click={() => {
        prenota();
      }}
    >
      Test
    </button>

    <button
      on:click={() => {
        log_out();
      }}
    >
      Logout
    </button> -->
  </div>
</div>

<style lang="scss">
  .wrapper_intro {
    background-color: black;
    color: white;
    padding: 1rem;
    width: 100%;
    height: fit-content;
    .title {
      font-size: 3.5rem;
      font-weight: bold;
      word-wrap: break-word; // Add this line to break words onto the next line
      max-width: 100%; // Ensure the title does not exceed the container width
    }
    .descrizione {
      color: lightgray;
    }
  }
  .location {
    padding: 1rem;
    .title {
      font-size: 1rem;
      font-style: normal;
      font-weight: 800;
    }
    .map {
      width: 100%;
      height: 100px;
    }
  }

  .page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: #ffffff;
    margin: 0 !important;
  }
  .mobile-wrap {
    width: 390pt;
    height: 844pt;
    max-height: 100%;
    background-color: rgb(255, 255, 255);
    overflow-y: hidden;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .wrapper_start_end {
    display: flex;

    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background-color: black;
    color: white;
    .start {
      font-size: 1rem;
      font-weight: 800;
    }
    .end {
      font-size: 1rem;
      font-weight: 800;
    }
  }
  .ticket_wrapper {
    margin: 1rem;
    border: black 1px solid;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .title {
      font-size: 1rem;
      font-weight: 800;
      line-height: normal;
    }
    .descrizione {
      font-size: 0.8rem;
      font-weight: lighter;
      color: gray;
      line-height: 1.2em;
    }
  }
</style>
