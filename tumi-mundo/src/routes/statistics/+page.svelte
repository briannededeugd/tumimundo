<svelte:head>
	<link rel="stylesheet" href="../lib/styles/style.css" />
</svelte:head>

<script>
    import { onMount, onDestroy } from 'svelte';

  onMount(() => {
    document.body.classList.add('statistics');
    return () => {
      document.body.classList.remove('statistics');
    };
  });
</script>

<h1>Statistics</h1>

<section>
    <h2>Today's activities</h2>
    <div class="activities">
        <div class="activity-bar"></div>
        <h3>Today's listening</h3>
        <p id="activity-time">00.00</p>
        <p>of your 5-minute goal</p>
    </div>

    <div class="section-button">
        <a href="/">Change goal</a>
        <a href="/">Go to stories</a>
    </div>
</section>

<section>
    <h2>Total activities</h2>
    <!-- TODO: Add  buddy -->
    <img src="../lib/images/buddies/rat/rat-on-couch.svg" alt="TO BE ADDED">

    <div>
        <h2>You have done a lot of learning!</h2>
        <p>Here you can see everything you have done since you started learning with TuMi Mundo. 
I encourage you to keep going and do your best!</p>
    </div>
</section>

<section>
    <h2>The attention span test</h2>
    <p>A test for the first phase of the method. Tap on the points to see more in depth numbers.</p>

    <!-- graphic -->

    <label>
        See how other children are performing
        <input type="checkbox" name="checkbox" value="value">
    </label>
</section>

<section>
  
    <h2>Stories</h2>
    
    <ul class="stories_container">
        <li class="story_item">
            <div class="story_item_data">12</div>
            <p>stories read</p>
        </li>
        <li class="story_item">
            <div class="story_item_data">136</div>
            <p>minutes spent listening</p>
        </li>
        <li class="story_item">
            <div class="story_item_data">8</div>
            <p>tests taken</p>
        </li>
        <li class="story_item">
            <div class="story_item_data">Morning</div>
            <p>is your favorite moment</p>
        </li>
        <li class="story_item">
            <div class="story_item_data">Thuan-Hoa</div>
            <p>is your favoirite speaker</p>
        </li>
    </ul>
</section>

<section>
    <h2>The roadmap</h2>
    <p>Here you can see how far you are in the method!</p>
    
    <ol>
        <li>listening method</li>
        <li>The first words</li>
        <li>People and animals</li>
        <li>Sentences</li>
        <li>Reading and writing</li>
    </ol>
</section>

<style>
    :root {
        /* COLORS */
        --color-statistics-bg-light:#219B9B;
        --color-statistics-bg-dark:#1B7070;

        --story-item-background: #0B8FAC;

        --statistics-background-gradient: linear-gradient(to bottom, var(--color-statistics-bg-light), var(--color-statistics-bg-dark)); 
    }

    :global(body.statistics) {
        background:var(--statistics-background-gradient);
    }

    .stories_container {
        display: flex;
        flex-direction: column;
        gap: .75em;

        & .story_item {
            display: flex;
            align-items: center;
            gap: .25em;

            & .story_item_data {
                padding: .25em .5em;
                background-color: var(--story-item-background);
                box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.336);
                border-radius: 10px;
            }
        }
    }
</style>


