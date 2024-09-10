import { useEffect, useRef } from "react";
import * as d3 from "d3";

const GanttChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    const data = [
      { task: "Task 1", startDate: new Date(2024, 7, 25), endDate: new Date(2024, 11, 10) },
      { task: "Task 2", startDate: new Date(2024, 2, 5), endDate: new Date(2024, 8, 15) },
      { task: "Task 3", startDate: new Date(2024, 8, 12), endDate: new Date(2024, 8, 20) },
      { task: "Task 4", startDate: new Date(2024, 8, 12), endDate: new Date(2025, 1, 20) }
    ];

    const width = svg.node().getBoundingClientRect().width;
    const height = 350;
    const margin = { top: 64, right: 3, bottom: 24, left: 2 };
    const segmentWidth = 12; // Farklı renkte olacak uzunluk
    const numSubdivisions = 4; // Her ayın 4 parçaya bölünmesi

    let xScale = d3
      .scaleTime()
      .domain([d3.min(data, d => d.startDate), d3.max(data, d => d.endDate)])
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
                // Arka plan rengini ayarla
    svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#f0f0f0")
    .attr("rx", 20) // Yatay köşe yarıçapı
    .attr("ry", 20) // Dikey köşe yarıçapı

    const g = svg.append("g");

    // Zoom fonksiyonu
    const zoom = d3.zoom()
    .scaleExtent([0.5, 10]) // Yakınlaşma/Uzaklaşma limiti
    .translateExtent([[0, 0], [width, height]]) // Çizim alanı limiti
    .duration(100) // Zoom ve pan hareketleri için geçiş süresi
    .on("zoom", zoomed);

    svg.call(zoom);

    function drawChart() {
      g.selectAll("*").remove(); // Grafiği temizle

        // Yıl sınırları
        const years = d3.timeYear.range(xScale.domain()[0], xScale.domain()[1]);

        years.forEach((year) => {
          // Yılın başlangıcı için koyu gri çizgi
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
            .attr("fill", "#ffffff") // Arka plan rengini ayarla
            .attr("stroke", "gray")
            .attr("rx", 4) // Yatay köşe yarıçapı
            .attr("ry", 4)
  
          // Yıl ismini üstte göster
          g
            .append("text")
            .attr("class", "year-label")
            .attr("x", xScale(year) + 5)
            .attr("y", margin.top - 36)
            .text(d3.timeFormat("%Y")(year)) // Yılı gösterir
            .attr("fill", "black")
            .attr("font-size", "12px")
            .attr("text-anchor", "start");
        });
  
        // Aylar ve bölümler
        const months = d3.timeMonth.range(xScale.domain()[0], xScale.domain()[1]);
        months.forEach((month) => {
          // Ay bölümleri için
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
              .attr("y1", margin.top )
              .attr("y2", height - margin.bottom)
              .attr("stroke", "lightgrey")
              .attr("stroke-width", 1);
          }

          // Ayı bölen çizgi
          g
            .append("line")
            .attr("class", "month-line")
            .attr("x1", xScale(month))
            .attr("x2", xScale(month))
            .attr("y1", margin.top - 12)
            .attr("y2", height - margin.bottom)
            .attr("stroke", "lightgrey")
            .attr("stroke-width", 2);

   // Ay etiketinin arka planı
   const monthLabelWidth = xScale(d3.timeMonth.offset(month, 1)) - xScale(month); // Ay etiketinin genişliği
   g
     .append("rect")
     .attr("x", xScale(month) + 2)
     .attr("y", margin.top - 24)
     .attr("width", monthLabelWidth - 4) // Küçük bir boşluk bırakmak için -4
     .attr("height", 20)
     .attr("fill", "#ffffff") // Arka plan rengini ayarla
     .attr("rx", 4) // Yatay köşe yarıçapı
     .attr("ry", 4);

  
          // Ay ismini üstte göster
          g
            .append("text")
            .attr("class", "month-label")
            .attr("x", xScale(month) + 5)
            .attr("y", margin.top - 12)
            .text(d3.timeFormat("%b")(month)) // Ay ismini gösterir
            .attr("fill", "black")
            .attr("font-size", "12px")
            .attr("text-anchor", "start");
        });
  
        // Çubukları çiz
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
  
        // Görev adlarını yaz
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
      
    // Zoom işlemi gerçekleştiğinde eksenleri ve çizgileri güncelle
    function zoomed(event) {
      const transform = event.transform;
      xScale = transform.rescaleX(xScale); // X eksenini güncelle
      drawChart(); // Grafiği yeniden çiz
    }

    drawChart(); // İlk kez grafik çizimi

  // Bugünün tarihi için dikey çizgi
  const today = new Date();
  g.append("line")
    .attr("x1", xScale(today))
    .attr("x2", xScale(today))
    .attr("y1", margin.top - 36)
    .attr("y2", height - margin.bottom)
    .attr("stroke", "#758ef0")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "4");

  // "Today" yazısını ekle
  g.append("text")
    .attr("x", xScale(today)) // Çizginin hemen sağında konumlandır
    .attr("y", margin.top - 45) // Çizginin biraz üstünde konumlandır
    .text("Today")
    .attr("fill", "#758ef0")
    .attr("font-size", "12px")
    .attr("text-anchor", "start");
}, []);

  return <svg ref={svgRef}></svg>;
};

export default GanttChart;
