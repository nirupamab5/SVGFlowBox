function debounce(o,e,t){var n;return function(){var r=this,a=arguments,i=t&&!n;clearTimeout(n),n=setTimeout(function(){n=null,t||o.apply(r,a)},e),i&&o.apply(r,a)}}function LightenDarkenColor(o,e){var t=!1;"#"==o[0]&&(o=o.slice(1),t=!0);var n=parseInt(o,16),r=(n>>16)+e;r>255?r=255:r<0&&(r=0);var a=(n>>8&255)+e;a>255?a=255:a<0&&(a=0);var i=(255&n)+e;return i>255?i=255:i<0&&(i=0),(t?"#":"")+(i|a<<8|r<<16).toString(16)}function hexToRgb(o){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}function GUID(){function o(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return o()+"-"+o()}var FLOW_DEFAULTS={DefaultAnchorNodeSpacing:10,DefaultCurveColor:"#6dc1ff",ShowPlanarMid:!1,ShowCurveAnchors:!1,DefaultNodeColor:"#007c6",DefaultContainerHeightFraction:1,ShowEventBoxes:!0,DefaultCurveIsSolid:!1,DefaultCuveStrokeDasharray:"2, 2",TouchEditMode:!1,EventBoxHeight:120,EventBoxWidth:180,BaseAnchors:[],EditBaseDistanceChange:4},FlowBoxNode=function(){return function(o){this.nodeData=o,this.lower=o.lower,this.upper=o.upper,this.nodeColor=o.nodeColor,void 0===this.nodeData.id&&(this.nodeData.id=GUID())}}(),FlowAnchor=function(){return function(){}}(),CurveAnchor=function(){return function(){this.index=-1}}(),AnchorBase=function(){return function(o,e){this.offsetX=0,this.offsetY=0,this.offsetX=o,this.offsetY=e}}(),FlowBox=function(){function o(o,e,t,n,r){void 0===r&&(r=!1),this.anchors=[],this.lastAnchorAtLength=null,this.curveAnchors=[],this.lastCurveAnchor=null,this.useDataPostions=!1,this.editingBoxPositionInTouchMode=!1,this.lastBoxPositionX=0;var a=this;a.useDataPostions=r,a.selectionCallBack=n,a.baseAnchors=[],a.DEFAULTS=o,a.container=d3.select(document.getElementById(e)),a.container.node().classList.add("flow-box-container");var i=a.container.node().getBoundingClientRect().width;a.containerWidth=i;var c=window.innerHeight;1!==a.DEFAULTS.DefaultContainerHeightFraction?(a.containerHeight=c*a.DEFAULTS.DefaultContainerHeightFraction,a.container.node().style.height=a.containerHeight+"px"):a.containerHeight=a.container.node().getBoundingClientRect().height,a.planarY=.5*a.containerHeight,setTimeout(function(){a.svg=a.container.append("svg").attr("width",i).attr("height",a.containerHeight),setTimeout(function(){a.populateCurveAnchorBase(),a.extendPlanarCurve(),a.initialize(t)})})}return o.prototype.resetCurve=function(){var o=this;o.curveAnchors.forEach(function(o){o.anchor.remove()}),o.curveAnchors=[],o.curve&&o.curve.remove()},o.prototype.initialize=function(o){var e=this;e.svg.empty(),e.DEFAULTS.ShowPlanarMid&&e.drawPlanarMidLine(),e.initNodes(o)},o.prototype.initNodes=function(o){var e=this;o.forEach(function(o){var t=new FlowBoxNode(o);e.addAnchor(t,!1)})},o.prototype.getBaseAnchors=function(){return this.DEFAULTS.BaseAnchors},o.prototype.populateCurveAnchorBase=function(){var o=this,e=o.containerHeight/5;o.baseAnchors=[],o.DEFAULTS.BaseAnchors&&o.DEFAULTS.BaseAnchors.length>0?o.DEFAULTS.BaseAnchors.push():(o.DEFAULTS.BaseAnchors.push([0,100]),o.DEFAULTS.BaseAnchors.push([200,1*-e]),o.DEFAULTS.BaseAnchors.push([300,2*-e]),o.DEFAULTS.BaseAnchors.push([50,1.5*e]),o.DEFAULTS.BaseAnchors.push([200,1.7*e]),o.DEFAULTS.BaseAnchors.push([200,1.5*-e]),o.DEFAULTS.BaseAnchors.push([200,1.7*-e]),o.DEFAULTS.BaseAnchors.push([50,1*e]),o.DEFAULTS.BaseAnchors.push([150,1.5*e]),o.DEFAULTS.BaseAnchors.push([200,0])),o.DEFAULTS.BaseAnchors.forEach(function(e){o.baseAnchors.push(new AnchorBase(e[0],e[1]))})},o.prototype.extendPlanarCurve=function(){var o=this;null==o.lastCurveAnchor&&(o.lastCurveAnchor=[0,0]),o.baseAnchors.forEach(function(e,t){o.creatCurveAnchor(t+1,e)}),o.drawPlanarCurve()},o.prototype.creatCurveAnchor=function(o,e){var t=this,n=new CurveAnchor;n.index=o,n.anchorBase=e;var r=t.lastCurveAnchor[0]+e.offsetX,a=t.planarY+e.offsetY;n.data=[r,a],t.lastCurveAnchor=[r,a],t.curveAnchors.push(n)},o.prototype.drawPlanarCurve=function(){var o=this;o.captureMouseMove=!1,o.curveAnchors.forEach(function(e){o.containerWidth=o.containerWidth>e.data[0]?o.containerWidth:e.data[0],o.svg.attr("width",o.containerWidth),e.anchor=o.DEFAULTS.ShowCurveAnchors&&o.svg.append("circle").attr("cx",e.data[0]).attr("cy",e.data[1]).attr("r",5).attr("fill","#000")}),o.curve&&o.curve.remove();var e=o.curveAnchors.map(function(o){return o.data});o.curve=o.svg.append("path").data([e]).attr("d",d3.line().curve(d3.curveBasis)).attr("stroke-width",2).attr("stroke",o.DEFAULTS.DefaultCurveColor).attr("stroke-dasharray",!0===o.DEFAULTS.DefaultCurveIsSolid?"0, 0":o.DEFAULTS.DefaultCuveStrokeDasharray).attr("fill","none")},o.prototype.drawPlanarMidLine=function(){var o=this;o.planarMidPath=o.svg.append("line").attr("x1",0).attr("y1",o.planarY).attr("x2",o.containerWidth).attr("y2",o.planarY).attr("stroke-width",1).attr("stroke","#e74c3c")},o.prototype.addAnchor=function(o,e){void 0===e&&(e=!0);var t=this,n=new FlowAnchor;n.data=o;var r,a=!1,i=t.curve.node().getTotalLength();if(t.useDataPostions)t.lastAnchorAtLength||(t.lastAnchorAtLength=0),t.lastAnchorAtLength=t.lastAnchorAtLength+o.nodeData.diff,r=t.curve.node().getPointAtLength(t.lastAnchorAtLength),!a&&(t.lastAnchorAtLength>i||t.lastAnchorAtLength+t.DEFAULTS.EventBoxWidth/2+50>i)&&(t.extendPlanarCurve(),a=!0);else{t.lastAnchorAtLength?(t.lastAnchor=t.curve.node().getPointAtLength(t.lastAnchorAtLength),t.lastAnchorAtLength=t.lastAnchorAtLength+t.DEFAULTS.DefaultAnchorNodeSpacing):(t.lastAnchorAtLength=0,t.lastAnchor={x:0,y:0},t.lastAnchorAtLength=t.lastAnchorAtLength+t.DEFAULTS.EventBoxWidth/2),r=t.curve.node().getPointAtLength(t.lastAnchorAtLength);for(var c=t.lastAnchorAlignedLeft?2*t.DEFAULTS.EventBoxWidth+20:t.DEFAULTS.EventBoxWidth+20;r.x-t.DEFAULTS.EventBoxWidth/2<0||r.x-t.lastAnchor.x<=c;)t.lastAnchorAtLength=t.lastAnchorAtLength+10,!a&&t.lastAnchorAtLength>i&&(t.extendPlanarCurve(),a=!0),r=t.curve.node().getPointAtLength(t.lastAnchorAtLength)}if(r){n.anchor=r,n.anchorDistance=t.lastAnchorAtLength,n.innerNode=t.svg.append("circle").attr("cx",r.x).attr("cy",r.y).attr("r",5).attr("fill",o.nodeColor),n.outerNode=t.svg.append("circle").attr("cx",r.x).attr("cy",r.y).attr("r",10).attr("stroke-width",3).attr("stroke",o.nodeColor).attr("fill","none");var d,h=t.curve.node().getPointAtLength(t.lastAnchorAtLength+1),s=(h.y-r.y)/(h.x-r.x),l=void 0,v="",u=t.DEFAULTS.ShowEventBoxes?t.DEFAULTS.EventBoxHeight+25:t.DEFAULTS.EventBoxHeight+10,A=t.DEFAULTS.ShowEventBoxes?25:10;d=s<0?r.y-u:r.y+A,v=s<0?"top":"bottom",(d+t.DEFAULTS.EventBoxHeight>t.containerHeight||d<0)&&(d=s<0?r.y+A:r.y-u,v=s<0?"bottom":"top"),l=r.x-t.DEFAULTS.EventBoxWidth/2,n.eventBoxLeft=l,t.lastAnchorAlignedLeft=!1,n.eventBoxPosition=v,n.eventBox=t.container.append("div"),n.eventBox.attr("tabindex",0),n.eventBox.node().classList.add("flow-box-event-container"),n.eventBox.attr("id",GUID()+"_EVB"),n.eventBox.node().style.width=t.DEFAULTS.EventBoxWidth+"px",n.eventBox.node().style.height=t.DEFAULTS.EventBoxHeight+"px",n.eventBox.node().style.top=d+"px",n.eventBox.node().style.left=n.eventBoxLeft+"px",n.upperBox=n.eventBox.append("div"),n.upperBox.node().innerHTML=o.upper,n.lowerBox=n.eventBox.append("div"),n.lowerBox.node().classList.add("flow-box-event-text"),n.lowerBox.node().innerHTML=o.lower;var p=function(o){var e={eventBox:n.eventBox,node:n.data.nodeData};1==t.editingBoxPositionInTouchMode?(t.activeFlowAnchor=n,t.highlightNode(n.data.nodeData)):void 0!==t.selectionCallBack&&"function"==typeof t.selectionCallBack&&t.selectionCallBack(e)};if(n.eventBox.on("click",p),t.DEFAULTS.ShowEventBoxes){var f=n.eventBox.append("div");n.eventBox.attr("data-color",o.nodeColor),n.eventBox.node().style.background=LightenDarkenColor(o.nodeColor,120),n.eventBox.node().style.borderColor=o.nodeColor,f.node().style.borderTopColor="transparent",f.node().style.borderBottomColor="transparent",f.node().style.borderRightColor="transparent",f.node().classList.add(v+"-side-arrow"),"top"===v?f.node().style.borderTopColor=o.nodeColor:"bottom"===v?f.node().style.borderBottomColor=o.nodeColor:"right"===v&&(f.node().style.borderRightColor=o.nodeColor),n.arrowInBox=f,n.lowerBox.node().style.background=o.nodeColor,n.lowerBox.node().style.color="#FFF"}if(t.anchors.push(n),e){var x=l-150;$(t.container.node()).animate({scrollLeft:x+"px"},300)}n.eventBox.on("keyup",function(){if(t.editingBoxPositionInTouchMode&&t.activeFlowAnchor.data.nodeData.id===n.data.nodeData.id)return 39==d3.event.keyCode||40==d3.event.keyCode?t.moveActiveNode(t.DEFAULTS.EditBaseDistanceChange):37!=d3.event.keyCode&&38!=d3.event.keyCode||t.moveActiveNode(-t.DEFAULTS.EditBaseDistanceChange),d3.event.stopPropagation(),d3.event.preventDefault(),!1}),n.eventBox.on("keydown",function(){var o=!1;if(t.editingBoxPositionInTouchMode&&t.activeFlowAnchor.data.nodeData.id===n.data.nodeData.id&&(39==d3.event.keyCode?o=!0:37==d3.event.keyCode&&(o=!0)),o)return d3.event.stopPropagation(),d3.event.preventDefault(),!1})}},o.prototype.moveActiveNode=function(o){var e=this,t=e.activeFlowAnchor.anchorDistance+o,n=e.curve.node().getPointAtLength(t),r=n.x,a=n.y;e.activeFlowAnchor.innerNode.attr("cx",r),e.activeFlowAnchor.outerNode.attr("cx",r),e.activeFlowAnchor.innerNode.attr("cy",a),e.activeFlowAnchor.outerNode.attr("cy",a),e.activeFlowAnchor.anchor=n,e.activeFlowAnchor.anchorDistance=t;var i,c,d=e.curve.node().getPointAtLength(e.lastAnchorAtLength+1),h=(d.y-n.y)/(d.x-n.x),s="",l=e.DEFAULTS.ShowEventBoxes?e.DEFAULTS.EventBoxHeight+25:e.DEFAULTS.EventBoxHeight+10,v=e.DEFAULTS.ShowEventBoxes?25:10;i=h<0?n.y-l:n.y+v,s=h<0?"top":"bottom",(i+e.DEFAULTS.EventBoxHeight>e.containerHeight||i<0)&&(i=h<0?n.y+v:n.y-l,s=h<0?"bottom":"top"),c=n.x-e.DEFAULTS.EventBoxWidth/2,e.activeFlowAnchor.eventBoxLeft=c,e.lastAnchorAlignedLeft=!1,e.activeFlowAnchor.eventBoxPosition=s,e.activeFlowAnchor.eventBox.node().style.top=i+"px",e.activeFlowAnchor.eventBox.node().style.left=e.activeFlowAnchor.eventBoxLeft+"px",e.activeFlowAnchor.arrowInBox.node().classList.add(s+"-side-arrow"),e.activeFlowAnchor.arrowInBox.node().style.borderTopColor="transparent",e.activeFlowAnchor.arrowInBox.node().style.borderBottomColor="transparent",e.activeFlowAnchor.arrowInBox.node().style.borderRightColor="transparent","top"===s?e.activeFlowAnchor.arrowInBox.node().style.borderTopColor=e.activeFlowAnchor.data.nodeData.nodeColor:"bottom"===s?e.activeFlowAnchor.arrowInBox.node().style.borderBottomColor=e.activeFlowAnchor.data.nodeData.nodeColor:"right"===s&&(e.activeFlowAnchor.arrowInBox.node().style.borderRightColor=e.activeFlowAnchor.data.nodeData.nodeColor)},o.prototype.redraw=function(){var o=this;o.lastAnchorAtLength=null;var e=o.getNodes();o.anchors.forEach(function(o){o.innerNode.remove(),o.outerNode.remove(),o.lowerBox.remove(),o.upperBox.remove(),o.eventBox.remove()}),o.anchors=[],o.initialize(e)},o.prototype.reset=function(){var o=this;o.lastAnchorAtLength=null,o.anchors.forEach(function(o){o.innerNode.remove(),o.outerNode.remove(),o.lowerBox.remove(),o.upperBox.remove(),o.eventBox.remove()}),o.anchors=[],o.curveAnchors.forEach(function(o){o.anchor.remove()}),o.curveAnchors=[],o.initialize([])},o.prototype.getNodes=function(){var o=this,e=0;return o.anchors.forEach(function(o){o.data.nodeData.diff=o.anchor.x-e,e=o.anchor.x}),o.anchors.map(function(o){return o.data.nodeData})},o.prototype.enableTouchEdit=function(){var o=this;o.editingBoxPositionInTouchMode?o.editingBoxPositionInTouchMode=!1:(o.editingBoxPositionInTouchMode=!0,o.removeHighlight())},o.prototype.highlightNode=function(o){this.anchors.forEach(function(e){e.data.nodeData.id===o.id?(e.eventBox.node().style.outline="2px dotted #000",e.eventBox.node().style.outlineOffset="5px"):e.eventBox.node().style.outline="none"})},o.prototype.removeHighlight=function(o){this.anchors.forEach(function(e){o?e.data.nodeData.id===o.id&&(e.eventBox.node().style.outline="none"):e.eventBox.node().style.outline="none"})},o.prototype.focusNode=function(o){var e=this;e.anchors.forEach(function(t){if(t.data.nodeData.id===o.id){var n=t.eventBoxLeft-150;$(e.container.node()).animate({scrollLeft:n+"px"},300)}})},o.prototype.changeData=function(o){var e=this;e.anchors.forEach(function(t){t.data.nodeData.id===o.id&&(t.data.nodeData=o,t.data.nodeColor=o.nodeColor,t.data.lower=o.lower,t.data.upper=o.upper,t.lowerBox.node().innerHTML=o.lower,t.upperBox.node().innerHTML=o.upper,e.changeColors(t))})},o.prototype.changeColors=function(o){o.innerNode.attr("fill",o.data.nodeColor),o.outerNode.attr("stroke",o.data.nodeColor),o.eventBox.attr("data-color",o.data.nodeColor),o.eventBox.node().style.background=LightenDarkenColor(o.data.nodeColor,120),o.eventBox.node().style.borderColor=o.data.nodeColor,"top"===o.eventBoxPosition?o.arrowInBox.node().style.borderTopColor=o.data.nodeColor:"bottom"===o.eventBoxPosition?o.arrowInBox.node().style.borderBottomColor=o.data.nodeColor:"right"===o.eventBoxPosition&&(o.arrowInBox.node().style.borderRightColor=o.data.nodeColor),o.lowerBox.node().style.background=o.data.nodeColor},o.prototype.swapNodes=function(o,e){var t=this,n=null,r=null;t.anchors.forEach(function(t){if(t.data.nodeData.id===o.id)(a=Object.assign({},t.data.nodeData)).lower=e.lower,a.upper=e.upper,a.nodeColor=e.nodeColor,n=a;else if(t.data.nodeData.id===e.id){var a=Object.assign({},t.data.nodeData);a.lower=o.lower,a.upper=o.upper,a.nodeColor=o.nodeColor,r=a}}),n&&t.changeData(n),r&&t.changeData(r)},o.prototype.deleteNode=function(o){var e=this,t=null,n=null,r=[];e.anchors.forEach(function(e,t){e.data.nodeData.id===o.id&&(n=t)}),n>=0&&(t=e.anchors[n-1],e.anchors.forEach(function(o,e){e>=n&&(o.innerNode.remove(),o.outerNode.remove(),o.lowerBox.remove(),o.upperBox.remove(),o.eventBox.remove(),o.arrowInBox.remove()),e>n&&r.push(o.data)}),e.anchors=e.anchors.filter(function(o,e){return e<n}),e.lastAnchorAtLength=t?t.anchorDistance:0,r.forEach(function(o){e.addAnchor(o,!1)}))},o}();