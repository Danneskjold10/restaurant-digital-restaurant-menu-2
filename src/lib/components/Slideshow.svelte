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
			? `position: absolute; bottom: ${Math.floor(windowHeight * 0.25)}px; left: ${Math.floor(windowWidth * 0.1)}px; right: ${Math.floor(windowWidth * 0.1)}px; text-align: center;`
			: `position: absolute; bottom: 40px; left: 40px; max-width: 500px;`
	);
		
	let priceStyle = $derived(
		isPortrait
			? `position: absolute; top: ${Math.floor(windowHeight * 0.08)}px; right: 0;`
			: `position: absolute; top: 40px; right: 0;`
	);
</script>

<style>
	/* Import statements must come first */
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
	
	/* Molinga font @font-face declaration - this is NOT an import */
	@font-face {
		font-family: 'Molinga';
		src: url('/fonts/Molinga-pgOv1.otf') format('opentype');
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}

	/* Base styles */
	.slide {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 1.5s ease, transform 1.5s ease;
		transform: scale(1.05);
	}

	.slide.active {
		opacity: 1;
		z-index: 2;
		transform: scale(1);
	}

	.slide img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
		transition: transform 8s ease-in-out;
	}
	
	.active img {
		transform: scale(1.1);
	}

	/* Decorative elements */
	.img-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%);
		z-index: 1;
	}
	
	/* Animations */
	@keyframes float {
		0% { transform: translateY(0px); }
		50% { transform: translateY(-10px); }
		100% { transform: translateY(0px); }
	}
	
	@keyframes pulse {
		0% { transform: scale(1); }
		50% { transform: scale(1.05); }
		100% { transform: scale(1); }
	}
	
	@keyframes glow {
		0% { text-shadow: 0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.3); }
		50% { text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.5); }
		100% { text-shadow: 0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.3); }
	}
	
	/* Neon text effect */
	.neon-text {
		color: #fff;
		text-shadow: 
			0 0 5px rgba(255,255,255,1),
			0 0 10px rgba(255,255,255,0.8),
			0 0 20px #FF416C,
			0 0 30px #FF416C,
			0 0 40px #FF416C;
		animation: glow 2s ease-in-out infinite;
	}
	
	/* Price tag styles */
	.price-tag {
		background: linear-gradient(135deg, #FF416C, #FF4B2B);
		padding: 15px 50px 15px 25px;
		color: white;
		font-weight: bold;
		font-size: 2.5rem;
		clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%);
		box-shadow: 0 5px 15px rgba(0,0,0,0.3);
		animation: pulse 2s infinite ease-in-out;
		font-family: 'Molinga', cursive;
	}
	
	/* Description box styles */
	.description-box {
		background-color: rgba(0,0,0,0.7);
		backdrop-filter: blur(10px);
		border-radius: 10px;
		padding: 25px;
		box-shadow: 0 10px 30px rgba(0,0,0,0.5);
		border: 1px solid rgba(255,255,255,0.1);
		animation: float 5s infinite ease-in-out;
	}
	
	.badge {
		display: inline-block;
		background: linear-gradient(135deg, #FF416C, #FF4B2B);
		color: white;
		font-weight: bold;
		padding: 8px 20px;
		border-radius: 30px;
		box-shadow: 0 5px 15px rgba(0,0,0,0.3);
		text-transform: uppercase;
		letter-spacing: 1px;
		font-size: 1rem;
		position: relative;
		overflow: hidden;
		font-family: 'Montserrat', sans-serif;
	}
	
	.badge::after {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: linear-gradient(
			to right,
			rgba(255,255,255,0) 0%,
			rgba(255,255,255,0.5) 50%,
			rgba(255,255,255,0) 100%
		);
		transform: rotate(30deg);
		animation: shimmer 2s infinite;
	}
	
	@keyframes shimmer {
		0% { transform: rotate(30deg) translate(-100%, -100%); }
		100% { transform: rotate(30deg) translate(100%, 100%); }
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
				<!-- Background image with zoom effect -->
				<img src={item.image} alt={item.name} />
				
				<!-- Gradient overlay with pattern -->
				<div class="img-overlay">
					<!-- Optional subtle pattern overlay -->
					<div style="position: absolute; inset: 0; background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDQiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTUgNUwwIDBaIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjA4IiBzdHJva2Utd2lkdGg9IjAuNSI+PC9wYXRoPgo8L3N2Zz4='); opacity: 0.7;"></div>
				</div>
				
				<!-- Slide content -->
				<div class="slide-content">
					<!-- Description section -->
					<div style={descriptionStyle} class="description-box">
						<div class="badge">SPECIAL OFFER</div>
						<!-- Using Molinga font for item name -->
						<h2 style="font-size: 2.8rem; font-weight: bold; margin: 15px 0; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); font-family: 'Molinga', cursive;">
							{item.name}
						</h2>
						<!-- Using Montserrat for description -->
						<p style="font-size: 1.4rem; color: #f7fafc; margin: 15px 0 0 0; line-height: 1.6; text-shadow: 1px 1px 3px rgba(0,0,0,0.5); font-family: 'Montserrat', sans-serif;">
							{item.description}
						</p>
						
						<!-- Decorative element -->
						<div style="height: 3px; width: 80px; background: linear-gradient(to right, #FF416C, #FF4B2B); margin: 20px auto 0 auto; border-radius: 3px;"></div>
					</div>

					<!-- Price tag with Molinga font -->
					<div style={priceStyle} class="price-tag">
						{item.price}
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}