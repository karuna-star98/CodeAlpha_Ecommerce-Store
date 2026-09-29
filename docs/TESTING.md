# Testing Strategy

Use browser testing for the complete UI flow, Postman for REST API checks and MongoDB inspection for persistence.

| # | Test | Expected result |
|---|---|---|
| 1 | Register valid user | User is created and logged in |
| 2 | Register duplicate email | 409 response |
| 3 | Valid login | JWT returned |
| 4 | Invalid password | 401 response |
| 5 | Product list | Products render in grid |
| 6 | Invalid product ID | 404 response |
| 7 | Add item to cart | Cart quantity increases |
| 8 | Change quantity | Server validates stock and cart updates |
| 9 | Empty checkout | Checkout is blocked |
| 10 | Valid checkout | Order created and cart cleared |
| 11 | Unauthenticated cart/order API | 401 response |
| 12 | Insufficient stock | Order is rejected |
| 13 | Refresh browser after login | Session remains until token expiry/logout |
| 14 | Refresh browser after adding items | Cart is restored from MongoDB |

## Proof screenshots to capture
`01-folder-structure.png`, `02-products.png`, `03-product-details.png`, `04-register.png`, `05-login.png`, `06-cart.png`, `07-checkout.png`, `08-order-confirmation.png`, `09-order-history.png`, `10-postman-products.png`, `11-postman-login.png`, `12-postman-order.png`, `13-mongodb.png`, `14-github.png`, `15-readme.png`
