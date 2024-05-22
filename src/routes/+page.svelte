<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

    onMount(() => {
        console.log(data)
    })
</script>
<div class="content">
    <h1>Page</h1>
    {#each data.event_list as id}
        <a href="/{id}">{id}</a>
    {/each}

</div>
<style lang="scss">
    .content{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        width: 100%;
        background-color: #ffffff;
        margin: 0 !important;
        gap: 1rem;
    }
</style>