<script lang="ts">
	// Use Svelte 5 runes for props
	let { image, menuType, items = [] } = $props<{
		image: string;
		menuType: string;
		items: Array<{ name: string; soloPrice: string; menuPrice: string; ingredients: string }>;
	}>();
	
	// Use $state for reactive variables
	let isPortrait = $state(false);
	
	// Check orientation function
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
</script>

<div class="flex h-screen" style={isPortrait ? "flex-direction: column;" : ""}>
	<!-- Image section -->
	<div style={isPortrait ? "width: 100%; height: 40%;" : "width: 50%; height: 100%;"}>
		<img src={image} alt={menuType + " Menu Image"} class="w-full h-full object-cover" />
	</div>

	<!-- Menu content section -->
	<div style={isPortrait ? "width: 100%; height: 60%;" : "width: 50%; height: 100%;"} class="p-8 overflow-y-auto">
		<!-- Header -->
		<h1 class="text-5xl font-bold mb-6 text-center">{menuType}</h1>

		<!-- Menu items -->
		<div class="space-y-4">
			<!-- Table header -->
			<div class="flex justify-between font-bold text-3xl border-b-2 pb-2 mb-4">
				<span>Item</span>
				<div class="flex gap-8">
					<span>Solo</span>
					<span>Menu</span>
				</div>
			</div>

			<!-- Menu items list -->
			{#each items as item}
				<div class="flex flex-col text-2xl border-b pb-4">
					<div class="flex justify-between">
						<span class="font-semibold">{item.name}</span>
						<div class="flex gap-8">
							<span>{item.soloPrice}</span>
							<span>{item.menuPrice}</span>
						</div>
					</div>
					<p class="text-xl text-gray-600 mt-1">{item.ingredients}</p>
				</div>
			{/each}
		</div>
	</div>
</div>