import React, { useState, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import Resizer from "react-image-file-resizer";

const libraries = ['places'];
const MAX_TOTAL_SIZE_MB = 6;
const MAX_IMAGES = 5;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    service: "",
    preferredLocation: [],
    requirement: "",
    email: "",
    phone: "",
    company: "",
    images: []
  });
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [locationError, setLocationError] = useState(false);
  const services = [
    "Warehouses & Logistics",
    "Tech Parks",
    "Commercial & Retail",
    "Co-working Spaces",
  ];
  const purposes = ["Find a Space", "Find a Tenant"];
  const fileInputRef = useRef(null); 

  // Handle selection from Google Maps Autocomplete
  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.formatted_address) {
      setFormData((prev) => ({
        ...prev,
        preferredLocation: [...prev.preferredLocation, place.formatted_address],
      }));
      if (inputRef.current) {
        inputRef.current.value = ""; // Clear input field after location selection
      }
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Remove location from the list
  const handleRemoveLocation = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      preferredLocation: prev.preferredLocation.filter((_, index) => index !== indexToRemove),
    }));
  };


const handleFileChange = async (e) => {
  const selectedFiles = Array.from(e.target.files);
  let totalSize = formData.images.reduce((acc, img) => acc + img.size, 0);
  let validImages = [...formData.images]; // Keep previously selected images

  const resizeImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        800, // Max width
        600, // Max height
        "JPEG", // Format
        80, // Quality
        0, // Rotation
        async (uri) => {
          const blob = await fetch(uri).then((res) => res.blob()); // Convert base64 to blob
          const resizedFile = new File([blob], file.name, { type: "image/jpeg" });
          resolve(resizedFile);
        },
        "base64"
      );
    });

  for (let file of selectedFiles) {
    if (validImages.length >= 5) break;

    const resizedFile = await resizeImage(file);
    const newSize = resizedFile.size;

    if (totalSize + newSize > 6 * 1024 * 1024) break; // Stop if total size exceeds 6MB

    totalSize += newSize;
    validImages.push(resizedFile);
  }

  if (validImages.length < formData.images.length + selectedFiles.length) {
    alert(`We could only include ${validImages.length} photos due to limits.`);
  }

  setFormData((prevData) => ({
    ...prevData,
    images: validImages,
    totalSize, // Update total size
  }));

  e.target.value = ""; // Clear input to allow re-selecting
};

const handleRemoveFile = (index) => {
  setFormData((prevData) => ({
    ...prevData,
    images: prevData.images.filter((_, i) => i !== index),
  }));
}; 

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("Submitting...");

    // Validate that at least one preferred location is selected
    if (formData.preferredLocation.length === 0) {
      setMessage("");
      setLocationError(true); // Show error message
      setIsSubmitting(false);
      return; // Prevent form submission
    } else {
      setLocationError(false); // Hide error if there's at least one location
    }

    // Prepare the data to be sent in the request
    const { name, service, preferredLocation, requirement, purpose, email, phone, company, images } = formData;
    const payload = new FormData();
    payload.append("name", name);
    payload.append("purpose", purpose);
    payload.append("service", service);
    payload.append("requirement", requirement);
    payload.append("email", email);
    payload.append("phone", phone);
    preferredLocation.forEach((loc, index) => payload.append(`preferredLocation[${index}]`, loc));
    if (company) payload.append("company", company);
    images.forEach((image) => payload.append("images", image));

    setMessage("Your request is being processed...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: payload,
      });

      if (response.ok) {
        setMessage("Your request has been submitted successfully!");
        setFormData({
          name: "",
          service: "",
          preferredLocation: [],
          requirement: "",
          purpose: "",
          email: "",
          phone: "",
          company: "",
	  images: []
        });
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Error submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-900 flex items-center justify-center p-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">

        <div className="max-w-md text-white md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            <br />
            <br />
            Perfect Space. <br className="hidden md:block" />
            Perfect Location. <br className="hidden md:block" />
            Perfect Timing.
          </h2>
          <p className="text-gray-400 mt-4">
            Our AI-driven system will match your requirements with the best possible options, and we'll get back to you soon!
          </p>
          <p className="text-gray-400">
            Please provide your detailed requirements including:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
            <li>Preferred Location</li>
            <li>City</li>
            <li>Property Size</li>
            <li>Specific Needs</li>
          </ul>
          <p className="text-gray-400 mt-4">
            Thank You!
          </p>
        </div>

        <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full md:w-1/3">
          <h2 className="text-lg font-bold mb-4 text-center text-white">Contact Us</h2>

          <form onSubmit={handleSubmit} className="space-y-3" encType="multipart/form-data">
            <div>
              <label className="block text-gray-300 text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md mt-1 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium">Purpose</label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md mt-1 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select purpose</option>
                {purposes.map((purpose, index) => (
                  <option key={index} value={purpose}>{purpose}</option>
                ))}
              </select>
	     </div>
	      {formData.purpose === "Find a Tenant" && (
              <div>
                <label className="block text-gray-300 text-sm font-medium">Upload Photos(Max 5)</label>

                <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" disabled={formData.images.length >= MAX_IMAGES} ref={fileInputRef} />
		{/* ✅ Custom Upload Button */}
                <button
                 type="button"
                 onClick={handleClick}
                 className="bg-blue-600 text-white px-4 py-2 rounded-md"
                 disabled={formData.images.length >= MAX_IMAGES}
                 >
                {formData.images.length === 0
                 ? "Select Photos"
                 : `${formData.images.length} Photo(s) Selected`}
                </button>
		{/* Show selected files */}
                <div className="mt-2">
                 {formData.images.length > 0 ? (
                  formData.images.map((file, index) => (
                  <div key={index} className="text-white text-sm">
                   {file.name}{" "}
                   <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-400 text-sm ml-2"
                    >
                    Remove
                   </button>
                  </div>
                 ))
                ) : (
                 <p className="text-gray-400 text-sm">No Photos selected</p> // ✅ Shows when empty
                )}
               </div>
               <p className="text-gray-400 text-sm mt-1">
                Total size: {(formData.totalSize ? formData.totalSize / 1024 / 1024 : 0).toFixed(2)}MB / {MAX_TOTAL_SIZE_MB}MB
               </p>
	      </div>
              )}
            <div>
              <label className="block text-gray-300 text-sm font-medium">Service</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md mt-1 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a service</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>{service}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium">
	       {formData.purpose === "Find a Tenant" ? "Property Location" : "Preferred Location(s)"}
	      </label>
              <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={libraries}>
                <Autocomplete
                  onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                  onPlaceChanged={handlePlaceSelect}
                >
                  <input
                    type="text"
                    placeholder="Enter preferred location"
                    ref={inputRef}
                    className="w-full p-2 border rounded-md mt-1 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </Autocomplete>
              </LoadScript>
              {/* Error message if no location has been added */}
              {locationError && (
                <p className="text-red-500 text-sm mt-2">Please add at least one preferred location.</p>
              )}
              <ul className="text-gray-300 mt-2">
                {formData.preferredLocation.map((location, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{location}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLocation(index)}
                      className="text-red-500 ml-2 hover:text-red-700"
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium">Requirement</label>
              <textarea
                name="requirement"
                placeholder="Please provide size of the property for better match"
                value={formData.requirement}
                onChange={handleChange}
                required
                rows="3"
                className="w-full p-2 border rounded-md mt-1 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md mt-1 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md mt-1 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium">Company (Optional)</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mt-1 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            {message && <p className="text-center text-sm text-green-400 mt-2">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

