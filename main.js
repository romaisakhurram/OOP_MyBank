#! /usr/bin/env  node
import inquirer from "inquirer";
// class bank account
class bankAccount {
    accountNumber;
    Balance;
    constructor(accountNumber, Balance) {
        this.accountNumber = accountNumber;
        this.Balance = Balance;
    }
    // debit money
    withdraw(amount) {
        if (this.Balance >= amount) {
            this.Balance -= amount;
            console.log(`withdrawl amount $${amount} successful. Remaining balance is $${this.Balance}`);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    //credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.Balance += amount;
        console.log(`deposit of $${amount} successful . Remaining balance $${this.Balance}`);
    }
    // check balnce
    checkBalance() {
        console.log(`Current balnce is: $${this.Balance}`);
    }
}
// class customer
class customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// create bank account
const account = [
    new bankAccount(1001, 500),
    new bankAccount(1002, 1000),
    new bankAccount(1003, 2000)
];
// create customers
const customers = [
    new customer("Ali", "Altaf", "Male", 23, 3162245667, account[0]),
    new customer("Uzair", "Khurram", "Male", 12, 3217945612, account[1]),
    new customer("Sara", "Naseer", "Female", 21, 3225679341, account[2])
];
// function to interact withthe bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt([
            {
                name: "accountNumber",
                type: "number",
                message: "Enter your account number:"
            }
        ]);
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName} ! \n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "withdrawl", "Check Balance", "Exit"]
                }
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit:"
                        }
                    ]);
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "withdrawl":
                    const withdrawlAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdrawl:"
                        }
                    ]);
                    customer.account.withdraw(withdrawlAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Existing bank program");
                    console.log("Thank you for our bank services!");
                    return;
            }
        }
        else {
            console.log("Invalid account number please try again");
        }
    } while (true);
}
service();
