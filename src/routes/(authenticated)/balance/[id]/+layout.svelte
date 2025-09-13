<script lang="ts">
  import { resolve } from "$app/paths";
  export let data: {
    balances: { id: string; name: string }[];
    currentBalance: { id: string; name: string };
  };
</script>

<div style="display: flex; gap: 1rem;">
  <!-- Sidebar -->
  <aside style="width: 200px; border-right: 1px solid #ccc; padding: 1rem;">
    <h2>Balances</h2>
    <ul>
      {#each data.balances as balance, i (i)}
        <li>
          <a
            href={resolve(`/balance/${balance.id}`)}
            style={balance.id === data.currentBalance.id
              ? "font-weight: bold;"
              : ""}
          >
            {balance.name}
          </a>
        </li>
      {/each}
    </ul>
    <button>+ New Balance</button>
  </aside>

  <!-- Main dashboard content -->
  <main style="flex: 1; padding: 1rem;">
    <slot />
  </main>
</div>
