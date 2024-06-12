<script>
	import { isActive, icon, audioFile } from '../stores.js';
	import { onMount } from 'svelte';

	import { pico } from '../../utils/libraries/pico-library.js';
	import { lploc } from '../../utils/libraries/lploc-library.js';
	import { camvas } from '../../utils/libraries/camvas-library.js';

	function stopFaceDetection() {
		window.location.pathname = 'onboarding';
	}

	var initialized = false;
	let highFreqAudio = null;
	var timestampsObject = [];

	var elapsedTime = 0; // elapsed time in milliseconds
	var seconds = 0;
	var minutes = 0;
	var hours = 0;
	var timeFormat = 0;

	function removePopup() {
		const popup = document.querySelector('.popup');
		popup.style.display = 'none';
		}
		
		onMount(() => {
		document.body.classList.add('attentiontest');
		const video = document.getElementById('webcam');

		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then(function (stream) {
					video.srcObject = stream;
				})
				.catch(function (error) {
					console.log('Something went wrong!');
				});
		} else {
			console.log('getUserMedia not supported!');
		}

		/**===========================================
		 *               PICO INLINE JS              *
		 *==========================================**/

		var random;
		var prevRandom;
		var timer;

		highFreqAudio = new Audio('../lib/audios/HF-list1.wav');
		var progressBackground = document.querySelector('.progressbg');
		var progressBar = document.querySelector('.progressbar');

		var currentTime = highFreqAudio.currentTime;
		var duration = highFreqAudio.duration;

		// format the timer to be hh:mm:ss
		function formatTime() {
			(seconds = Math.floor((elapsedTime / 1000) % 60)),
				(minutes = Math.floor((elapsedTime / (1000 * 60)) % 60)),
				(hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24));

			hours = hours < 10 ? '0' + hours : hours;
			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;

			// save format in variable timeFormat
			timeFormat = hours + ':' + minutes + ':' + seconds;
		}

		// Function to start a timer
		function startTimer() {
			// start time of the test
			let startTime = Date.now();

			// start interval every 1000ms
			timer = setInterval(() => {
				// new time of test every 1000ms
				let now = Date.now();
				// elapsed time between start time and new time
				elapsedTime = now - startTime;
				// format time from ms to hh:mm:ss
				formatTime();
			}, 1000);
		}

		function updateTime() {
			var currentTime = highFreqAudio.currentTime;
			var duration = highFreqAudio.duration;
			progressBar.style.width = (currentTime / duration) * 100 + '%';
		}

		startTimer();
		setInterval(updateTime, 100);

		highFreqAudio.addEventListener('ended', () => {
			// turn object into JSON
			var jsonObj = JSON.stringify(timestampsObject);
			// CODE TO SEND TO SERVER HERE...

			window.location.pathname = 'offboarding';
		});
	});

	function button_callback() {
		if (initialized) return;

		highFreqAudio.play();

		var update_memory = pico.instantiate_detection_memory(5);
		var facefinder_classify_region = function (r, c, s, pixels, ldim) {
			return -1.0;
		};
		var cascadeurl =
			'https://raw.githubusercontent.com/nenadmarkus/pico/c2e81f9d23cc11d1a612fd21e4f9de0921a5d0d9/rnt/cascades/facefinder';
		fetch(cascadeurl).then(function (response) {
			response.arrayBuffer().then(function (buffer) {
				var bytes = new Int8Array(buffer);
				facefinder_classify_region = pico.unpack_cascade(bytes);
				console.log('* facefinder loaded');
			});
		});

		var do_puploc = function (r, c, s, nperturbs, pixels, nrows, ncols, ldim) {
			return [-1.0, -1.0];
		};
		var puplocurl = 'https://drone.nenadmarkus.com/data/blog-stuff/puploc.bin';
		fetch(puplocurl).then(function (response) {
			response.arrayBuffer().then(function (buffer) {
				var bytes = new Int8Array(buffer);
				do_puploc = lploc.unpack_localizer(bytes);
				console.log('* puploc loaded');
			});
		});
		var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
		function rgba_to_grayscale(rgba, nrows, ncols) {
			var gray = new Uint8Array(nrows * ncols);
			for (var r = 0; r < nrows; ++r)
				for (var c = 0; c < ncols; ++c)
					gray[r * ncols + c] =
						(2 * rgba[r * 4 * ncols + 4 * c + 0] +
							7 * rgba[r * 4 * ncols + 4 * c + 1] +
							1 * rgba[r * 4 * ncols + 4 * c + 2]) /
						10;
			return gray;
		}

		var prevFaceDetected = false; // Add this variable to store the previous detection status

		var processfn = function (video, dt) {
			// Create an off-screen canvas for processing the video frame
			var canvas = document.createElement('canvas');
			canvas.width = 640;
			canvas.height = 480;
			var ctx = canvas.getContext('2d');

			ctx.drawImage(video, 0, 0);
			var rgba = ctx.getImageData(0, 0, 640, 480).data;

			var image = {
				pixels: rgba_to_grayscale(rgba, 480, 640),
				nrows: 480,
				ncols: 640,
				ldim: 640
			};
			var params = {
				shiftfactor: 0.1,
				minsize: 100,
				maxsize: 1000,
				scalefactor: 1.1
			};

			var dets = pico.run_cascade(image, facefinder_classify_region, params);
			dets = update_memory(dets);
			dets = pico.cluster_detections(dets, 0.2);

			var faceDetected = false;
			for (var i = 0; i < dets.length; ++i) {
				// confidenceScore is a Number on how certain the api thinks it detects a face
				var confidenceScore = dets[0][3];
				// only when its certainty is above 400, tell it there is a face
				if (confidenceScore > 400.0) {
					faceDetected = true;
					break;
					// Only when it's below 350, tell it there is no face
				} else if (confidenceScore < 350.0) {
					faceDetected = false;
					break;
					// if the number is between 350 and 400 keep the same detection as before
				} else {
					faceDetected = prevFaceDetected;
					break;
				}
			}

			// TIMER START / TIMER STOP
			if (faceDetected !== prevFaceDetected) {
				// Check if the detection status has changed
				if (faceDetected) {
					timestampsObject.push({
						time: timeFormat,
						type: 'attention_start',
						description: 'Baby started paying attention'
					});
					console.log(timestampsObject);
				} else {
					timestampsObject.push({
						time: timeFormat,
						type: 'attention_stop',
						description: 'Baby stopped paying attention'
					});
					console.log(timestampsObject);
				}
				prevFaceDetected = faceDetected; // Update the previous detection status
			}
		};

		var mycamvas = new camvas(ctx, processfn);

		initialized = true;

		if (highFreqAudio) {
			// ANIMATE CARD
			let audioDuration = Math.ceil(highFreqAudio.duration);
			const card = document.querySelector('.testcard');
			card.style.animationDuration = `${audioDuration}s`;
		}
	}
</script>

<svelte:head>
	<title>Attention Test</title>
</svelte:head>

<body class="testingPage">
	<nav>
		<a href="/onboarding"><span class="material-symbols-outlined"> arrow_back_ios </span></a>

		<div class="progress-element">
			<div class="progressbg">
				<div class="progressbar"></div>
			</div>
		</div>

		<button class="confused" aria-label="Toggle explanation">
			<span class="material-symbols-outlined"> question_mark </span></button
		>
	</nav>

	<section class="testcard">
		<div class="testcard-img">
			<p>🐋</p>
		</div>
		<div class="testcard-info">
			<p>é</p>
		</div>
	</section>

	<div class="popup">
		<div>
			<h3>Start the test?</h3>
			<p>
				Are you and your child properly seated? Make sure that <em>only</em> the baby's face is visible
				in the window below. If all is in order, we can start.
			</p>
			<video id="webcam" autoplay="true">
				<track kind="captions" />
			</video>

			<div class="startcanceltest">
				<button on:click={button_callback} class="start"
					>Start <span class="material-symbols-outlined"> check </span></button
				>
				<a href="/onboarding" class="canceltest" on:click={stopFaceDetection}>
					Cancel
					<span class="material-symbols-outlined"> close </span></a
				>
			</div>
		</div>
	</div>

	<p><center><canvas width="0" height="0"></canvas></center></p>
</body>

<style>
	:global(body.attentiontest) {
		background-color: var(--color-background);
	}

	.testingPage {
		background:
			url('/lib/images/background/e.svg'),
			url('/lib/images/background/a.svg'),
			url('/lib/images/background/i.svg'),
			url('/lib/images/background/o.svg'),
			url('/lib/images/background/u.svg') #cfd8ed;
		background-repeat: repeat-y;
		background-position:
			5% 0%,
			95% 0%,
			50% 30%,
			5% 0%,
			95% 0%;
		background-size: 6rem, 6rem, 3rem;
		margin: -3vh -5vw;
	}

	h3 {
		font-weight: 600;
	}

	nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 20px;
		width: 100%;

		& a {
			color: var(--color-text);
			padding-right: 0;

			& span {
				padding-left: 0.45em;
				font-weight: 200 !important;
			}
		}

		& .progress-element {
			position: relative;
			width: 100%;
			border-radius: 40px;
			box-shadow: var(--box-shadow-test);

			& .progressbg {
				height: 15px;
				width: 100%;
				border-radius: 40px;
				background-color: var(--color-text);

				& .progressbar {
					position: relative;
					left: 0;
					height: 100%;
					border-radius: 40px;
					width: 0%;
					background-color: var(--color-interactions);
				}
			}
		}

		& a,
		& button {
			min-height: 50px;
			min-width: 50px;
			display: inline-flex;
			align-items: center;
			justify-content: center !important;

			font-size: var(--font-size-iconbtn) !important;

			border-radius: 20px;
			border: none;
			text-decoration: none;

			background-color: var(--color-interactions);
			color: var(--color-text);
			text-align: center !important;
			box-shadow: var(--box-shadow-test);

			&:hover {
				background-color: var(--color-interactions-hover);
			}
		}
	}

	.startcanceltest {
		display: flex;
		justify-content: space-between;
		min-width: 100%;
		margin-top: 1em;
	}

	.canceltest,
	.start {
		text-decoration: none;
		padding: 0.75em 1em;
		border-radius: var(--border-radius);
		font-size: var(--font-size-storydesc);
		font-family: 'Poppins', sans-serif;
		display: inline-flex;
		align-items: center;
		gap: 5px;

		color: var(--color-darktext);
		background-color: var(--color-text);
		box-shadow: var(--box-shadow-test);

		& span {
			font-size: var(--font-size-storydesc);
			color: var(--color-cancel);
		}

		&:hover,
		&:active {
			background-color: var(--color-active-cancel);
		}
	}

	.start {
		border: none;
		background-color: var(--color-start);
		color: var(--color-text);

		& span {
			font-weight: 800;
			color: var(--color-text);
		}

		&:hover,
		&:active {
			background-color: var(--color-active-start);
		}
	}

	.testcard {
		position: absolute;
		width: 70dvw;
		aspect-ratio: 2/1.75;
		background-color: var(--color-text);
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow-test);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1);
		transform-origin: center center;
		padding: 0.5em;

		animation-name: animateCard;
		animation-play-state: paused;
		color: var(--color-interactions);

		& .testcard-img {
			position: relative;
			width: 100%;
			height: 70%;
			background-color: var(--color-interactions);
			border-radius: var(--border-radius);
			display: flex;
			align-items: center;
			justify-content: center;

			& p {
				/* font-size: 185px; */
				font-size: clamp(100px, 100px + 5vw, 185px);
				display: inline-block;
			}
		}

		& p {
			font-family: 'Poppins', sans-serif;
			font-weight: 800;
			text-align: center;
			/* font-size: 120px; */
			font-size: clamp(90px, 80px + 3vw, 120px);
		}
	}

	@keyframes animateCard {
		0% {
			transform: translate(-50%, -50%) scale(1) rotate(-1deg);
		}
		5% {
			transform: translate(-50%, -50%) scale(1.1) rotate(1deg);
		}
		10% {
			transform: translate(-50%, -50%) scale(1.2) rotate(3deg);
		}
		15% {
			transform: translate(-50%, -50%) scale(1.1) rotate(2deg);
		}
		20% {
			transform: translate(-50%, -50%) scale(0.9) rotate(-2deg);
		}
		25% {
			transform: translate(-50%, -50%) scale(1) rotate(0deg);
		}
		30% {
			transform: translate(-50%, -50%) scale(1.1) rotate(4deg);
		}
		35% {
			transform: translate(-50%, -50%) scale(1.2) rotate(2deg);
		}
		40% {
			transform: translate(-50%, -50%) scale(1) rotate(-1deg);
		}
		45% {
			transform: translate(-50%, -50%) scale(1.2) rotate(1deg);
		}
		50% {
			transform: translate(-50%, -50%) scale(1.3) rotate(2deg);
		}
		55% {
			transform: translate(-50%, -50%) scale(1.2) rotate(0deg);
		}
		60% {
			transform: translate(-50%, -50%) scale(1.2) rotate(-2deg);
		}
		65% {
			transform: translate(-50%, -50%) scale(1.3) rotate(1deg);
		}
		70% {
			transform: translate(-50%, -50%) scale(1.2) rotate(3deg);
		}
		75% {
			transform: translate(-50%, -50%) scale(1.3) rotate(2deg);
		}
		80% {
			transform: translate(-50%, -50%) scale(1.2) rotate(-1deg);
		}
		85% {
			transform: translate(-50%, -50%) scale(1.1) rotate(0deg);
		}
		90% {
			transform: translate(-50%, -50%) scale(1.1) rotate(2deg);
		}
		95% {
			transform: translate(-50%, -50%) scale(1.05) rotate(1deg);
		}
		100% {
			transform: translate(-50%, -50%) scale(1) rotate(-1deg);
		}
	}

	@media (min-width: 650px) {
		.testcard {
			width: 30dvw;
		}
	}
</style>
