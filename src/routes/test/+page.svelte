<script lang="ts">
  const paddings = [
    "p-5xs",
    "p-4xs",
    "p-3xs",
    "p-2xs",
    "p-xs",
    "p-s",
    "p-m",
    "p-l",
    "p-xl",
    "p-2xl",
    "p-3xl",
    "p-5xs-4xs",
    "p-4xs-3xs",
    "p-3xs-2xs",
    "p-2xs-xs",
    "p-xs-s",
    "p-s-m",
    "p-m-l",
    "p-l-xl",
    "p-xl-2xl",
    "p-2xl-3xl",
    "p-xs-m",
    "p-xs-l",
    "p-s-l",
    "p-s-xl",
    "p-m-xl",
    "p-m-2xl",
    "p-l-2xl",
    "p-l-3xl",
  ];

  const fontSizes = [
    "fs-4xl",
    "fs-3xl",
    "fs-2xl",
    "fs-xl",
    "fs-l",
    "fs-m",
    "fs-s",
    "fs-xs",
  ];

  const bgColors = [
    "bg-primary",
    "bg-primaryFixed",
    "bg-primaryFixedDim",
    "bg-onPrimary",
    "bg-onPrimaryFixed",
    "bg-onPrimaryFixedVariant",
    "bg-primaryContainer",
    "bg-onPrimaryContainer",
    "bg-secondary",
    "bg-secondaryFixed",
    "bg-secondaryFixedDim",
    "bg-onSecondary",
    "bg-onSecondaryFixed",
    "bg-onSecondaryFixedVariant",
    "bg-secondaryContainer",
    "bg-onSecondaryContainer",
    "bg-tertiary",
    "bg-tertiaryFixed",
    "bg-tertiaryFixedDim",
    "bg-onTertiary",
    "bg-onTertiaryFixed",
    "bg-onTertiaryFixedVariant",
    "bg-tertiaryContainer",
    "bg-onTertiaryContainer",
    "bg-error",
    "bg-onError",
    "bg-errorContainer",
    "bg-onErrorContainer",
    "bg-surface",
    "bg-onSurface",
    "bg-onSurfaceVariant",
    "bg-outline",
    "bg-outlineVariant",
    "bg-shadow",
    "bg-scrim",
    "bg-inverseSurface",
    "bg-inverseOnSurface",
    "bg-inversePrimary",
    "bg-surfaceDim",
    "bg-surfaceBright",
    "bg-surfaceContainerLowest",
    "bg-surfaceContainerLow",
    "bg-surfaceContainer",
    "bg-surfaceContainerHigh",
    "bg-surfaceContainerHighest",
  ];

  const fgColors = [
    "fg-primary",
    "fg-primaryFixed",
    "fg-primaryFixedDim",
    "fg-onPrimary",
    "fg-onPrimaryFixed",
    "fg-onPrimaryFixedVariant",
    "fg-primaryContainer",
    "fg-onPrimaryContainer",
    "fg-secondary",
    "fg-secondaryFixed",
    "fg-secondaryFixedDim",
    "fg-onSecondary",
    "fg-onSecondaryFixed",
    "fg-onSecondaryFixedVariant",
    "fg-secondaryContainer",
    "fg-onSecondaryContainer",
    "fg-tertiary",
    "fg-tertiaryFixed",
    "fg-tertiaryFixedDim",
    "fg-onTertiary",
    "fg-onTertiaryFixed",
    "fg-onTertiaryFixedVariant",
    "fg-tertiaryContainer",
    "fg-onTertiaryContainer",
    "fg-error",
    "fg-onError",
    "fg-errorContainer",
    "fg-onErrorContainer",
    "fg-surface",
    "fg-onSurface",
    "fg-onSurfaceVariant",
    "fg-outline",
    "fg-outlineVariant",
    "fg-shadow",
    "fg-scrim",
    "fg-inverseSurface",
    "fg-inverseOnSurface",
    "fg-inversePrimary",
    "fg-surfaceDim",
    "fg-surfaceBright",
    "fg-surfaceContainerLowest",
    "fg-surfaceContainerLow",
    "fg-surfaceContainer",
    "fg-surfaceContainerHigh",
    "fg-surfaceContainerHighest",
  ];
</script>

<h2>Padding</h2>
<div class="disf fldc gap-xs">
  {#each paddings as cls, i (i)}
    <div
      style="width: fit-content; height: fit-content;"
      class="bg-primary {cls}"
    >
      {cls}
    </div>
  {/each}
</div>

<h2>Font Sizes</h2>
<div class="flex flex-col">
  {#each fontSizes as cls, i (i)}
    <div class={cls}>
      {cls} → The quick brown fox
    </div>
  {/each}
</div>

<h2>Background Colors</h2>
<div class="grid grid-cols">
  {#each bgColors as cls, i (i)}
    <div class="sample">
      <div style="height: var(--sp-l);" class={cls}></div>
      <span>
        {cls}
      </span>
    </div>
  {/each}
</div>

<h2>Foreground Colors</h2>
<div class="grid grid-cols">
  {#each fgColors as cls, i (i)}
    <div class="sample {cls}">
      {cls}
    </div>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    gap: 0.75rem;
  }
  .grid-cols {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
  .sample {
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    padding: 0.5rem;
    text-align: center;
  }
</style>
