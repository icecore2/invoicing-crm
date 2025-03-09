"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { ChromePicker } from "react-color"

interface ElementPropertiesProps {
  element: any
  onUpdate: (properties: any) => void
}

export function ElementProperties({ element, onUpdate }: ElementPropertiesProps) {
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [activeColorProp, setActiveColorProp] = useState<string | null>(null)

  if (!element) {
    return <div className="p-4 text-center text-sm text-muted-foreground">Select an element to edit its properties</div>
  }

  const updateContent = (key: string, value: any) => {
    const newContent = { ...element.content, [key]: value }
    onUpdate({ content: newContent })
  }

  const updateStyle = (key: string, value: any) => {
    const newStyles = { ...element.styles, [key]: value }
    onUpdate({ styles: newStyles })
  }

  const handleColorChange = (color: any) => {
    if (!activeColorProp) return

    if (activeColorProp === "backgroundColor") {
      updateStyle("backgroundColor", color.hex)
    } else if (activeColorProp === "color") {
      updateStyle("color", color.hex)
    } else if (activeColorProp === "borderColor") {
      // Handle border styles correctly
      const borderStyle = element.styles.borderStyle || "solid"
      const borderWidth = element.styles.borderWidth || "1px"
      updateStyle("border", `${borderWidth} ${borderStyle} ${color.hex}`)
    }
  }

  const renderContentEditor = () => {
    switch (element.type) {
      case "header":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={element.content.companyName || ""}
                onChange={(e) => updateContent("companyName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyDetails">Company Details</Label>
              <Textarea
                id="companyDetails"
                value={element.content.companyDetails || ""}
                onChange={(e) => updateContent("companyDetails", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoiceTitle">Invoice Title</Label>
              <Input
                id="invoiceTitle"
                value={element.content.invoiceTitle || ""}
                onChange={(e) => updateContent("invoiceTitle", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Invoice Number Format</Label>
              <Input
                value={element.content.invoiceNumber || "{{invoice_number}}"}
                onChange={(e) => updateContent("invoiceNumber", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Date Format</Label>
              <Input
                value={element.content.invoiceDate || "{{invoice_date}}"}
                onChange={(e) => updateContent("invoiceDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Due Date Format</Label>
              <Input
                value={element.content.dueDate || "{{due_date}}"}
                onChange={(e) => updateContent("dueDate", e.target.value)}
              />
            </div>
          </div>
        )

      case "billTo":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                value={element.content.title || "Bill To:"}
                onChange={(e) => updateContent("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Client Name Format</Label>
              <Input
                value={element.content.clientName || "{{client_name}}"}
                onChange={(e) => updateContent("clientName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Client Company Format</Label>
              <Input
                value={element.content.clientCompany || "{{client_company}}"}
                onChange={(e) => updateContent("clientCompany", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Client Address Format</Label>
              <Input
                value={element.content.clientAddress || "{{client_address}}"}
                onChange={(e) => updateContent("clientAddress", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Client Email Format</Label>
              <Input
                value={element.content.clientEmail || "{{client_email}}"}
                onChange={(e) => updateContent("clientEmail", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Client Phone Format</Label>
              <Input
                value={element.content.clientPhone || "{{client_phone}}"}
                onChange={(e) => updateContent("clientPhone", e.target.value)}
              />
            </div>
          </div>
        )

      case "table":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Column Headers</Label>
              <Input
                value={(element.content.headers || []).join(", ")}
                onChange={(e) => updateContent("headers", e.target.value.split(", "))}
                placeholder="Description, Quantity, Unit Price, Amount"
              />
              <p className="text-xs text-muted-foreground">Separate headers with commas</p>
            </div>

            <div className="space-y-2">
              <Label>Items Format</Label>
              <Input
                value={element.content.items || "{{invoice_items}}"}
                onChange={(e) => updateContent("items", e.target.value)}
                disabled
              />
              <p className="text-xs text-muted-foreground">This will be populated from invoice items</p>
            </div>

            <div className="space-y-2">
              <Label>Subtotal Format</Label>
              <Input
                value={element.content.subtotal || "{{subtotal}}"}
                onChange={(e) => updateContent("subtotal", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Tax Format</Label>
              <Input
                value={element.content.tax || "{{tax_amount}}"}
                onChange={(e) => updateContent("tax", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Total Format</Label>
              <Input
                value={element.content.total || "{{total}}"}
                onChange={(e) => updateContent("total", e.target.value)}
              />
            </div>
          </div>
        )

      case "text":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title (Optional)</Label>
              <Input
                id="title"
                value={element.content.title || ""}
                onChange={(e) => updateContent("title", e.target.value)}
                placeholder="Section Title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="text">Text Content</Label>
              <Textarea
                id="text"
                value={element.content.text || ""}
                onChange={(e) => updateContent("text", e.target.value)}
                rows={5}
              />
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  const text = element.content.text || ""
                  updateContent("text", `**${text}**`)
                }}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  const text = element.content.text || ""
                  updateContent("text", `*${text}*`)
                }}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  const text = element.content.text || ""
                  updateContent("text", `_${text}_`)
                }}
              >
                <Underline className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case "image":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="src">Image URL</Label>
              <Input
                id="src"
                value={element.content.src || ""}
                onChange={(e) => updateContent("src", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={element.content.alt || ""}
                onChange={(e) => updateContent("alt", e.target.value)}
                placeholder="Image description"
              />
            </div>

            <div className="space-y-2">
              <Label>Image Alignment</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateStyle("textAlign", "left")}
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateStyle("textAlign", "center")}
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateStyle("textAlign", "right")}
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No content properties available for this element type
          </div>
        )
    }
  }

  const renderStyleEditor = () => {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Background Color</Label>
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-md border cursor-pointer"
              style={{ backgroundColor: element.styles.backgroundColor || "transparent" }}
              onClick={() => {
                setActiveColorProp("backgroundColor")
                setColorPickerOpen(true)
              }}
            />
            <Input
              value={element.styles.backgroundColor || "transparent"}
              onChange={(e) => updateStyle("backgroundColor", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Text Color</Label>
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-md border cursor-pointer"
              style={{ backgroundColor: element.styles.color || "#000000" }}
              onClick={() => {
                setActiveColorProp("color")
                setColorPickerOpen(true)
              }}
            />
            <Input value={element.styles.color || "#000000"} onChange={(e) => updateStyle("color", e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Padding (px)</Label>
          <Input
            type="number"
            value={Number.parseInt(element.styles.padding || "0")}
            onChange={(e) => updateStyle("padding", `${e.target.value}px`)}
            min="0"
            max="100"
          />
        </div>

        <div className="space-y-2">
          <Label>Font Size (px)</Label>
          <Input
            type="number"
            value={Number.parseInt(element.styles.fontSize || "16")}
            onChange={(e) => updateStyle("fontSize", `${e.target.value}px`)}
            min="8"
            max="72"
          />
        </div>

        <div className="space-y-2">
          <Label>Font Weight</Label>
          <Select
            value={element.styles.fontWeight || "normal"}
            onValueChange={(value) => updateStyle("fontWeight", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select font weight" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="bold">Bold</SelectItem>
              <SelectItem value="bolder">Bolder</SelectItem>
              <SelectItem value="lighter">Lighter</SelectItem>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="200">200</SelectItem>
              <SelectItem value="300">300</SelectItem>
              <SelectItem value="400">400</SelectItem>
              <SelectItem value="500">500</SelectItem>
              <SelectItem value="600">600</SelectItem>
              <SelectItem value="700">700</SelectItem>
              <SelectItem value="800">800</SelectItem>
              <SelectItem value="900">900</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Text Alignment</Label>
          <div className="flex gap-2">
            <Button
              variant={element.styles.textAlign === "left" ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => updateStyle("textAlign", "left")}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={element.styles.textAlign === "center" ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => updateStyle("textAlign", "center")}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant={element.styles.textAlign === "right" ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => updateStyle("textAlign", "right")}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Border</Label>
          <div className="flex items-center gap-2">
            <Select
              value={element.styles.borderStyle || "none"}
              onValueChange={(value) => updateStyle("borderStyle", value)}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="dashed">Dashed</SelectItem>
                <SelectItem value="dotted">Dotted</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              value={Number.parseInt(element.styles.borderWidth || "1")}
              onChange={(e) => updateStyle("borderWidth", `${e.target.value}px`)}
              min="0"
              max="10"
              className="w-16"
              placeholder="Width"
            />

            <div
              className="h-8 w-8 rounded-md border cursor-pointer"
              style={{ backgroundColor: element.styles.borderColor || "#000000" }}
              onClick={() => {
                setActiveColorProp("borderColor")
                setColorPickerOpen(true)
              }}
            />
          </div>
        </div>

        {/* Advanced styling options could be added here */}
      </div>
    )
  }

  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-2">
        Edit {element.type.charAt(0).toUpperCase() + element.type.slice(1)} Element
      </h3>

      <Tabs defaultValue="content" className="mt-4">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-4">
          {renderContentEditor()}
        </TabsContent>

        <TabsContent value="style" className="mt-4">
          {renderStyleEditor()}
        </TabsContent>
      </Tabs>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <Label>Visible</Label>
          <Switch checked={element.visible} onCheckedChange={(value) => onUpdate({ visible: value })} />
        </div>

        <div className="flex items-center justify-between">
          <Label>Locked</Label>
          <Switch checked={element.locked} onCheckedChange={(value) => onUpdate({ locked: value })} />
        </div>
      </div>

      {colorPickerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setColorPickerOpen(false)}
        >
          <div className="bg-white rounded-lg p-4" onClick={(e) => e.stopPropagation()}>
            <ChromePicker
              color={
                activeColorProp === "backgroundColor"
                  ? element.styles.backgroundColor
                  : activeColorProp === "color"
                    ? element.styles.color
                    : element.styles.borderColor
              }
              onChange={handleColorChange}
            />
            <Button className="w-full mt-4" onClick={() => setColorPickerOpen(false)}>
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

