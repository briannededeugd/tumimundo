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

    onMount(() => {
        const animalTitle = document.querySelector('.icon-title');
        const animalShowing = document.querySelector('.icon');

        var iconButtons = document.querySelectorAll('input[name=icon]');
        iconButtons.forEach((icon) => {
            icon.addEventListener('change', () => {
                let identifier = icon.getAttribute('data-icon');

                changeInformation(identifier);
            });
        });

        function changeInformation(identifier) {
            console.log("changin baby");
            animalNames.map((name) => {
                if (name === identifier) {
                    animalTitle.textContent = identifier;
                }
            });

            animalShowing.textContent = animalIcons[identifier];
        }
    });


	let isActive = false;

	function motionToggle() {
		const button = document.getElementById('motionToggle');
		button.classList.toggle('active');
		isActive = button.classList.contains('active');
  	}

</script>

<h1>Customization</h1>

<section>
    <h2 class="customize-heading">Icon</h2>
    <p class="customize-descr">Pick an icon to display to your child as the audio plays.</p>

    <div class="carousel">
        <div class="carousel-main">
            <p class="icon">🐼</p>
            <p class="icon-title">Panda</p>
        </div>
        <div class="carousel-nav">
            <label>
                <input
                    type="radio"
                    name="icon"
                    aria-label="Select the panda"
                    data-icon="Panda"
                    checked
                />
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

<section>
    <h2 class="motion-heading">Motion</h2>
	<p class="motion-descr">Select the preferred motion setting.</p>

	<div class="motion-main">
		<p>{isActive ? 'Dynamic' : 'Static'}</p>
		<button 
			id="motionToggle" 
			class="motionToggle" 
			on:click={motionToggle}>
		</button>
	</div>
</section>

<!-- Speed controls -->

<section>
    <h2 class="speed-heading">Listening Speed</h2>
	<p class="speed-descr">Select the preferred listening speed.</p>
	<!-- use slider with steps? -->
</section>

<a href="/attentiontest">Continue to test</a>

