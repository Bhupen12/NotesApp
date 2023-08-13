<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	import { openDatabase } from '$lib/local/local.db-services';
	import { onMount } from 'svelte';

	onMount(async () => {
		await openDatabase();
	});
</script>

<Header />
<slot />
<Footer />
