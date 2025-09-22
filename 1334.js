/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function(n, edges, distanceThreshold) {
    function criaGrafo(n, edges) {
        const grafo = Array.from({ length: n }, () => []);
        for (let [u, v, peso] of edges) {
            grafo[u].push([v, peso]);
            grafo[v].push([u, peso]);
        }
        return grafo;
    }

    function dijkstra(grafo, n, inicio, distanceThreshold) {
        const distancia = Array(n).fill(Infinity);
        distancia[inicio] = 0;

        let minHeap = [[0, inicio]]; 

        while (minHeap.length > 0) {
            minHeap.sort((a, b) => a[0] - b[0]);
            const [distAtual, noAtual] = minHeap.shift();

            if (distAtual > distancia[noAtual]) continue;

            for (let [vizinho, peso] of grafo[noAtual]) {
                const novaDist = distAtual + peso;
                if (novaDist < distancia[vizinho]) {
                    distancia[vizinho] = novaDist;
                    minHeap.push([novaDist, vizinho]);
                }
            }
        }

        return distancia.filter(d => d <= distanceThreshold).length - 1; 
    }

    const grafo = criaGrafo(n, edges);

    let menorQtdCidades = Infinity;
    let result = -1;

    for (let i = 0; i < n; i++) {
        const qtdCidadesAcessiveis = dijkstra(grafo, n, i, distanceThreshold);

        if (qtdCidadesAcessiveis <= menorQtdCidades) {
            menorQtdCidades = qtdCidadesAcessiveis;
            result = i; 
        }
    }

    return result;
};