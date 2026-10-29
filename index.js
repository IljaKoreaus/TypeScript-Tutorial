const menu = [
    {name: "Margherita", price: 8},
    {name: "Pepperoni", price: 10},
    {name: "Hawaiian", price: 10},
    {name: "Veggie", price: 9}
];

let cashInRegister = 100;
let orderQueue = [];
let runningNum = 1;

// Add utility function "addNewPizza"
function addNewPizza(newPizza) {

    let found = false;

    for (pizza of menu) {

        if (pizza.name === newPizza.name) {

            pizza.price = newPizza.price;
            found = true;
            break;
        }
    }


    if (!found) {
        menu.push(newPizza);
    }
}

// Add Utility Function placeOrder
// 1. finds pizza object in menu
// 2. adds income to cashInRegister,
// 3. Pushes a new "order object" to the orderQueue
// 4. Returns the new order object
function placeOrder(orderName) {

    let found = false;
    let order;

    for (pizza of menu) {

        if (pizza.name === orderName) {

            cashInRegister += pizza.price;
            found = true;
            order = {pizza: orderName, status: "ordered", id: runningNum};
            runningNum++;
            orderQueue.push(order);
            break;
        }
    }

    if (!found) {
        return `Pizza named ${orderName} not found!`;
    }

    console.log(`Order: ${order.pizza}`);
    return order;
}

function completeOrder(orderId) {

    let found = false;

    for (order of orderQueue) {

        if (order.id === orderId) {

            order.status = "completed";
            console.log(`Order ${orderId} Completed! Pizza: ${order.pizza}`);
            found = true;
            break;
        }
    }


    if (!found) {
        console.log(`${orderId} Order Not Found!`)
    }
}

// Test Output

// addNewPizza
const newPizza1 = {name: "Diavola", price: 20};
const newPizza2 = {name: "Margherita", price: 9};

console.log(menu);
addNewPizza(newPizza1);

console.log("===");

console.log(menu);
addNewPizza(newPizza2);

console.log("===");

console.log(menu);

console.log("===");

// placeOrder
console.log(placeOrder("Diavola"));
console.log(cashInRegister);

console.log(placeOrder("Hawai"));
console.log(cashInRegister);

// completeOrder
completeOrder(1);
completeOrder(4);

console.log(orderQueue);