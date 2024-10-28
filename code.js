function dijkstra(graph, start) {
  let dists = {};
  let queue = [];
  let processed = new Set();

  // Setting up distances for each node
  for (let node in graph) {
    if (node == start) {
      dists[node] = 0;
    } else {
      dists[node] = Infinity;
    }
    queue.push(node);
  }

  while (queue.length > 0) {
    queue.sort(function (a, b) {
      return dists[a] - dists[b];
    });
    let node = queue.shift();

    if (processed.has(node)) {
      continue;
    }

    if (dists[node] === Infinity) {
      break;
    }

    processed.add(node);

    for ([target, weight] of graph[node]) {
      if (processed.has(target)) {
        continue;
      }

      let pathCost = dists[node] + weight;
      if (pathCost < dists[target]) {
        dists[target] = pathCost;
      }
    }
  }

  return dists;
}

module.exports = dijkstra;
