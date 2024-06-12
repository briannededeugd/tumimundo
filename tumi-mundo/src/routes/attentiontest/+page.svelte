<script>
	import { isActive, icon, audioFile } from '../stores.js';
	import { onMount } from 'svelte';

	function stopFaceDetection() {
		window.location.pathname = 'onboarding';
	}

	function removePopup() {
			const popup = document.querySelector('.popup');
			popup.style.display = 'none';
		}

	onMount(() => {
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
	});
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

	<section class="testcard" style="animation-play-state:{$isActive ? "running" : "paused"}; ">
		<div class="testcard-img">
			<p>{$icon.animalIcon}</p>
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
				<button onclick="button_callback()" on:click={removePopup} class="start"
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

	<script>
		// NOTE: This code is sourced from https://github.com/nenadmarkus/picojs. All credits go to the owner!

		/**============================================
		 *                  PICO.JS
		 *=============================================**/
		/* This library is released under the MIT license, see https://github.com/nenadmarkus/picojs */
		pico = {};

		pico.unpack_cascade = function (bytes) {
			//
			const dview = new DataView(new ArrayBuffer(4));
			/*
            we skip the first 8 bytes of the cascade file
            (cascade version number and some data used during the learning process)
        */
			let p = 8;
			/*
            read the depth (size) of each tree first: a 32-bit signed integer
        */
			dview.setUint8(0, bytes[p + 0]),
				dview.setUint8(1, bytes[p + 1]),
				dview.setUint8(2, bytes[p + 2]),
				dview.setUint8(3, bytes[p + 3]);
			const tdepth = dview.getInt32(0, true);
			p = p + 4;
			/*
            next, read the number of trees in the cascade: another 32-bit signed integer
        */
			dview.setUint8(0, bytes[p + 0]),
				dview.setUint8(1, bytes[p + 1]),
				dview.setUint8(2, bytes[p + 2]),
				dview.setUint8(3, bytes[p + 3]);
			const ntrees = dview.getInt32(0, true);
			p = p + 4;
			/*
            read the actual trees and cascade thresholds
        */
			const tcodes_ls = [];
			const tpreds_ls = [];
			const thresh_ls = [];
			for (let t = 0; t < ntrees; ++t) {
				// read the binary tests placed in internal tree nodes
				Array.prototype.push.apply(tcodes_ls, [0, 0, 0, 0]);
				Array.prototype.push.apply(tcodes_ls, bytes.slice(p, p + 4 * Math.pow(2, tdepth) - 4));
				p = p + 4 * Math.pow(2, tdepth) - 4;
				// read the prediction in the leaf nodes of the tree
				for (let i = 0; i < Math.pow(2, tdepth); ++i) {
					dview.setUint8(0, bytes[p + 0]),
						dview.setUint8(1, bytes[p + 1]),
						dview.setUint8(2, bytes[p + 2]),
						dview.setUint8(3, bytes[p + 3]);
					tpreds_ls.push(dview.getFloat32(0, true));
					p = p + 4;
				}
				// read the threshold
				dview.setUint8(0, bytes[p + 0]),
					dview.setUint8(1, bytes[p + 1]),
					dview.setUint8(2, bytes[p + 2]),
					dview.setUint8(3, bytes[p + 3]);
				thresh_ls.push(dview.getFloat32(0, true));
				p = p + 4;
			}
			const tcodes = new Int8Array(tcodes_ls);
			const tpreds = new Float32Array(tpreds_ls);
			const thresh = new Float32Array(thresh_ls);
			/*
            construct the classification function from the read data
        */
			function classify_region(r, c, s, pixels, ldim) {
				r = 256 * r;
				c = 256 * c;
				let root = 0;
				let o = 0.0;
				const pow2tdepth = Math.pow(2, tdepth) >> 0; // '>>0' transforms this number to int

				for (let i = 0; i < ntrees; ++i) {
					let idx = 1;
					for (let j = 0; j < tdepth; ++j)
						// we use '>> 8' here to perform an integer division: this seems important for performance
						idx =
							2 * idx +
							(pixels[
								((r + tcodes[root + 4 * idx + 0] * s) >> 8) * ldim +
									((c + tcodes[root + 4 * idx + 1] * s) >> 8)
							] <=
								pixels[
									((r + tcodes[root + 4 * idx + 2] * s) >> 8) * ldim +
										((c + tcodes[root + 4 * idx + 3] * s) >> 8)
								]);

					o = o + tpreds[pow2tdepth * i + idx - pow2tdepth];

					if (o <= thresh[i]) return -1;

					root += 4 * pow2tdepth;
				}
				return o - thresh[ntrees - 1];
			}
			/*
            we're done
        */
			return classify_region;
		};

		pico.run_cascade = function (image, classify_region, params) {
			const pixels = image.pixels;
			const nrows = image.nrows;
			const ncols = image.ncols;
			const ldim = image.ldim;

			const shiftfactor = params.shiftfactor;
			const minsize = params.minsize;
			const maxsize = params.maxsize;
			const scalefactor = params.scalefactor;

			let scale = minsize;
			const detections = [];

			while (scale <= maxsize) {
				const step = Math.max(shiftfactor * scale, 1) >> 0; // '>>0' transforms this number to int
				const offset = (scale / 2 + 1) >> 0;

				for (let r = offset; r <= nrows - offset; r += step)
					for (let c = offset; c <= ncols - offset; c += step) {
						const q = classify_region(r, c, scale, pixels, ldim);
						if (q > 0.0) detections.push([r, c, scale, q]);
					}

				scale = scale * scalefactor;
			}

			return detections;
		};

		pico.cluster_detections = function (dets, iouthreshold) {
			/*
            sort detections by their score
        */
			dets = dets.sort(function (a, b) {
				return b[3] - a[3];
			});
			/*
            this helper function calculates the intersection over union for two detections
        */
			function calculate_iou(det1, det2) {
				// unpack the position and size of each detection
				const r1 = det1[0],
					c1 = det1[1],
					s1 = det1[2];
				const r2 = det2[0],
					c2 = det2[1],
					s2 = det2[2];
				// calculate detection overlap in each dimension
				const overr = Math.max(
					0,
					Math.min(r1 + s1 / 2, r2 + s2 / 2) - Math.max(r1 - s1 / 2, r2 - s2 / 2)
				);
				const overc = Math.max(
					0,
					Math.min(c1 + s1 / 2, c2 + s2 / 2) - Math.max(c1 - s1 / 2, c2 - s2 / 2)
				);
				// calculate and return IoU
				return (overr * overc) / (s1 * s1 + s2 * s2 - overr * overc);
			}
			/*
            do clustering through non-maximum suppression
        */
			const assignments = new Array(dets.length).fill(0);
			const clusters = [];
			for (let i = 0; i < dets.length; ++i) {
				// is this detection assigned to a cluster?
				if (assignments[i] == 0) {
					// it is not:
					// now we make a cluster out of it and see whether some other detections belong to it
					let r = 0.0,
						c = 0.0,
						s = 0.0,
						q = 0.0,
						n = 0;
					for (let j = i; j < dets.length; ++j)
						if (calculate_iou(dets[i], dets[j]) > iouthreshold) {
							assignments[j] = 1;
							r = r + dets[j][0];
							c = c + dets[j][1];
							s = s + dets[j][2];
							q = q + dets[j][3];
							n = n + 1;
						}
					// make a cluster representative
					clusters.push([r / n, c / n, s / n, q]);
				}
			}

			return clusters;
		};

		pico.instantiate_detection_memory = function (size) {
			/*
            initialize a circular buffer of `size` elements
        */
			let n = 0;
			const memory = [];
			for (let i = 0; i < size; ++i) memory.push([]);
			/*
            build a function that:
            (1) inserts the current frame's detections into the buffer;
            (2) merges all detections from the last `size` frames and returns them
        */
			function update_memory(dets) {
				memory[n] = dets;
				n = (n + 1) % memory.length;
				dets = [];
				for (i = 0; i < memory.length; ++i) dets = dets.concat(memory[i]);
				//
				return dets;
			}
			/*
            we're done
        */
			return update_memory;
		};

		/**============================================
		 *                  LPLOC.JS
		 *=============================================**/
		/* This library is released under the MIT license, see https://github.com/nenadmarkus/picojs */
		lploc = {};

		lploc.unpack_localizer = function (bytes) {
			//
			const dview = new DataView(new ArrayBuffer(4));
			let p = 0;
			/*
            read the number of stages, scale multiplier (applied after each stage),
            number of trees per stage and depth of each tree
        */
			dview.setUint8(0, bytes[p + 0]),
				dview.setUint8(1, bytes[p + 1]),
				dview.setUint8(2, bytes[p + 2]),
				dview.setUint8(3, bytes[p + 3]);
			const nstages = dview.getInt32(0, true);
			p = p + 4;
			dview.setUint8(0, bytes[p + 0]),
				dview.setUint8(1, bytes[p + 1]),
				dview.setUint8(2, bytes[p + 2]),
				dview.setUint8(3, bytes[p + 3]);
			const scalemul = dview.getFloat32(0, true);
			p = p + 4;
			dview.setUint8(0, bytes[p + 0]),
				dview.setUint8(1, bytes[p + 1]),
				dview.setUint8(2, bytes[p + 2]),
				dview.setUint8(3, bytes[p + 3]);
			const ntreesperstage = dview.getInt32(0, true);
			p = p + 4;
			dview.setUint8(0, bytes[p + 0]),
				dview.setUint8(1, bytes[p + 1]),
				dview.setUint8(2, bytes[p + 2]),
				dview.setUint8(3, bytes[p + 3]);
			const tdepth = dview.getInt32(0, true);
			p = p + 4;
			/*
            unpack the trees
        */
			const tcodes_ls = [];
			const tpreds_ls = [];
			for (let i = 0; i < nstages; ++i) {
				// read the trees for this stage
				for (let j = 0; j < ntreesperstage; ++j) {
					// binary tests (we can read all of them at once)
					Array.prototype.push.apply(tcodes_ls, bytes.slice(p, p + 4 * Math.pow(2, tdepth) - 4));
					p = p + 4 * Math.pow(2, tdepth) - 4;
					// read the prediction in the leaf nodes of the tree
					for (let k = 0; k < Math.pow(2, tdepth); ++k)
						for (let l = 0; l < 2; ++l) {
							dview.setUint8(0, bytes[p + 0]),
								dview.setUint8(1, bytes[p + 1]),
								dview.setUint8(2, bytes[p + 2]),
								dview.setUint8(3, bytes[p + 3]);
							tpreds_ls.push(dview.getFloat32(0, true));
							p = p + 4;
						}
				}
			}
			const tcodes = new Int8Array(tcodes_ls);
			const tpreds = new Float32Array(tpreds_ls);
			/*
            construct the location estimaton function
        */
			function loc_fun(r, c, s, pixels, nrows, ncols, ldim) {
				let root = 0;
				const pow2tdepth = Math.pow(2, tdepth) >> 0; // '>>0' transforms this number to int

				for (let i = 0; i < nstages; ++i) {
					let dr = 0.0,
						dc = 0.0;

					for (let j = 0; j < ntreesperstage; ++j) {
						let idx = 0;
						for (var k = 0; k < tdepth; ++k) {
							const r1 = Math.min(
								nrows - 1,
								Math.max(0, (256 * r + tcodes[root + 4 * idx + 0] * s) >> 8)
							);
							const c1 = Math.min(
								ncols - 1,
								Math.max(0, (256 * c + tcodes[root + 4 * idx + 1] * s) >> 8)
							);
							const r2 = Math.min(
								nrows - 1,
								Math.max(0, (256 * r + tcodes[root + 4 * idx + 2] * s) >> 8)
							);
							const c2 = Math.min(
								ncols - 1,
								Math.max(0, (256 * c + tcodes[root + 4 * idx + 3] * s) >> 8)
							);

							idx = 2 * idx + 1 + (pixels[r1 * ldim + c1] > pixels[r2 * ldim + c2]);
						}

						const lutidx =
							2 * (ntreesperstage * pow2tdepth * i + pow2tdepth * j + idx - (pow2tdepth - 1));
						dr += tpreds[lutidx + 0];
						dc += tpreds[lutidx + 1];

						root += 4 * pow2tdepth - 4;
					}

					r = r + dr * s;
					c = c + dc * s;

					s = s * scalemul;
				}

				return [r, c];
			}
			/*
            this function applies random perturbations to the default rectangle (r, c, s)
        */
			function loc_fun_with_perturbs(r, c, s, nperturbs, image) {
				const rows = [],
					cols = [];

				for (let i = 0; i < nperturbs; ++i) {
					const _s = s * (0.925 + 0.15 * Math.random());
					let _r = r + s * 0.15 * (0.5 - Math.random());
					let _c = c + s * 0.15 * (0.5 - Math.random());

					[_r, _c] = loc_fun(_r, _c, _s, image.pixels, image.nrows, image.ncols, image.ldim);

					rows.push(_r);
					cols.push(_c);
				}

				// return the median along each axis
				rows.sort();
				cols.sort();

				return [rows[Math.round(nperturbs / 2)], cols[Math.round(nperturbs / 2)]];
			}
			/*
            we're done
        */
			return loc_fun_with_perturbs;
		};

		/**============================================
		 *                  CAMVAS.JS
		 *=============================================**/
		/* This code was taken from https://github.com/cbrandolino/camvas and modified to suit our needs */
		/*
    Copyright (c) 2012 Claudio Brandolino

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    */
		// The function takes a canvas context and a `drawFunc` function.
		// `drawFunc` receives two parameters, the video and the time since
		// the last time it was called.
		function camvas(ctx, callback) {
			var self = this;
			this.ctx = ctx;
			this.callback = callback;

			// We can't `new Video()` yet, so we'll resort to the vintage
			// "hidden div" hack for dynamic loading.
			var streamContainer = document.createElement('div');
			this.video = document.createElement('video');

			// If we don't do this, the stream will not be played.
			// By the way, the play and pause controls work as usual
			// for streamed videos.
			this.video.setAttribute('autoplay', '1');
			this.video.setAttribute('playsinline', '1'); // important for iPhones

			// The video should fill out all of the canvas
			this.video.setAttribute('width', 1);
			this.video.setAttribute('height', 1);

			streamContainer.appendChild(this.video);
			document.body.appendChild(streamContainer);

			// The callback happens when we are starting to stream the video.
			navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(
				function (stream) {
					// Yay, now our webcam input is treated as a normal video and
					// we can start having fun
					self.video.srcObject = stream;
					// Let's start drawing the canvas!
					self.update();
				},
				function (err) {
					throw err;
				}
			);

			// As soon as we can draw a new frame on the canvas, we call the `draw` function
			// we passed as a parameter.
			this.update = function () {
				var self = this;
				var last = Date.now();
				var loop = function () {
					// For some effects, you might want to know how much time is passed
					// since the last frame; that's why we pass along a Delta time `dt`
					// variable (expressed in milliseconds)
					var dt = Date.now() - last;
					self.callback(self.video, dt);
					last = Date.now();
					requestAnimationFrame(loop);
				};
				requestAnimationFrame(loop);
			};
		}

		/**============================================
		 *               PICO INLINE JS
		 *=============================================**/
		var initialized = false;

		var elapsedTime = 0; // elapsed time in milliseconds
		var seconds = 0;
		var minutes = 0;
		var hours = 0;
		var timeFormat = 0;

		var random;
		var prevRandom;
		var timer;

		var timestampsObject = [];

		var highFreqAudio = new Audio('../lib/audios/HF-list1.wav');
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

		startTimer();
		setInterval(updateTime, 100);

		highFreqAudio.addEventListener('ended', () => {
			// turn object into JSON
			var jsonObj = JSON.stringify(timestampsObject);
			// CODE TO SEND TO SERVER HERE...

			window.location.pathname = 'offboarding';
		});
	</script>
</body>

<style>
	.testingPage {
		background:
			url('../lib/images/background/e.svg'),
			url('../lib/images/background/a.svg'),
			url('../lib/images/background/i.svg'),
			url('../lib/images/background/o.svg'),
			url('../lib/images/background/u.svg') #cfd8ed;
		background-repeat: repeat-y;
		background-position:
			5% 0%,
			95% 0%,
			50% 30%,
			5% 0%,
			95% 0%;
		background-size: 6rem, 6rem, 3rem;
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
