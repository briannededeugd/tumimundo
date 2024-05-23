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

<h2>6-12 months</h2>

<!-- Attention span test -->
<section class="attention-span information-block">
	<div class="header-container">
		<h3>Attention span test</h3>
		<p class="time">10-15 minutes</p>
	</div>

	<p><strong>How it works</strong></p>
	<p>
		The reason to do this test is to measure how long the attention span is for the learned
		language(s). Before you start the test there will be a few short steps you will have to take
		before you can start the test. This will be explained to you through a few pictures.
	</p>
	<div class="section-button">
		<a href="/customization">Start test</a>
	</div>
</section>

<!-- Word recognition -->
<section class="word-recognition information-block">
	<div class="header-container">
		<h3>Word recognition</h3>
		<p class="time">5-10 minutes</p>
	</div>

	<p><strong>How it works</strong></p>
	<p>
		This test is provided through the University of Leiden. The results of these tests will be
		shared with the researchers directly. This is optional and not part of the method or the
		lessons. You will still receive results after the test. This is only for research purposes. How
		many of the words heard during the stories stay around?
	</p>
	<div class="section-button">
		<img src="../lib/images/universiteit-leiden-logo.png" alt="Logo of the University of Leiden" />
		<a href="/">Start test</a>
	</div>
</section>

<h2>1-2 years</h2>

<!-- The first words -->
<section class="first-words information-block">
	<div class="header-container">
		<h3>The first words</h3>
		<p class="time">10-15 minutes</p>
	</div>

	<p><strong>How it works</strong></p>
	<p>
		This test is provided through the University of Leiden. The results of these tests will be
		shared with the researchers directly. This is optional and not part of the method or the
		lessons. You will still receive results after the test. This is only for research purposes. How
		many of the words heard during the stories stay around?
	</p>
	<div class="section-button">
		<img src="../lib/images/universiteit-leiden-logo.png" alt="Logo of the University of Leiden" />
		<a href="/">Start test</a>
	</div>
</section>

<section class="first-words information-block">
	<div class="header-container">
		<h3>The first words</h3>
		<p class="time">10-15 minutes</p>
	</div>

	<p><strong>How it works</strong></p>
	<p>
		This test is provided through the University of Leiden. The results of these tests will be
		shared with the researchers directly. This is optional and not part of the method or the
		lessons. You will still receive results after the test. This is only for research purposes. How
		many of the words heard during the stories stay around?
	</p>
	<div class="section-button">
		<img src="../lib/images/universiteit-leiden-logo.png" alt="Logo of the University of Leiden" />
		<a href="/">Start test</a>
	</div>
</section>
