/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function(n, edges, distanceThreshold) {
    // Função para criar o grafo em forma de lista de adjacência
    function criaGrafo(n, edges) {
        const grafo = Array.from({ length: n }, () => []);
        for (let [u, v, peso] of edges) {
            grafo[u].push([v, peso]);
            grafo[v].push([u, peso]);
        }
        return grafo;
    }

    // Implementação de Dijkstra
    function dijkstra(grafo, n, inicio, distanceThreshold) {
        const distancia = Array(n).fill(Infinity);
        distancia[inicio] = 0;

        // MinHeap simples usando array + sort
        let minHeap = [[0, inicio]]; // [distância, nó]

        while (minHeap.length > 0) {
            // Extraí o menor elemento
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

        // Conta quantas cidades são alcançáveis dentro do limite
        return distancia.filter(d => d <= distanceThreshold).length - 1; 
        // "-1" para não contar a própria cidade
    }

    const grafo = criaGrafo(n, edges);

    let menorQtdCidades = Infinity;
    let result = -1;

    for (let i = 0; i < n; i++) {
        const qtdCidadesAcessiveis = dijkstra(grafo, n, i, distanceThreshold);

        if (qtdCidadesAcessiveis <= menorQtdCidades) {
            menorQtdCidades = qtdCidadesAcessiveis;
            result = i; // mantém o maior índice em caso de empate
        }
    }

    return result;
};