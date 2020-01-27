import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";
import React, { useRef, useEffect, useState } from "react";

/* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */


function VertColViz() {
    //hooks that sets the state of data
    const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75]);
    const [hoverRef, isHovered] = useHover();

    /*The useRef Hook creates a variable that "holds on' to a value across rendering passes. 
    In this case, it will hold our component's SVG DOM element. It's initialized null and React will assign it later
    (see return statement)
    */
    const svgRef = useRef();
    // Hook
    function useHover() {
        const [value, setValue] = useState(false);

        const ref = useRef(null);

        const handleMouseOver = () => setValue(true);
        const handleMouseOut = () => setValue(false);

        useEffect(
            () => {
                const node = ref.current;
                if (node) {
                    node.addEventListener('mouseover', handleMouseOver);
                    node.addEventListener('mouseout', handleMouseOut);

                    return () => {
                        node.removeEventListener('mouseover', handleMouseOver);
                        node.removeEventListener('mouseout', handleMouseOut);
                    };
                }
            },
            [ref.current] // Recall only if ref changes
        );

        return [ref, value];
    }
    // will be called initially and on every data change
    /* Scalar Vector Graphics is an open web standard that uses a structured text format (XML) for rendering vector graphics.

The most basic SVG file contains the following format:

--Size of the viewport (Think of this as the image resolution)
--Grouping instructions via the element -- How should elements be grouped?
--Drawing instructions using the shapes elements
--Style specifications describing how each element should be drawn.*/
    useEffect(() => {

        const svg = select(svgRef.current);
        const xScale = scaleBand()
            .domain(data.map((value, index) => index))
            .range([0, 300])
            .padding(0.5);

        const yScale = scaleLinear()
            .domain([0, 150])
            .range([150, 0]);

        //changes the color depending on scale of data
        const colorScale = scaleLinear()
            .domain([20, 40, 60, 80, 100, 120])
            .range(["red", "orange", "yellow", "green", "blue", "pink"])
            .clamp(true);
        //defines the x axis & style
        const xAxis = axisBottom(xScale).ticks(data.length);

        svg
            .select(".x-axis")
            .style("transform", "translateY(150px)")
            .call(xAxis);
        //defines the y axis
        const yAxis = axisRight(yScale);
        svg
            .select(".y-axis")
            .style("transform", "translateX(300px)")
            .call(yAxis);

        svg
            .selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")

            .style("transform", "scale(1, -1)")
            .attr("x", (value, index) => xScale(index))
            //location of bars, the higher the number, the higher the position on the graph
            .attr("y", -150)
            .attr("width", xScale.bandwidth())
            .transition()
            .attr("fill", colorScale)
            .attr("height", value => 150 - yScale(value));
    }, [data]);
    return (
        /*React fragments let you group a list of children without adding extra nodes to the DOM 
        because fragments are not rendered to the DOM. */
        <React.Fragment>
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
            <button onClick={() => setData(data.map(value => value + 5))}>
                Update data
          </button>
            <button onClick={() => setData(data.filter(value => value < 35))}>
                Filter data
          </button>
            {/* <div ref={hoverRef}>
                {isHovered ? '😁' : '☹️'}
            </div> */}
        </React.Fragment>
    );
}


export default VertColViz;