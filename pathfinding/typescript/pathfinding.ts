interface MapNode {
    x: Number,
    y: Number,
    trail: MapNode[],
    cost: Number
};

const map_data: Array<Array<Number>> = [
    [5, 10, 50, 30, 10],
    [10, 10, 90, 70, 10],
    [40, 60, 100, 10, 50],
    [90, 5, 90, 10, 5],
    [5, 10, 40, 90, 5],
];

const findPath = (current: MapNode, target: MapNode, list: MapNode[], map: Array<Array<Number>>): MapNode[] => {
    if (current.x == target.x && current.y == target.y) return current.trail;
}

const sortNodeList = (list: MapNode[]): MapNode[] => {
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
        if(!found)res.push(curr_value);
    }
    return res;
}



const start: MapNode = {
    x: 0,
    y: 0,
    trail: [],
    cost: 0
};

const target: MapNode = {
    x: 0,
    y: 0,
    trail: [],
    cost: 0
};

console.log(sortNodeList([
    {
        x: 0,
        y: 0,
        trail: [],
        cost: 5
    },
    {
        x: 0,
        y: 0,
        trail: [],
        cost: 10
    },
    {
        x: 0,
        y: 0,
        trail: [],
        cost: 8
    },
    {
        x: 0,
        y: 0,
        trail: [],
        cost: 1
    },
]));

console.log('buenas');

findPath(start, target, [], map_data);