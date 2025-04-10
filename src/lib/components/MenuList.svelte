<script lang="ts">
	// Use Svelte 5 runes for props
	let { image, menuType, items = [] } = $props<{
		image: string;
		menuType: string;
		items: Array<{ name: string; soloPrice: string; menuPrice: string; ingredients: string }>;
	}>();
	
	// Use $state for reactive variables
	let isPortrait = $state(false);
	let windowWidth = $state(0);
	let windowHeight = $state(0);
	
	// Update dimensions and orientation
	function updateDimensions() {
		if (typeof window !== 'undefined') {
			windowWidth = window.innerWidth;
			windowHeight = window.innerHeight;
			isPortrait = windowHeight > windowWidth;
		}
	}
	
	// Run once after component is mounted and on resize
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
	
	// Calculate image height for portrait mode using $derived
	let imageHeight = $derived(isPortrait ? Math.floor(windowHeight * 0.35) + 'px' : '100%');
	let contentHeight = $derived(isPortrait ? Math.floor(windowHeight * 0.65) + 'px' : '100%');
</script>

<div class="flex h-screen" style={isPortrait ? "flex-direction: column; overflow: hidden;" : ""}>
	<!-- Image section - fixed height in portrait mode -->
	<div style={isPortrait 
		? `width: 100%; height: ${imageHeight}; max-height: ${imageHeight}; overflow: hidden;` 
		: "width: 50%; height: 100%;"}>
		<img src={image} alt={menuType + " Menu Image"} 
			style="width: 100%; height: 100%; object-fit: cover; object-position: center center;" />
	</div>

	<!-- Menu content section - with fixed height in portrait mode -->
	<div style={isPortrait 
		? `width: 100%; height: ${contentHeight}; overflow-y: auto;` 
		: "width: 50%; height: 100%; overflow-y: auto;"} 
		class="p-4">
		<!-- Header -->
		<h1 style={isPortrait ? "font-size: 2.25rem; margin-bottom: 0.75rem;" : "font-size: 3rem; margin-bottom: 1.5rem;"}
			class="font-bold text-center">{menuType}</h1>

		<!-- Menu items -->
		<div class="space-y-2">
			<!-- Table header -->
			<div class="flex justify-between font-bold border-b-2 pb-2 mb-2"
				style={isPortrait ? "font-size: 1.5rem;" : "font-size: 1.875rem;"}>
				<span>Item</span>
				<div class="flex gap-6">
					<span>Solo</span>
					<span>Menu</span>
				</div>
			</div>

			<!-- Menu items list with smaller spacing in portrait mode -->
			{#each items as item}
				<div class="flex flex-col border-b pb-2 mb-2"
					style={isPortrait ? "font-size: 1.25rem;" : "font-size: 1.5rem;"}>
					<div class="flex justify-between">
						<span class="font-semibold">{item.name}</span>
						<div class="flex gap-6">
							<span>{item.soloPrice}</span>
							<span>{item.menuPrice}</span>
						</div>
					</div>
					<p style={isPortrait ? "font-size: 1rem;" : "font-size: 1.25rem;"}
						class="text-gray-600 mt-1">{item.ingredients}</p>
				</div>
			{/each}
		</div>
	</div>
</div>