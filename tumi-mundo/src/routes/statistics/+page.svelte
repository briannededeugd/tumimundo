<script>
	// D3 Graph
	import LineChart from '../../components/LineChart.svelte';

	import { onMount } from 'svelte';

	onMount(() => {
		document.body.classList.add('statistics');

		document.querySelectorAll('.progress').forEach(function (progress) {
			var bar = progress.querySelector('.bar');
			var perc = -100;

			var start = { p: -200 };
			var end = { p: perc };
			var duration = 3000;
			var startTime = null;

			function easeSwing(t) {
				return 0.5 - Math.cos(t * Math.PI) / 2;
			}

			function animate(time) {
				if (!startTime) startTime = time;
				var elapsed = time - startTime;
				var progress = Math.min(elapsed / duration, 1);
				var easedProgress = easeSwing(progress);
				var p = start.p + (end.p - start.p) * easedProgress;

				bar.style.transform = 'rotate(' + (135 + p * 1.8) + 'deg)';

				if (progress < 1) {
					requestAnimationFrame(animate);
				}
			}

			requestAnimationFrame(animate);
		});

		return () => {
			document.body.classList.remove('statistics');
		};
	});

	// Dynamic Stories
	let storiesDataArray = [
		{ 'stories read': 12 },
		{ 'minutes spent listening': 136 },
		{ 'tests taken': 8 },
		{ 'is your favorite moment': 'Morning' },
		{ 'is your favorite speaker': 'Thuan-Hoa' }
	];

	// Button switch
	function globalStats() {
		const button = document.getElementById('children-global-stats-button');
		button.classList.toggle('active');
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="../lib/styles/style.css" />
</svelte:head>

<a href="/" class="back-button"><img src="../lib/images/icons/home.png" alt="home icon"></a>

<h1>Statistics</h1>
<section>
	<!-- <h2>Total activities</h2> -->
	<section>
		<div class="learning-stats">
			<h3>You have done a lot of learning!</h3>

			<img src="../lib/images/buddies/rat/rat-on-couch.svg" alt="The rat on the couch" />

			<p>
				Here you can see everything you have done since you started learning with TuMi Mundo. I
				encourage you to keep going and do your best!
			</p>

		</div>
	</section>
</section>


<section class="activities-wrapper">
	<!-- <h2>Today's activities</h2> -->

	<!-- <div class="introduction">
	<p>
		Welcome to the statistics page! Here, you can view your baby's language learning progress. This helps you understand their development and celebrate their milestones. All data is anonymized to ensure privacy.
	</p>
	<p>Happy learning!</p>
	</div> -->

	<h2>Today's listening</h2>

	<section class="left-align">
		<section class="activities-data-container">
			<div class="activities-data">
				<div class="progress">
					<div class="barOverflow">
						<div class="bar"></div>
					</div>
				</div>

				<!-- <h3>Today's listening</h3> -->

				<p id="activity-time">00:00</p>
				<p>of your <span>5-minute</span> goal</p>
			</div>

			<div class="section-button">
				<a href="/">Change goal</a>
				<a href="/">Go to stories</a>
			</div>
		</section>
	</section>
</section>


<section>
	<h2>The attention span test</h2>
	<p>A test for the first phase of the method. Tap on the points to see more in depth numbers.</p>

	<div>
		<LineChart></LineChart>
	</div>
	<div class="children-global-stats">
		<p>See the average performance of other children</p>
		<button
			id="children-global-stats-button"
			class="children-global-stats-button"
			on:click={globalStats}
		>
		</button>
	</div>
</section>

<section>
	<h2>Stories</h2>

	<ul class="stories_container">
		{#each storiesDataArray as storyData}
			{#each Object.entries(storyData) as [key, value]}
				<li class="story_item">
					<div class="story_item_data">{value}</div>
					<p>{key}</p>
				</li>
			{/each}
		{/each}
	</ul>
</section>

<section>
	<h2>The roadmap</h2>
	<p>Here you can see how far you are in the method!</p>

	<ol>
		<li>
			<span>1.</span>Listening method
			<img src="../lib/images/icons/music-note.svg" alt="Musical note" />
		</li>
		<img src="../lib/images/icons/active-arrow.svg" alt="an arrow that connect with second task" />
		<li class="opacity">
			<span>2.</span>The first words
			<img src="../lib/images/icons/music-note.svg" alt="Musical note" />
		</li>
		<img
			src="../lib/images/icons/disabled-arrow-left.svg"
			alt="an arrow that connect with second task"
		/>
		<li class="opacity">
			<span>3.</span>People and animals
			<img src="../lib/images/icons/music-note.svg" alt="Musical note" />
		</li>
		<img
			src="../lib/images/icons/disabled-arrow-right.svg"
			alt="an arrow that connect with second task"
		/>
		<li class="opacity">
			<span>4.</span>Sentences <img src="../lib/images/icons/music-note.svg" alt="Musical note" />
		</li>
		<img
			src="../lib/images/icons/disabled-arrow-left.svg"
			alt="an arrow that connect with second task"
		/>
		<li class="opacity">
			<span>5.</span>Reading and writing
			<img src="../lib/images/icons/music-note.svg" alt="Musical note" />
		</li>
	</ol>
</section>

<style>
	:root {
		/* COLORS */
		--color-statistics-bg-light: #219b9b;
		--color-statistics-bg-dark: #1b7070;
		--color-statistics-bg-contrast-light: #81cdbc;
		--color-graph-text: white;

		--story-item-background: #155D64;
		--statistics-switch-background-color: #1cb854;
		--progress-bar-unfilled: white;
		--progress-bar-filled: #6f46c9;

		--statistics-background-gradient: linear-gradient(
			to bottom,
			var(--color-statistics-bg-light),
			var(--color-statistics-bg-dark)
		);

		--color-button-goal: #27b16f;
		--color-button-stories: #502d8e;

		--roadmap-first-step: #1cb854;
		--roadmap-second-step: #37c6ab;
		--roadmap-third-step: #059cc0;
		--roadmap-fourth-step: #ff8c59;
		--roadmap-fifth-step: #ffa02e;

		/* NEW THEME */
		--color-interactions: #63718e; /* buttons, progress bar */
		--color-interactions-hover: #4b566c;
		--color-background: #cfeddb;
		
		--color-cancel: #d51d1d;
		--color-active-cancel: #e8e6e6;
		--color-start: #27B16F;
		--color-active-start: #1f8f59;

		--color-bg-light: #21599b;
		--color-bg-dark: #1b3d70;
		--color-inactive-toggle: rgb(216, 241, 241);

		--background-gradient: linear-gradient(to bottom, var(--color-bg-light), var(--color-bg-dark));
		--background-overlay: linear-gradient(to top, #000000b0, #00000000);
	}

	

	:global(body.statistics) {
		background: var(--color-statistics-bg-contrast-light);
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	:global(svg) {
		color: var(--color-graph-text);
		box-shadow: var(--box-shadow);
		max-width: 30rem
	}

	.introduction {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.back-button img {
		height: 1.75rem;
	}

	h3 {
		font-weight: bold;
	}

	.activities-wrapper {
		gap: 3rem;



		& .activities-data-container {
			gap: 2rem;

			& .activities-data {
				/* SRC Code from https://codepen.io/jagathish/pen/ZXzbzN */
				/* progress bar */
				width: 100%;
				height: 100%;
				text-align: center;
				position: relative;
				& .progress {
					width: 387px;
					height: calc(100% + 23px);
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					margin: 4px;
					float: left;
					text-align: center;
					z-index: -1;

					& .barOverflow {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						overflow: hidden;
						width: 100%;
						height: 100%; /* Half circle (overflow) */
						margin-bottom: -14px; /* bring the numbers up */

						& .bar {
							position: absolute;
							top: 0;
							left: 0;
							width: 387px;
							height: 387px; /* full circle! */
							border-radius: 50%;
							box-sizing: border-box;
							/* transform: rotate(30deg); */
							border: 12px solid var(--progress-bar-unfilled);
							border-top-color: var(--progress-bar-filled);
							border-right-color: var(--progress-bar-filled);
							/* transform: rotate(135deg); */
							box-shadow: 0 0 4px #00000040 inset;
						}
					}
				}

				& h3 {
					padding-top: 3em;
				}

				& #activity-time {
					font-size: 3rem;
					padding-top: 3rem;
				}

				& p {
					padding-top: .5rem;
					padding-bottom: .5rem;

					& span {
						font-weight: var(--font-weight-semibold);
						text-decoration: underline;
					}
				}
				
			}
		}
	}

	.section-button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1.25rem;
		padding: 1em;

		& a {
			background-color: var(--color-inlinebutton);
			font-size: var(--font-size-buttons);
			border-radius: var(--border-radius);
			color: var(--color-text);
			box-shadow: var(--box-shadow);

			padding: 0.75em 1rem;
			text-decoration: none;

			&:first-of-type {
				background-color: var(--color-active-start);
			}

			&:last-of-type {
				background-color: var(--color-button-stories);
			}
		}
	}

	.stories_container {
		display: flex;
		flex-direction: column;
		gap: 0.75em;

		& .story_item {
			display: flex;
			align-items: center;
			gap: 0.5em;

			& .story_item_data {
				padding: 0.25em 0.5em;
				background-color: var(--story-item-background);
				color: var(--color-graph-text);
				box-shadow: var(--box-shadow);
				border-radius: 10px;
			}
		}
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;

		& > section {
			align-items: center;
		}
	}

	.learning-stats {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		align-items: center;

		& h2 {
			padding-bottom: 0.5rem;
		}
	}

	.children-global-stats {
		display: flex;
		justify-content: space-between;
		align-items: center;

		& .children-global-stats-button {
			width: 60px;
			height: 30px;
			background-color: var(--color-text);
			border: none;
			border-radius: 1.2em;
			cursor: pointer;
			position: relative;
			box-shadow: var(--box-shadow);


			&::after {
				content: '';
				position: absolute;
				width: 1.8em;
				height: 1.8em;
				background-color: var(--color-statistics-bg-contrast-light);
				border-radius: 50%;
				top: 0.21em;
				left: 2.2em;
				transition: transform 0.3s;
				transform: translateX(-2em);
			}
		}

		& .active {
			background-color: var(--statistics-switch-background-color);

			&::after {
				transform: translateX(0);
				background-color: var(--color-text);
			}
		}
	}

	ol {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(9, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;

		justify-items: stretch;
		align-items: stretch;
		justify-content: center;

		max-width: 35rem;

		& li {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: 1.5rem;
			background-color: #219b9b;
			text-align: center;
			list-style: decimal inside;
			/* width: max-content; */
			padding: 0.5rem 0.75rem;
			border-radius: 0.5rem;

			& img {
				max-height: 1rem;
			}
		}

		& img {
			max-height: 4rem;
		}

		& li:nth-of-type(1) {
			background-color: var(--roadmap-first-step);
			grid-area: 1 / 1 / 2 / 4;
			/* justify-items: stretch; */
		}
		& li:nth-of-type(2) {
			background-color: var(--roadmap-second-step);
			grid-area: 3 / 3 / 4 / 6;
		}
		& li:nth-of-type(3) {
			background-color: var(--roadmap-third-step);
			grid-area: 5 / 1 / 6 / 4;
		}
		& li:nth-of-type(4) {
			background-color: var(--roadmap-fourth-step);
			grid-area: 7 / 3 / 8 / 6;
		}
		& li:nth-of-type(5) {
			background-color: var(--roadmap-fifth-step);
			grid-area: 9 / 1 / 10 / 4;
		}
		& img:nth-of-type(1) {
			grid-area: 2 / 1 / 4 / 3;
			/* padding-left: 1rem; */
			/* width: 13rem; */
		}
		& img:nth-of-type(2) {
			grid-area: 4 / 4 / 6 / 5;
		}
		& img:nth-of-type(3) {
			grid-area: 6 / 1 / 8 / 3;
		}
		& img:nth-of-type(4) {
			grid-area: 8 / 4 / 10 / 5;
		}
	}

	.opacity {
		opacity: 40%;
	}
	
	@media screen and (min-width: 600px) {
		:global(body:has(.activities-wrapper)) {
			padding: 0 7rem;
		}

		.learning-stats {
			background-color: var(--story-item-background);
			color: var(--color-graph-text);
			padding: 2rem;
			border-radius: 1rem;
		}
		& p {
				max-width: 40rem;
				/* text-align: center; */
				/* align-self: center; */
			}

		.left-align {
			align-self: flex-start;
			padding-left: 3rem;
		}
	}
</style>
