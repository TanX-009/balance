<script lang="ts" module>
  import { resolve } from "$app/paths";
  import type { Snippet } from "svelte";
  import type { LayoutServerData } from "./$types";

  interface TProps {
    data: LayoutServerData;
    children: Snippet;
  }
</script>

<script lang="ts">
  let { data, children }: TProps = $props();
</script>

<div class="app">
  <!-- Sidebar -->
  <aside class="sidebar">
    <h2>Ledgers</h2>
    <ul>
      {#each data.ledgers as l, i (i)}
        <li>
          <a
            href={resolve(`/ledger/${l.id}`)}
            class:selected={l.id === data.ledger.id}
          >
            {l.name}
          </a>
        </li>
      {/each}
    </ul>

    <hr />

    <h3>{data.ledger.name}</h3>
    <ul>
      <li><a href={resolve(`/ledger/${data.ledger.id}`)}>Dashboard</a></li>
      <li>
        <a href={resolve(`/ledger/${data.ledger.id}/accounts`)}>Accounts</a>
      </li>
      <li>
        <a href={resolve(`/ledger/${data.ledger.id}/transactions`)}
          >Transactions</a
        >
      </li>
      <li>
        <a href={resolve(`/ledger/${data.ledger.id}/members`)}>Members</a>
      </li>
    </ul>
  </aside>

  <!-- Main Content -->
  <main class="content">
    {@render children?.()}
  </main>
</div>

<style>
  .app {
    display: flex;
    min-height: 100vh;
  }
  .sidebar {
    width: 220px;
    border-right: 1px solid #ddd;
    padding: 1rem;
  }
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  .sidebar li {
    margin: 0.5rem 0;
  }
  .sidebar a {
    text-decoration: none;
    color: #333;
  }
  .sidebar a.selected {
    font-weight: bold;
    color: #0070f3;
  }
  .content {
    flex: 1;
    padding: 1.5rem;
  }
</style>
