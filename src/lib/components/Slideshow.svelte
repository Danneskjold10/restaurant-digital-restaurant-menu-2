<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();

  export let items: Array<{ image: string; name: string; price: string; description: string }> = [];
  let currentIndex = 0;
  let showSlideshow = true;

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % items.length;
  };

  let interval: number; // Use `number` instead of `NodeJS.Timeout`

  // Start the slideshow
  const startSlideshow = () => {
    currentIndex = 0; // Reset the index to 0
    interval = setInterval(nextSlide, 5000); // Automatically change slides every 5 seconds
  };

  // Stop the slideshow
  const stopSlideshow = () => {
    clearInterval(interval);
  };

  // Hide the slideshow after all slides are shown
  onMount(() => {
    startSlideshow();
    setTimeout(() => {
      stopSlideshow();
      dispatch('end'); // Emit an event when the slideshow ends
    }, items.length * 5000); // Total duration = number of items * 5 seconds
  });
</script>

<style>
  .slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 1s ease-in-out; /* Smooth fade transition */
  }

  .slide.active {
    opacity: 1;
  }

  /* Fume effect for images */
  .slide img {
    animation: fume 5s infinite;
  }

  @keyframes fume {
    0% {
      filter: blur(0) brightness(1);
      opacity: 1;
    }
    50% {
      filter: blur(5px) brightness(1.2);
      opacity: 0.8;
    }
    100% {
      filter: blur(0) brightness(1);
      opacity: 1;
    }
  }

  /* Vertical layout adjustments */
  .text-bubble {
    position: absolute;
    left: 8px;
    right: 8px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .description-bubble {
    top: 16px; /* Position at the top */
  }

  .price-bubble {
    bottom: 16px; /* Position at the bottom */
  }
</style>

{#if showSlideshow}
  <div class="fixed inset-0 z-50">
    {#each items as item, index}
      <div class="slide {index === currentIndex ? 'active' : ''}">
        <!-- Background image with fume effect -->
        <img src={item.image} alt="" class="w-full h-full object-cover" />

        <!-- Image Description Bubble -->
        <div class="text-bubble description-bubble">
          <p class="text-3xl font-bold text-gray-900">{item.name}</p>
          <p class="text-lg text-gray-600 mt-2">{item.description}</p>
        </div>

        <!-- Price Tag Bubble -->
        <div class="text-bubble price-bubble bg-green-500">
          <p class="text-2xl font-bold text-white">{item.price}</p>
        </div>
      </div>
    {/each}
  </div>
{/if}