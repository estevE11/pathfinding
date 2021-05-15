var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
;
var map_costs = [
    [5, 10, 10, 10, 100],
    [10, 100, 100, 50, 100],
    [10, 10, 10, 10, 50],
    [100, 100, 100, 100, 10],
    [100, 100, 100, 100, 100],
];
var get_node = function (x, y, map) {
    if (x < 0 || x > map[0].length - 1 || y < 0 || y > map.length - 1)
        return null;
    var cost = map[y][x];
    return { x: x, y: y, cost: cost, trail: [] };
};
var get_neighbours = function (parent_node, map) {
    var res = [];
    var x = parent_node.x;
    var y = parent_node.y;
    for (var yy = y - 1; yy < y + 2; yy++) {
        for (var xx = x - 1; xx < x + 2; xx++) {
            if (!(yy == y && xx == x)) {
                var nod = get_node(xx, yy, map);
                if (nod != null) {
                    nod.trail = __spreadArray(__spreadArray([], parent_node.trail), [parent_node]);
                    nod.cost += parent_node.cost;
                    res.push(nod);
                }
            }
        }
    }
    return res;
};
var add_nodes_to_list = function (list, nodes, visited) {
    var missing_nodes = [];
    for (var i = 0; i < nodes.length; i++) {
        var found = false;
        for (var j = 0; j < list.length; j++) {
            if (nodes[i].x == list[j].x && nodes[i].y == list[j].y) {
                if (list[j].cost > nodes[i].cost)
                    found = false;
                else
                    found = true;
            }
        }
        if (!found) {
            var can_insert = true;
            for (var j = 0; j < visited.length; j++) {
                if (nodes[i].x == visited[j].x && nodes[i].y == visited[j].y) {
                    can_insert = false;
                    break;
                }
            }
            if (can_insert)
                missing_nodes.push(nodes[i]);
        }
    }
    list.push.apply(list, missing_nodes);
    return list;
};
var delete_node_from_list = function (list, node) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].x == node.x && list[i].y == node.y)
            list.splice(i, 1);
    }
    return list;
};
var sort_node_list = function (list) {
    var res = [];
    for (var i = 0; i < list.length; i++) {
        var curr_value = list[i];
        var found = false;
        for (var j = 0; j < res.length; j++) {
            if (curr_value.cost < res[j].cost) {
                res.splice(j, 0, curr_value);
                found = true;
                break;
            }
        }
        if (!found)
            res.push(curr_value);
    }
    return res;
};
// Afegir array de nodes estudiats
var find_path = function (target, list, map) {
    var current = list[0];
    var visited = [];
    while (!(current.x == target.x && current.y == target.y)) {
        var curr_neighbours = get_neighbours(current, map);
        list = delete_node_from_list(list, current);
        list = add_nodes_to_list(list, curr_neighbours, visited);
        list = sort_node_list(list);
        visited.push(current);
        current = list[0];
    }
    return current;
};
var print_result = function (result, map) {
    for (var y = 0; y < map.length; y++) {
        var line = '';
        for (var x = 0; x < map[0].length; x++) {
            var found = false;
            for (var i = 0; i < result.trail.length; i++) {
                if (result.trail[i].x == x && result.trail[i].y == y) {
                    found = true;
                    break;
                }
            }
            if (found)
                line += 'X ';
            else
                line += '. ';
        }
        console.log(line);
    }
};
var target = {
    x: 4,
    y: 4,
    trail: [],
    cost: 0
};
var find_result = find_path(target, [get_node(0, 0, map_costs)], map_costs);
console.log('result');
print_result(find_result, map_costs);
