<svelte:head>
	<link rel="stylesheet" href="../lib/styles/style.css" />
</svelte:head>

<script>
    import { onMount } from 'svelte';

    onMount(() => {
        document.body.classList.add('statistics');

        document.querySelectorAll(".progress").forEach(function(progress) {
            var bar = progress.querySelector(".bar");
            var perc = -100 ; 

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

                bar.style.transform = "rotate(" + (135 + p * 1.8) + "deg)";

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

    let storiesDataArray = [
        {'stories read': 12},
        {'minutes spent listening': 136},
        {'tests taken': 8},
        {'is your favorite moment': 'Morning'},
        {'is your favorite speaker': 'Thuan-Hoa'}
    ];

    // Button switch
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
        <img src="../lib/images/buddies/rat/rat-on-couch.svg" alt="The rat on the couch">
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
        <li><span>1.</span>Listening method <img src="../lib/images/icons/music-note.svg" alt="Musical note"></li>
        <img src="../lib/images/icons/active-arrow.svg" alt="an arrow that connect with second task">
        <li class="opacity"><span>2.</span>The first words <img src="../lib/images/icons/music-note.svg" alt="Musical note"></li>
        <img src="../lib/images/icons/disabled-arrow-left.svg" alt="an arrow that connect with second task">
        <li class="opacity"><span>3.</span>People and animals <img src="../lib/images/icons/music-note.svg" alt="Musical note"></li>
        <img src="../lib/images/icons/disabled-arrow-right.svg" alt="an arrow that connect with second task">
        <li class="opacity"><span>4.</span>Sentences <img src="../lib/images/icons/music-note.svg" alt="Musical note"></li>
        <img src="../lib/images/icons/disabled-arrow-left.svg" alt="an arrow that connect with second task">
        <li class="opacity"><span>5.</span>Reading and writing <img src="../lib/images/icons/music-note.svg" alt="Musical note"></li>
    </ol>


</section>

<style>
    :root {
        /* COLORS */
        --color-statistics-bg-light:#219B9B;
        --color-statistics-bg-dark:#1B7070;

        --story-item-background: #0B8FAC;
        --statistics-switch-background-color: #1CB854;
        --progress-bar-unfilled: white;
        --progress-bar-filled: #1be0b9;

        --statistics-background-gradient: linear-gradient(to bottom, var(--color-statistics-bg-light), var(--color-statistics-bg-dark)); 

        --color-button-goal: #27b16f;
        --color-button-stories: #9264F4;

        --roadmap-first-step: #1CB854;
        --roadmap-second-step: #37C6AB;
        --roadmap-third-step: #059CC0;
        --roadmap-fourth-step: #FF8C59;
        --roadmap-fifth-step: #FFA02E;
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
                    /* SRC Code from https://codepen.io/jagathish/pen/ZXzbzN */
                    /* progress bar */
                    width:100%;
                    height:100%;
                    text-align: center;
                    position: relative;
                    & .progress {
                            width:387px;
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
                                width: 387px; height: 387px; /* full circle! */
                                border-radius: 50%;
                                box-sizing: border-box;
                                /* transform: rotate(30deg); */
                                border: 7px solid var(--progress-bar-unfilled);
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
            background-color: #219B9B;
            text-align: center;
            list-style: decimal inside;
            /* width: max-content; */
            padding: .5rem .75rem;
            border-radius: .5rem;

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

</style>


