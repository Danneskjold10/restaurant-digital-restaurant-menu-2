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
	
	// Calculate positions for UI elements
	let descriptionStyle = $derived(
		isPortrait
			? `position: absolute; bottom: 100px; left: 0; right: 0; background-color: rgba(0,0,0,0.7); padding: 24px; text-align: center;`
			: `position: absolute; bottom: 40px; left: 40px; max-width: 500px; background-color: rgba(0,0,0,0.7); padding: 25px; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);`
	);
		
	let priceStyle = $derived(
		isPortrait
			? `position: absolute; top: 100px; right: 0; background-color: #e53e3e; padding: 15px 30px; clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%);`
			: `position: absolute; top: 40px; right: 0; background-color: #e53e3e; padding: 15px 50px 15px 30px; clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%);`
	);
</script>

<style>
	.slide {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 1.5s ease-in-out;
	}

	.slide.active {
		opacity: 1;
		z-index: 2;
	}

	.slide img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
		filter: brightness(0.9);
	}
	
	.img-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%);
		z-index: 1;
	}
	
	.slide-content {
		position: relative;
		z-index: 2;
		height: 100%;
	}
	
	.special-badge {
		background: #e53e3e;
		color: white;
		font-weight: bold;
		padding: 5px 12px;
		border-radius: 20px;
		font-size: 1rem;
		margin-right: 10px;
		display: inline-block;
	}
	
	.price-text {
		font-size: 2.5rem;
		font-weight: bold;
		color: white;
		text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
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
				<!-- Background image -->
				<img src={item.image} alt={item.name} />
				
				<!-- Gradient overlay -->
				<div class="img-overlay"></div>
				
				<!-- Slide content -->
				<div class="slide-content">
					<!-- Description section -->
					<div style={descriptionStyle}>
						<span class="special-badge">SPECIAL</span>
						<h2 style="font-size: 2.5rem; font-weight: bold; color: white; margin: 0.5rem 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
							{item.name}
						</h2>
						<p style="font-size: 1.4rem; color: #f7fafc; margin: 1rem 0 0 0; line-height: 1.6;">
							{item.description}
						</p>
					</div>

					<!-- Price tag -->
					<div style={priceStyle}>
						<span class="price-text">{item.price}</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}