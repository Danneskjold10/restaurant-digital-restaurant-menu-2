<script lang="ts">
  export let image: string;
  export let menuType: string; // Header for the menu type (e.g., "Tacos", "Burgers")
  export let items: Array<{ name: string; soloPrice: string; menuPrice: string; ingredients: string }> = [];
</script>

<style>
  .menu-container {
    display: flex;
    height: 100vh; /* Full height of the screen */
  }

  .menu-image {
    flex: 1; /* Takes up half the screen */
    background-image: url('{image}');
    background-size: cover;
    background-position: center;
  }

  .menu-list {
    flex: 1; /* Takes up half the screen */
    padding: 16px;
    overflow-y: auto; /* Scrollable if content overflows */
    background-color: #f8f8f8; /* Light background for better readability */
  }

  .menu-header {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 16px;
    color: #333; /* Darker text for better contrast */
  }

  .menu-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 1.2rem; /* Smaller font size for items */
    color: #444; /* Darker text for better readability */
  }

  .menu-item .ingredients {
    font-size: 1rem; /* Smaller font size for ingredients */
    color: #666; /* Lighter text for ingredients */
    margin-top: 4px; /* Spacing between item and ingredients */
  }

  .price-tags {
    display: flex;
    gap: 16px; /* Spacing between solo and menu prices */
  }

  .price-tags span {
    font-weight: bold;
    color: #2ecc71; /* Green color for prices */
  }

  .solo-menu-headers {
    display: flex;
    justify-content: flex-end; /* Align headers to the right */
    gap: 16px; /* Spacing between solo and menu headers */
    margin-bottom: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    color: #555; /* Darker text for headers */
  }
</style>

<div class="menu-container">
  <!-- Left Side: Image -->
  <div class="menu-image"></div>

  <!-- Right Side: Menu List -->
  <div class="menu-list">
    <h1 class="menu-header">{menuType}</h1>

    <!-- Solo and Menu Headers -->
    <div class="solo-menu-headers">
      <span>Solo</span>
      <span>Menu</span>
    </div>

    {#each items as item}
      <div class="menu-item">
        <span>{item.name}</span>
        <div class="price-tags">
          <span>{item.soloPrice}</span>
          <span>{item.menuPrice}</span>
        </div>
      </div>
      <p class="ingredients">{item.ingredients}</p>
    {/each}
  </div>
</div>