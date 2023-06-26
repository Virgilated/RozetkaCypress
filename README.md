# Brief Explanation

Good afternoon, ladies and gentlemen. This is my autotest for one of the most popular marketplaces in Ukraine - ["ROZETKA"](https://rozetka.com.ua/ua/) written via `Cypress` framework connected with `Cypress-mochawesome-reporter`. I tested one of the main functions of the site, to be more specific - adding products to the shopping cart.

## Test Steps

1. Open the website.
2. Open the **'Ноутбуки та комп’ютери' (eng. Laptops & Computers)** category.
3. Select the products subcategory randomly.
4. Add random numbers of products to the cart **(but not more than 7)**.
5. Validate products Titles and Prices in the Cart are the same as on the Products Page.
6. Validate the Response Number of Products Equals the Quantity Of Products.
7. Validate the Number Of Products On the Cart Badge Equals the Quantity Of Products.
8. Open Checkout Page.
9. Validate Products Titles and Prices on the Checkout Page are the same as on the Products Page.
10.   Validate the Products Summary Values Meet the formula (Prices \* Quantity) of Products.
11.   Validate Total Value Equals The Summary Of All Products Summary Prices.

## Requirements

You need to have the `Google Chrome v64` browser installed on your PC, otherwise, the tests will be run in the headless mode.

## Installation

Install the npm package before running the tests:

    npm install

### Config

You are able to change the number of products that will be added to cart by simply changing this line in my code (_CartTest.spec.cy.js_):

    13    const quantityOfProducts = X

It's not recommended to set a number greater than **7**.

## Running Tests

To start the test run this command via your terminal:

    npm run test:AddToCart

### Expectations

    ⭕ 34 tests are running
    ✔️ 34 tests are passing
    ❌ 0 tests are failing
