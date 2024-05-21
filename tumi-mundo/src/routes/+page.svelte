<script>
	let expandButton;
	let detailsopen = false;

	function expandState() {
		if (detailsopen == false) {
			expandButton.textContent = 'Collapse';
			detailsopen = true;
		} else {
			expandButton.textContent = 'Expand';
            detailsopen = false;
		}
	}
</script>

<head>
	<link rel="stylesheet" href="../lib/styles/style.css" />
</head>

<h1>Testing</h1>

<h2>Tests</h2>
<p>
	While doing the TuMi Mundo method, you can do a couple of different tests to measure your child's
	progress. You will be able to review all of your results on the <a href="/">statistics</a> page.
</p>

<details>
	<summary on:click={expandState}>
		<h3>Privacy Statement</h3>
		<p bind:this={expandButton}>Expand</p>
	</summary>

	<section>
		<p>
			The results of this test <strong>will</strong> be shared with the researchers and universities.
			You can change your preferences in the settings at any given moment.
		</p>
		<a href="/">Change preferences</a>
	</section>
</details>

<h2>
    6-12 months
</h2>