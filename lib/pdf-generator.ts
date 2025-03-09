export interface PdfGeneratorOptions {
  title: string
  filename: string
  data: any
}

// This is a more realistic PDF generator that creates a simple but valid PDF
export async function generatePdf(options: PdfGeneratorOptions): Promise<Blob> {
  // Simulate PDF generation delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const { data } = options

  if (!data) {
    throw new Error("No data provided for PDF generation")
  }

  // Create a more detailed PDF content with all invoice information
  const invoiceItems = data.items
    .map((item: any) => `${item.description},${item.quantity},${item.unitPrice.toFixed(2)},${item.amount.toFixed(2)}`)
    .join("\n")

  // Create a simple PDF structure
  // This is a minimal valid PDF file structure with more detailed content
  const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Font << /F1 6 0 R >> >>
endobj
5 0 obj
<< /Length 1000 >>
stream
BT
/F1 24 Tf
50 750 Td
(Invoice ${data.invoiceNumber}) Tj
/F1 12 Tf
0 -30 Td
(Date: ${new Date(data.date).toLocaleDateString()}) Tj
0 -15 Td
(Due Date: ${new Date(data.dueDate).toLocaleDateString()}) Tj
0 -30 Td
(Bill To:) Tj
0 -15 Td
(${data.client.name}) Tj
0 -15 Td
(${data.client.address}) Tj
0 -15 Td
(${data.client.email}) Tj
0 -15 Td
(${data.client.phone}) Tj
0 -30 Td
(Items:) Tj
0 -15 Td
(Description - Quantity - Unit Price - Amount) Tj
0 -15 Td
(${invoiceItems.replace(/\n/g, " | ")}) Tj
0 -30 Td
(Subtotal: $${data.subtotal.toFixed(2)}) Tj
0 -15 Td
(Tax (${data.taxRate}%): $${data.taxAmount.toFixed(2)}) Tj
0 -15 Td
(Total: $${data.total.toFixed(2)}) Tj
0 -30 Td
(Notes: ${data.notes || "No additional notes"}) Tj
0 -30 Td
(Payment Methods:) Tj
0 -15 Td
(Bank Transfer: First National Bank, Account: 1234567890) Tj
0 -15 Td
(Online Payment: https://pay.yourcompany.com/${data.invoiceNumber}) Tj
ET
endstream
endobj
6 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000210 00000 n
0000000251 00000 n
0000001303 00000 n
trailer
<< /Size 7 /Root 1 0 R >>
startxref
1370
%%EOF`

  // Create a blob that represents a PDF
  return new Blob([pdfContent], { type: "application/pdf" })
}

export async function generateCsv(options: PdfGeneratorOptions): Promise<Blob> {
  // Simulate CSV generation delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const { data } = options

  if (!data || !data.items || !Array.isArray(data.items)) {
    throw new Error("Invalid data structure for CSV generation")
  }

  // Create a more detailed CSV content
  let csvContent = "INVOICE DETAILS\n"
  csvContent += `Invoice Number,${data.invoiceNumber}\n`
  csvContent += `Date,${new Date(data.date).toLocaleDateString()}\n`
  csvContent += `Due Date,${new Date(data.dueDate).toLocaleDateString()}\n`
  csvContent += `Status,${data.status}\n\n`

  // Add client information
  csvContent += "CLIENT INFORMATION\n"
  csvContent += `Name,${data.client.name}\n`
  csvContent += `Email,${data.client.email}\n`
  csvContent += `Phone,${data.client.phone}\n`
  csvContent += `Address,${data.client.address.replace(/,/g, " ")}\n\n`

  // Add invoice items
  csvContent += "INVOICE ITEMS\n"
  csvContent += "Description,Quantity,Unit Price,Amount\n"

  // Add rows for each invoice item
  data.items.forEach((item: any) => {
    csvContent += `"${item.description}",${item.quantity},${item.unitPrice.toFixed(2)},${item.amount.toFixed(2)}\n`
  })

  // Add summary data
  csvContent += "\nSUMMARY\n"
  csvContent += `Subtotal,,,$${data.subtotal.toFixed(2)}\n`
  csvContent += `Tax (${data.taxRate}%),,,$${data.taxAmount.toFixed(2)}\n`
  csvContent += `Total,,,$${data.total.toFixed(2)}\n\n`

  // Add notes
  csvContent += "NOTES\n"
  csvContent += `"${data.notes || "No additional notes"}"\n\n`

  // Add payment information
  csvContent += "PAYMENT INFORMATION\n"
  csvContent += "Bank Transfer,First National Bank,Account: 1234567890,Routing: 987654321\n"
  csvContent += `Online Payment,https://pay.yourcompany.com/${data.invoiceNumber}\n`

  // Create a blob that represents a CSV
  return new Blob([csvContent], { type: "text/csv;charset=utf-8" })
}

