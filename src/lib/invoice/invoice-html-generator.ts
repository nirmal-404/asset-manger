export function generateInvoiceHtml(
  invoiceNumber: string,
  purchaseDate: Date,
  assetTitle: string,
  price: number
): string {
  const formattedDate = purchaseDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedPrice = (price).toFixed(2);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice ${invoiceNumber}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 40px;
          color: #333;
        }
        .invoice-box {
          max-width: 800px;
          margin: auto;
          padding: 30px;
          border: 1px solid #eee;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        }
        .invoice-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .invoice-title {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 30px;
          color: #2c3e50;
        }
        .company-details, .customer-details {
          margin-bottom: 20px;
        }
        h2 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #2c3e50;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        table th, table td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        table th {
          background-color: #f8f9fa;
        }
        .total {
          font-weight: bold;
          font-size: 18px;
          margin-top: 20px;
          text-align: right;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          color: #777;
          font-size: 12px;
        }
        @media print {
          body {
            padding: 0;
          }
          .invoice-box {
            box-shadow: none;
            border: none;
          }
          .print-button {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="invoice-box">
        <div class="invoice-header">
          <div>
            <div class="invoice-title">INVOICE</div>
            <div>Invoice Number: ${invoiceNumber}</div>
            <div>Date: ${formattedDate}</div>
          </div>
        </div>
        
        <div class="company-details">
          <h2>From</h2>
          <div>Asset Manager Inc.</div>
          <div>123 Business Street</div>
          <div>Business City, 12345</div>
          <div>Email: billing@assetmanager.com</div>
        </div>
      
        
        <h2>Purchase Details</h2>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${assetTitle}</td>
              <td>$${formattedPrice}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="total">
          Total: $${formattedPrice}
        </div>
        
        <div class="footer">
          <p>Thank you for your purchase!</p>
          <p>This is an automatically generated invoice.</p>
        </div>
        
        <button class="print-button" onclick="window.print()">Print Invoice</button>
      </div>
    </body>
    </html>
  `;
}
