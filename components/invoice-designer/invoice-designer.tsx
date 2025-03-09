"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { ElementToolbar } from "@/components/invoice-designer/element-toolbar"
import { ElementProperties } from "@/components/invoice-designer/element-properties"
import "react-resizable/css/styles.css"
import { Button } from "@/components/ui/button"
import { Trash2, Copy, EyeOff, Lock, Unlock } from "lucide-react"

// Initial design elements
const initialElements = [
  {
    id: "header",
    type: "header",
    content: {
      companyName: "Your Company",
      companyDetails: "123 Business Street\nCity, State, ZIP\ncontact@company.com",
      invoiceTitle: "INVOICE",
      invoiceNumber: "{{invoice_number}}",
      invoiceDate: "{{invoice_date}}",
      dueDate: "{{due_date}}",
    },
    position: { x: 0, y: 0 },
    size: { width: 800, height: 120 },
    locked: false,
    visible: true,
    styles: {
      backgroundColor: "transparent",
      padding: "20px",
      borderBottom: "1px solid #e2e8f0",
    },
  },
  {
    id: "client-info",
    type: "billTo",
    content: {
      title: "Bill To:",
      clientName: "{{client_name}}",
      clientCompany: "{{client_company}}",
      clientAddress: "{{client_address}}",
      clientEmail: "{{client_email}}",
      clientPhone: "{{client_phone}}",
    },
    position: { x: 0, y: 140 },
    size: { width: 300, height: 150 },
    locked: false,
    visible: true,
    styles: {
      backgroundColor: "transparent",
      padding: "20px",
    },
  },
  {
    id: "items-table",
    type: "table",
    content: {
      headers: ["Description", "Quantity", "Unit Price", "Amount"],
      items: "{{invoice_items}}",
      subtotal: "{{subtotal}}",
      tax: "{{tax_amount}}",
      total: "{{total}}",
    },
    position: { x: 0, y: 310 },
    size: { width: 800, height: 300 },
    locked: false,
    visible: true,
    styles: {
      backgroundColor: "transparent",
      padding: "20px",
    },
  },
  {
    id: "notes",
    type: "text",
    content: {
      title: "Notes:",
      text: "Thank you for your business! Payment is due within 14 days.",
    },
    position: { x: 0, y: 630 },
    size: { width: 800, height: 100 },
    locked: false,
    visible: true,
    styles: {
      backgroundColor: "transparent",
      padding: "20px",
      fontSize: "14px",
      color: "#4b5563",
    },
  },
]

export function InvoiceDesigner() {
  const [elements, setElements] = useState(initialElements)
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("elements") // elements or properties

  const selectedElement = elements.find((el) => el.id === selectedElementId)

  // Handle element selection
  const handleSelectElement = (id: string) => {
    setSelectedElementId(id)
    setActiveTab("properties")
  }

  // Handle drag end
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const reorderedElements = Array.from(elements)
    const [removed] = reorderedElements.splice(result.source.index, 1)
    reorderedElements.splice(result.destination.index, 0, removed)

    setElements(reorderedElements)
  }

  // Handle element resize
  const handleResize = (id: string, size: { width: number; height: number }) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, size } : el)))
  }

  // Add new element
  const addElement = (type: string) => {
    const newElement = {
      id: `element-${Date.now()}`,
      type,
      content: {},
      position: { x: 0, y: 0 },
      size: { width: 300, height: 100 },
      locked: false,
      visible: true,
      styles: {
        backgroundColor: "transparent",
        padding: "20px",
      },
    }

    // Set specific content based on element type
    switch (type) {
      case "text":
        newElement.content = { text: "Add your text here" }
        break
      case "image":
        newElement.content = { src: "/placeholder.svg?height=100&width=100", alt: "Image" }
        break
      case "separator":
        newElement.content = {}
        newElement.size = { width: 800, height: 10 }
        newElement.styles = { borderBottom: "1px solid #e2e8f0" }
        break
    }

    setElements([...elements, newElement])
    setSelectedElementId(newElement.id)
    setActiveTab("properties")
  }

  // Update element properties
  const updateElementProperties = (id: string, properties: any) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, ...properties } : el)))
  }

  // Delete selected element
  const deleteElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id))
    setSelectedElementId(null)
  }

  // Duplicate selected element
  const duplicateElement = (id: string) => {
    const elementToDuplicate = elements.find((el) => el.id === id)
    if (!elementToDuplicate) return

    const newElement = {
      ...elementToDuplicate,
      id: `element-${Date.now()}`,
      position: {
        x: elementToDuplicate.position.x + 20,
        y: elementToDuplicate.position.y + 20,
      },
    }

    setElements([...elements, newElement])
    setSelectedElementId(newElement.id)
  }

  // Toggle element visibility
  const toggleElementVisibility = (id: string) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, visible: !el.visible } : el)))
  }

  // Toggle element lock
  const toggleElementLock = (id: string) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, locked: !el.locked } : el)))
  }

  // Render element based on type
  const renderElement = (element: any) => {
    if (!element.visible) return null

    switch (element.type) {
      case "header":
        return (
          <div className="flex justify-between" style={element.styles}>
            <div>
              <h2 className="text-xl font-bold">{element.content.companyName}</h2>
              <div className="text-sm text-gray-600 whitespace-pre-line">{element.content.companyDetails}</div>
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-800">{element.content.invoiceTitle}</h1>
              <p className="text-sm text-gray-600">{element.content.invoiceNumber}</p>
              <p className="text-sm text-gray-600">Date: {element.content.invoiceDate}</p>
              <p className="text-sm text-gray-600">Due: {element.content.dueDate}</p>
            </div>
          </div>
        )

      case "billTo":
        return (
          <div style={element.styles}>
            <h3 className="text-gray-600 font-medium mb-2">{element.content.title}</h3>
            <p className="font-semibold">{element.content.clientName}</p>
            <p className="text-sm text-gray-600">{element.content.clientCompany}</p>
            <p className="text-sm text-gray-600">{element.content.clientAddress}</p>
            <p className="text-sm text-gray-600">{element.content.clientEmail}</p>
            <p className="text-sm text-gray-600">{element.content.clientPhone}</p>
          </div>
        )

      case "table":
        return (
          <div style={element.styles}>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  {element.content.headers?.map((header: string, index: number) => (
                    <th key={index} className="text-left py-2">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b text-gray-600">
                  <td className="py-2">Sample Item</td>
                  <td className="text-right py-2">1</td>
                  <td className="text-right py-2">$100.00</td>
                  <td className="text-right py-2">$100.00</td>
                </tr>
                <tr className="border-b text-gray-600">
                  <td className="py-2">Sample Item 2</td>
                  <td className="text-right py-2">2</td>
                  <td className="text-right py-2">$75.00</td>
                  <td className="text-right py-2">$150.00</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-right py-2 font-medium">
                    Subtotal:
                  </td>
                  <td className="text-right py-2">$250.00</td>
                </tr>
                <tr>
                  <td colSpan={3} className="text-right py-2 font-medium">
                    Tax (10%):
                  </td>
                  <td className="text-right py-2">$25.00</td>
                </tr>
                <tr>
                  <td colSpan={3} className="text-right py-2 font-bold">
                    Total:
                  </td>
                  <td className="text-right py-2 font-bold">$275.00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )

      case "text":
        return (
          <div style={element.styles}>
            {element.content.title && <h3 className="text-gray-600 font-medium mb-2">{element.content.title}</h3>}
            <p className="text-sm text-gray-600">{element.content.text}</p>
          </div>
        )

      case "image":
        return (
          <div style={element.styles}>
            <img
              src={element.content.src || "/placeholder.svg"}
              alt={element.content.alt || "Image"}
              className="max-w-full h-auto"
            />
          </div>
        )

      case "separator":
        return <div style={element.styles}></div>

      default:
        return <div>Unknown element type</div>
    }
  }

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      {/* Left panel */}
      <div className="w-64 border-r flex flex-col">
        <div className="border-b p-2">
          <div className="flex">
            <Button
              variant={activeTab === "elements" ? "default" : "ghost"}
              className="flex-1 text-xs h-8"
              onClick={() => setActiveTab("elements")}
            >
              Elements
            </Button>
            <Button
              variant={activeTab === "properties" ? "default" : "ghost"}
              className="flex-1 text-xs h-8"
              onClick={() => setActiveTab("properties")}
              disabled={!selectedElementId}
            >
              Properties
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {activeTab === "elements" ? (
            <ElementToolbar onAddElement={addElement} />
          ) : (
            <ElementProperties
              element={selectedElement}
              onUpdate={(properties) => updateElementProperties(selectedElementId!, properties)}
            />
          )}
        </div>
      </div>

      {/* Main canvas */}
      <div className="flex-1 bg-gray-50 p-6 overflow-auto">
        <div
          className="bg-white min-h-[1056px] w-[816px] mx-auto shadow-sm border relative"
          style={{ aspectRatio: "210/297" }} // A4 ratio
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="invoice-elements" type="element">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="p-8 min-h-full">
                  {elements.map((element, index) => (
                    <Draggable key={element.id} draggableId={element.id} index={index} isDragDisabled={element.locked}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`
                            relative mb-4 transition-all
                            ${selectedElementId === element.id ? "ring-2 ring-primary ring-offset-2" : ""}
                            ${!element.visible ? "opacity-50" : ""}
                            ${snapshot.isDragging ? "z-10" : ""}
                          `}
                          onClick={() => handleSelectElement(element.id)}
                        >
                          <div {...provided.dragHandleProps} className="h-full w-full">
                            {renderElement(element)}
                          </div>

                          {selectedElementId === element.id && (
                            <div className="absolute -top-4 right-0 flex items-center gap-1">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 bg-white"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleElementVisibility(element.id)
                                }}
                              >
                                <EyeOff className="h-3 w-3" />
                              </Button>

                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 bg-white"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleElementLock(element.id)
                                }}
                              >
                                {element.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                              </Button>

                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 bg-white"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  duplicateElement(element.id)
                                }}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>

                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 bg-white text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteElement(element.id)
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}

