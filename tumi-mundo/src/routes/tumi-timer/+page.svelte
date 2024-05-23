<script>
    let elapsedTime = 0; // elapsed time in milliseconds
    let seconds = 0;

    let random;
    let prevRandom;
    let timer;

    let arrTimestamps = [];

    function formatTime() {
        seconds = Math.floor(elapsedTime / 1000);
    }

    setInterval(() => {
            // create a random number 0(child looks at screen) or 1(child looks away) 
            random = Math.floor(Math.random() * 2);
            random === 0 ? console.log('kind kijkt naar scherm') : console.log('kind kijkt weg');

            // if random number is NOT identical to previous random number AND random number is 1, push the current time into array
            if (prevRandom !== random && random === 1) {
                arrTimestamps.push(seconds);
                console.log(arrTimestamps)
                // save this random number in variable previous number
                prevRandom = random;
            // if random number is NOT identical to previous random number AND random number is 0, push the current time into array
            } else if(prevRandom !== random && random === 0) {
                arrTimestamps.push(seconds);
                console.log(arrTimestamps)
                prevRandom = random;
            } else {
                prevRandom = random;
            }
        }, 2000);

        // Function to start a timer
    function startTimer() {
        let startTime = Date.now();

        timer = setInterval(() => {
            let now = Date.now();
            elapsedTime = now - startTime;
            formatTime();
        }, 1000);
    }

    startTimer();

</script>

<div class="timer">
    {seconds}
</div>

<style>
    .timer {
        font-size: 2em;
        text-align: center;
    }
</style>
