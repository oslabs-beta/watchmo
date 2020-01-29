import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";
import React, { useRef, useEffect, useState } from "react";
import "../stylesheets/style.scss"

/* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */

///CURRENTLY NOT USING STATE DATA FOR RENDERING PURPOSE
function VertColViz(props) {
    console.log('props',props.datas);
    console.log('category prop', props.category)
    let queries = [];
    let responses = [];
    const [query, setQuery] = useState(queries)
    const [data, setData] = useState([]);
      for (let query in props.datas[props.category]){
        let timeTot = 0;
        queries.push(query)
        props.datas[props.category][query].forEach(time => {
          timeTot += (time.timing[1]/1000000000);
        });
        responses.push(timeTot/(props.datas[props.category][query].length))
      }
    
    // useState(queries);
    
    console.log('queries after', queries);

    const svgRef = useRef();
    console.log(data);
    console.log(responses);
    /*The most basic SVG file contains the following format:
  
    --Size of the viewport (Think of this as the image resolution)
    --Grouping instructions via the element -- How should elements be grouped?
    --Drawing instructions using the shapes elements
    --Style specifications describing how each element should be drawn.*/
    // will be called initially and on every data change
      useEffect(() => {

        setData(responses)
        setQuery(queries)
        
        const svg = select(svgRef.current);
        console.log(responses);

        let max = Math.max(...responses)
        console.log(max);
        let upper = 1.5*max;
        console.log(upper);
        // scales
        const xScale = scaleBand()
            .domain(responses.map((value, index) => index)) //x-axis labeled here
            .range([0, 300])
            .padding(0.5);

        const yScale = scaleLinear()
            .domain([0, `${upper}`])
            .range([150, 0]);

        const colorScale = scaleLinear()
            .domain([.01, .02, .03, .04, .05, .06])
            .range(["red", "yellow", "green", "blue", "purple", "pink"])
            .clamp(true);

        // create x-axis
        const xAxis = axisBottom(xScale).ticks(responses.length);
        svg
            .select(".x-axis")
            .style("transform", "translateY(150px)")
            .call(xAxis);

        // create y-axis
        //location of bars, the higher the number, the higher the position on the graph

        const yAxis = axisRight(yScale);
        svg
            .select(".y-axis")
            .style("transform", "translateX(300px)")
            .call(yAxis);

        // draw the bars
        svg
            .selectAll(".bar")
            .data(responses)
            .join("rect")
            .attr("class", "bar")
            .style("transform", "scale(1, -1)")
            .attr("x", (value, index) => xScale(index))
            .attr("y", -150)
            .attr("width", xScale.bandwidth())
            .on("mouseenter", (value, index) => {
                svg
                    .selectAll(".tooltip")
                    .data([value])
                    .join(enter => enter.append("text").attr("y", yScale(value) - 4))
                    .attr("class", "tooltip")
                    .text(`${responses[index]}`)
                    .text(`${queries[index]}`)
                    .attr("x", xScale(index) + xScale.bandwidth() / 2)
                    .attr("text-anchor", "middle")
                    .transition()
                    .attr("y", yScale(value) - 8)
                    .attr("opacity", 1);
            })
            .on("mouseleave", () => svg.select(".tooltip").remove())
            .transition()
            .attr("fill", colorScale)
            .attr("height", value => 150 - yScale(value));
            
    }, [props.category]);
    
    /*React fragments let you group a list of children without adding extra nodes to the DOM 
           because fragments are not rendered to the DOM. */
    return (
        <React.Fragment>
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
            <button onClick={() => setData(data.map(value => value + 5))}>
                Add Five
        </button>
            <button onClick={() => setData(data.filter(value => value < 35))}>
                Filter
        </button>
            <button
                onClick={() => setData([...data, Math.round(Math.random() * 100)])}
            >
                Add data
        </button>
        </React.Fragment>
    );
}


export default VertColViz;