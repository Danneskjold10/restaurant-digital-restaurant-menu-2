<script lang="ts">
	// Use Svelte 5 runes for props
	let { image, menuType, items = [], theme = 'default' } = $props<{
		image: string;
		menuType: string; // Header for the menu type
		items: Array<{ name: string; soloPrice: string; menuPrice: string; ingredients: string }>;
		theme?: 'default' | 'modern' | 'elegant';
	}>();

	// Theme definitions
	const themes = {
		default: {
			primaryColor: 'bg-amber-900',
			secondaryColor: 'bg-gray-100',
			headerText: 'text-amber-900',
			itemNameText: 'text-amber-900',
			priceText: 'text-amber-700 font-semibold',
			ingredientsText: 'text-amber-600',
			shadow: 'shadow-md',
			border: 'border-amber-200'
		},
		modern: {
			primaryColor: 'bg-indigo-500',
			secondaryColor: 'bg-indigo-100',
			headerText: 'text-indigo-900',
			itemNameText: 'text-indigo-900',
			priceText: 'text-indigo-700 font-semibold',
			ingredientsText: 'text-indigo-600',
			shadow: 'shadow-lg',
			border: 'border-indigo-200'
		},
		elegant: {
			primaryColor: 'bg-slate-600',
			secondaryColor: 'bg-slate-400',
			headerText: 'text-slate-900',
			itemNameText: 'text-slate-900',
			priceText: 'text-slate-700 font-semibold',
			ingredientsText: 'text-slate-600',
			shadow: 'shadow-xl',
			border: 'border-slate-200'
		}
	};

	// Get current theme with type safety
	const currentTheme = themes[theme as keyof typeof themes] || themes.default;
</script>

<div class="flex h-screen">
	<!-- Left Side: Image with overlay gradient -->
	<div class="w-1/2 relative overflow-hidden">
		<img src={image} alt="{menuType} Menu Image" class="w-full h-full object-cover transition-all duration-1000 hover:scale-105" />
		
		<!-- Gradient overlay -->
		<div class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
		
		<!-- Large menu type text overlaid on image -->
		<div class="absolute inset-0 flex items-center justify-center">
			<h1 class="text-8xl font-bold text-white text-opacity-80 rotate-[-5deg] transform scale-110 tracking-wider uppercase">{menuType}</h1>
		</div>
	</div>

	<!-- Right Side: Menu List with enhanced styling -->
	<div class="w-1/2 p-8 overflow-y-auto {currentTheme.secondaryColor} bg-opacity-10"> 
		<!-- Header for the menu type -->
		<div class="flex items-center mb-12">
			<div class="h-2 w-12 {currentTheme.primaryColor} rounded-full mr-4"></div>
			<h1 class="text-5xl font-bold {currentTheme.headerText} tracking-tight">{menuType}</h1>
			<div class="h-2 w-12 {currentTheme.primaryColor} rounded-full ml-4 flex-grow"></div>
		</div>

		<!-- Table headers with enhanced styling -->
		<div class="flex justify-between font-bold text-3xl text-green-800 border-b-2 {currentTheme.border} pb-2 mb-8 sticky top-0 {currentTheme.secondaryColor} bg-opacity-90 backdrop-blur-sm p-4 rounded-t-lg z-10"> 
			<span>Item</span>
			<div class="flex gap-8 text-green-800">
				<span>Solo</span>
				<span>Menu</span>
			</div>
		</div>

		<!-- Menu items with staggered animation -->
		<div class="space-y-6">
			{#each items as item, index}
				<div 
					class="flex flex-col text-2xl border-b {currentTheme.border} pb-4 hover:{currentTheme.secondaryColor} hover:bg-opacity-20 p-4 rounded-lg transition-all duration-300 {currentTheme.shadow} hover:-translate-y-1" 
					style="animation: fadeIn 0.5s ease-out forwards; animation-delay: {index * 100}ms; opacity: 0;"
				> 
					<div class="flex justify-between">
						<span class="font-semibold {currentTheme.itemNameText}">{item.name}</span> 
						<div class="flex gap-12">
							<span class="{currentTheme.priceText}">{item.soloPrice}</span>
							<span class="{currentTheme.priceText}">{item.menuPrice}</span>
						</div>
					</div>
					<p class="text-xl {currentTheme.ingredientsText} mt-2 italic">{item.ingredients}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>