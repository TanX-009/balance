<script lang="ts" module>
  import { resolve } from "$app/paths";
  import type { PageServerData } from "./$types";

  interface TProps {
    data: PageServerData;
  }
</script>

<script lang="ts">
  let { data }: TProps = $props();
</script>

<h1>Your Balances</h1>

<ul>
  {#each data.balances as balance, i (i)}
    <li>
      <a href={resolve(`/balance/${balance.id}`)}>{balance.name}</a>
    </li>
  {/each}
</ul>

<button>+ New Balance</button>
