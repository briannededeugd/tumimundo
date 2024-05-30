<script>



// DATA IN THE JSON (SHOULD BE TESTED FIRST)
    // import { onMount } from 'svelte';
    // import * as d3 from 'd3';

    // onMount(() => {
    //     // set the dimensions and margins of the graph
    //     const margin = {top: 10, right: 30, bottom: 30, left: 60};
    //     const width = 460 - margin.left - margin.right;
    //     const height = 400 - margin.top - margin.bottom;

    //     // append the svg object to the body of the page
    //     const svg = d3.select("#attention_test_results_graph")
    //     .append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //     .append("g")
    //     .attr("transform", `translate(${margin.left},${margin.top})`);

    //     //Read the JSON data
    //     d3.json("data.json")
    //     .then(data => {
    //         // Parse the date
    //         const parseTime = d3.timeParse("%Y-%m-%d");

    //         // Format data
    //         data.forEach(d => {
    //         d.date = parseTime(d.date);
    //         d.value = +d.value;
    //         });

    //         // Add X axis --> it is a date format
    //         const x = d3.scaleTime()
    //         .domain(d3.extent(data, d => d.date))
    //         .range([0, width]);
    //         svg.append("g")
    //         .attr("transform", `translate(0,${height})`)
    //         .call(d3.axisBottom(x));

    //         // Add Y axis
    //         const y = d3.scaleLinear()
    //         .domain([8000, 9200])
    //         .range([height, 0]);
    //         svg.append("g")
    //         .call(d3.axisLeft(y));

    //         // Add the line
    //         svg.append("path")
    //         .datum(data)
    //         .attr("fill", "none")
    //         .attr("stroke", "#69b3a2")
    //         .attr("stroke-width", 1.5)
    //         .attr("d", d3.line()
    //             .x(d => x(d.date))
    //             .y(d => y(d.value)));

    //         // Add the points
    //         svg.selectAll("dot")
    //         .data(data)
    //         .enter()
    //         .append("circle")
    //         .attr("cx", d => x(d.date))
    //         .attr("cy", d => y(d.value))
    //         .attr("r", 5)
    //         .attr("fill", "#69b3a2");
    //     })
    //     .catch(error => {
    //         console.error('Error loading data:', error);
    //     });
    // });




// DATA IN THE CODE 
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    onMount(() => {
        // set the dimensions and margins of the graph
        const margin = {top: 10, right: 30, bottom: 30, left: 60};
        const width = 460 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3.select("#attention_test_results_graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

        // Read the JSON data
        const jsonData = [
        {"date": "2024-02-14", "value": 3.342},
        {"date": "2024-02-25", "value": 7.563},
        {"date": "2024-03-07", "value": 1.644},
        {"date": "2024-03-14", "value": 5.925},
        {"date": "2024-03-27", "value": 6.156},
        {"date": "2024-04-05", "value": 9.257},
        {"date": "2024-04-11", "value": 3.356},
        {"date": "2024-04-24", "value": 7.356},
        {"date": "2024-04-30", "value": 4.908}
        ];

        // Parse the date
        const parseTime = d3.timeParse("%Y-%m-%d");

        // Format data
        const data = jsonData.map(d => ({
        date: parseTime(d.date),
        value: d.value
        }));

        // Add X axis --> it is a date format
        const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width]);
        svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value)));

        // Add the points
        svg.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 5)
        .attr("fill", "#69b3a2");
    });
</script>



<div id="attention_test_results_graph"></div>
