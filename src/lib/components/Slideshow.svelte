<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// Props with Svelte 5 runes
	let { items = [] } = $props<{
		items: Array<{ image: string; name: string; price: string; description: string }>;
	}>();

	// Event dispatcher
	const dispatch = createEventDispatcher<{ end: void }>();

	// State with Svelte 5 runes
	let currentIndex = $state(0);
	let isPortrait = $state(false);
	const SLIDE_DURATION = 5000; // ms
	
	// Update orientation function
	function updateOrientation() {
		if (typeof window !== 'undefined') {
			isPortrait = window.innerHeight > window.innerWidth;
		}
	}
	
	// Run once after component is mounted
	$effect(() => {
		if (typeof window !== 'undefined') {
			// Initial check
			updateOrientation();
			
			// Add event listener
			window.addEventListener('resize', updateOrientation);
			
			// Cleanup
			return () => {
				window.removeEventListener('resize', updateOrientation);
			};
		}
	});

	// Slideshow logic
	$effect(() => {
		if (items.length === 0) return;

		// Reset index when items change
		currentIndex = 0;

		// Interval to change slides
		const intervalId = setInterval(() => {
			currentIndex = (currentIndex + 1) % items.length;
		}, SLIDE_DURATION);

		// Timeout to end slideshow
		const totalDuration = items.length * SLIDE_DURATION;
		const timeoutId = setTimeout(() => {
			clearInterval(intervalId);
			dispatch('end');
		}, totalDuration);

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
		transition: opacity 1s ease-in-out;
	}

	.slide.active {
		opacity: 1;
	}

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

{#if items.length > 0}
	<div class="fixed inset-0 z-50">
		{#each items as item, index}
			<div class="slide {index === currentIndex ? 'active' : ''}">
				<!-- Background image with fume effect -->
				<img src={item.image} alt={item.name} class="w-full h-full object-cover" />

				<!-- Description bubble - positioned differently based on orientation -->
				<div class="absolute bg-white bg-opacity-90 p-6 rounded-lg shadow-lg" 
				     style={isPortrait 
				         ? "bottom: 25%; left: 10%; right: 10%; max-width: 80%;" 
				         : "bottom: 8%; left: 8%; max-width: 400px;"}>
					<p class="text-4xl font-bold text-gray-900">{item.name}</p>
					<p class="text-xl text-gray-600 mt-4">{item.description}</p>
				</div>

				<!-- Price bubble -->
				<div class="absolute bg-green-500 bg-opacity-90 p-4 rounded-lg shadow-lg"
				     style={isPortrait ? "top: 8%; right: 8%;" : "top: 8%; right: 8%;"}>
					<p class="text-3xl font-bold text-white">{item.price}</p>
				</div>
			</div>
		{/each}
	</div>
{/if}