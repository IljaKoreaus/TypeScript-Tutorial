// EXAMPLES START
let runningUserIdNum = 0;

type Address = {
    street: string
    city: string
    country: "ordered" | "completed"
}

type Person = {
    name: string
    age: number
    isStudent: boolean
    // Optional Property
    address?: Address
}

// TypeScript Unions (Enum)
type UserRole = "guest" | "admin" | "member";

let userRole: UserRole = "guest";

type User = {
    id: number,
    username: string,
    role: UserRole
}

type UpdatedUser = Partial<User>

const users: User[] = [
    { id: runningUserIdNum++, username: "john_doe", role: "member"},
    { id: runningUserIdNum++, username: "jane_smith", role: "admin"},
    { id: runningUserIdNum++, username: "alice_jones", role: "guest"},
]

function updateUser(id: number, updates: UpdatedUser): void {

    let user = users.find(user => user.id === id);

    if (!user) {
        console.log("User not found!");
        return;
    }

    Object.assign(user, updates);
}

function addNewUser(newUser: Omit<User, "id">): User {

    let user: User = {
        id: runningUserIdNum++,
        ...newUser
    }
    users.push(user);
    return user;
}
// EXAMPLES END

type Order = {
    pizza: Pizza,
    status: string,
    id: number
}

type Pizza = {
    id: number,
    name: string,
    price: number
}

let cashInRegister = 100;
let orderQueue: Order[] = [];
let orderId = 1;
let pizzaId = 1;

const menu: Pizza[] = [
    {id: pizzaId, name: "Margherita", price: 8},
    {id: pizzaId++, name: "Pepperoni", price: 10},
    {id: pizzaId++, name: "Hawaiian", price: 10},
    {id: pizzaId++, name: "Veggie", price: 9}
];

// Add utility function "addNewPizza"
// Adds pizza to the menu
// If the pizza already exists
// Updates the price of the pizza
function addNewPizza(newPartialPizza: Omit<Pizza, "id">): void {

    let found = false;

    // // Pizza should have a name and a price
    // if (!newPartialPizza.price || !newPartialPizza.name) {
    //     console.log("A Pizza should have a name and a price!");
    //     return;
    // }

    for (let pizza of menu) {

        if (pizza.name === newPartialPizza.name) {

            Object.assign(pizza, newPartialPizza);
            found = true;
            break;
        }
    }

    if (!found) {
        const newPizza: Pizza = {id: pizzaId++, ...newPartialPizza};
        menu.push(newPizza);
    }
}

// Add Utility Function placeOrder
// 1. finds pizza object in menu
// 2. adds income to cashInRegister,
// 3. Pushes a new "order object" to the orderQueue
// 4. Returns the new order object
function placeOrder(orderName: string): Order | undefined {

    let found = false;
    let order: Order | undefined;

    for (let pizza of menu) {

        if (pizza.name === orderName) {

            cashInRegister += pizza.price;
            found = true;
            order = {pizza: pizza, status: "ordered", id: orderId};
            orderId++;
            orderQueue.push(order);
            break;
        }
    }

    if (!found) {
        `Pizza named ${orderName} not found!`;
        return undefined;
    }

    if (order != undefined) {

        console.log(`Order: ${order.pizza}`);

    } else {

        console.log("Undefined order");

    }

    return order;
}

// Completes an order
function completeOrder(orderId: number): void {

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

// Get The Pizza Details
function getPizzaDetail(pizzaIdentifier: number | string): Pizza | undefined {

    try {
        // Searched for the pizza with an id number
        if (typeof(pizzaIdentifier) === "number") {

            const pizza = menu.find(pizzaObj => pizzaObj.id === pizzaIdentifier);

            if (pizza != undefined) {
                console.log(`Found Pizza: ${pizza.name} ${pizza.id}`);
                return pizza;
            } else {
                console.log("Didn't find a pizza with the specified number...");
                return undefined;
            }

        // Searched for the pizza with a name or a string number
        } else if (typeof(pizzaIdentifier) === "string") {

            const pizza = menu.find(pizzaObj => pizzaObj.name === pizzaIdentifier);

            if (pizza != undefined) {
                console.log(`Found Pizza: ${pizza.name} ${pizza.id}`);
                return pizza;
            } else {
                console.log("Didn't find a pizza with the specified name...");
                return undefined;
            }

        // Something Went Wrong...
        } else {

            throw new TypeError("Pizza Identifier Needs To Be Of Type String Or Int!");
        }

    } catch (error) {

        console.log(`Whoops! An Error Occurred: ${error}`);
    }
}

function addToArray<T>(array: T[], item: T): void {
    array.push(item);
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