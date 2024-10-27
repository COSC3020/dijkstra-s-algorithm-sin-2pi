const fs = require('fs');
eval(fs.readFileSync('code.js')+'');


sourceNode = 0;


emptyGraph = {};


singleNodeGraph = {
    0: []
};


disconnectedGraph = {
    0: [[1, 1]],
    1: [[0, 1]],
    2: [[3, 1]],
    3: [[2, 1]],
    4: []
};


cyclicGraph = {
    0: [[1, 1], [2, 4]],
    1: [[2, 2], [0, 1]],
    2: [[0, 4], [1, 2]]
};


parallelGraph = {
    0: [[1, 5], [2, 2]],
    1: [[3, 4]],
    2: [[1, 1], [3, 7]],
    3: []
};


deadEndGraph = {
    0: [[1, 1], [2, 2]],
    1: [[3, 3], [4, 2]],
    2: [],
    3: [],
    4: []
};


negativeGraph = {
    0: [[1, -1], [2, 4]],
    1: [[2, -2], [3, 3]],
    2: [[3, 5]],
    3: []
};

function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

const tests = [
    { 
        func: dijkstra, 
        graph: emptyGraph, 
        result: {},
        name: "Empty Graph Test" 
    },
    { 
        func: dijkstra, 
        graph: singleNodeGraph, 
        result: {'0': 0},
        name: "Single Node Graph Test" 
    },
    { 
        func: dijkstra, 
        graph: disconnectedGraph, 
        result: {'0': 0, '1': 1, '2': Infinity, '3': Infinity, '4': Infinity},
        name: "Disconnected Graph Test" 
    },
    { 
        func: dijkstra, 
        graph: cyclicGraph, 
        result: {'0': 0, '1': 1, '2': 3},
        name: "Cyclic Graph Test" 
    },
    { 
        func: dijkstra, 
        graph: parallelGraph, 
        result: {'0': 0, '1': 3, '2': 2, '3': 7},
        name: "Parallel Paths Test" 
    },
    { 
        func: dijkstra, 
        graph: deadEndGraph, 
        result: {'0': 0, '1': 1, '2': 2, '3': 4, '4': 3},
        name: "Dead End Graph Test" 
    },
    { 
        func: dijkstra, 
        graph: negativeGraph, 
        result: {'0': 0, '1': -1, '2': -3, '3': 2},
        name: "Negative Weights Test" 
    }
];

tests.forEach(test => {
    const output = test.func(test.graph, sourceNode);
    if (arraysEqual(output, test.result)) {
        console.log(`${test.name} successful`);
    } else {
        console.error(`${test.name} failed: ${output} != ${test.result}`);
    }
});
