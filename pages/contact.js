import React, { useState, useRef, useEffect } from "react";
import { LoadScript, Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import Resizer from "react-image-file-resizer";

const libraries = ["places"];
const MAX_TOTAL_SIZE_MB = 6;
const MAX_IMAGES = 5;
const BANGALORE_COORDS = { lat: 12.97194, lng: 77.59369 };

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
    images: [],
  });

  const [mapCenter, setMapCenter] = useState(BANGALORE_COORDS);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [locationError, setLocationError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const services = ["Warehouses & Logistics", "Tech Parks", "Commercial & Retail", "Co-working Spaces"];
  const purposes = ["Find a Space", "Find a Tenant"];

  // Google Places Autocomplete Selection
  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.formatted_address) {
      if (!formData.preferredLocation.includes(place.formatted_address)) {
        setFormData((prev) => ({
          ...prev,
          preferredLocation: [...prev.preferredLocation, place.formatted_address],
        }));
        setLocationError(false);
        setMapCenter({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
      }
      if (inputRef.current) inputRef.current.value = ""; // Clear input
    }
  };
  // Handle Map Click to Select a Location
const handleMapClick = async (event) => {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();
  setSelectedCoords({ lat, lng });
    // Ensure Google Maps API is loaded before calling Geocoder
  if (!window.google || !window.google.maps || !window.google.maps.Geocoder) {
    console.error("Google Maps API not loaded!");
    return;
  }
  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ location: { lat, lng } }, (results, status) => {
    if (status === "OK" && results[0]) {
      const formattedAddress = results[0].formatted_address;
      console.log("Geocoded Address:", formattedAddress); // Debugging log
            // Auto-add to the preferredLocation list
      setFormData((prev) => ({
        ...prev,
        preferredLocation: [...prev.preferredLocation, formattedAddress],
      }));
       setLocationError(false);
    } else {
      console.error("Geocoder failed:", status);
    }
  });
};

  // Remove Selected Location
  const handleRemoveLocation = (index) => {
    setFormData((prev) => {
      const updatedLocations = prev.preferredLocation.filter((_, i) => i !== index);
      if (updatedLocations.length === 0) setLocationError(true);
      return { ...prev, preferredLocation: updatedLocations };
    });
  };

  // Update Location Error State
  useEffect(() => {
    if (formData.preferredLocation.length > 0) {
      setLocationError(false);
    }
  }, [formData.preferredLocation]);

  // Handle Form Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Image Upload & Resize
  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    let totalSize = formData.images.reduce((acc, img) => acc + img.size, 0);
    let validImages = [...formData.images];

    const resizeImage = (file) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          800,
          600,
          "JPEG",
          80,
          0,
          async (uri) => {
            const blob = await fetch(uri).then((res) => res.blob());
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          },
          "base64"
        );
      });

    for (let file of selectedFiles) {
      if (validImages.length >= MAX_IMAGES) break;
      const resizedFile = await resizeImage(file);
      const newSize = resizedFile.size;

      if (totalSize + newSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) break;
      totalSize += newSize;
      validImages.push(resizedFile);
    }

    if (validImages.length < formData.images.length + selectedFiles.length) {
      alert(`We could only include ${validImages.length} photos due to size limits.`);
    }

    setFormData((prev) => ({ ...prev, images: validImages }));
    e.target.value = "";
  };

  // Remove Image
  const handleRemoveFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleClick = () => { 
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("Your request is being processed...");

    if (formData.preferredLocation.length === 0) {
      setMessage("");
      setLocationError(true);
      setIsSubmitting(false);
      return;
    }

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "preferredLocation") {
        formData[key].forEach((loc, index) => payload.append(`preferredLocation[${index}]`, loc));
      } else if (key === "images") {
        formData[key].forEach((image) => payload.append("images", image));
      } else {
        payload.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("/api/contact", { method: "POST", body: payload });

      if (response.ok) {
        setMessage("Your request has been submitted successfully!");
        setFormData({
          name: "",
          purpose: "",
          service: "",
          preferredLocation: [],
          requirement: "",
          email: "",
          phone: "",
          company: "",
          images: [],
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

      {/* Google Maps Autocomplete */}
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={libraries}>
        <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={handlePlaceSelect}>
          <input
            type="text"
            placeholder="Enter location"
            ref={inputRef}
            className="w-full p-2 border rounded-md mt-1 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Autocomplete>

        {/* Google Map */}
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "300px", marginTop: "10px" }}
          center={mapCenter}
          zoom={12}
          onClick={(event) => {
    console.log("Map clicked!"); // Debug log 1
    handleMapClick(event);
  }}
	  >
          {selectedCoords && <Marker position={selectedCoords} />}
        </GoogleMap>
      </LoadScript>
      {/* Show Selected Address */}
      {selectedAddress && (
       <div className="mt-2">
        <span className="text-gray-300">{selectedAddress}</span>
       </div>
      )}

      {/* Error message if no location has been added */}
      {locationError && <p className="text-red-500 text-sm mt-2">Please add at least one preferred location.</p>}

      {/* List of Selected Locations */}
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

