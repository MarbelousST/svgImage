import React from "react";
import ReactSVG from "react-svg";
var d3 = require("d3");

export default class ImageSvg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  render() {
    return (
      <div id="imageSvg">
        <ReactSVG
          path="svg.svg"
          evalScripts="always"
          onInjected={svg => {
            var svgst = d3.select(svg).select("g[id]");

            d3.selection.prototype.mouseoverShade = function(d, i) {
              this.attr("stroke", "yellow");
              this.attr("stroke-width", "2");
              this.attr("stroke-linejoin", "bevel");
              this.attr("stroke-miterlimit", "1");
              this.attr("stroke-opacity", ".5");
            };

            d3.selection.prototype.moveToBack = function() {
              return this.each(function() {
                var firstChild = this.parentNode.firstChild;
                if (firstChild) {
                  this.parentNode.insertBefore(this, firstChild);
                }
              });
            };

            console.log(svgst);
            svgst.each(function() {
              return console.log(this);
            });

            var svgDoom = d3
              .select(svg)
              .selectAll("#maproot")
              .selectAll("g[id]:not([id=Leaves])");

            var tooltip = d3
              .select("body")
              .append("div")
              .attr("class", "remove")
              .style("position", "absolute")
              .style("z-index", "20")
              .style("visibility", "hidden")
              .style("top", "30px")
              .style("left", "55px");

            svgDoom
              .attr("opacity", "1")
              .on("mouseover", function(d, i) {
                svgDoom
                  .transition()
                  .duration(300)
                  .attr("stroke", function(d, j) {
                    return j != i ? "" : "yellow";
                  })
                  .attr("opacity", function(d, j) {
                    return j != i ? 0.8 : 1;
                  });
                d3.select(this).mouseoverShade(i);
              })
              .on("click", function(d) {
                d3.select(this).moveToBack();
              });
            //.on("mouseover", function() {
            //d3.select(this).style("fill", "green");
            //});
            console.log("onInjected", svgDoom);
          }}
          renumerateIRIElements={false}
          svgClassName="svg-class-name"
          svgStyle={{ width: 1000 }}
          className="wrapper-class-name"
          onClick={() => {
            console.log("wrapper onClick");
          }}
        />
      </div>
    );
  }
}
