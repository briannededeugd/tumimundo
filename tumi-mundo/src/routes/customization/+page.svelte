<script>
	import { isActive, icon, audioFile } from '../stores.js';

	const animals = {
		Panda: {
			animalName: 'Panda',
			animalIcon: '🐼'
		},
		Fox: {
			animalName: 'Fox',
			animalIcon: '🦊'
		},
		Bunny: {
			animalName: 'Bunny',
			animalIcon: '🐰'
		},
		Lion: {
			animalName: 'Lion',
			animalIcon: '🦁'
		},
		Dog: {
			animalName: 'Dog',
			animalIcon: '🐶'
		}
	};

</script>

<a href="/" class="back-button"><span class="material-symbols-outlined"> arrow_back_ios </span></a>

<h1>Customization</h1>
<p class="introtext">Customize your child's test to their preferences to hold their attention.</p>

<section class="characters">
	<div class="carousel">
		<div class="carousel-main">
			<p class="icon">{animals[$icon.animalName].animalIcon}</p>
			<p class="icon-title">{$icon.animalName}</p>
		</div>
	</div>
</section>

<div class="cutomize-inputs">
	<h2 class="customize-heading">Icon</h2>
	<p class="customize-descr">Pick an icon to display to your child as the audio plays.</p>
	<section class="iconInput">
		<div class="carousel-nav">
			{#each Object.entries(animals) as [animal, animalInfo]}
				<label>
					<input
						type="radio"
						name="icon"
						aria-label="Select the {animal}"
						value={animalInfo}
						bind:group={$icon}
					/>
					{animalInfo.animalIcon}
				</label>
			{/each}
		</div>
	</section>
	<section class="motion">
		<h2 class="motion-heading">Motion</h2>
		<p class="motion-descr">Select the preferred motion setting.</p>

		<div class="motion-main">
			<p>{$isActive ? 'Dynamic' : 'Static'}</p>
			<label for="motionActive" class="motionToggle">
				<input
					type="checkbox"
					id="motionActive"
					name="motionActive"
					value="motionActive"
					bind:checked={$isActive}
				/>
			</label>
		</div>
	</section>

	<section class="audio">
		<h2>Audio</h2>
		<div class="audio-main">
			<label for="audio">Choose the audio:</label>
			<select bind:value={$audioFile} name="audio" id="audio">
				<option value="HF-list1.wav">Dutch 1</option>
				<option value="LF-list1.wav">Dutch 2</option>
				<option value="ES-HF-audio.m4a">Spanish</option>
			</select>
		</div>
	</section>

	<a href="/onboarding" class="fullbutton">Continue</a>
</div>

<style>

.introtext {
	text-align: center;
}

	.characters,
	.motion {
		margin-bottom: 2.5em;
	}

	.carousel {
		display: grid;
		place-content: center;
		grid-template-columns: minmax(max-content, 23rem)
	}

	.carousel-main {
		max-width: 40rem;
		background-color: #63718e;
		border-bottom: 5rem white solid;
		position: relative;
	}

	.carousel-nav {
		display: flex;
		gap: 0.7rem;
		flex-wrap: wrap;
	}

	.icon-title {
		position: absolute;
		bottom: -6rem;
		color: black;
	}

	.audio-main {
		display: flex;
		justify-content: space-between;
	}

	#audio {
		width: 7rem;
		padding: 0.2rem;
	}

	.cutomize-inputs {
		max-width: 40rem;
		transform: translateX(-50%);
		position: relative;
		left: 50%;
	}
</style>
