/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var countPaths = function(n, roads) {
    const MOD = 1e9 + 7;

    const grafo = Array.from({ length: n }, () => []);
    for (const [u, v, time] of roads) {
        grafo[u].push([v, time]);
        grafo[v].push([u, time]);
    }

    const dist = new Array(n).fill(Infinity);
    dist[0] = 0;

    const ways = new Array(n).fill(0);
    ways[0] = 1;

    const minHeap = [[0, 0]]; 

    while (minHeap.length > 0) {
        minHeap.sort((a, b) => a[0] - b[0]);
        const [d, u] = minHeap.shift();

        if (d > dist[u]) continue;

        for (const [v, peso] of grafo[u]) {
            const novaDist = d + peso;

            if (novaDist < dist[v]) {
                dist[v] = novaDist;
                ways[v] = ways[u];
                minHeap.push([novaDist, v]);
            }
            else if (novaDist === dist[v]) {
                ways[v] = (ways[v] + ways[u]) % MOD;
            }
        }
    }

    return ways[n - 1] % MOD;
};
