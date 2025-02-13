<script lang="ts">
  export let image: string;
  export let menuType: string; // Header for the menu type (e.g., "Tacos", "Burgers")
  export let items: Array<{ name: string; soloPrice: string; menuPrice: string; ingredients: string }> = [];
</script>

<style>
  .menu-container {
    display: flex;
    flex-direction: column;
    height: 100vh; /* Full height of the screen */
  }

  .menu-image {
    flex: 1; /* Takes up half the screen */
    background-size: cover;
    background-position: center;
  }

  .menu-list {
    flex: 1; /* Takes up half the screen */
    padding: 16px;
    overflow-y: auto; /* Scrollable if content overflows */
  }

  .menu-header {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 16px;
  }

  .menu-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 1.5rem;
  }

  .menu-item .ingredients {
    font-size: 1.2rem;
    color: #666;
  }
</style>

<div class="menu-container">
  <!-- Left Side: Image -->
  <div class="menu-image" style="background-image: url('{image}');"></div>

  <!-- Right Side: Menu List -->
  <div class="menu-list">
    <h1 class="menu-header">{menuType}</h1>
    {#each items as item}
      <div class="menu-item">
        <span>{item.name}</span>
        <div class="flex gap-4">
          <span>{item.soloPrice}</span>
          <span>{item.menuPrice}</span>
        </div>
      </div>
      <p class="ingredients">{item.ingredients}</p>
    {/each}
  </div>
</div>