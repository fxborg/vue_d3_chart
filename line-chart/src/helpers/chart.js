export default {
    install: function(Vue) {
        Vue.prototype.$helpers = {
            chart: {
                d3: {},
                ds: {},
                /* Helper Function */
                init: function(d3, ds, selector) {
                    this.d3 = d3;
                    this.ds = ds;
                    return this.d3.select(selector)
                },
                lineChart: function(d3, ds, options) {
                    var margin = {top: 20, right: 20, bottom: 30, left: 50};
                    var w = options.width - margin.left - margin.right;
                    var h = options.height - margin.top - margin.bottom;
                    var x = options.x;
                    var y = options.y;
                    // set the dimensions and margins of the graph
                    var svg = this.init(d3, ds, options.selector);
                    var offset = options.title ? 20 : 0;

                    // set the ranges
                    var sc_x = d3.scaleTime().range([0, w]);
                    var sc_y = d3.scaleLinear().range([h, 0]);

                    // define the line
                    var valueline = d3.line()
                        .x(function(d) { return sc_x(d[x])+60; })
                        .y(function(d) { return sc_y(d[y]); });

                    svg.selectAll('path').remove();
                    svg.selectAll('g').remove();

                    // Scale the range of the data
                    var x1 = d3.min(ds, function(d) { return d[x]; });
                    var x2 = d3.max(ds, function(d) { return d[x]; });
                    var y1 = d3.min(ds, function(d) { return d[y]; })
                    var y2 = d3.max(ds, function(d) { return d[y]; })
                    sc_x.domain([x1,x2]);
                    sc_y.domain([y1,y2 ]);
                    
                    svg.attr("width", w + margin.left + margin.right)
                       .attr("height", h + margin.top + margin.bottom)
                       .append("g")
                       .attr("transform","translate(" + margin.left + "," + margin.top + ")");

                    if (options.title) this.addTitle(options.title, svg, w);
                    // Add the valueline path.
                    svg.append("path")
                        .data([ds])
                        .attr('fill', 'none')
                        .attr('stroke', 'indigo')
                        .attr('stroke-width', 3)
                        .attr("class", "line")
                        .attr("d", valueline)
			.attr('transform', 'translate(0,' + offset + ')');

                   // Add the X Axis
                   svg.append("g")
                      .attr("transform", "translate(60,"+(h+5+offset)+")")
                      .call(d3.axisBottom(sc_x));

                   // Add the Y Axis
                   svg.append("g")
                      .attr('transform', 'translate(50,' + offset +')')
                      .call(d3.axisLeft(sc_y));		

                   svg.exit().remove();
                },

                addTitle: function(t, svg, w) {
                    svg.append('text')
                       .attr('x', w / 2)
                       .attr('text-anchor', 'middle')
                       .attr('y', 20)
                       .text(t);
                }
            }
        }
    }
}
