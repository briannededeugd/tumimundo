<h1>Requesting Directus Data</h1>

<script>
    export let data;
    const { data: responseData } = data.data;

    console.log(responseData[0])
    
    const { id } = responseData[0];
    const { name_of_child } = responseData[0];
</script>

<p>{name_of_child} {id}</p>