import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Settings, AlertTriangle, Save, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const DEFAULT_TEMPLATES = [
  {
    id: "booking_confirmation",
    name: "Booking Confirmation",
    content: "Hello {{1}}, your appointment with {{2}} has been confirmed for {{3}}. We look forward to seeing you!",
    variables: ["Customer Name", "Doctor/Service Provider", "Date & Time"],
    category: "APPOINTMENT_UPDATE"
  },
  {
    id: "appointment_reminder",
    name: "Appointment Reminder",
    content: "Hi {{1}}, this is a reminder that your appointment with {{2}} is tomorrow at {{3}}. Please let us know if you need to reschedule.",
    variables: ["Customer Name", "Doctor/Service Provider", "Time"],
    category: "APPOINTMENT_UPDATE"
  }
];

const TEMPLATE_CATEGORIES = [
  { value: "ACCOUNT_UPDATE", label: "Account Update" },
  { value: "PAYMENT_UPDATE", label: "Payment Update" },
  { value: "PERSONAL_FINANCE_UPDATE", label: "Personal Finance Update" },
  { value: "SHIPPING_UPDATE", label: "Shipping Update" },
  { value: "RESERVATION_UPDATE", label: "Reservation Update" },
  { value: "ISSUE_RESOLUTION", label: "Issue Resolution" },
  { value: "APPOINTMENT_UPDATE", label: "Appointment Update" },
  { value: "TRANSPORTATION_UPDATE", label: "Transportation Update" },
  { value: "TICKET_UPDATE", label: "Ticket Update" },
  { value: "ALERT_UPDATE", label: "Alert Update" }
];

interface Template {
  id: string;
  name: string;
  content: string;
  variables: string[];
  category: string;
}

const WhatsAppTemplateEditor = () => {
  const [templates, setTemplates] = useState<Template[]>(() => {
    const savedTemplates = localStorage.getItem("whatsapp_templates");
    return savedTemplates ? JSON.parse(savedTemplates) : DEFAULT_TEMPLATES;
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Template>({
    id: "",
    name: "",
    content: "",
    variables: [],
    category: "APPOINTMENT_UPDATE"
  });
  
  const [newVariable, setNewVariable] = useState("");
  
  const selectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setFormData({ ...template });
    setIsEditing(false);
  };
  
  const createNewTemplate = () => {
    const newId = `template_${Date.now()}`;
    const newTemplate = {
      id: newId,
      name: "New Template",
      content: "Hello {{1}}, this is a new message template.",
      variables: ["Recipient Name"],
      category: "APPOINTMENT_UPDATE"
    };
    
    setFormData(newTemplate);
    setSelectedTemplate(null);
    setIsEditing(true);
  };
  
  const addVariable = () => {
    if (!newVariable.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      variables: [...prev.variables, newVariable]
    }));
    
    setNewVariable("");
  };
  
  const removeVariable = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variables: prev.variables.filter((_, i) => i !== index)
    }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };
  
  const saveTemplate = () => {
    if (!formData.name || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    let updatedTemplates: Template[];
    
    if (selectedTemplate) {
      updatedTemplates = templates.map(t => 
        t.id === selectedTemplate.id ? formData : t
      );
    } else {
      updatedTemplates = [...templates, formData];
    }
    
    setTemplates(updatedTemplates);
    localStorage.setItem("whatsapp_templates", JSON.stringify(updatedTemplates));
    
    toast.success(`Template ${selectedTemplate ? "updated" : "created"} successfully`);
    setSelectedTemplate(formData);
    setIsEditing(false);
  };
  
  const deleteTemplate = (id: string) => {
    const updatedTemplates = templates.filter(t => t.id !== id);
    setTemplates(updatedTemplates);
    localStorage.setItem("whatsapp_templates", JSON.stringify(updatedTemplates));
    
    toast.success("Template deleted successfully");
    setSelectedTemplate(null);
    setIsEditing(false);
  };
  
  const previewTemplate = (template: Template) => {
    let previewContent = template.content;
    template.variables.forEach((variable, index) => {
      const placeholder = `{{${index + 1}}}`;
      previewContent = previewContent.replace(placeholder, `<strong>${variable}</strong>`);
    });
    
    return <div dangerouslySetInnerHTML={{ __html: previewContent }} />;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Message Templates</h3>
        <Button variant="outline" size="sm" onClick={createNewTemplate}>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-2">
          <Label>Available Templates</Label>
          <div className="border rounded-md overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto">
              {templates.map(template => (
                <div 
                  key={template.id}
                  className={`p-3 cursor-pointer border-b last:border-b-0 hover:bg-meant-50 transition-colors ${selectedTemplate?.id === template.id ? 'bg-meant-100' : ''}`}
                  onClick={() => selectTemplate(template)}
                >
                  <div className="font-medium">{template.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {template.content.substring(0, 40)}...
                  </div>
                </div>
              ))}
              
              {templates.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  No templates found
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {(selectedTemplate || isEditing) ? (
            <Tabs defaultValue="edit">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="edit">
                  <Settings className="h-4 w-4 mr-2" />
                  {isEditing ? "Create Template" : "Edit Template"}
                </TabsTrigger>
                <TabsTrigger value="preview" disabled={isEditing}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="edit" className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="name">Template Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter template name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {TEMPLATE_CATEGORIES.map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Message Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Enter template content. Use {{1}}, {{2}}, etc. for variables"
                      rows={5}
                    />
                    <p className="text-xs text-muted-foreground">
                      Use placeholders like {{1}}, {{2}} for variable content
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Variables</Label>
                    {formData.variables.map((variable, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="flex-1 flex items-center gap-2 bg-meant-50 p-2 rounded-md">
                          <span className="text-xs font-medium bg-meant-100 px-2 py-1 rounded-md">
                            {`{{${index + 1}}}`}
                          </span>
                          <span>{variable}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          type="button"
                          onClick={() => removeVariable(index)}
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                    
                    <div className="flex gap-2 mt-3">
                      <Input
                        value={newVariable}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewVariable(e.target.value)}
                        placeholder="Add a new variable"
                        className="flex-1"
                        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => 
                          e.key === 'Enter' && addVariable()
                        }
                      />
                      <Button 
                        type="button"
                        onClick={addVariable} 
                        variant="outline"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  
                  <Alert variant="warning">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      WhatsApp templates must be approved before they can be used. Make sure your content follows WhatsApp's guidelines.
                    </AlertDescription>
                  </Alert>
                </div>
                
                <div className="flex justify-between pt-2">
                  {selectedTemplate && (
                    <Button 
                      variant="destructive"
                      onClick={() => deleteTemplate(selectedTemplate.id)}
                    >
                      Delete Template
                    </Button>
                  )}
                  
                  <Button 
                    onClick={saveTemplate}
                    className="ml-auto bg-meant-600 hover:bg-meant-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {selectedTemplate ? "Update Template" : "Save Template"}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="preview">
                {selectedTemplate && (
                  <div className="space-y-4">
                    <div className="p-6 bg-gray-100 rounded-lg border">
                      <div className="bg-white p-4 rounded-lg shadow-sm max-w-md mx-auto border-l-4 border-green-500">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Template Preview</h4>
                        <div className="text-gray-800">
                          {previewTemplate(selectedTemplate)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Template Details</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-muted-foreground">Name:</div>
                        <div>{selectedTemplate.name}</div>
                        
                        <div className="text-muted-foreground">Category:</div>
                        <div>{selectedTemplate.category}</div>
                        
                        <div className="text-muted-foreground">Variables:</div>
                        <div>{selectedTemplate.variables.join(", ")}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Template
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12 border rounded-md">
              <div className="text-center space-y-2">
                <h3 className="font-medium">No Template Selected</h3>
                <p className="text-muted-foreground text-sm">
                  Select an existing template from the list or create a new one
                </p>
                <Button 
                  variant="outline" 
                  onClick={createNewTemplate}
                  className="mt-4"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create New Template
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppTemplateEditor;
