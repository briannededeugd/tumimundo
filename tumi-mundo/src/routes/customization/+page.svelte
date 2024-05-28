<script>
	import { onMount } from 'svelte';

	const animalNames = ['Panda', 'Fox', 'Bunny', 'Lion', 'Dog'];
	const animalIcons = {
		Panda: '🐼',
		Fox: '🦊',
		Bunny: '🐰',
		Lion: '🦁',
		Dog: '🐶'
	};
	const animalBackgrounds = {
		Panda: '../lib/images/panda.jpg',
		Fox: '../lib/images/fox.webp',
		Bunny: '../lib/images/bunny.avif',
		Lion: '../lib/images/lion.jpg',
		Dog: '../lib/images/dog.jpg'
	};
	const animalGradients = {
		Panda:
			'linear-gradient(to bottom right, var(--color-text), var(--color-accent-blue), var(--color-accent-lilac))',
		Fox: 'linear-gradient(to bottom right, var(--color-accent-lilac), var(--color-accent-turqoise))',
		Bunny:
			'linear-gradient(to bottom right, var(--color-accent-turqoise), var(--color-accent-salmon))',
		Lion: 'linear-gradient(to bottom right, var(--color-accent-salmon), var(--color-accent-green))',
		Dog: 'linear-gradient(to bottom right, var(--color-accent-green), var(--color-accent-turqoise))'
	};

	onMount(() => {
		const animalTitle = document.querySelector('.icon-title');
		const animalShowing = document.querySelector('.icon');
		const animalBackground = document.querySelector('.carousel-main');

		var iconButtons = document.querySelectorAll('input[name=icon]');
		iconButtons.forEach((icon) => {
			icon.addEventListener('change', () => {
				let identifier = icon.getAttribute('data-icon');

				changeInformation(identifier);
			});
		});

		function changeInformation(identifier) {
			console.log('changin baby');
			animalNames.map((name) => {
				if (name === identifier) {
					animalTitle.textContent = identifier;
				}
			});

			animalShowing.textContent = animalIcons[identifier];
			// animalBackground.style.backgroundImage = `var(--background-overlay), url(${animalBackgrounds[identifier]})`;
			animalBackground.style.backgroundImage = `${animalGradients[identifier]}`;
		}
	});

	let isActive = false;

	function motionToggle() {
		const button = document.getElementById('motionToggle');
		button.classList.toggle('active');
		isActive = button.classList.contains('active');
	}
</script>

<a href="/" class="back-button"><span class="material-symbols-outlined"> arrow_back_ios </span></a>

<h1>Customization</h1>
<p class="introtext">
	Customize your child's test to their preferences to hold their attention.
</p>

<section class="characters">
	<h2 class="customize-heading">Icon</h2>
	<p class="customize-descr">Pick an icon to display to your child as the audio plays.</p>

	<div class="carousel">
		<div class="carousel-main">
			<p class="icon">🐼</p>
			<p class="icon-title">Panda</p>
		</div>
		<div class="carousel-nav">
			<label>
				<input type="radio" name="icon" aria-label="Select the panda" data-icon="Panda" checked />
				🐼
			</label>
			<label>
				<input type="radio" name="icon" aria-label="Select the fox" data-icon="Fox" />
				🦊
			</label>
			<label>
				<input type="radio" name="icon" aria-label="Select the bunny" data-icon="Bunny" />
				🐰
			</label>
			<label>
				<input type="radio" name="icon" aria-label="Select the lion" data-icon="Lion" />
				🦁
			</label>
			<label>
				<input type="radio" name="icon" aria-label="Select the dog" data-icon="Dog" />
				🐶
			</label>
		</div>
	</div>
</section>

<section class="motion">
	<h2 class="motion-heading">Motion</h2>
	<p class="motion-descr">Select the preferred motion setting.</p>

	<div class="motion-main">
		<p>{isActive ? 'Dynamic' : 'Static'}</p>
		<button id="motionToggle" class="motionToggle" on:click={motionToggle}> </button>
	</div>
</section>

<!-- Speed controls -->

<section class="speed">
	<h2 class="speed-heading">Listening Speed</h2>
	<p class="speed-descr">Select the preferred listening speed. How fast should the tones be played?</p>
	<!-- use slider with steps? -->

	<div class="speed-control">
		<span class="material-symbols-outlined"> elderly </span>
		<input
			type="range"
			min="1"
			max="5"
			value="3"
			step="1"
			name="listeningspeed"
			list="markers"
			id="marker-input"
		/>
		<span class="material-symbols-outlined"> directions_run </span>

		<datalist id="markers">
			<option value="1"></option>
			<option value="2"></option>
			<option value="3"></option>
			<option value="4"></option>
			<option value="5"></option>
		</datalist>
	</div>
</section>

<a href="/onboarding" class="fullbutton">Continue</a>

<style>
	/* Speed controls */

	.characters,
	.motion,
	.speed {
		margin-bottom: 2.5em;
	}

	.speed-control {
		display: flex;
		margin: 2em 0;
		gap: 20px;

		& #marker-input {
			flex-grow: 1;
			color: var(--color-text);

			& option {
				color: var(--color-text);
				background-color: var(--color-text);
			}
		}
	}

    p {
        line-height: 2;
    }
</style>
