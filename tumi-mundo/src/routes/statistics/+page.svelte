<svelte:head>
	<link rel="stylesheet" href="../lib/styles/style.css" />
</svelte:head>

<script>
    import { onMount } from 'svelte';

    onMount(() => {
        document.body.classList.add('statistics');

        return () => {
            document.body.classList.remove('statistics');
        };
        });

        let storiesDataArray = [
            {'stories read': 12},
            {'minutes spent listening': 136},
            {'tests taken': 8},
            {'is your favorite moment': 'Morning'},
            {'is your favorite speaker': 'Thuan-Hoa'}
        ];

        // button switch
        function globalStats() {
            const button = document.getElementById('children-global-stats-button');
            button.classList.toggle('active');
    }

</script>

<h1>Statistics</h1>

<section class="activities-wrapper">
    <h2>Today's activities</h2>
    <section class="activities-data-container">
        <div class="activities-data">
            <div class="progress">
                <div class="barOverflow">
                    <div class="bar"></div>
                </div>
            </div>

            <h3>Today's listening</h3>
            <p id="activity-time">00:00</p>
            <p>of your <span>5-minute</span> goal</p>
        </div>

        <div class="section-button">
            <a href="/">Change goal</a>
            <a href="/">Go to stories</a>
        </div>
    </section>
</section>

<section>
    <h2>Total activities</h2>
    <section>
        <!-- TODO: Add  buddy -->
        <img src="../lib/images/buddies/rat/rat-on-couch.svg" alt="TO BE ADDED">
        <div class="learning-stats">
            <h2>You have done a lot of learning!</h2>
            <p>Here you can see everything you have done since you started learning with TuMi Mundo. 
            I encourage you to keep going and do your best!</p>
        </div>
    </section>
    
</section>

<section>
    <h2>The attention span test</h2>
    <p>A test for the first phase of the method. Tap on the points to see more in depth numbers.</p>

    <!-- graphic -->

    <div class="children-global-stats">
        <p>See how other children are performing</p>
        <button 
			id="children-global-stats-button" 
			class="children-global-stats-button" 
			on:click={globalStats}>
		</button>    
    </div>

</section>

<section>
    <h2>Stories</h2>
    
    <ul class="stories_container">
        {#each storiesDataArray as storyData}
            {#each Object.entries(storyData) as [key,value]}
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
        <li>Listening method</li>
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
        --statistics-switch-background-color: #1CB854;
        --progress-bar-unfilled: #70cfae8b;

        --statistics-background-gradient: linear-gradient(to bottom, var(--color-statistics-bg-light), var(--color-statistics-bg-dark)); 

        --color-button-goal: #27b16f;
        --color-button-stories: #9264F4;

    }

    :global(body.statistics) {
        background:var(--statistics-background-gradient);
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
    }

    .activities-wrapper {
        & .activities-data-container {
                & .activities-data {
                    /* progress bar */
                    width:100%;
                    height:100%;
                    text-align: center;
                    position: relative;
                    & .progress {
                            width:100%;
                            height: calc(100% + 23px);
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            margin: 4px;
                            float:left;
                            text-align: center;
                            z-index:-1;

                        & .barOverflow {
                            position: absolute;
                            top: 50%;
                            left:50%;
                            transform: translate(-50%, -50%);
                            overflow: hidden; 
                            width: 100%; 
                            height:100%; /* Half circle (overflow) */
                            margin-bottom: -14px; /* bring the numbers up */

                            & .bar {
                                position: absolute;
                                top: 0; left: 0;
                                width: 100%; height: 369px; /* full circle! */
                                border-radius: 50%;
                                box-sizing: border-box;
                                border: 7px solid var(--progress-bar-unfilled);
                                /* border-top-color: var(--progress-bar-unfilled);
                                border-left-color: var(--progress-bar-unfilled); */
                            }
                        }

                    }

                    & h3 {
                        padding-top: 3em;
                    }

                    & #activity-time {
                        font-size: 3rem;
                    }

                    & span {
                        font-weight: var(--font-weight-semibold);
                        text-decoration: underline;
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

			padding: .75em 1rem;
			text-decoration: none;
            
            &:first-of-type {
                background-color: var(--color-button-goal);
            }

            &:last-of-type {
                background-color: var(--color-button-stories);
            }
		}
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
                box-shadow: var(--box-shadow);
                border-radius: 10px;
            }
        }
    }
    
    section {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        & > section {
            align-items: center;
        }
    }

    .learning-stats h2 {
        padding-bottom: .5rem;
    }
    

    .children-global-stats {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        & .children-global-stats-button {
            width: 60px;
            height: 30px;
            background-color: #ccc;
            border: none;
            border-radius: 1.2em;
            cursor: pointer;
            position: relative;

                &::after {
                content: '';
                position: absolute;
                width: 1.8em;
                height: 1.8em;
                background-color: white;
                border-radius: 50%;
                top: 0.21em;
                left: 0.2em;
                transition: transform 0.3s;
                transform: translateX(2.3em);
            }
        }

        & .active {
            background-color: var(--statistics-switch-background-color);

            &::after {
                transform: translateX(0);
            }
        }
    }

</style>


