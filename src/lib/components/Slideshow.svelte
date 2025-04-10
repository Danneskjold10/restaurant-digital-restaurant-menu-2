<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// Props with Svelte 5 runes
	let { items = [], theme = 'default' } = $props<{
		items: Array<{ image: string; name: string; price: string; description: string }>;
		theme?: 'default' | 'modern' | 'elegant';
	}>();

	// Event dispatcher
	const dispatch = createEventDispatcher<{ end: void }>(); // Specify event type

	// State with Svelte 5 runes
	let currentIndex = $state(0);
	let prevIndex = $state(0);
	let isTransitioning = $state(false);
	let progressValue = $state(0);
	
	const SLIDE_DURATION = 5000; // ms
	const transitionDuration = 800; // ms for slide transitions

	// Color schemes
	const themes = {
		default: {
			nameColor: 'text-gray-900',
			descColor: 'text-gray-600',
			priceColor: 'bg-green-500 text-white',
			infoBg: 'bg-white',
			shadow: 'shadow-lg'
		},
		modern: {
			nameColor: 'text-indigo-900',
			descColor: 'text-indigo-700',
			priceColor: 'bg-indigo-600 text-white',
			infoBg: 'bg-gray-100',
			shadow: 'shadow-xl'
		},
		elegant: {
			nameColor: 'text-amber-900',
			descColor: 'text-amber-700',
			priceColor: 'bg-amber-600 text-white',
			infoBg: 'bg-amber-50',
			shadow: 'shadow-2xl'
		}
	};

	// Selected theme with type safety
	const currentTheme = themes[theme as keyof typeof themes] || themes.default;

	// Handle slide transitions
	function transition() {
		isTransitioning = true;
		prevIndex = currentIndex;
		currentIndex = (currentIndex + 1) % items.length;
		
		setTimeout(() => {
			isTransitioning = false;
		}, transitionDuration);
	}

	// Effect for managing the slideshow timing and dispatching 'end'
	$effect(() => {
		// Ensure items array is not empty
		if (items.length === 0) {
			return;
		}

		currentIndex = 0; // Reset index when items change (or on initial run)
		prevIndex = 0;
		progressValue = 0;

		// Progress bar animation
		const progressInterval = setInterval(() => {
			progressValue = (progressValue + 1) % 100;
		}, SLIDE_DURATION / 100);

		// Interval to change slides
		const intervalId = setInterval(() => {
			transition();
		}, SLIDE_DURATION);

		// Timeout to stop the slideshow and dispatch 'end'
		const totalDuration = items.length * SLIDE_DURATION;
		const timeoutId = setTimeout(() => {
			clearInterval(intervalId); // Stop changing slides
			clearInterval(progressInterval); // Stop progress bar
			dispatch('end'); // Signal that the slideshow duration is complete
		}, totalDuration);

		// Cleanup function for the effect
		return () => {
			clearInterval(intervalId);
			clearInterval(progressInterval);
			clearTimeout(timeoutId);
		};
	});
</script>

<style>
	.slide {
		position: absolute;
		inset: 0;
		transition: transform 0.8s ease-in-out, opacity 0.8s ease-in-out;
	}

	.slide-enter {
		transform: translateX(100%);
		opacity: 0;
	}

	.slide-current {
		transform: translateX(0);
		opacity: 1;
		z-index: 10;
	}

	.slide-exit {
		transform: translateX(-100%);
		opacity: 0;
	}

	.progress-bar {
		height: 6px;
		background: rgba(255, 255, 255, 0.3);
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 20;
	}

	.progress {
		height: 100%;
		background: white;
		transition: width 0.1s linear;
	}

	.info-box {
		backdrop-filter: blur(8px);
		transition: transform 0.3s ease, opacity 0.3s ease;
	}

	.info-box:hover {
		transform: translateY(-5px);
	}

	.price-tag {
		transform: rotate(0);
		transition: transform 0.3s ease;
	}

	.price-tag:hover {
		transform: rotate(-5deg) scale(1.05);
	}

	/* Enhanced image effects */
	.image-container {
		overflow: hidden;
		position: relative;
	}

	.image-container img {
		transition: transform 8s ease;
		transform-origin: center center;
	}

	.slide-current .image-container img {
		transform: scale(1.1);
	}
</style>

<!-- Render only if there are items -->
{#if items.length > 0}
	<div class="fixed inset-0 z-50 overflow-hidden">
		{#each items as item, index}
			{#if index === currentIndex || index === prevIndex}
				<div class="slide {index === currentIndex ? 'slide-current' : 'slide-exit'}">
					<!-- Background image with slow zoom effect -->
					<div class="image-container w-full h-full">
						<img src={item.image} alt="{item.name}" class="w-full h-full object-cover" />
					</div>

					<!-- Semi-transparent overlay -->
					<div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

					<!-- Image Description Bubble with blur backdrop -->
					<div class="info-box absolute bottom-8 left-8 {currentTheme.infoBg} bg-opacity-80 p-6 rounded-lg {currentTheme.shadow} max-w-md border border-white/20">
						<p class="text-5xl font-bold {currentTheme.nameColor}">{item.name}</p>
						<p class="text-xl {currentTheme.descColor} mt-4">{item.description}</p>
					</div>

					<!-- Price Tag Bubble with hover effect -->
					<div class="price-tag absolute top-8 right-8 {currentTheme.priceColor} p-4 rounded-lg {currentTheme.shadow} cursor-pointer">
						<p class="text-3xl font-bold">{item.price}</p>
					</div>
				</div>
			{/if}
		{/each}

		<!-- Progress bar -->
		<div class="progress-bar">
			<div class="progress" style="width: {progressValue}%"></div>
		</div>

		<!-- Navigation dots -->
		<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
			{#each items as _, i}
				<button 
					class="w-3 h-3 rounded-full {i === currentIndex ? 'bg-white' : 'bg-white/40'} 
						   transition-colors duration-300 hover:bg-white/80"
					aria-label="Go to slide {i + 1}"
				></button>
			{/each}
		</div>
	</div>
{/if}