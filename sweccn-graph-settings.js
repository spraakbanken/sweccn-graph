
window.name = "SweCCN-graph";

var SETTINGS = {};

///////////////////////////////////////////////////////////////////////////////
// The different graphs

const COLORS = {
    red:    "red",
    green:  "lightgreen",
    gold:   "gold",
    blue:   "#b0c0ff",
    violet: "violet",
};

// Attributes for the different node types
// Currently supporting: color, border (default=color)
SETTINGS.nodes = {
    cxn:              {color: COLORS.green},
    cxn_unknown:      {color: COLORS.green, border: COLORS.red},
    type:             {color: COLORS.gold},
    type_unknown:     {color: COLORS.gold, border: COLORS.red},
    category:         {color: COLORS.blue},
    category_unknown: {color: COLORS.blue, border: COLORS.red},
    frame:            {color: COLORS.violet},
};

// Attributes for the different edge types (relations)
// Currently supporting: name, color, dashed (default=false), reversed (default=false)
SETTINGS.edges = {
    SubtypeOf:           {name: "Subtype",  color: COLORS.green},
    TypeAssociation:     {name: "Type",     color: COLORS.gold},
    CategoryAssociation: {name: "Category", color: COLORS.blue},
    FrameAssociation:    {name: "Frame",    color: COLORS.violet},
};

// Attributes for the different graphs
// Currently supporting: name, defaultrelation, nodes, edges
SETTINGS.graphs = {
    cxn: {
        name: "Constructions",
        defaultrelation: "SubtypeOf",
        nodes: {cxn: true, cxn_unknown: true},
        edges: {SubtypeOf: true},
    },
    types: {
        name: "Cxns + Types",
        defaultrelation: "SubtypeOf",
        nodes: {cxn: true, cxn_unknown: true, type: true, type_unknown: true},
        edges: {SubtypeOf: true, TypeAssociation: true},
    },
    cats: {
        name: "Cxns + Categories",
        defaultrelation: "SubtypeOf",
        nodes: {cxn: true, cxn_unknown: true, category: true, category_unknown: true},
        edges: {SubtypeOf: true, CategoryAssociation: true},
    },
    types_cats: {
        name: "Cxns + Types + Categories",
        defaultrelation: "SubtypeOf",
        nodes: {cxn: true, cxn_unknown: true, type: true, type_unknown: true, category: true, category_unknown: true},
        edges: {SubtypeOf: true, TypeAssociation: true, CategoryAssociation: true},
    },
    frames: {
        name: "Cxns + Frames",
        defaultrelation: "SubtypeOf",
        nodes: {cxn: true, cxn_unknown: true, frame: true},
        edges: {SubtypeOf: true, FrameAssociation: true},
    },
    all: {
        name: "Everything",
        defaultrelation: "SubtypeOf",
        nodes: {cxn: true, cxn_unknown: true, type: true, type_unknown: true, category: true, category_unknown: true, frame: true},
        edges: {SubtypeOf: true, TypeAssociation: true, CategoryAssociation: true, FrameAssociation: true},
    },
};

// General settings
SETTINGS.general = {
    info: {
        attribute: "info",            // which attribute in DATA.nodes contains the on-hover information?
        unknown: "[no information]",  // info to show if missing
    },
};


///////////////////////////////////////////////////////////////////////////////
// Options for the vis-network library, more info here:
// https://visjs.github.io/vis-network/docs/network/

SETTINGS.network = {
    edges: {
        width: 3,                         // "width of the edge"
        arrows: "to",                     // "for example: 'to, from, middle'  or 'to;from', any combination is fine"
    },
    nodes: {
        borderWidth: 1,                   // "width of the border of the node"
        shape: "box",                     // "the types with the label inside of it are: ellipse, circle, database, box, text"
        font: {
            face: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                          // "font face (or font family) of the label text"
            size: 14,                     // "size (in pixels) of the label text"
            color: "black",               // "color of the label text"
        },
    },
    interaction: {
        hover: true,                      // "nodes use their hover colors when the mouse moves over them"
        multiselect: true,                // "a longheld click (or touch) as well as a control-click will add to the selection"
        tooltipDelay: 1000,               // "the amount of time in milliseconds it takes before the tooltip is shown"
    },
    layout: {
        improvedLayout: true,             // "the network will use the Kamada Kawai algorithm for initial layout"
        clusterThreshold: 1000,           // "cluster threshold to which improvedLayout applies"
    },
    physics: {
        solver: "forceAtlas2Based",       // Default solver
        stabilization: {
            iterations: 100,              // "stabilize the network on load up till a maximum number of iterations"
        },
        forceAtlas2Based: {
            theta: 0.5,                   // "higher values are faster but generate more errors, lower values are slower but with less errors"
            gravitationalConstant: -50,   // "the value is negative - if you want the repulsion to be stronger, decrease the value"
            centralGravity: 0.01,         // "central gravity attractor to pull the entire network back to the center"
            springConstant: 0.1,          // "how 'sturdy' the springs are, higher values mean stronger springs"
            springLength: 100,            // "the rest length of the spring"
            damping: 0.1,                 // "how much of the velocity from the previous physics simulation iteration carries over to the next iteration"
            avoidOverlap: 0,              // "if > 0, the size of the node is taken into account"
        },
        repulsion: {
            centralGravity: 0.1,          // "central gravity attractor to pull the entire network back to the center"
            springLength: 100,            // "edges are modelled as springs, [this] is the rest length of the spring"
            springConstant: 0.1,          // "how 'sturdy' the springs are, higher values mean stronger springs"
            nodeDistance: 200,            // "range of influence for the repulsion"
            damping: 0.1,                 // "how much of the velocity from the previous physics simulation iteration carries over to the next iteration"
        },
        barnesHut: {
            theta: 0.5,                    // "higher values are faster but generate more errors, lower values are slower but with less errors"
            gravitationalConstant: -10000, // "the value is negative - if you want the repulsion to be stronger, decrease the value"
            centralGravity: 1,             // "central gravity attractor to pull the entire network back to the center"
            springLength: 100,             // "edges are modelled as springs, [this] is the rest length of the spring"
            springConstant: 0.1,           // "how 'sturdy' the springs are, higher values mean stronger springs"
            damping: 0.1,                  // "how much of the velocity from the previous physics simulation iteration carries over to the next iteration"
            avoidOverlap: 0,               // "if > 0, the size of the node is taken into account"
        },
    },
};
