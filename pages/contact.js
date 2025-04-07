import React, { useState, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ['places'];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    service: "",
    preferredLocation: [],
    requirement: "",
    email: "",
    phone: "",
    company: ""
  });
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const services = [
    "Warehouses & Logistics",
    "Tech Parks",
    "Commercial & Retail",
    "Co-working Spaces",
  ];
  const purposes = ["Find a Space", "Find a Tenant"];

  const handlePlaceSelect = () => {
  const place = autocompleteRef.current?.getPlace();
  if (place && place.formatted_address) {
      setFormData((prev) => ({
        ...prev,
        preferredLocation: [...prev.preferredLocation, place.formatted_address],
      }));
      if (inputRef.current) {
        inputRef.current.value = ""; // Clear the input field after selection
      }
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRemoveLocation = (indexToRemove) => {
  setFormData((prev) => ({
    ...prev,
    preferredLocation: prev.preferredLocation.filter((_, index) => index !== indexToRemove),
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("Submitting..");
    // Prepare minimal data
    const { name, service, preferredLocation, requirement, purpose, email, phone, company } = formData;
    const payload = {
    name,
    purpose,
    service,
    preferredLocation,
    requirement,
    email,
    phone,
    ...(company && { company }), // Only include company if it has value
    };
    setMessage("Your request is being processed..")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Your request has been submitted successfully!");
        setFormData({ name: "", service: "", preferredLocation: [], requirement: "", email: "", phone: "", company: "" });
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

          <form onSubmit={handleSubmit} className="space-y-3">
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
              <label className="block text-gray-300 text-sm font-medium">Preferred Location(s)</label>
              <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={libraries}>
                <Autocomplete
                  onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                  onPlaceChanged={handlePlaceSelect}
                >
                  <input
                    type="text"
                    placeholder="Enter preferred location"
                    ref={inputRef}
	            required
                    className="w-full p-2 border rounded-md mt-1 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </Autocomplete>
              </LoadScript>
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


