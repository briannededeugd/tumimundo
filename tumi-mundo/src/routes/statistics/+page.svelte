<svelte:head>
	<link rel="stylesheet" href="../lib/styles/style.css" />
</svelte:head>

    <h1>Statistics</h1>

    <section>
        <h2>Today's activities</h2>
        <div class="activities process-bar">
            <h3>Today's listening</h3>
            <p id="time">00.00</p>
            <p>of your 5-minute goal</p>
        </div>

        <div class="section-button">
            <a href="/">Change goal</a>
            <a href="/">Go to stories</a>
        </div>

    </section>

    <section>
        <h2>Total activities</h2>
        <img src="/" alt="Raymond is sitting on the couch">

        <div>
            <h2>You have done a lot of learning!</h2>
            <p>Here you can see everything you have done since you started learning with TuMi Mundo. 
    I encourage you to keep going and do your best!</p>
        </div>

    </section>
    
    <section>
        <h2>The attention span test</h2>
        <p>A test for the first phase of the method. Tap on the points to see more in depth numbers.</p>

        <!-- graphic -->

        <label>
            See how other children are performing
            <input type="checkbox" name="checkbox" value="value">
        </label>
    </section>

    <section>
        <h2>Stories</h2>
        
        <ul class="stories_container">
            <li>
                <div class="">12</div>
                <p>stories read</p>
            </li>
            <li>
                <div class="">136</div>
                <p>minutes spend listening</p>
            </li>
            <li>
                <div class="">8</div>
                <p>tests taken</p>
            </li>
            <li>
                <div class="">Morning</div>
                <p>is your favorite moment</p>
            </li>
            <li>
                <div class="">Thuan-Hoa</div>
                <p>is your favoirite speaker</p>
            </li>
        </ul>
    </section>


    



<style>
    .stories_container {
        display: flex;
        flex-direction: column;      
        
        & li {
            display: flex;
        }
    }
</style>