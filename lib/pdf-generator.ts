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

  // Create a simple PDF structure
  // This is a minimal valid PDF file structure
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
<< /Length 170 >>
stream
BT
/F1 24 Tf
50 700 Td
(Invoice ${data.invoiceNumber}) Tj
/F1 12 Tf
0 -50 Td
(Client: ${data.client.name}) Tj
0 -20 Td
(Total Amount: $${data.total.toFixed(2)}) Tj
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
0000000471 00000 n
trailer
<< /Size 7 /Root 1 0 R >>
startxref
538
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

  // Create CSV content
  let csvContent = "Description,Quantity,Unit Price,Amount\n"

  // Add rows for each invoice item
  data.items.forEach((item: any) => {
    csvContent += `"${item.description}",${item.quantity},${item.unitPrice.toFixed(2)},${item.amount.toFixed(2)}\n`
  })

  // Add summary data
  csvContent += "\n"
  csvContent += `Subtotal,,,$${data.subtotal.toFixed(2)}\n`
  csvContent += `Tax (${data.taxRate}%),,,$${data.taxAmount.toFixed(2)}\n`
  csvContent += `Total,,,$${data.total.toFixed(2)}\n`

  // Add client information
  csvContent += "\n"
  csvContent += `Client,${data.client.name}\n`
  csvContent += `Email,${data.client.email}\n`
  csvContent += `Invoice Number,${data.invoiceNumber}\n`
  csvContent += `Invoice Date,${new Date(data.date).toLocaleDateString()}\n`
  csvContent += `Due Date,${new Date(data.dueDate).toLocaleDateString()}\n`

  // Create a blob that represents a CSV
  return new Blob([csvContent], { type: "text/csv;charset=utf-8" })
}

