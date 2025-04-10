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
	let windowWidth = $state(0);
	let windowHeight = $state(0);
	const SLIDE_DURATION = 5000; // ms
	
	// Update dimensions and orientation
	function updateDimensions() {
		if (typeof window !== 'undefined') {
			windowWidth = window.innerWidth;
			windowHeight = window.innerHeight;
			isPortrait = windowHeight > windowWidth;
		}
	}
	
	// Run once after component is mounted
	$effect(() => {
		if (typeof window !== 'undefined') {
			// Initial check
			updateDimensions();
			
			// Add event listener
			window.addEventListener('resize', updateDimensions);
			
			// Cleanup
			return () => {
				window.removeEventListener('resize', updateDimensions);
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
	
	// Calculate positioning for bubbles with proper Svelte 5 runes syntax
	let descriptionStyle = $derived(
		isPortrait
			? `position: absolute; bottom: ${Math.floor(windowHeight * 0.25)}px; left: ${Math.floor(windowWidth * 0.1)}px; right: ${Math.floor(windowWidth * 0.1)}px; max-width: 80%; background-color: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);`
			: `position: absolute; bottom: 2rem; left: 2rem; max-width: 400px; background-color: rgba(255,255,255,0.9); padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);`
	);
		
	let priceStyle = $derived(
		isPortrait
			? `position: absolute; top: ${Math.floor(windowHeight * 0.08)}px; right: ${Math.floor(windowWidth * 0.08)}px; background-color: rgba(34,197,94,0.9); padding: 1rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);`
			: `position: absolute; top: 2rem; right: 2rem; background-color: rgba(34,197,94,0.9); padding: 1rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);`
	);
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
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
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
	
	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
</style>

{#if items.length > 0}
	<div class="fixed inset-0 z-50">
		{#each items as item, index}
			<div class="slide {index === currentIndex ? 'active' : ''}">
				<!-- Background image with fume effect -->
				<img src={item.image} alt={item.name} />

				<!-- Description bubble - positioned differently based on orientation -->
				<div style={descriptionStyle}>
					<p style={isPortrait ? "font-size: 2rem; font-weight: bold; color: #111827;" : "font-size: 2.25rem; font-weight: bold; color: #111827;"}>
						{item.name}
					</p>
					<p style={isPortrait ? "font-size: 1.125rem; color: #4B5563; margin-top: 0.5rem;" : "font-size: 1.25rem; color: #4B5563; margin-top: 1rem;"}>
						{item.description}
					</p>
				</div>

				<!-- Price bubble -->
				<div style={priceStyle}>
					<p style="font-size: 1.875rem; font-weight: bold; color: white;">
						{item.price}
					</p>
				</div>
			</div>
		{/each}
	</div>
{/if}