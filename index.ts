type Address = {
    street: string
    city: string
    country: string
}

type Person = {
    name: string
    age: number
    isStudent: boolean
    // Optional Property
    address?: Address
}

type Order = {
    pizza: Pizza,
    status: string,
    id: number
}

type Pizza = {
    name: string,
    price: number
}

const menu = [
    {name: "Margherita", price: 8},
    {name: "Pepperoni", price: 10},
    {name: "Hawaiian", price: 10},
    {name: "Veggie", price: 9}
];

let cashInRegister = 100;
let orderQueue: Order[] = [];
let runningNum = 1;

// Add utility function "addNewPizza"
// Adds pizza to the menu
// If the pizza already exists
// Updates the price of the pizza
function addNewPizza(newPizza: Pizza) {

    let found = false;

    for (let pizza of menu) {

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
function placeOrder(orderName: string) {

    let found = false;
    let order;

    for (let pizza of menu) {

        if (pizza.name === orderName) {

            cashInRegister += pizza.price;
            found = true;
            order = {pizza: pizza, status: "ordered", id: runningNum};
            runningNum++;
            orderQueue.push(order);
            break;
        }
    }

    if (!found) {
        return `Pizza named ${orderName} not found!`;
    }

    if (order !== undefined) {

        console.log(`Order: ${order.pizza}`);

    } else {

        console.log("Undefined order");

    }

    return order;
}

// Completes an order
function completeOrder(orderId: number) {

    let found = false;

    for (let order of orderQueue) {

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