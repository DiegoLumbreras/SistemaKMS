function closeModal() {
    $(document).foundation('reveal', 'close');
}

var tree_root;
var tree_d3;
var treeExtraConections = null;



var create_node_modal_active = false;
var create_node_parent = null;

var rename_node_modal_active = false;
var node_to_rename = null;

var delete_node_modal_active = false;
var node_to_delete = null;
var nodes = [];
var nodesToList = [];
var nodesToListToDelete = [];
var nodeToListFlag = false;
var multiParents = [];
var nodesDeleted = [];
var horizontalVertical = false;
var textPosition = false;
var showNames = true;
var showNumber = true;

var newPosition = [];

outer_update = null;



async function draw_tree(error, treeData) {
    debugger;
    treeData = await getTreeFromBD();




    var totalNodes = 0;
    // Calculate total nodes, max label length
    var maxLabelLength = 0;
    // variables for drag/drop
    var selectedNode = null;
    var newCoordinates = null;
    var draggingNode = null;
    // panning variables
    var panSpeed = 200;
    var panBoundary = 20; // Within 20px from edges will pan when dragging.
    // Misc. variables
    var i = 0;
    var duration = 750;
    var root;

    // size of the diagram
    var viewerWidth = $(document).width();
    var viewerHeight = $(document).height();

    var tree = d3.layout.tree()
        .size([viewerHeight, viewerWidth]);
    tree_d3 = tree;

    createExtraConectionStructure(treeData);

    // define a d3 diagonal projection for use by the node paths later on.
    var diagonal = d3.svg.diagonal()
        .projection(function (d) {
            if (horizontalVertical) {
                return [d.y, d.x];

            } else {
                return [d.x, d.y];

            }

        });

    var menu = [
        {
            title: 'Rename node',
            action: function (elm, d, i) {
              
               centerNode(d);
                $("#RenameNodeName").val(d.name);
                debugger;
                $('#textPositionRename').prop('checked', d.textPosition);

                textPosition = d.textPosition;

                rename_node_modal_active = true;
                node_to_rename = d
                $('#RenameNodeModal').foundation('reveal', 'open');
            }
        },
        {
            title: 'Delete node',
            action: function (elm, d, i) {
                node_to_delete = d;

                delete_node_modal_active = true;
                node_to_delete = d
                makeListSons(node_to_delete)
                updateNodeToListToDelete()

                $('#DeleteNodeModal').foundation('reveal', 'open');


                // delete_node(d);
            }
        },
        {
            title: 'Create child node',
            action: function (elm, d, i) {
                debugger;
                create_node_parent = d;
                create_node_modal_active = true;
                $('#CreateNodeModal').foundation('reveal', 'open');
                $('#CreateNodeName').focus();
            }
        },
        {
            title: 'Create parent conecction',
            action: function (elm, d, i) {
                create_parent_relation = d;
                create_parent_modal_active = true;
                $('#NewParentModal').foundation('reveal', 'open');
                $('#CreateNodeName').focus();
            }
        },
        {
            title: 'Delete parent conecction',
            action: function (elm, d, i) {
                create_node_parent = d;
                create_node_modal_active = true;

                var selectParents = document.getElementById("deleteParentSelect");
                var length = selectParents.options.length;
                for (i = length - 1; i >= 0; i--) {
                    selectParents.options[i] = null;
                }
                for (var x = 0; x < multiParents.length; x++) {
                    let child = multiParents[x].child;
                    if (child['id'] == create_node_parent['id']) {
                        let parent = multiParents[x].parent;
                        var optName = parent['name'];
                        var optId = parent['id'];
                        var el = document.createElement("option");
                        el.textContent = optName;
                        el.value = optId;
                        selectParents.appendChild(el);
                    }
                }
                $('#DeleteParentModal').foundation('reveal', 'open');
                $('#CreateNodeName').focus();
            }
        }
    ]


    // A recursive helper function for performing some setup by walking through all nodes

    function visit(parent, visitFn, childrenFn) {
        if (!parent) return;

        visitFn(parent);

        var children = childrenFn(parent);
        if (children) {
            var count = children.length;
            for (var i = 0; i < count; i++) {
                visit(children[i], visitFn, childrenFn);
            }
        }
    }

    // Call visit function to establish maxLabelLength
    visit(treeData, function (d) {
        totalNodes++;
        maxLabelLength = Math.max(d.name.length, maxLabelLength);

    }, function (d) {
        return d.children && d.children.length > 0 ? d.children : null;
    });






    // TODO: Pan function, can be better implemented.

    function pan(domNode, direction) {
        var speed = panSpeed;
        if (panTimer) {
            clearTimeout(panTimer);
            translateCoords = d3.transform(svgGroup.attr("transform"));
            if (direction == 'left' || direction == 'right') {
                translateX = direction == 'left' ? translateCoords.translate[0] + speed : translateCoords.translate[0] - speed;
                translateY = translateCoords.translate[1];
            } else if (direction == 'up' || direction == 'down') {
                translateX = translateCoords.translate[0];
                translateY = direction == 'up' ? translateCoords.translate[1] + speed : translateCoords.translate[1] - speed;
            }
            scaleX = translateCoords.scale[0];
            scaleY = translateCoords.scale[1];
            scale = zoomListener.scale();
            svgGroup.transition().attr("transform", "translate(" + translateX + "," + translateY + ")scale(" + scale + ")");
            d3.select(domNode).select('g.node').attr("transform", "translate(" + translateX + "," + translateY + ")");
            zoomListener.scale(zoomListener.scale());
            zoomListener.translate([translateX, translateY]);
            panTimer = setTimeout(function () {
                pan(domNode, speed, direction);
            }, 50);
        }
    }

    // Define the zoom function for the zoomable tree

    function zoom() {
        svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");

    }


    // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
    var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);

    function initiateDrag(d, domNode) {
        d3.selectAll("path.additionalParentLink").remove();

        draggingNode = d;
        draggingNode['contacB'] = 2;

        d3.select(domNode).select('.ghostCircle').attr('pointer-events', 'none');
        d3.selectAll('.ghostCircle').attr('class', 'ghostCircle show');
        d3.select(domNode).attr('class', 'node activeDrag');

        svgGroup.selectAll("g.node").sort(function (a, b) { // select the parent and sort the path's
            if (a.id != draggingNode.id) return 1; // a is not the hovered element, send "a" to the back
            else return -1; // a is the hovered element, bring "a" to the front
        });
        // if nodes has children, remove the links and nodes
        if (nodes.length > 1) {
            // remove link paths
            links = tree.links(nodes);
            nodePaths = svgGroup.selectAll("path.link")
                .data(links, function (d) {
                    return d.target.id;
                }).remove();
            // remove child nodes
            nodesExit = svgGroup.selectAll("g.node")
                .data(nodes, function (d) {
                    return d.id;
                }).filter(function (d, i) {
                    if (d.id == draggingNode.id) {
                        return false;
                    }
                    return true;
                }).remove();
        }

        // remove parent link
        parentLink = tree.links(tree.nodes(draggingNode.parent));
        svgGroup.selectAll('path.link').filter(function (d, i) {
            if (d.target.id == draggingNode.id) {
                return true;
            }
            return false;
        }).remove();

        dragStarted = null;
    }

    // define the baseSvg, attaching a class for styling and the zoomListener
    var baseSvg = d3.select("#tree-container").append("svg")
        .attr("width", viewerWidth)
        .attr("height", viewerHeight);

    baseSvg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "white")

    baseSvg.call(zoomListener);


    // Define the drag listeners for drag/drop behaviour of nodes.
    dragListener = d3.behavior.drag()
        .on("dragstart", function (d) {
            if (!horizontalVertical) {
                var xA = d.x;
                var yA = d.y;

                var x0A = d.x0;
                var y0A = d.y0;


                d.x = yA;
                d.y = xA;

                d.x0 = y0A;
                d.y0 = x0A;

            }

            if (d == root) {
                return;
            }
            dragStarted = true;
            nodes = tree.nodes(d);

            d3.event.sourceEvent.stopPropagation();
            // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');
        })
        .on("drag", function (d) {
            // d['contacB'] = 0;
            if (d == root) {
                return;
            }
            if (dragStarted) {

                domNode = this;
                initiateDrag(d, domNode);
            }

            var node = d3.select(this);
            if (!horizontalVertical) {

                d.y0 += d3.event.dy;
                d.x0 += d3.event.dx;
                node.attr("transform", "translate(" + d.x0 + "," + d.y0 + ")");
            } else {


                d.x0 += d3.event.dy;
                d.y0 += d3.event.dx;
                node.attr("transform", "translate(" + d.y0 + "," + d.x0 + ")");
            }
            newPosition = [];

            newPosition.push(d.y0)
            newPosition.push(d.x0)


            updateTempConnector();
        }).on("dragend", function (d) {

            if (d == root) {
                return;
            }
            domNode = this;
            if (selectedNode) {

                let index1 = -1;
                let x = -1;

                multiParents.forEach(function (d) {
                    index1++;
                    if ((d.parent.id == selectedNode.id && d.child.id == draggingNode.id) || (d.parent.id == draggingNode.id && d.child.id == selectedNode.id)) {
                        x = index1;
                    }
                });


                if (x >= 0) {
                    multiParents.splice(x, 1);
                }



                // now remove the element from the parent, and insert it into the new elements children
                var index = draggingNode.parent.children.indexOf(draggingNode);
                if (index > -1) {
                    draggingNode.parent.children.splice(index, 1);
                }


                if (typeof selectedNode.children !== 'undefined' || typeof selectedNode._children !== 'undefined') {
                    if (typeof selectedNode.children !== 'undefined') {
                        selectedNode.children.push(draggingNode);
                    } else {
                        selectedNode._children.push(draggingNode);
                    }


                } else {


                    selectedNode.children = [];
                    selectedNode.children.push(draggingNode);
                }
                cambiarPadre(draggingNode, selectedNode);
                endDrag();
            } else {

                if (draggingNode) {
                    draggingNode['freey'] = newPosition[0];
                    draggingNode['freex'] = newPosition[1];

                    updatePosition(draggingNode);
                }

                endDrag();
            }
        });

    function endDrag() {
        selectedNode = null;
        d3.selectAll('.ghostCircle').attr('class', 'ghostCircle');
        d3.select(domNode).attr('class', 'node');
        // now restore the mouseover event or we won't be able to drag a 2nd time
        d3.select(domNode).select('.ghostCircle').attr('pointer-events', '');
        updateTempConnector();
        if (draggingNode !== null) {
            update(root);
            //centerNode(draggingNode);
            draggingNode = null;
        }
    }

    // Helper functions for collapsing and expanding nodes.



    var overCircle = function (d) {
        draggingNode['contacB'] = draggingNode['contacB'] + 1;
        if (selectedNode != null) {
            if (d.id != selectedNode.id) {
                draggingNode['contacB'] = 2;
            }
        }
        debugger;


        if (!horizontalVertical) {

            var xA = d.x;
            var yA = d.y;

            var x0A = d.x0;
            var y0A = d.y0;


            d.x = yA;
            d.y = xA;

            d.x0 = y0A;
            d.y0 = x0A;
        } else {
        }


        selectedNode = d;
        updateTempConnector();
    };
    var outCircle = function (d) {


        if (draggingNode != null) {
            if (draggingNode['contacB'] % 2 == 0) {
                draggingNode['contacB'] = 2;
            }
        }

        selectedNode = null;
        updateTempConnector();
    };

    // color a node properly
    function colorNode(d) {

        if (d['clasification'] != null) {
            if (d['clasification'] == 1) {
                return "#00FAFB"//"blue";
            } else if (d['clasification'] == 2) {
                return "#03FD06";//Green
            } else if (d['clasification'] == 3) {
                return "#F8FC1F" //"yellow";
            } else if (d['clasification'] == 4) {
                return "orange";
            } else if (d['clasification'] == 5) {
                return "#C0C0C0";//Gray
            }
        }
        return "#03FD06";
    }

    // Function to update the temporary connector indicating dragging affiliation
    var updateTempConnector = function () {

        var data = [];
        if (draggingNode !== null && selectedNode !== null) {
            // have to flip the source coordinates since we did this for the existing connectors on the original tree
            var dataX = null;
            if (horizontalVertical) {
                dataX = {
                    source: {
                        x: selectedNode.y0,
                        y: selectedNode.x0
                    },
                    target: {
                        x: draggingNode.y0,
                        y: draggingNode.x0
                    }
                };
            } else {
                if (draggingNode['contacB'] % 2 == 0) {
                    dataX = {
                        source: {
                            x: selectedNode.y0,
                            y: selectedNode.x0
                        },
                        target: {
                            x: draggingNode.x0,
                            y: draggingNode.y0
                        }
                    };
                } else {

                    dataX = {
                        source: {
                            x: selectedNode.x0,
                            y: selectedNode.y0
                        },
                        target: {
                            x: draggingNode.x0,
                            y: draggingNode.y0
                        }
                    };
                }
            }
            data = [dataX];
        }
        var link = svgGroup.selectAll(".templink").data(data);

        link.enter().append("path")
            .attr("class", "templink")
            .attr("d", d3.svg.diagonal())
            .attr('pointer-events', 'none');

        link.attr("d", d3.svg.diagonal());

        link.exit().remove();
    };

    // Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.

    function centerNode(source) {
        scale = zoomListener.scale();

        if (horizontalVertical) {
            x = -source.y0;
            y = -source.x0;
            x = x * scale + viewerWidth / 2;
            y = y * scale + viewerHeight / 2;
        } {
            y = -source.y0;
            x = -source.x0;
            y = y * scale + viewerWidth / 2;
            x = x * scale + viewerHeight / 2;
        }

        d3.select('g').transition()
            .duration(duration)
            .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
        zoomListener.scale(scale);
        zoomListener.translate([x, y]);
    }


    // Toggle children on click.

    function click(d) {

      
        if (!d3.event.defaultPrevented) {

                console.log("CLICK2: ")

                loadQuestions(d)
            

            // print("DEFAULT")
            return;
        } // click suppressed
        console.log("CLICK3: ")

        // centerNode(d);
    }

    function update(source) {


        // Compute the new height, function counts total children of root node and sets tree height accordingly.
        // This prevents the layout looking squashed when new nodes are made visible or looking sparse when nodes are removed
        // This makes the layout more consistent.
        var levelWidth = [1];
        var childCount = function (level, n) {

            if (n.children && n.children.length > 0) {
                if (levelWidth.length <= level + 1) levelWidth.push(0);

                levelWidth[level + 1] += n.children.length;
                n.children.forEach(function (d) {
                    childCount(level + 1, d);
                });
            }
        };
        childCount(0, root);
        var newHeight = d3.max(levelWidth) * 60; // 25 pixels per line  

        tree = tree.size([newHeight, viewerWidth]);

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        nodes.forEach(function (d) {

            if (d["freey"] != undefined) {
                d.y = d["freey"];

                d.x = d["freex"];


            } else {


                d.y = (d.depth * 100);

            }

        });

        // Update the nodes…
        node = svgGroup.selectAll("g.node")
            .data(nodes, function (d) {
                return d.id || (d.id = ++i);
            });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .call(dragListener)
            .attr("class", "node")
            .attr("transform", function (d) {
                if (horizontalVertical) {
                    return "translate(" + (source.y0) + "," + source.x0 + ")";

                } else {
                    return "translate(" + (source.x0) + "," + source.y0 + ")";

                }
            })
            .on('click', click);

        nodeEnter.append("circle")
            .attr('class', 'nodeCircle')
            .attr("r", 0)
            .style("fill", colorNode);

        nodeEnter.append("text")
            .attr("x", function (d) {
                return d.children || d._children ? -10 : 10;
            })
            .attr("dy", ".35em")
            .attr("orient", "right")

            .attr('class', 'nodeText')
            .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function (d) {
                return d.name;
            })
            .style("fill-opacity", 0);

        // phantom node to give us mouseover in a radius around it
        nodeEnter.append("circle")
            .attr('class', 'ghostCircle')
            .attr("r", 30)
            .attr("opacity", 0.2) // change this to zero to hide the target area
            .style("fill", "red")
            .attr('pointer-events', 'mouseover')
            .on("mouseover", function (node) {
                overCircle(node);
            })
            .on("mouseout", function (node) {
                outCircle(node);
            });

        // Update the text to reflect whether node has children or not.
        node.select('text')
            .attr("x", function (d) {
                if (d['textPosition']) {
                    return -5
                }
                return 10;
            })
            .attr('class', 'nodeTextCustom')
            .attr("text-anchor", function (d) {
                if (d['textPosition']) {
                    return "end"
                }
                return "start";
            })
            .text(function (d) {
                if (showNames) {
                    return d.name;
                } else {
                    return "";
                }
            }).append('svg:tspan')
            .attr('x', function (d) {
                if (!showNames) {
                    if (d['textPosition']) {
                        return -5
                    }
                    return 10;
                }
                var textLength = d['name'].length;
                textLength = parseInt(textLength / 2) * 4;
                if (d['textPosition']) {
                    return -textLength
                }
                return 10 + textLength;
            })
            .attr('dy', function (d) {

                if (!showNames) {
                    return 3;
                }
                return 10;
            })
            .text(function (d) {
                if (showNumber) {
                    return Math.floor(Math.random() * 100);
                } else {
                    return "";
                }

            });

        // Change the circle fill depending on whether it has children and is collapsed
        node.select("circle.nodeCircle")
            .attr("r", function (d) {
                if (d['clasification'] != null) {
                    if (d['clasification'] == 1) {
                        return 8;
                    } else if (d['clasification'] == 2) {
                        return 6;
                    } else if (d['clasification'] == 3) {
                        return 5;
                    } else if (d['clasification'] == 4) {
                        return 4.5;
                    } else if (d['clasification'] == 5) {
                        return 4.5;
                    }
                }
                return 4.5;
            })
            .style("fill", colorNode);

        // Add a context menu
        node.on('contextmenu', d3.contextMenu(menu));

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) {
                if (horizontalVertical) {
                    return "translate(" + d.y + "," + d.x + ")";

                } else {
                    return "translate(" + d.x + "," + d.y + ")";

                }


            });

        // Fade the text in
        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                if (horizontalVertical) {
                    return "translate(" + (source.y) + "," + source.x + ")";

                } else {
                    return "translate(" + (source.x) + "," + source.y + ")";

                }
            })
            .remove();

        nodeExit.select("circle")
            .attr("r", 0);

        nodeExit.select("text")
            .style("fill-opacity", 0);

        // Update the links…
        var link = svgGroup.selectAll("path.link")
            .data(links, function (d) {
                return d.target.id;
            });
        debugger;
        var str = parseInt($("#orienta").val());




        // svgGroup.selectAll("path.link").remove();


        // Enter any new links at the parent's previous position.
        var pata = link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("id", "mlink")
            .attr('marker-end', function (d) {

                debugger
                var angleDeg = Math.atan2(d.source.freey - d.target.freey, d.source.freex - d.target.freex) * 180 / Math.PI;
                var distance = Math.sqrt(Math.pow(d.source.freex - d.target.freex, 2) + Math.pow(d.source.freey - d.target.freey, 2));

                orientT = "auto"

                console.log("ANGLE: " + angleDeg)
                console.log("distance: " + distance)

                baseSvg.append("svg:defs").append("marker")
                    .attr("id", d.source.id + "-" + d.target.id)
                    .attr("viewBox", "0 -5 10 10")
                    .attr('refX', 15)
                    .attr("markerWidth", 5)
                    .attr("style", "fill:  #D0D0D0 ;")
                    .attr("markerHeight", 5)
                    .attr("orient", orientT)
                    .append("svg:path")
                    .attr("d", "M0,-5L10,0L0,5");
                return "url(#" + d.source.id + "-" + d.target.id + ")";
            })
            .attr("d", function (d) {

                var o;
                if (horizontalVertical) {
                    o = {
                        x: source.x0,
                        y: source.y0
                    };
                } else {
                    o = {
                        x: source.y0,
                        y: source.x0
                    };
                }


                return diagonal({
                    source: o,
                    target: o
                });
            });
        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function (d) {
                var o;
                if (horizontalVertical) {
                    o = {
                        x: source.x,
                        y: source.y
                    };
                } else {
                    o = {
                        x: source.y,
                        y: source.x
                    };
                }

                return diagonal({
                    source: o,
                    target: o
                });
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            if (horizontalVertical) {
                d.x0 = d.x;
                d.y0 = d.y;
            } else {
                d.x0 = d.y;
                d.y0 = d.x;
            }

        });


        d3.selectAll("path.additionalParentLink").remove();

        var additionalParentLink = svgGroup.selectAll("path.additionalParentLink")
            .data(links, function (d) {
                return d
            });


        additionalParentLink.remove();
        var colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green',
            'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
            'silver', 'teal', 'white', 'yellow'];





        var colorNumber = 0;
        multiParents.forEach(function (multiPair) {
            color = colors[colorNumber];
            colorNumber++;
            if (colorNumber > 16) {
                colorNumber = 0;
            }
            svgGroup.append("path", "g")
                .attr("class", "additionalParentLink")
                .attr("style", "stroke: " + color + ";")
                .attr('marker-end', function (d) {
                    var orient = "auto";


                    baseSvg.append("svg:defs").append("svg:marker")
                        .attr("id", multiPair.parent.id + "-" + multiPair.child.id)
                        .attr("viewBox", "0 -5 10 10")
                        .attr("style", "fill: " + color + ";")

                        .attr('refX', 15)
                        .attr("markerWidth", 5)
                        .attr("markerHeight", 5)
                        .attr("orient", orient)

                        .append("svg:path")
                        .attr("d", "M0,-5L10,0L0,5");


                    return "url(#" + multiPair.parent.id + "-" + multiPair.child.id + ")";

                })
                .attr("d", function () {
                    var oTarget;
                    var oSource;
                    if (horizontalVertical) {
                        oTarget = {
                            x: multiPair.child.x0,
                            y: multiPair.child.y0
                        };
                        oSource = {
                            x: multiPair.parent.x0,
                            y: multiPair.parent.y0
                        };
                    } else {
                        oTarget = {
                            x: multiPair.child.y0,
                            y: multiPair.child.x0
                        };
                        oSource = {
                            x: multiPair.parent.y0,
                            y: multiPair.parent.x0
                        };
                    }

                    /*if (multiPair.child.depth === multiPair.couplingParent1.depth) {
                        return "M" + oSource.y + " " + oSource.x + " L" + (oTarget.y + ((Math.abs((oTarget.x - oSource.x))) * 0.25)) + " " + oTarget.x + " " + oTarget.y + " " + oTarget.x;
                    }*/
                    return diagonal({
                        source: oSource,
                        target: oTarget
                    });
                });
        });
    }

    outer_update = update;

    // Append a group which holds all nodes and which the zoom Listener can act upon.
    var svgGroup = baseSvg.append("g");

    // Define the root
    root = treeData;
    if (horizontalVertical) {
        root.x0 = viewerHeight / 2;
        root.y0 = 0;
    } else {
        root.y0 = viewerHeight / 2;
        root.x0 = 0;
    }


    // Layout the tree initially and center on the root node.
    update(root);
    centerNode(root);
    tree_root = root;

    if (!nodeToListFlag) {
        updateNodeToList();
    }
    nodeToListFlag = true;
}


