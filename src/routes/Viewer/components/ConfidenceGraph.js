import React from 'react'
import * as d3 from 'd3'
let svg = null
let line = null
let x = null
let y = null
let i = 0
import './ConfidenceGraph.scss'
let buffer = []
let random = d3.randomNormal(0, .2)

class ConfidenceGraph extends React.PureComponent {

    shouldComponentUpdate(){
        return false
    }
    
    /* componentWillReceiveProps(nextProps){
     *     let nitem = nextProps.item
     *     let item = this.props.item
     *     if ( nitem.x == item.x ) // assume { x: , y: } format
     *         return
     *     //otherwise
     *     buffer.push(nitem)
     *     let p = d3.select('path.line')
     *               .attr("d", line)
     *               .attr("transform", "translate(" + x(-1) + ",0)")
     *               .transition()
     *               .duration(50);
     *     if (buffer.length > 40)
     *         buffer.shift()
     * }
     */
    addEl (){
        buffer.push({x:buffer.length,y:random()})
        
        let p = d3.select('path.line')
                  .attr("d", line)
                  .attr("transform", "translate(" + x(-1) + ",0)")
                  .transition()
                  .duration(500)
                  .ease(d3.easeLinear)
        // Slide it to the left.
        
        if ( buffer.length > 10 ){
            
            buffer.shift()
            console.log(buffer)
            buffer.forEach((d) => {
                d.x = d.x - 1;
            })
            
        }else{
            i++
        }
        

    }
    
    render () {
        return (
            <div className='row' >
                <svg id="confgraph" width="300" height="300" ></svg>
                <button onClick={this.addEl} > click </button>
            </div>
        )
    }
    componentDidMount() {
        var n = 10,
            random = d3.randomNormal(0, .2),
            data = d3.range(n).map(random),
            data2= d3.range(n).map(random);
        
        
        svg = d3.select("#confgraph")
        var margin = {top: 20, right: 20, bottom: 20, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;
        var g = svg.append('g').attr('transform','translate(' +margin.left +',' + margin.top + ')')
        x = d3.scaleLinear()
                  .domain([0, n - 1])
                  .range([0, width]);
        y = d3.scaleLinear()
                  .domain([-1,1])
                  .range([height, 0]);

        line = d3.line()
                     .x( (d,i) => {console.info(i);return x(d.x)} )
                     .y( (d,i) => {console.info(d);return y(d.y)} )

        g.append("defs").append("clipPath")
                     .attr("id","clip")
                     .append("rect")
                     .attr('width',width)
                     .attr('height',height)

        g.append('g')
                     .attr('class', 'axis axis--x')
                     .attr('transform','translate(0,' + y(0) + ')')
                     .call(d3.axisBottom(x))
        g.append("g")
                     .attr("clasbbs", "axis axis--y")
                     .call(d3.axisLeft(y))
        
        g.append("g")
                     .attr("clip-path", "url(#clip)")
                     .append("path") 
                     .datum(buffer)
                     .attr("class", "line")
                    

        function tick(data){ 
            // Push a new data point onto the back.
            data.push(random())
            // Redraw the line.
            d3.select('path.line')
              .attr("d", line)
              .attr("transform", null);
            // Slide it to the left.
            d3.active(this)
              .attr("transform", "translate(" + x(-1) + ",0)")
              .transition()
              .on("start", tick);
            // Pop the old data point off the front.
           data.shift()
            
        }    
    }
}

export default ConfidenceGraph
