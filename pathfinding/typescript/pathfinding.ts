interface MapNode {
    x: number,
    y: number,
    trail: MapNode[],
    cost: number
};

const map_costs: number[][] = [
    [5, 10, 10, 10, 100],
    [10, 100, 100, 50, 100],
    [10, 10, 10, 10, 50],
    [100, 100, 100, 100, 10],
    [100, 100, 100, 100, 100],
];

const get_node = (x: number, y: number, map: number[][]): MapNode => {
    if (x < 0 || x > map[0].length-1 || y < 0 || y > map.length-1) return null;
    const cost = map[y][x];
    return { x: x, y: y, cost: cost, trail: [] };
}

const get_neighbours = (parent_node: MapNode, map: number[][]): MapNode[] => {
    let res: MapNode[] = [];
    const x = parent_node.x;
    const y = parent_node.y;

    for (let yy = y-1; yy < y+2; yy++) {        
        for (let xx = x-1; xx < x+2; xx++) {
            if (!(yy == y && xx == x)) {
                const nod = get_node(xx, yy, map);
                if (nod != null) {
                    nod.trail = [...parent_node.trail, parent_node];
                    nod.cost += parent_node.cost;
                    res.push(nod);
                }
            }
        }
    }
    return res;
}

const add_nodes_to_list = (list: MapNode[], nodes: MapNode[], visited: MapNode[]): MapNode[] => {
    let missing_nodes: MapNode[] = [];
    for (let i = 0; i < nodes.length; i++) {
        let found = false;
        for (let j = 0; j < list.length; j++) {
            if (nodes[i].x == list[j].x && nodes[i].y == list[j].y) {
                if (list[j].cost > nodes[i].cost) found = false;
                else found = true;
            }
        }
        if (!found) {
            let can_insert = true;
            for (let j = 0; j < visited.length; j++) {
                if (nodes[i].x == visited[j].x && nodes[i].y == visited[j].y) {
                    can_insert = false;
                    break;
                }
            }
            if(can_insert) missing_nodes.push(nodes[i]);
        }
    }
    list.push(...missing_nodes);
    return list;
}

const delete_node_from_list = (list: MapNode[], node: MapNode): MapNode[] => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].x == node.x && list[i].y == node.y) list.splice(i, 1);
    }
    return list;
}

const sort_node_list = (list: MapNode[]): MapNode[] => {
    let res: MapNode[] = [];
    for (let i = 0; i < list.length; i++) {
        const curr_value: MapNode = list[i];
        let found = false;
        for (let j = 0; j < res.length; j++) {
            if (curr_value.cost < res[j].cost) {
                res.splice(j, 0, curr_value);
                found = true;
                break;
            }
        }
        if (!found) res.push(curr_value);
    }
    return res;
}

// Afegir array de nodes estudiats
const find_path = (target: MapNode, list: MapNode[], map: number[][]): MapNode => {
    let current = list[0];
    let visited: MapNode[] = [];
    while (!(current.x == target.x && current.y == target.y)) {
        const curr_neighbours: MapNode[] = get_neighbours(current, map);
        list = delete_node_from_list(list, current);
        list = add_nodes_to_list(list, curr_neighbours, visited);
        list = sort_node_list(list);
        visited.push(current);
        current = list[0];
    }
    return current;
}

const print_result = (result: MapNode, map: number[][]) => {
    for (let y = 0; y < map.length; y++) {
        let line = '';
        for (let x = 0; x < map[0].length; x++) {
            let found = false;
            for (let i = 0; i < result.trail.length; i++) {
                if (result.trail[i].x == x && result.trail[i].y == y) {
                    found = true;
                    break;
                }
            }
            if(found) line += 'X ';
            else line += '. ';
        }
        console.log(line);
    }
}

const target: MapNode = {
    x: 4,
    y: 4,
    trail: [],
    cost: 0
};

const find_result = find_path(target, [get_node(0, 0, map_costs)], map_costs);
console.log('result');
print_result(find_result, map_costs);
