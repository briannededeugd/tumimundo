<script>



    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    onMount(() => {
        const margin = { top: 10, right: 30, bottom: 30, left: 60 };
        const width = 500 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const svg = d3.select("#attention_test_results_graph")
            .select("svg")
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top + margin.bottom)
            .attr("viewBox", '0 0 500 300')
            .style("background-color", "#165d64")

            .style("border-radius", "15px")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // JSON data
        d3.json("https://raw.githubusercontent.com/briannededeugd/tumimundo/main/tumi-mundo/src/fakedata/fake-dataset.json")
        .then(data => {
            // Filter data to include only the last four dates
            const lastFourDates = data.slice(-4);

            
            // x-axis
            const x = d3.scalePoint()
                .domain(lastFourDates.map(d => d.date))
                .range([0, width])
                .padding(0.5);
            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x)
                    .tickFormat(d => {
                        const date = new Date(d);
                        const month = date.toLocaleString('default', { month: 'short' });
                        const day = date.getDate();
                        return `${month} ${day}`;
                    })
                )
                .selectAll(".tick line")
                .style("visibility", "hidden"); 
            svg.selectAll(".tick text")
                    .style("font-size", "16px");


            
            svg.select(".domain")
                .attr("d", `M0,0H${width}`);



            // y-axis
            const y = d3.scaleLinear()
                // Used Math.ceil alongside this formula to make it calculate up to the next highest rounded number
                .domain([0, d3.max(lastFourDates, d => Math.ceil(d.value / 10) * 10)])
                .range([height, 0])
            const yAxis = svg.append("g");
            
            
            yAxis.call(d3.axisLeft(y)
                // Set ticks in every 5 seconds
                    .tickValues(d3.range(0, 61, 5)) 
                    // 2 ticks total
                    // .ticks(2)
                    .tickFormat(d => `${d} s`)
                )

            // remove the line
            yAxis.select(".domain").remove();

            // remove the ticks
            yAxis.selectAll(".tick line").remove();
            

            yAxis.selectAll(".tick")
                .insert('rect', ':first-child')
                .attr('width', '35')
                .attr('height', '21')
                .attr('fill', '#43756C')
                .attr("opacity", "1")
                .attr('transform', 'translate(-40, -10)')
                .attr('rx', '7')

            yAxis.selectAll(".tick text")
                .style("font-size", "14px");




            // line
            svg.append("path")
                .datum(lastFourDates)
                .attr("fill", "none")
                .attr("stroke", "#fff")
                .attr("stroke-width", 3)
                .attr("d", d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.value)));

            // points
            svg.selectAll("dot")
                .data(lastFourDates)
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



<div id="attention_test_results_graph">
    <svg>
        <defs>
            <filter x="0" y="0" width="1" height="1" id="solid">
                <feFlood flood-color="white" result="bg"></feFlood>
                <feMerge>
                    <feMergeNode in="bg"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                </feMerge>
            </filter>

        </defs>
    </svg>
</div>

<style>
    :global(svg) {
        padding: 2em 0;
    }

    :global(rect) {
        filter: drop-shadow( 2px 1px 1px rgb(49, 49, 49));
    }

</style>
