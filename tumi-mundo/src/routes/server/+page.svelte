<h1>Requesting Directus Data</h1>

<script>
    // import { enhance } from '$app/forms';
    export let data;
    const { data: responseData } = data.data;
</script>

<form method="POST">
	<label>
		Name of child
		<input name="name_of_child" type="text" value="Rose">
	</label>
	<label>
		Gender of child
		<input name="gender" type="text" value="Female">
	</label>
	<label>
		Date of birth
		<input name="date_of_birth" type="date" value="2023-11-03">
	</label>
	<label>
		Current languages
		<input name="current_languages" type="number" value="2">
	</label>
	<label>
		New languages to learn
		<input name="new_language_to_learn" type="number" value="2">
	</label>
	<button>Log in</button>
</form>
