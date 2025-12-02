
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
    cxn:              {name: "Construction",           color: COLORS.green},
    cxn_unknown:      {name: "Construction (unknown)", color: COLORS.green, border: COLORS.red},
    type:             {name: "Type",                   color: COLORS.gold},
    type_unknown:     {name: "Type (unknown)",         color: COLORS.gold, border: COLORS.red},
    category:         {name: "Category",               color: COLORS.blue},
    category_unknown: {name: "Category (unknown)",     color: COLORS.blue, border: COLORS.red},
    frame:            {name: "Frame",                  color: COLORS.violet},
};

// Attributes for the different edge types (relations)
// Currently supporting: name, color, dashed (default=false), reversed (default=false)
SETTINGS.edges = {
    SubtypeOf:           {name: "Subtype",  color: COLORS.green},
    TypeAssociation:     {name: "Type",     color: COLORS.gold},
    CategoryAssociation: {name: "Category", color: COLORS.blue},
    FrameAssociation:    {name: "Frame",    color: COLORS.violet},
};

// General settings
SETTINGS.general = {
    nodes: {
        label: "name",     // Which node attribute to put in the node label
        title: "Concepts", // The title that will be printed before the checkboxes
        default: ["cxn", "cxn_unknown", "type", "type_unknown"],
    },
    edges: {
        title: "Relations",      // The title that will be printed before the checkboxes
        default: ["SubtypeOf"],  // Which checkbox(es) should be checked by default
    },
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
