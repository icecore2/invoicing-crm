"use client"

import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useState } from "react"
import { generatePdf, generateCsv } from "@/lib/pdf-generator"
import { useToast } from "@/components/ui/use-toast"

interface DownloadInvoiceProps {
  invoiceId: string
  invoiceData: any
}

export function DownloadInvoice({ invoiceId, invoiceData }: DownloadInvoiceProps) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [isGeneratingCsv, setIsGeneratingCsv] = useState(false)
  const { toast } = useToast()

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true)

      const pdfBlob = await generatePdf({
        title: `Invoice ${invoiceData.invoiceNumber}`,
        filename: `invoice-${invoiceData.invoiceNumber}.pdf`,
        data: invoiceData,
      })

      // Create a download link and trigger it
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `invoice-${invoiceData.invoiceNumber}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "PDF Downloaded",
        description: `Invoice ${invoiceData.invoiceNumber} has been downloaded as PDF.`,
      })
    } catch (error) {
      console.error("Failed to generate PDF:", error)
      toast({
        title: "Download Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const handleDownloadCsv = async () => {
    try {
      setIsGeneratingCsv(true)

      const csvBlob = await generateCsv({
        title: `Invoice ${invoiceData.invoiceNumber}`,
        filename: `invoice-${invoiceData.invoiceNumber}.csv`,
        data: invoiceData,
      })

      // Create a download link and trigger it
      const url = URL.createObjectURL(csvBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `invoice-${invoiceData.invoiceNumber}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "CSV Downloaded",
        description: `Invoice ${invoiceData.invoiceNumber} has been downloaded as CSV.`,
      })
    } catch (error) {
      console.error("Failed to generate CSV:", error)
      toast({
        title: "Download Failed",
        description: "There was an error generating the CSV. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingCsv(false)
    }
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={handleDownloadPdf} disabled={isGeneratingPdf}>
        {isGeneratingPdf ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </>
        )}
      </Button>

      <Button variant="outline" size="sm" onClick={handleDownloadCsv} disabled={isGeneratingCsv} className="ml-2">
        {isGeneratingCsv ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" />
            Download CSV
          </>
        )}
      </Button>
    </>
  )
}

