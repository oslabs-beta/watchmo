import { select, axisBottom, axisRight, scaleLinear, scaleBand } from 'd3';
import React, { useRef, useEffect, useState } from 'react';
import '../stylesheets/style.scss';
import TimeViz from './TimeViztsx';
/* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
///CURRENTLY NOT USING STATE DATA FOR RENDERING PURPOSE

interface VertColVisProps  {
  dataCat : any[]
}
const VertColViz: React.FC<VertColVisProps> = (props) => {
  let queries: string[] = [];
  let responses: any[] = [];
  let localQuerySelected: string[] = [];
  let timeGraph: JSX.Element = <div></div>;
  const [selectedQuery, setSelectedQuery] = useState<string[]|never[]>([]);
  const [renderLine, setRenderLine] = useState(false);

  function addOrRemove(queryIn) {
    if (localQuerySelected.includes(queryIn)) {
      localQuerySelected = [];
      setSelectedQuery([]);
      setRenderLine(false)
    } else {
      localQuerySelected = [];
      localQuerySelected.push(queryIn);
      setSelectedQuery([]);
      setSelectedQuery([queryIn]);
      setRenderLine(true);
    }
  }

  const svgRef = useRef();
  /*The most basic SVG file contains the following format:
 
  --Size of the viewport (Think of this as the image resolution)
  --Grouping instructions via the element -- How should elements be grouped?
  --Drawing instructions using the shapes elements
  --Style specifications describing how each element should be drawn.*/
  // will be called initially and on every data changes

  useEffect(() => {
    setRenderLine(false); //these are necessary to effectively blank out the graph and line charts when switching categories
    setSelectedQuery([]); //this is necessary to keep switching categories from messing things up

    for (let query in props.dataCat) {
      let timeTot:number = 0;
      queries.push(query);
      props.dataCat[query].forEach(time => {
        timeTot += time.timing[1] / 1000000000;
      });
      responses.push(timeTot / props.dataCat[query].length);
    }


    const svg:any = select(svgRef.current);

    //used for dynamic y-axis
    let max : number = Math.max(...responses);
    let upper : number = 1.5 * max;

    const chartDiv : HTMLElement = document.getElementById("chartArea") //grab the chart area that the graph lives in
    const margin = { yheight: chartDiv.clientHeight, xwidth: chartDiv.clientWidth } //margins required for resizing

    function redrawBar() {
      margin.yheight = chartDiv.clientHeight
      margin.xwidth = chartDiv.clientWidth

      xScale.range([0, margin.xwidth]);

      svg
        .select('.y-axis')
        .style('transform', `translateX(${margin.xwidth}px)`)
        .call(yAxis);

      xAxis = axisBottom(xScale).ticks(responses.length + 1);

      svg
        .select('.x-axis').call(xAxis)

      svg
        .selectAll('.bar').attr('x', (_value, index) => xScale(index)).attr('width', xScale.bandwidth())
    }

    window.addEventListener("resize", redrawBar);
    // scales 
    let xScale = scaleBand<number>()
      .domain(responses.map((_value, index) => index)) //x-axis labeled here
      .range([0, margin.xwidth])
      .padding(0.5);

    const yScale = scaleLinear<number, number>()
      .domain([0, upper])
      .range([300, 0]);

    const colorScale = scaleLinear<string>()
      .domain([
        upper * 0.2,
        upper
      ])
      .range(['blue', 'red'])
      .clamp(true);
    let defs = svg.append('defs');

    //Filter for the outside glow
    let filter = defs.append('filter').attr('id', 'glow');
    filter
      .append('feGaussianBlur')
      .attr('stdDeviation', '3.5')
      .attr('result', 'coloredBlur');
    let feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
    // create x-axis
    let xAxis = axisBottom(xScale).ticks(responses.length);
    svg
      .select('.x-axis')
      .style('transform', 'translateY(300px)')
      .call(xAxis)
      .style('filter', 'url(#glow)');

    // create y-axis
    //location of bars, the higher the number, the higher the position on the graph
    const yAxis = axisRight(yScale);
    svg
      .select('.y-axis')
      .style('transform', `translateX(${margin.xwidth}px)`)
      .style('filter', 'url(#glow)')
      .call(yAxis);

    if (responses.length !== 0) {
      svg.select(".y-axis").append("text")
        .attr("class", "yaxislabel")
        .attr("transform", "rotate(90)")
        .attr("y", 20)
        .attr("dy", "-3em")
        .attr("x", "3em")
        .style("text-anchor", "start")
        .style("fill", 'white')
        .attr("font-size", "20px")
        .text("Avg. Response Time(s)");
    }

    // draw the bars
    svg
      .selectAll('.bar')
      .data(responses)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1, -1)')
      .attr('x', (_value, index) => xScale(index))
      .attr('y', -300)
      .attr('width', xScale.bandwidth())
      .on('mouseenter', (value, index) => {
        svg
          .selectAll('.tooltip').append('div')
          .data([value])
          .join(enter => enter.append('text').attr('y', yScale(value) - 50))
          .attr('class', 'tooltip')
          .text(`${queries[index]}`)
          .attr('x', xScale(index) + xScale.bandwidth() / 2)
          .attr('text-anchor', 'middle')  
          .transition()
          .attr('y', yScale(value) - 80)
          .style('opacity', 1)
      })
      .on('mouseleave', () => svg.select('.tooltip').remove())
      .on('click', (_value, index) => {
        addOrRemove(`${queries[index]}`);
      })
      .transition()
      .attr('fill', colorScale)
      .attr('height', value => 350 - yScale(value));
  }, [props.dataCat]);

  if (renderLine === true) {
    timeGraph = (
      <TimeViz key={'lineGraph'} timeData={props.dataCat} selectedQueries={selectedQuery} />
    );
  }

  /*React fragments let you group a list of children without adding extra nodes to the DOM 
         because fragments are not rendered to the DOM. */
  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      {/* <button onClick={() => setData(data.filter(value => value < 35))}>Filter</button> */}
      <div>{timeGraph}</div>
    </React.Fragment>
  );
}

export default VertColViz;
