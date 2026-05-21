function calculateOrdersSum(arr) {
    return arr
        .filter(o => o.status == 'paid')
        .reduce((acc, order) => {
            return acc + order.total
        }, 0)
};

function unique(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index)
}

return Math.max(...arr)

arr.reduce((max, current) => {
    return max > current ? max : current
}, arr[0])

new Set(arr).size !== arr.length

function roleFilter(arr, role) {
    return arr.filter(u => u.role === role)
};

function optionsList(arr) {
    return arr.map(user => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`
    }))
};

function tasksCounter(arr) {
    return arr.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
    }, {})
};

function missingFields(backend, ui) {
    const uiIds = new Set(ui.map(t => t.id));

    return backend.filter(task => !uiIds.has(task.id))
};

function missingFields(backendTasks, uiTasks) {
    const uiMap = new Map(uiTasks.map(task => [task.id, task]));

    const result = [];

    for (const backendTask of backendTasks) {
        const uiTask = uiMap.get(backendTask.id);

        if (!uiTask) continue;

        if (uiTask.status !== backendTask.status) {
            result.push({
                id: backendTask.id,
                title: backendTask.title,
                backendStatus: backendTask.status,
                uiStatus: uiTask.status
            })
        }
    };

    return result;
};

function updateUserRole(users, userId, newRole) {
    return users.map(user => user.id === userId ? {...user, role: newRole} : user);
};



function groupByCategory(products) {
    return products.reduce((acc, product) => {
        const category = product.category;

        if (!acc[category]) {
            acc[category] = [];
        }

        acc[category].push(product);

        return acc
    }, {});
}


function sumAll(...arg) {
    if (arg.length === 0) throw new Error('something went wrong');

    return arg
        .filter(i => typeof i === 'string')
        .reduce((acc, el) => acc + el, 0)
}

function equalObj(a, b) {
    return JSON.stringify(a) === JSON.stringify(b)
};


function totalSum(arr) {
    let sum = 0;
    
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }

    return sum
};

function maxPrice(products) {
    if (!products.length) return null;

    return products.reduce((maxProduct, product) => {
        return maxProduct.price > product.price ? maxProduct : product
    })
};

function maxNum(arr) {
    let max = arr[0];

    for(let i = 0; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i]
    }

    return max;
};

const words = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

function count(words) {
    return words.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;

        return acc
    }, {})
};

const arr = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(arr)];