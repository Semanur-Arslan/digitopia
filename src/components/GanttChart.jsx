import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";

const GanttChart = () => {
  const svgRef = useRef(null);
  const retrieveList = useSelector((state) => state.retrieveList.list);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();


    const data = retrieveList.map(retrieve => {
      if (Array.isArray(retrieve.topicRecommendation)) {
        return retrieve.topicRecommendation.map(item => ({
          id: item.id,
          task: item.recommendation,
          startDate: new Date(2024, 9, 2),
          endDate: new Date(2024, 10, 25)
        }));
      } else {
        return {
          id: retrieve.topicRecommendation.id,
          task: retrieve.topicRecommendation.recommendation || 'No Name',
          startDate: new Date(2024, 9, 2),
          endDate: new Date(2024, 10, 25)
        };
      }
    });
    //In the data set, since there are no date fields, example start and end dates have been added.

    const width = svg.node().getBoundingClientRect().width;
    const height = 350;
    const margin = { top: 64, right: 3, bottom: 24, left: 2 };
    const segmentWidth = 12;
    const numSubdivisions = 4;

    const todayDate = new Date();
    const threeMonthsBefore = d3.timeMonth.offset(todayDate, -5);
    const threeMonthsAfter = d3.timeMonth.offset(todayDate, 5);


    const dateRange = new Date();
    const startDate = d3.timeYear.offset(dateRange, -2);
    const endDate = d3.timeYear.offset(dateRange, 2);

    let xScale = d3
      .scaleTime()
      .domain([threeMonthsBefore, threeMonthsAfter])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleBand()
      .domain(data.map((_, i) => i))
      .range([margin.top, height - margin.bottom])
      .padding(0.3);

    svg
      .attr("width", "1000px")
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#ffff")
      .attr("rx", 20)
      .attr("ry", 20)

    const g = svg.append("g");


    const zoom = d3.zoom()
      .scaleExtent([0.8, 1.5])
      .translateExtent([[0, 0], [width, height]])
      .duration(100)
      .on("zoom", zoomed);

    svg.call(zoom);

    function drawChart() {
      g.selectAll("*").remove();


      const years = d3.timeYear.range(xScale.domain()[0], xScale.domain()[1]);

      years.forEach((year) => {

        g
          .append("line")
          .attr("class", "year-line")
          .attr("x1", xScale(year))
          .attr("x2", xScale(year))
          .attr("y1", margin.top - 32)
          .attr("y2", height - margin.bottom)
          .attr("stroke", "darkgrey")
          .attr("stroke-width", 2);

        const yearLabelWidth = xScale(d3.timeYear.offset(year, 1)) - xScale(year);
        g
          .append("rect")
          .attr("x", xScale(year) + 2)
          .attr("y", margin.top - 50)
          .attr("width", yearLabelWidth - 4)
          .attr("height", 20)
          .attr("fill", "#f0f0f0")
          .attr("stroke", "gray")
          .attr("rx", 4)
          .attr("ry", 4)


        g
          .append("text")
          .attr("class", "year-label")
          .attr("x", xScale(year) + 5)
          .attr("y", margin.top - 36)
          .text(d3.timeFormat("%Y")(year))
          .attr("fill", "black")
          .attr("font-size", "12px")
          .attr("text-anchor", "start");
      });


      const months = d3.timeMonth.range(xScale.domain()[0], xScale.domain()[1]);
      months.forEach((month) => {

        const subDivisionScale = d3
          .scaleLinear()
          .domain([0, numSubdivisions])
          .range([xScale(month), xScale(d3.timeMonth.offset(month, 1))]);

        for (let j = 1; j < numSubdivisions; j++) {
          g
            .append("line")
            .attr("class", "month-line")
            .attr("x1", subDivisionScale(j))
            .attr("x2", subDivisionScale(j))
            .attr("y1", margin.top)
            .attr("y2", height - margin.bottom)
            .attr("stroke", "lightgrey")
            .attr("stroke-width", 1);
        }

        g
          .append("line")
          .attr("class", "month-line")
          .attr("x1", xScale(month))
          .attr("x2", xScale(month))
          .attr("y1", margin.top - 12)
          .attr("y2", height - margin.bottom)
          .attr("stroke", "lightgrey")
          .attr("stroke-width", 2);


        const monthLabelWidth = xScale(d3.timeMonth.offset(month, 1)) - xScale(month);
        g
          .append("rect")
          .attr("x", xScale(month) + 2)
          .attr("y", margin.top - 24)
          .attr("width", monthLabelWidth - 4)
          .attr("height", 20)
          .attr("fill", "#f0f0f0")
          .attr("rx", 4)
          .attr("ry", 4);


        g
          .append("text")
          .attr("class", "month-label")
          .attr("x", xScale(month) + 5)
          .attr("y", margin.top - 12)
          .text(d3.timeFormat("%b")(month))
          .attr("fill", "black")
          .attr("font-size", "12px")
          .attr("text-anchor", "start")
      });


      g.selectAll(".bar-segment")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar-segment")
        .attr("x", d => xScale(d.startDate))
        .attr("y", (d, i) => yScale(i))
        .attr("width", segmentWidth)
        .attr("height", yScale.bandwidth())
        .attr("fill", "orange")


      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.startDate) + segmentWidth)
        .attr("y", (d, i) => yScale(i))
        .attr("width", d => xScale(d.endDate) - xScale(d.startDate) - segmentWidth)
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");


      g.selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => xScale(d.startDate) + segmentWidth + 5)
        .attr("y", (d, i) => yScale(i) + yScale.bandwidth() / 2 + 5)
        .text(d => d.task)
        .attr("fill", "white")
        .attr("font-size", "12px");
    }


    function zoomed(event) {
      const transform = event.transform;
      xScale = transform.rescaleX(xScale);



      drawChart();
    }

    drawChart();

    const today = new Date();
    g.append("line")
      .attr("x1", xScale(today))
      .attr("x2", xScale(today))
      .attr("y1", margin.top - 36)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "#758ef0")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "4");


    g.append("text")
      .attr("x", xScale(today))
      .attr("y", margin.top - 45)
      .text("Today")
      .attr("fill", "#758ef0")
      .attr("font-size", "12px")
      .attr("text-anchor", "start");

    const handleResize = () => {
      drawChart();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [retrieveList]);

  return <svg ref={svgRef}></svg>;
};

export default GanttChart;
