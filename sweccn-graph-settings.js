
///////////////////////////////////////////////////////////////////////////////
// The different graphs

var ccGraphs = {};

ccGraphs.cxn = {
    name: "Constructions",
    nodecolors: {
        cxn: "LightGreen",
        cxn_unknown: "LightGreen",
    },
    edgecolors: {
        SubtypeOf: "LightGreen",
    },
    nodeborders: {
        cxn_unknown: "Red",
    },
};

ccGraphs.types = {
    name: "Cxns + Types",
    nodecolors: {
        cxn: "LightGreen",
        cxn_unknown: "LightGreen",
        type: "Gold",
        type_unknown: "Gold",
    },
    edgecolors: {
        SubtypeOf: "LightGreen",
        TypeAssociation: "Gold",
    },
    nodeborders: {
        cxn_unknown: "Red",
        type_unknown: "Red",
    },
};

ccGraphs.cats = {
    name: "Cxns + Categories",
    nodecolors: {
        cxn: "LightGreen",
        cxn_unknown: "LightGreen",
        category: "#B0C0FF",
        category_unknown: "#B0C0FF",
    },
    edgecolors: {
        SubtypeOf: "LightGreen",
        CategoryAssociation: "#B0C0FF",
    },
    nodeborders: {
        cxn_unknown: "Red",
        category_unknown: "Red",
    },
};

ccGraphs.types_cats = {
    name: "Cxns + Types + Categories",
    nodecolors: {
        cxn: "LightGreen",
        cxn_unknown: "LightGreen",
        type: "Gold",
        type_unknown: "Gold",
        category: "#B0C0FF",
        category_unknown: "#B0C0FF",
    },
    edgecolors: {
        SubtypeOf: "LightGreen",
        TypeAssociation: "Gold",
        CategoryAssociation: "#B0C0FF",
    },
    nodeborders: {
        cxn_unknown: "Red",
        type_unknown: "Red",
        category_unknown: "Red",
    },
};

ccGraphs.frames = {
    name: "Cxns + Frames",
    nodecolors: {
        cxn: "LightGreen",
        cxn_unknown: "LightGreen",
        frame: "Violet",
    },
    edgecolors: {
        SubtypeOf: "LightGreen",
        FrameAssociation: "Violet",
    },
    nodeborders: {
        cxn_unknown: "Red",
    },
};

ccGraphs.all = {
    name: "Everything",
    nodecolors: {
        cxn: "LightGreen",
        cxn_unknown: "LightGreen",
        type: "Gold",
        type_unknown: "Gold",
        category: "#B0C0FF",
        category_unknown: "#B0C0FF",
        frame: "Violet",
    },
    edgecolors: {
        SubtypeOf: "LightGreen",
        TypeAssociation: "Gold",
        CategoryAssociation: "#B0C0FF",
        FrameAssociation: "Violet",
    },
    nodeborders: {
        cxn_unknown: "Red",
        type_unknown: "Red",
        category_unknown: "Red",
    },
};


///////////////////////////////////////////////////////////////////////////////
// Global options

var networkOptions = {
    edges: {
        width: 3,
        arrows: "to",
    },
    nodes: {
        shape: "box",
        borderWidth: 2,
    },
    interaction: {
        hover: true, // "nodes use their hover colors when the mouse moves over them"
        multiselect: true, // "a longheld click (or touch) as well as a control-click will add to the selection"
        tooltipDelay: 1000, // "the amount of time in milliseconds it takes before the tooltip is shown"
    },
    layout: {
        improvedLayout: true, // "the network will use the Kamada Kawai algorithm for initial layout"
        clusterThreshold: 1000, // "cluster threshold to which improvedLayout applies"
    },
    physics: {
        solver: "forceAtlas2Based",
        stabilization: {
            iterations: 100, // "stabilize the network on load up til a maximum number of iterations"
        },
        forceAtlas2Based: {
            theta: 0.5, // "higher values are faster but generate more errors, lower values are slower but with less errors"
            gravitationalConstant: -50, // "if you want the repulsion to be stronger, decrease the gravitational constant... falloff is linear instead of quadratic"
            centralGravity: 0.01, // "central gravity attractor to pull the entire network back to the center"
            springConstant: 0.1, // "higher values mean stronger springs"
            springLength: 100, // "the rest length of the spring"
            damping: 0.1, // "how much of the velocity from the previous physics simulation iteration carries over to the next iteration"
            avoidOverlap: 0, // "if > 0, the size of the node is taken into account"
        },
        repulsion: {
            centralGravity: 0.1,
            springLength: 100,
            springConstant: 0.1,
            nodeDistance: 200, // "range of influence for the repulsion"
            damping: 0.1,
        },
        barnesHut: {
            theta: 0.5,
            gravitationalConstant: -10000, // "...falloff is quadratic instead of linear"
            centralGravity: 1,
            springLength: 100,
            springConstant: 0.1,
            damping: 0.1,
            avoidOverlap: 0,
        },
    },
};

