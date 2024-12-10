# HTML Email Renderer

HTML Email Renderer is a Visual Studio Code extension that allows you to preview and debug dynamic HTML email templates directly in the editor.

## Features
- Render HTML templates with embedded variables (e.g., `${customer.firstName}`).
- Dynamically substitute variables with provided data objects.
- Preview the final rendered email in a Webview.

## Usage
1. Open your JavaScript or TypeScript file containing an HTML email template and a variables object (e.g., `orderObj`).
2. Run the command **"Preview HTML Email"** from the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
3. View the rendered email in the side panel.

## Example
### JavaScript Template:
```javascript
const orderObj = {
  customer: {
    firstName: 'John',
    lastName: 'Doe',
  },
  orderID: '123456',
  totalPrice: 100,
};

const messageForCustomer = `
  <!DOCTYPE html>
  <html>
    <body>
      <h1>Hello ${customer.firstName}!</h1>
      <p>Your order ID is: ${orderID}</p>
      <p>Total: ${totalPrice} €</p>
    </body>
  </html>
`;

## Requirements
- Visual Studio Code version `1.75.0` or higher.
- Node.js version `14` or higher (for debugging your templates).

## Known Issues
- Currently, variables must follow the `${variableName}` syntax.
- Large HTML templates may render slowly.

## Release Notes
### 1.0.0
- Initial release.
- Render HTML email templates with variable substitution.
- Preview emails directly in a Webview.

## Feedback and Support
- Report issues or suggest new features on [GitHub](https://github.com/your-repo-link).
- For support, contact [mail@miromisolutions.de].
