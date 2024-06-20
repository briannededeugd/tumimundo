<script>
	import { onMount } from 'svelte';

	onMount(() => {
		document.body.classList.remove('attentiontest');
	});
</script>

<svelte:head>
	<title>TuMi Mundo - Attention Test</title>
</svelte:head>

<a href="/customization" class="back-button"
	><span class="material-symbols-outlined"> arrow_back_ios </span></a
>

<h1>Attention Test</h1>
<p>
	To discover if and how your child's target language captures their attention, the attention test
	will present them with common tones in this language as well as tones that are uncommon or in
	another language entirely.
	<br />
</p>
<br />
<p class="privacy">
	<span>We</span> respect you and your child's anonimity and privacy, which means that the only data
	collected during this test will be numerical and text-based. No footage is ever saved or recorded.
</p>

<section class="steps">
	<h2>Getting ready</h2>
	<div>
		<div class="stepone">
			<div>
				<img src="../lib/images/teststeps/stepone.png" alt="" />
				<p>
					Place the phone so that it is in an upright position. For example, against a few books.
				</p>
			</div>
		</div>

		<div class="steptwo">
			<div>
				<img src="../lib/images/teststeps/steptwo.png" alt="" />
				<p>
					The face should be in the middle of the screen. Make sure the eyes are clearly visible.
				</p>
			</div>
		</div>

		<div class="stepthree">
			<div>
				<img src="../lib/images/teststeps/stepthree.png" alt="" />
				<p>When doing the test, make sure to look away in order to not distract your child.</p>
			</div>
		</div>
	</div>
</section>

<a href="/attentiontest" class="fullbutton">Continue</a>

<style>
	body {
		padding: 3vh 5vw;
	}

	h1 + p {
		margin-top: 1em;
	}

	.steps {
		margin: 1.5em 0 1em;

		& h2 {
			margin: 0 0 0.5em;
		}

		& > div {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			& > div {
				border-radius: var(--border-radius);
				padding: 0.5em;
				padding-bottom: 0.75em;
				margin: 0 0 1.5em;
				background-color: var(--color-text);
				display: block;

				& p {
					color: var(--color-darktext);
					font-size: var(--font-size-storydescr);
				}

				& img {
					max-width: 100%;
				}
			}
		}
	}

	.privacy {
		padding: 1em 1.5em;
		background-color: var(--color-inlinebutton);
		color: var(--color-text);
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);

		& span {
			color: var(--color-text);
			display: inline-flex;
			align-items: baseline;
			gap: 5px;

			&::before {
				content: 'error';
				font-family: 'Material Symbols Outlined';
			}
		}
	}
</style>
