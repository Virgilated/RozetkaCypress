import { MainPage } from '../../src/pageobjects/main.page';
import { GoodsPage } from '../../src/pageobjects/goods.page';
import { CheckoutPage } from '../../src/pageobjects/checkout.page';
import { CategoryPage } from '../../src/pageobjects/category.page';

describe(`My Test`, () => {
   let mainPage = new MainPage();
   let categoryPage = new CategoryPage();
   let goodsPage = new GoodsPage();
   let checkoutPage = new CheckoutPage();
   let myProducts = [];
   let checkoutProducts = [];
   const quantityOfProducts = Math.floor(Math.random() * 6 + 2);

   after(() => {
      cy.clearAllCookies();
   });

   context(`Step 1 - Go to Website`, () => {
      before(() => {
         mainPage.visit();
      });

      it(`Validate Categories is Visible`, () => {
         mainPage.categories.should(`be.visible`);
      });
   });
   context(`Step 2 - Go to Category Page`, () => {
      before(() => {
         mainPage.categories.contains(`Ноутбуки та комп’ютери`).click();
      });
      it(`Validate Subcategory is Visible`, () => {
         categoryPage.allCategoriesBlocksHeaders.should(`be.visible`);
      });
      it(`Validate Header`, () => {
         categoryPage.header.should(`have.text`, `Комп'ютери та ноутбуки`);
      });
   });
   context(`Step 3 - Go To Goods Page`, () => {
      before(() => {
         categoryPage.clickOnRandomGroup();
      });
      it(`Validate Products are Visible`, () => {
         goodsPage.allItems.should(`be.visible`);
      });
      it(`Validate Products Buy Buttons are Visible`, () => {
         goodsPage.allItemsBuyButton.should(`be.visible`);
      });
      it(`Validate Products Prices are Visible`, () => {
         goodsPage.allItemsPrice.should(`be.visible`);
      });
      it(`Validate Products Titles are Visible`, () => {
         goodsPage.allItemsTitle.should(`be.visible`);
      });
   });
   context(`Step 4 - Add ${quantityOfProducts} Products To The Cart`, () => {
      before(() => {
         cy.intercept(
            `POST`,
            `https://uss.rozetka.com.ua/session/cart-se/add`
         ).as(`add`);
         myProducts = goodsPage.getRandomProducts(quantityOfProducts);
      });
      it(`Validate Response Number of Products Equals ${quantityOfProducts}`, () => {
         cy.get(`@add`)
            .its(`response.body`)
            .then((body) => {
               expect(`${body.purchases.goods.length}`).to.equal(
                  `${quantityOfProducts}`
               );
            });
      });
      it(`Validate Number Of Products On Cart Badge Equals ${quantityOfProducts}`, () => {
         goodsPage.numberOfGoodsInCart.invoke(`text`).then((quantityText) => {
            let quantity = Number(quantityText);
            expect(quantity).to.equal(quantityOfProducts);
         });
      });
   });
   context(`Step 5 - Open Cart Modal Window`, () => {
      before(() => {
         goodsPage.headerCartButton.click();
      });
      it(`Validate Products In Cart are Visible`, () => {
         goodsPage.cartModal.products.should(`be.visible`);
      });
      it(`Validate Products Prices In Cart are Visible`, () => {
         goodsPage.cartModal.productPrice.should(`be.visible`);
      });
      it(`Validate Products Quaintity In Cart Equals ${quantityOfProducts}`, () => {
         goodsPage.cartModal.productsBody.should(
            `have.length`,
            quantityOfProducts
         );
      });
      it(`Validate Products Titles in Cart Equal The Titles On Goods Page`, () => {
         myProducts.forEach((el) => {
            cy.log(el.title);
            cy.log(el.price);
         });
         myProducts.toReversed().forEach((el, index) => {
            goodsPage.cartModal.allProductsTitles
               .eq(index)
               .invoke(`text`)
               .then((title) => {
                  expect(goodsPage.getNormalizedTitle(title)).to.equal(
                     el.title
                  );
               });
         });
      });
      it(`Validate Products Prices in Cart Equal The Prices On Goods Page`, () => {
         myProducts.toReversed().forEach((el, index) => {
            goodsPage.cartModal.allProductsPrices
               .eq(index)
               .invoke(`text`)
               .then((price) => {
                  expect(goodsPage.getNormalizedAmount(price)).to.equal(
                     el.price
                  );
               });
         });
      });
   });
   context(`Step 6 - Go to Checkout Page`, () => {
      before(() => {
         goodsPage.cartModal.submitButton.click();
         checkoutProducts = checkoutPage.getCheckoutProductsInfo();
      });
      it(`Validate User Information Choise Buttons is Visible`, () => {
         checkoutPage.userChoise.should(`be.visible`);
      });
      it(`Validate Name Input In Contact Block is Visible`, () => {
         checkoutPage.contactNameInput.should(`be.visible`);
      });
      it(`Validate Surname Input in Contact Block is Visible`, () => {
         checkoutPage.contactSurnameInput.should(`be.visible`);
      });
      it(`Validate Email Input in Contact Block is Visible`, () => {
         checkoutPage.contactEmailInput.should(`be.visible`);
      });
      it(`Validate Products are Visible`, () => {
         checkoutPage.allProducts.should(`be.visible`);
      });
      it(`Validate Products Titles are Visible`, () => {
         checkoutPage.allProductsTitles.should(`be.visible`);
      });
      it(`Validate Products Prices are Visible`, () => {
         checkoutPage.allProductsQuantity.should(`be.visible`);
      });
      it(`Validate Products Quantity are Visible`, () => {
         checkoutPage.allProductsQuantity.should(`be.visible`);
      });
      it(`Validate Deliveries are Visible`, () => {
         checkoutPage.allDeliveries.should(`be.visible`);
      });
      it(`Validate Deliveries Prices are Visible`, () => {
         checkoutPage.allDeliveriesPrices.should(`be.visible`);
      });
      it(`Validate All Payment Methods are Visible`, () => {
         checkoutPage.allPaymentsMethods.should(`be.visible`);
      });
      it(`Validate Recipient Name Input is Visible`, () => {
         checkoutPage.contactRecipientName.should(`be.visible`);
      });
      it(`Validate Recipient Surname Input is Visible`, () => {
         checkoutPage.contactRecipientSurname.should(`be.visible`);
      });
      it(`Validate Recipient Thirdname Input is Visible`, () => {
         checkoutPage.contactRecipientThirdname.should(`be.visible`);
      });
      it(`Validate Total Value is Visible`, () => {
         checkoutPage.totalValue.should(`be.visible`);
      });
      it(`Validate Submit Button is Visible`, () => {
         checkoutPage.submitButton.should(`be.visible`);
      });
      it(`Validate Products Titles Equal The Titles On Goods Page`, () => {
         myProducts.forEach((product) => {
            checkoutPage.allProducts.contains(product.title).should(`exist`);
         });
      });
      it(`Validate Products Prices Equal The Prices On Goods Page`, () => {
         myProducts.forEach((product) => {
            checkoutPage.allProducts
               .contains(product.title)
               .parent()
               .within(() => {
                  checkoutPage.allProductsPrices
                     .first()
                     .invoke(`text`)
                     .then((price) => {
                        return checkoutPage.getNormalizedAmount(price);
                     })
                     .should(`eq`, product.price);
               });
         });
      });
      it(`Validate Products Sum Amount Equals The Price Multiplied by Quantity`, () => {
         checkoutProducts.forEach((el, index, array) => {
            expect(el.sum).to.equal(el.price * el.quantity);
         });
      });
      it(`Validate Total Value Equals The Sums Of All Products`, () => {
         let totalSum = checkoutProducts.reduce((total, el) => {
            return total + el.sum;
         }, 0);
         checkoutPage.totalValue.invoke(`text`).then((value) => {
            expect(checkoutPage.getNormalizedAmount(value)).to.equal(totalSum);
         });
      });
   });
});
