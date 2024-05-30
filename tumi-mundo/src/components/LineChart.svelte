<script>



// DATA IN THE JSON (SHOULD BE TESTED FIRST)
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    onMount(() => {
        const margin = { top: 10, right: 30, bottom: 30, left: 60 };
        const width = 500 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const svg = d3.select("#attention_test_results_graph")
        .append("svg")
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)
        .attr("viewBox", '0 0 500 300')
        .style("background-color", "#165d64")

        .style("border-radius", "10px")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

        // JSON data
        d3.json("https://raw.githubusercontent.com/briannededeugd/tumimundo/main/tumi-mundo/src/fakedata/fake-dataset.json")
        .then(data => {
            const parseTime = d3.timeParse("%Y-%m-%d");

            data.forEach(d => {
                d.date = parseTime(d.date);
                d.value = +d.value;
            });

            // x-as
            const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date))
            .range([0, width]);
            svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

            // y-as
            const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([height, 0]);
            svg.append("g")
            .call(d3.axisLeft(y));

            // line
            svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#fff")
            .attr("stroke-width", 3)
            .attr("d", d3.line()
                .x(d => x(d.date))
                .y(d => y(d.value)));

            // points
            svg.selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.date))
            .attr("cy", d => y(d.value))
            .attr("r", 5)
            .attr("fill", "#563783")
            .attr("stroke-width", 3)
            .attr("stroke", "#fff");

        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
    }); 

</script>



<div id="attention_test_results_graph"></div>

<style>
    /* div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
    } */

</style>
