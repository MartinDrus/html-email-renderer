const orderObj = {
  customer: {
    firstName: "Martin",
    lastName: "Drus",
    email: "martin@example.com",
  },
  orderID: "123456",
  totalPrice: 100,
  shippingCost: 5,
};

const messageForCustomer = `
  <!DOCTYPE html>
  <html lang="de">
    <body>
      <h1>Hallo ${customer.firstName}!</h1>
      <p>Deine Bestellnummer ist: ${orderID}</p>
      <p>Gesamtpreis: ${totalPrice} €</p>
    </body>
  </html>
`;
