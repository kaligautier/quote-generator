"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function QuoteForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    option: "",
    amount: "",
    customization: 50,
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    field7: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, option: value }))
  }

  const handleSliderChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, customization: value[0] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store form data in localStorage
    localStorage.setItem("quoteFormData", JSON.stringify(formData))
    // Navigate to the confirmation page
    router.push("/confirmation")
  }

  const isFormComplete = Object.values(formData).every((value) => value !== "")

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl">
      <div className="space-y-2">
        <Label htmlFor="option">Option</Label>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Montant</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          placeholder="Entrez un montant"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customization">Niveau de personnalisation</Label>
        <Slider
          id="customization"
          min={0}
          max={100}
          step={1}
          value={[formData.customization]}
          onValueChange={handleSliderChange}
        />
      </div>

      {/* Additional form fields */}
      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
        <div key={num} className="space-y-2">
          <Label htmlFor={`field${num}`}>Champ {num}</Label>
          <Input
            id={`field${num}`}
            name={`field${num}`}
            type="text"
            placeholder={`Entrez la valeur pour le champ ${num}`}
            value={formData[`field${num}` as keyof typeof formData]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <Button type="submit" className="w-full" disabled={!isFormComplete}>
        Générer le devis
      </Button>
    </form>
  )
}

