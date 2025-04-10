<script lang="ts">
	import Slideshow from '$lib/components/Slideshow.svelte';
	import MenuList from '$lib/components/MenuList.svelte';
	// Import the data from $lib/index.ts
	import { slideshowItems, menuCategories } from '$lib';

	// --- Config ---
	const MENU_CATEGORY_DURATION = 15000; // ms (15 seconds per menu category)
	type ThemeType = 'default' | 'modern' | 'elegant';
	let theme = $state<ThemeType>('default');
	
	// For demonstration, we can rotate the theme throughout the day
	// or let the restaurant staff pick a theme
	function rotateTheme() {
		const themes: ThemeType[] = ['default', 'modern', 'elegant'];
		const currentIndex = themes.indexOf(theme);
		theme = themes[(currentIndex + 1) % themes.length];
	}

	// --- State ---
	let showSlideshow = $state(true);
	let currentCategoryIndex = $state(0); // Index for menuCategories
	let isTransitioning = $state(false);
	
	// --- Transitions ---
	// We'll use this to create smooth transitions between views
	let transitionDirection = $state(''); // 'in' or 'out'

	// --- Logic ---
	function handleTransition(direction: 'in' | 'out', callback: () => void) {
		isTransitioning = true;
		transitionDirection = direction;
		
		setTimeout(() => {
			callback();
			setTimeout(() => {
				transitionDirection = '';
				isTransitioning = false;
			}, 500); // Half of CSS transition duration
		}, 500); // Half of CSS transition duration
	}

	// Function to be called when the slideshow finishes its duration
	function handleSlideshowEnd() {
		// Ensure there are categories to show before hiding slideshow
		if (menuCategories.length > 0) {
			handleTransition('out', () => {
				showSlideshow = false;
				currentCategoryIndex = 0; // Start with the first menu category
			});
		} else {
			// If no categories, rotate themes and restart slideshow
			rotateTheme();
			showSlideshow = true;
		}
	}

	// Effect to manage the cycling through menu categories
	$effect(() => {
		if (showSlideshow || menuCategories.length === 0 || isTransitioning) {
			return; // Don't run timer if slideshow is active, no menus, or transitioning
		}

		// Set a timer to switch to the next category or loop back to slideshow
		const timerId = setTimeout(() => {
			const nextIndex = currentCategoryIndex + 1;
			if (nextIndex < menuCategories.length) {
				handleTransition('out', () => {
					currentCategoryIndex = nextIndex; // Go to next menu
				});
			} else {
				// Before going back to slideshow, rotate themes for visual variety
				rotateTheme();
				handleTransition('out', () => {
					showSlideshow = true; // Loop back to slideshow
				});
			}
		}, MENU_CATEGORY_DURATION);

		// Cleanup function for the effect
		return () => {
			clearTimeout(timerId);
		};
	});

	// Derived state for the current menu category data
	const currentCategory = $derived(
		(!showSlideshow && currentCategoryIndex < menuCategories.length)
			? menuCategories[currentCategoryIndex]
			: null
	);
	
	// Update the time display
	let currentTime = $state(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
	
	// Update time every second
	$effect(() => {
		const intervalId = setInterval(() => {
			currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
		}, 1000);
		
		return () => clearInterval(intervalId);
	});
</script>

<style>
	.view-container {
		position: fixed;
		inset: 0;
		transition: opacity 1s ease-in-out, transform 1s ease-in-out;
	}
	
	.transition-out {
		opacity: 0;
		transform: scale(0.95);
	}
	
	.transition-in {
		opacity: 0;
		transform: scale(1.05);
	}
	
	/* Clock styling */
	.clock {
		position: fixed;
		top: 20px;
		left: 20px;
		background: rgba(0, 0, 0, 0.6);
		color: white;
		padding: 10px 16px;
		border-radius: 30px;
		font-weight: bold;
		font-size: 1.2rem;
		backdrop-filter: blur(4px);
		z-index: 100;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
</style>

<!-- Digital clock overlay -->
<div class="clock">
	{currentTime}
</div>

<!-- Main content with transitions -->
<div class="view-container {transitionDirection ? `transition-${transitionDirection}` : ''}">
	{#if showSlideshow}
		<Slideshow 
			items={slideshowItems} 
			theme={theme}
			on:end={handleSlideshowEnd} 
		/>
	{:else if currentCategory}
		<!-- Display the current menu category -->
		<MenuList
			image={currentCategory.image}
			menuType={currentCategory.name}
			items={currentCategory.items}
			theme={theme}
		/>
	{:else}
		<!-- Fallback if something goes wrong -->
		<div class="fixed inset-0 flex justify-center items-center h-screen bg-gray-100">
			<div class="text-2xl text-gray-700 bg-white p-10 rounded-lg shadow-xl">
				<p>Loading menu...</p>
				<div class="mt-4 h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
					<div class="h-full bg-gray-600 rounded-full animate-pulse"></div>
				</div>
			</div>
		</div>
	{/if}
</div>