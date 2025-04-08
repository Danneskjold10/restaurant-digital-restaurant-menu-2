<script lang="ts">
	// Use Svelte 5 runes for props
	let { image, menuType, items = [] } = $props<{
		image: string;
		menuType: string; // Header for the menu type
		items: Array<{ name: string; soloPrice: string; menuPrice: string; ingredients: string }>;
	}>();
</script>

<div class="flex h-screen">
	<!-- Left Side: Image -->
	<div class="w-1/2">
		<img src={image} alt="{menuType} Menu Image" class="w-full h-full object-cover" />
	</div>

	<!-- Right Side: Menu List -->
	<div class="w-1/2 p-8 overflow-y-auto"> 
		<!-- Header for the menu type -->
		<h1 class="text-5xl font-bold mb-12 text-center">{menuType}</h1>

		<!-- Table for menu items -->
		<div class="space-y-6">
			<!-- Table headers -->
			<div class="flex justify-between font-bold text-3xl border-b-2 pb-2 mb-4"> 
				<span>Item</span>
				<div class="flex gap-8">
					<span>Solo</span>
					<span>Menu</span>
				</div>
			</div>

			<!-- Menu items -->
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