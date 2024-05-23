<script>
    import { onMount } from 'svelte';

    const animalNames = ['panda', 'fox', 'bunny', 'lion', 'dog'];
    const animalIcons = {
        panda: '🐼',
        fox: '🦊',
        bunny: '🐰',
        lion: '🦁',
        dog: '🐶'
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
            animalNames.map((name) => {
                if (name === identifier) {
                    var newName = identifier.split[0].toUppercase();
                    animalTitle.textContent = newName;
                }
            });
        }
    });
</script>

<h1>Customization</h1>

<section>
    <h2 class="customize-heading">Icon</h2>
    <p class="customize-descr">Pick an icon to display to your child as the audio plays.</p>

    <div class="carousel">
        <div class="carousel-main">
            <p class="icon">🐼</p>
            <p class="icon-title">Panda bear</p>
        </div>
        <div class="carousel-nav">
            <label>
                <input
                    type="radio"
                    name="icon"
                    aria-label="Select the panda bear"
                    data-icon="panda"
                    checked
                />
                🐼
            </label>
            <label>
                <input type="radio" name="icon" aria-label="Select the fox" data-icon="fox" />
                🦊
            </label>
            <label>
                <input type="radio" name="icon" aria-label="Select the bunny" data-icon="bunny" />
                🐰
            </label>
            <label>
                <input type="radio" name="icon" aria-label="Select the lion" data-icon="lion" />
                🦁
            </label>
            <label>
                <input type="radio" name="icon" aria-label="Select the dog" data-icon="dog" />
                🐶
            </label>
        </div>
    </div>
</section>

<!-- Motion controls -->
<section>
    <h2 class="motion-heading">Motion</h2>
	<p class="motion-descr">Select the preferred motion</p>
</section>

<!-- Speed controls -->

<section>
    <h2 class="speed-heading">Motion</h2>
	<p class="speed-descr">Select the preferred listening speed</p>
</section>

<a href="/attentiontest">Continue to test</a>

