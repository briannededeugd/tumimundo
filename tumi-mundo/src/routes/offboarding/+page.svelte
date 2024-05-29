<script>
	import { onMount } from 'svelte';

	onMount(() => {
		function redirection() {
			window.location.pathname = '/statistics';
		}

		setInterval(redirection(), 7500);
	});
</script>

<div class="popup">
	<div>
		<p>Test completed! Please wait while we process your results.</p>
	</div>
</div>
