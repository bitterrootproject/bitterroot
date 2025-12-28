<script lang="ts">
	let { children } = $props();
</script>

<!-- The extra `div` is required to make the `:has()` pseudo-class work. -->
<div>
	<div class="auth-form-container">
		{@render children()}
	</div>
</div>

<style>
	.auth-form-container {
		align-self: center;
		justify-self: center;
		/* min-width: 30em; */
		width: 32em;
		height: fit-content;
		margin: auto;
		padding: 2em;
		border: 1.5px solid black;
		border-radius: 8px;
		background-color: white;
	}

	:has(.auth-form-container) {
		background-color: grey;
		width: 100vw;
		height: 100vh;
		margin: none;
		display: flex;
	}
</style>
