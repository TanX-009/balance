<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutServerData } from "./$types";
  import { resolve } from "$app/paths";
  import { createAvatar } from "@dicebear/core";
  import { botttsNeutral } from "@dicebear/collection";

  let { data, children }: { data: LayoutServerData; children: Snippet } =
    $props();

  const avatar = createAvatar(botttsNeutral, {
    seed: data.user.id,
  }).toDataUri();
</script>

<nav class="disf aic jcsb gap-xs">
  <div></div>
  <div class="disf aic gap-s">
    <h1>Hi, {data.user.username}!</h1>
    <img class="w-l br-xs" src={avatar} alt="{data.user.username} Avatar" />
    <a href={resolve("/logout")}>Sign out</a>
  </div>
</nav>
{@render children?.()}

<style>
</style>
