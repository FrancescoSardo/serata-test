<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>
<div class="confirm-page">

    Grazie per aver prenotato il tuo ticket per l'evento!

</div>
<style lang="scss">
    .confirm-page {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-size: 2rem;
        font-weight: bold;
    }
</style>