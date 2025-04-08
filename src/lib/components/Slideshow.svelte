<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// Props with Svelte 5 runes
	let { items = [] } = $props<{
		items: Array<{ image: string; name: string; price: string; description: string }>;
	}>();

	// Event dispatcher
	const dispatch = createEventDispatcher<{ end: void }>(); // Specify event type

	// State with Svelte 5 runes
	let currentIndex = $state(0);
	const SLIDE_DURATION = 5000; // ms

	// Effect for managing the slideshow timing and dispatching 'end'
	$effect(() => {
		// Ensure items array is not empty
		if (items.length === 0) {
			return;
		}

		currentIndex = 0; // Reset index when items change (or on initial run)

		// Interval to change slides
		const intervalId = setInterval(() => {
			currentIndex = (currentIndex + 1) % items.length;
		}, SLIDE_DURATION);

		// Timeout to stop the slideshow and dispatch 'end'
		const totalDuration = items.length * SLIDE_DURATION;
		const timeoutId = setTimeout(() => {
			clearInterval(intervalId); // Stop changing slides
			dispatch('end'); // Signal that the slideshow duration is complete
		}, totalDuration);

		// Cleanup function for the effect
		return () => {
			clearInterval(intervalId);
			clearTimeout(timeoutId);
		};
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

	/* Fume effect for images (Kept as is) */
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
</style>

<!-- Render only if there are items -->
{#if items.length > 0}
	<div class="fixed inset-0 z-50">
		{#each items as item, index}
			<div class="slide {index === currentIndex ? 'active' : ''}">
				<!-- Background image with fume effect -->
				<img src={item.image} alt="{item.name}" class="w-full h-full object-cover" />

				<!-- Image Description Bubble -->
				<div class="absolute bottom-8 left-8 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md">
					<p class="text-4xl font-bold text-gray-900">{item.name}</p>
					<p class="text-xl text-gray-600 mt-4">{item.description}</p>
				</div>

				<!-- Price Tag Bubble -->
				<div class="absolute top-8 right-8 bg-green-500 bg-opacity-90 p-4 rounded-lg shadow-lg">
					<p class="text-3xl font-bold text-white">{item.price}</p>
				</div>
			</div>
		{/each}
	</div>
{/if}