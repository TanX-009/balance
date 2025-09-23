<script lang="ts" module>
  import type { LayoutServerData } from "./$types";

  interface TProps {
    data: LayoutServerData;
  }
</script>

<script lang="ts">
  let { data }: TProps = $props();
</script>

<h1>{data.ledger.name} Dashboard</h1>

<section>
  <h2>Summary</h2>
  <p>Balances, accounts, quick stats will go here.</p>
</section>

<section>
  <h2>Recent Transactions</h2>
  <p>No transactions yet.</p>
</section>
