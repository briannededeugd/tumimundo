<h1>Requesting Directus Data</h1>

<script>
    // import { enhance } from '$app/forms';
    export let data;
    const { data: responseData } = data.data;
    console.log(responseData[0])
    // const { 
    //     id, 
    //     name_of_child,
    //     gender, 
    //     date_of_birth, 
    //     current_languages, 
    //     new_language_to_learn 
    //     } = responseData[0];
        
</script>

<form method="POST">
	<label>
		Name of child
		<input name="name_of_child" type="text" value="Testing 3">
	</label>
	<label>
		Gender of child
		<input name="gender" type="text" value="Male">
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
		New language to learn
		<input name="new_language_to_learn" type="number" value="2">
	</label>
	<button>Log in</button>
</form>

<style>
    label {
        display: block;
    }
</style>