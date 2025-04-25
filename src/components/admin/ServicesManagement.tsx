
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Pencil, Trash2, Plus, Calendar, Image, DollarSign } from "lucide-react";
import { useSheetDB } from "@/hooks/useSheetDB";
import { Doctor } from "@/data/doctors";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded, currentImage }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview the image locally
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // In a real app, you would upload this to your server or cloud storage
    setUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      // For this example, we'll just use the local preview as the "uploaded" URL
      // In a real app, this would be replaced with the actual upload logic and URL from your server
      onImageUploaded(previewUrl || "");
      setUploading(false);
      toast({
        title: "Image uploaded",
        description: "Image has been successfully uploaded.",
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col space-y-2 items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
      {previewUrl ? (
        <div className="relative w-full max-w-xs">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-auto rounded-md object-cover"
            style={{ maxHeight: "200px" }}
          />
          <Button 
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => setPreviewUrl(null)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Image className="h-16 w-16 text-gray-400" />
          <p className="text-sm text-gray-500 mt-2">Upload image</p>
        </div>
      )}
      <div className="w-full">
        <Label htmlFor="image-upload" className="sr-only">
          Upload Image
        </Label>
        <Input 
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="cursor-pointer"
        />
      </div>
      {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
    </div>
  );
};

const ServicesManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("doctors");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [editingService, setEditingService] = useState<any | null>(null);
  const { getRecords, createRecord, updateRecord } = useSheetDB();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doctors from your SheetDB
        const doctorsData = await getRecords({ sheet: 'Doctors' });
        if (doctorsData && doctorsData.length > 0) {
          setDoctors(doctorsData);
        } else {
          // If no doctors in SheetDB, use the local data
          const { doctors: localDoctors } = await import('@/data/doctors');
          setDoctors(localDoctors);
        }

        // Fetch services
        const servicesData = await getRecords({ sheet: 'Services' });
        if (servicesData) {
          setServices(servicesData);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        // Fall back to local data for doctors
        const { doctors: localDoctors } = await import('@/data/doctors');
        setDoctors(localDoctors);
      }
    };
    
    fetchData();
  }, []);

  const handleDoctorFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const doctorData = {
        id: editingDoctor?.id || Date.now(),
        name: formData.get('name') as string,
        specialty: formData.get('specialty') as string,
        qualifications: formData.get('qualifications') as string,
        experience: parseInt(formData.get('experience') as string),
        location: formData.get('location') as string,
        availability: formData.get('availability') as string,
        consultationFee: parseFloat(formData.get('consultationFee') as string),
        image: formData.get('image') as string || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        bio: formData.get('bio') as string,
        rating: editingDoctor?.rating || 4.5,
        patientsHelped: editingDoctor?.patientsHelped || 0
      };

      if (editingDoctor) {
        // Update existing doctor
        await updateRecord(editingDoctor.id.toString(), doctorData, { sheet: 'Doctors' });
        setDoctors(prev => prev.map(d => d.id === editingDoctor.id ? doctorData as Doctor : d));
        toast({
          title: "Doctor updated",
          description: "Doctor information has been successfully updated.",
        });
      } else {
        // Create new doctor
        await createRecord(doctorData, { sheet: 'Doctors' });
        setDoctors(prev => [...prev, doctorData as Doctor]);
        toast({
          title: "Doctor added",
          description: "New doctor has been successfully added.",
        });
      }

      setEditingDoctor(null);
    } catch (err) {
      console.error("Error saving doctor:", err);
      toast({
        title: "Error",
        description: "Failed to save doctor information.",
        variant: "destructive"
      });
    }
  };

  const handleServiceFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const serviceData = {
        id: editingService?.id || Date.now(),
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        duration: parseInt(formData.get('duration') as string),
        image: formData.get('image') as string || ""
      };

      if (editingService) {
        // Update existing service
        await updateRecord(editingService.id.toString(), serviceData, { sheet: 'Services' });
        setServices(prev => prev.map(s => s.id === editingService.id ? serviceData : s));
        toast({
          title: "Service updated",
          description: "Service information has been successfully updated.",
        });
      } else {
        // Create new service
        await createRecord(serviceData, { sheet: 'Services' });
        setServices(prev => [...prev, serviceData]);
        toast({
          title: "Service added",
          description: "New service has been successfully added.",
        });
      }

      setEditingService(null);
    } catch (err) {
      console.error("Error saving service:", err);
      toast({
        title: "Error",
        description: "Failed to save service information.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteDoctor = async (id: number) => {
    if (confirm("Are you sure you want to delete this doctor?")) {
      try {
        // In a real app, you would call your API to delete the doctor
        // For now, we'll just update the UI
        setDoctors(prev => prev.filter(d => d.id !== id));
        toast({
          title: "Doctor deleted",
          description: "Doctor has been successfully removed.",
        });
      } catch (err) {
        console.error("Error deleting doctor:", err);
        toast({
          title: "Error",
          description: "Failed to delete doctor.",
          variant: "destructive"
        });
      }
    }
  };

  const handleDeleteService = async (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        // In a real app, you would call your API to delete the service
        setServices(prev => prev.filter(s => s.id !== id));
        toast({
          title: "Service deleted",
          description: "Service has been successfully removed.",
        });
      } catch (err) {
        console.error("Error deleting service:", err);
        toast({
          title: "Error",
          description: "Failed to delete service.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="doctors">Doctors Management</TabsTrigger>
          <TabsTrigger value="services">Services & Pricing</TabsTrigger>
        </TabsList>

        <TabsContent value="doctors" className="mt-6">
          {editingDoctor ? (
            <Card>
              <CardHeader>
                <CardTitle>{editingDoctor.id ? 'Edit Doctor' : 'Add New Doctor'}</CardTitle>
                <CardDescription>
                  Update doctor information and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDoctorFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" defaultValue={editingDoctor.name} required />
                      </div>
                      
                      <div>
                        <Label htmlFor="specialty">Specialty</Label>
                        <Input id="specialty" name="specialty" defaultValue={editingDoctor.specialty} required />
                      </div>
                      
                      <div>
                        <Label htmlFor="qualifications">Qualifications</Label>
                        <Input id="qualifications" name="qualifications" defaultValue={editingDoctor.qualifications} required />
                      </div>

                      <div>
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input id="experience" name="experience" type="number" defaultValue={editingDoctor.experience} required />
                      </div>

                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" defaultValue={editingDoctor.location} />
                      </div>

                      <div>
                        <Label htmlFor="availability">Availability (e.g., Mon, Wed, Fri)</Label>
                        <Input id="availability" name="availability" defaultValue={editingDoctor.availability} />
                      </div>

                      <div>
                        <Label htmlFor="consultationFee">Consultation Fee (INR)</Label>
                        <Input id="consultationFee" name="consultationFee" type="number" defaultValue={editingDoctor.consultationFee} required />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="image">Profile Image</Label>
                        <input type="hidden" name="image" id="image" value={editingDoctor.image} />
                        <ImageUpload 
                          onImageUploaded={(url) => {
                            const imageInput = document.getElementById('image') as HTMLInputElement;
                            if (imageInput) imageInput.value = url;
                          }}
                          currentImage={editingDoctor.image}
                        />
                      </div>

                      <div>
                        <Label htmlFor="bio">Biography</Label>
                        <Textarea 
                          id="bio" 
                          name="bio" 
                          defaultValue={editingDoctor.bio || ''} 
                          rows={5}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setEditingDoctor(null)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Save Doctor
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Doctors</h2>
                <Button onClick={() => setEditingDoctor({
                  id: 0,
                  name: '',
                  specialty: '',
                  qualifications: '',
                  experience: 0,
                  location: '',
                  availability: '',
                  consultationFee: 0,
                  image: '',
                  rating: 4.5,
                  patientsHelped: 0
                })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Doctor
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Qualifications</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Fee (INR)</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {doctors.map((doctor) => (
                        <TableRow key={doctor.id}>
                          <TableCell>
                            <img 
                              src={doctor.image} 
                              alt={doctor.name} 
                              className="w-12 h-12 object-cover rounded-full"
                            />
                          </TableCell>
                          <TableCell>{doctor.name}</TableCell>
                          <TableCell>{doctor.specialty}</TableCell>
                          <TableCell>{doctor.qualifications}</TableCell>
                          <TableCell>{doctor.experience} years</TableCell>
                          <TableCell>₹{doctor.consultationFee.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setEditingDoctor(doctor)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDeleteDoctor(doctor.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          {editingService ? (
            <Card>
              <CardHeader>
                <CardTitle>{editingService.id ? 'Edit Service' : 'Add New Service'}</CardTitle>
                <CardDescription>
                  Update service information and pricing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleServiceFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Service Name</Label>
                        <Input id="name" name="name" defaultValue={editingService.name} required />
                      </div>
                      
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" defaultValue={editingService.category || "therapy"}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="therapy">Therapy</SelectItem>
                            <SelectItem value="spiritual">Spiritual</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="educational">Educational</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="price">Price (INR)</Label>
                        <Input id="price" name="price" type="number" defaultValue={editingService.price} required />
                      </div>

                      <div>
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input id="duration" name="duration" type="number" defaultValue={editingService.duration || 60} required />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="serviceImage">Service Image</Label>
                        <input type="hidden" name="image" id="serviceImage" value={editingService.image} />
                        <ImageUpload 
                          onImageUploaded={(url) => {
                            const imageInput = document.getElementById('serviceImage') as HTMLInputElement;
                            if (imageInput) imageInput.value = url;
                          }}
                          currentImage={editingService.image}
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          name="description" 
                          defaultValue={editingService.description || ''} 
                          rows={5}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setEditingService(null)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Save Service
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Services & Pricing</h2>
                <Button onClick={() => setEditingService({
                  id: 0,
                  name: '',
                  category: 'therapy',
                  description: '',
                  price: 0,
                  duration: 60,
                  image: ''
                })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Service Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Price (INR)</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No services added yet. Add your first service using the button above.
                          </TableCell>
                        </TableRow>
                      ) : (
                        services.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell>
                              {service.image ? (
                                <img 
                                  src={service.image} 
                                  alt={service.name} 
                                  className="w-12 h-12 object-cover rounded"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                                  <DollarSign className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </TableCell>
                            <TableCell>{service.name}</TableCell>
                            <TableCell>
                              <span className="capitalize">{service.category}</span>
                            </TableCell>
                            <TableCell>{service.duration || 60} min</TableCell>
                            <TableCell>₹{parseFloat(service.price).toLocaleString()}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => setEditingService(service)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleDeleteService(service.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesManagement;
