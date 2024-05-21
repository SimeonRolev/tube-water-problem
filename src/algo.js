class Cache {
    constructor() {
        this.entries = [];
    }

    contains(entry) {
        return this.entries.find((e) =>
            entry.every((value, index) => value === e[index])
        );
    }

    add(entry) {
        if (!this.contains(entry)) {
            this.entries.push(entry);
        }
    }
}

const cache = new Cache();

class Posibility {
    constructor(value, parent) {
        this.parent = parent;
        this.value = value;
    }
}

function nextSteps(possibility, capacities) {
    const input = possibility.value;

    if (input.length !== capacities.length) {
        throw Error('Capacities must match input');
    }

    const result = [];

    for (let from = 0; from < capacities.length; from++) {
        for (let to = 0; to < capacities.length; to++) {
            if (
                from !== to && // Can't pour to self
                input[from] !== 0 && // Can't pour from empty
                input[to] !== capacities[to] // Can't pour to full
            ) {
                const copy = Array.from(input); // Copy of the array
                const availableVolume = capacities[to] - input[to];
                if (input[from] > availableVolume) {
                    copy[from] -= availableVolume;
                    copy[to] += availableVolume; // copy[to] = capacities[to]
                } else {
                    copy[from] = 0;
                    copy[to] += input[from];
                }

                if (!cache.contains(copy)) {
                    result.push(new Posibility(copy, possibility));
                    cache.add(copy);
                }
            }
        }
    }

    return result;
}

export function allTubes({
    possibilities = [new Posibility([15, 0, 0], null)],
    capacities = [15, 9, 5],
    target = 7,
    stepNumber = 0,
    stepLimit = 50,
} = {}) {
    if (stepNumber > stepLimit) return -1;
    if (possibilities.length === 0) return -1;
    const resultP = possibilities.find((p) => p.value.includes(target));
    if (resultP) {
        const result = [resultP.value]
        let temp = resultP;
        while(temp.parent !== null) {
            result.unshift(temp.parent.value);
            temp = temp.parent;
        }
        return result
    }

    const nextPossibilities = possibilities.reduce((all, p) => {
        return [...all, ...nextSteps(p, capacities)];
    }, []);

    // console.log(nextPossibilities)

    return allTubes({
        possibilities: nextPossibilities,
        capacities,
        target,
        stepNumber: stepNumber + 1,
        stepLimit,
    });
}

console.log(allTubes({ target: 13, stepLimit: 50 }));
