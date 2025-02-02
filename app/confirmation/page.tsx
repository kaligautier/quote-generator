"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import jsPDF from "jspdf"

export default function ConfirmationPage() {
  const [formData, setFormData] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem("quoteFormData")
    if (data) {
      setFormData(JSON.parse(data))
      // Clear the data from localStorage after retrieving it
      localStorage.removeItem("quoteFormData")
    }
  }, [])

  const generatePDF = () => {
    if (!formData) return

    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text("Devis", 105, 15, { align: "center" })
    doc.setFontSize(12)

    let yPos = 30
    Object.entries(formData).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 20, yPos)
      yPos += 10
    })

    doc.save("devis.pdf")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Confirmation</h1>
      <p className="text-xl mb-8">Votre devis a bien été généré.</p>
      <div className="bg-gray-100 p-8 rounded-lg flex flex-col items-center">
        <span className="text-6xl mb-4">📄</span>
        <Button onClick={generatePDF}>Télécharger mon devis</Button>
      </div>
    </main>
  )
}

