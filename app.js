// frequency against median age

var width = 500;
var height = 500;
var regionDataFil = regionData.filter(d => {if(d.medianAge !== null) return d.medianAge});
// var filteredData = regionData.filter(function(d){
//               if(d.medianAge !== null) return d.medianAge});
var allMedianAges = regionDataFil.map(d =>
                         d.medianAge);
var minMedianAge = d3.min(allMedianAges);
var maxMedianAge = d3.max(allMedianAges);
var histogram = d3.histogram()
                    .thresholds(10)
                    (allMedianAges)

var svg = d3.select('svg')
              .attr('width',width)
              .attr('height',height)

var bars = svg.selectAll('.bar')
              .data(histogram)
              .enter()
              .append('g')
              //.classed('bar',true)

var rect = bars.append('rect')
              .attr('x', d => {return d.x0*10}) // d.x stands for lower bound
              .attr('y',0)
              .attr('width', d => {return (d.x1-d.x0)*9})// d.dx stands for range
              .attr('height', d => {return (d.length)*5})
              .attr('fill', 'steelblue')
