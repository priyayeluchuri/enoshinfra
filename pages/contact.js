import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import React, { useState, useRef, useEffect } from 'react';
import { LoadScript, Autocomplete, GoogleMap, Marker } from '@react-google-maps/api';
import Resizer from 'react-image-file-resizer';
import SEO from '../components/seo'; // Import SEO component

const libraries = ['places'];
const MAX_TOTAL_SIZE_MB = 6;
const MAX_IMAGES = 5;
const BANGALORE_COORDS = { lat: 12.97194, lng: 77.59369 };

export default function Contact({ locale }) {
  const { t } = useTranslation('common');
  const purposes = [
    { value: 'findSpace', label: t('contact.purposes.findSpace') },
    { value: 'findTenant', label: t('contact.purposes.findTenant') },
  ];
  const [formData, setFormData] = useState({
    name: '',
    purpose: '',
    service: '',
    preferredLocation: [],
    requirement: '',
    email: '',
    phone: '',
    company: '',
    images: [],
  });

  const [mapCenter, setMapCenter] = useState(BANGALORE_COORDS);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [locationError, setLocationError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const services = [
    'warehousesLogistics',
    'techParks',
    'commercialRetail',
    'coworkingSpaces',
  ];

  // Track page view on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
      window.gtag('event', 'page_view', {
        page_path: '/contact',
        page_title: 'Contact Page',
        page_language: locale,
      });
    }
  }, [locale]);

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

        // Track location selection
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'select_location', {
            event_category: 'Contact Form',
            event_label: place.formatted_address,
            page_language: locale,
          });
        }
      }
      if (inputRef.current) inputRef.current.value = ''; // Clear input
    }
  };

  // Handle Map Click to Select a Location
  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedCoords({ lat, lng });
    if (!window.google || !window.google.maps || !window.google.maps.Geocoder) {
      console.error('Google Maps API not loaded!');
      return;
    }
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const formattedAddress = results[0].formatted_address;
        setFormData((prev) => ({
          ...prev,
          preferredLocation: [...prev.preferredLocation, formattedAddress],
        }));
        setLocationError(false);

        // Track map click location selection
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'map_click_location', {
            event_category: 'Contact Form',
            event_label: formattedAddress,
            page_language: locale,
          });
        }
      } else {
        console.error('Geocoder failed:', status);
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

    // Track purpose selection
    if (name === 'purpose' && value && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'select_purpose', {
        event_category: 'Contact Form',
        event_label: value,
        page_language: locale,
      });
    }

    // Track service selection
    if (name === 'service' && value && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'select_service', {
        event_category: 'Contact Form',
        event_label: value,
        page_language: locale,
      });
    }
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
          'JPEG',
          80,
          0,
          async (uri) => {
            const blob = await fetch(uri).then((res) => res.blob());
            const resizedFile = new File([blob], file.name, { type: 'image/jpeg' });
            resolve(resizedFile);
          },
          'base64'
        );
      });

    for (let file of selectedFiles) {
      if (validImages.length >= MAX_IMAGES) {
        break;
      }
      const resizedFile = await resizeImage(file);
      const newSize = resizedFile.size;

      if (totalSize + newSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
        break;
      }
      totalSize += newSize;
      validImages.push(resizedFile);
    }

    if (validImages.length < formData.images.length + selectedFiles.length) {
      alert(t('contact.alert.message', { count: validImages.length }));
    }
    setFormData((prev) => ({ ...prev, images: validImages }));

    // Track image upload
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'upload_image', {
        event_category: 'Contact Form',
        event_label: `Images Uploaded: ${validImages.length}`,
        page_language: locale,
      });
    }

    e.target.value = '';
  };

  // Remove Image
  const handleRemoveFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

    // Track image removal
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'remove_image', {
        event_category: 'Contact Form',
        event_label: `Image Removed: ${index}`,
        page_language: locale,
      });
    }
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
    setMessage(t('contact.message.processing'));

    if (formData.preferredLocation.length === 0) {
      setMessage('');
      setLocationError(true);
      setIsSubmitting(false);
      return;
    }

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'preferredLocation') {
        formData[key].forEach((loc, index) => payload.append(`preferredLocation[${index}]`, loc));
      } else if (key === 'images') {
        formData[key].forEach((image) => payload.append('images', image));
      } else {
        payload.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('/api/contact', { method: 'POST', body: payload });

      if (response.ok) {
        setMessage(t('contact.message.success'));

        // Track successful form submission
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submission', {
            event_category: 'Contact Form',
            event_label: 'Contact Form Submitted',
            page_language: locale,
            purpose: formData.purpose,
            service: formData.service,
          });
        }

        setFormData({
          name: '',
          purpose: '',
          service: '',
          preferredLocation: [],
          requirement: '',
          email: '',
          phone: '',
          company: '',
          images: [],
        });
      } else {
        setMessage(t('contact.message.error'));

        // Track failed form submission
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submission_failed', {
            event_category: 'Contact Form',
            event_label: 'Contact Form Submission Failed',
            page_language: locale,
          });
        }
      }
    } catch (error) {
      setMessage(t('contact.message.error'));

      // Track failed form submission
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submission_failed', {
          event_category: 'Contact Form',
          event_label: 'Contact Form Submission Error',
          page_language: locale,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSizeMB = (formData.images.reduce((acc, img) => acc + img.size, 0) / (1024 * 1024)).toFixed(2);

  return (
    <>
      <SEO pageKey="contact.seo" locale={locale} />
      <div className="min-h-[80vh] bg-gray-900 flex items-center justify-center p-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
          <div className="max-w-md text-white md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight whitespace-pre-line">
              {t('contact.formTitle')}
            </h1>
            <p className="text-gray-400 mt-4">{t('contact.description')}</p>
            <p className="text-gray-400">{t('contact.instructions')}</p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>{t('contact.listItems.location')}</li>
              <li>{t('contact.listItems.city')}</li>
              <li>{t('contact.listItems.propertySize')}</li>
              <li>{t('contact.listItems.specificNeeds')}</li>
            </ul>
            <p className="text-gray-400 mt-4">{t('contact.thankYou')}</p>
          </div>

          <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full md:w-1/3">
            <h2 className="text-lg font-bold mb-4 text-center text-white">{t('contact.title')}</h2>

            <form onSubmit={handleSubmit} className="space-y-3" encType="multipart/form-data">
              <div>
                <label className="block text-gray-300 text-sm font-medium">{t('contact.labels.name')}</label>
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
                <label className="block text-gray-300 text-sm font-medium">{t('contact.labels.purpose')}</label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md mt-1 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t('contact.selectPurpose')}</option>
                  {purposes.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              {formData.purpose === 'findTenant' && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium">{t('contact.labels.uploadPhotos')}</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={formData.images.length >= MAX_IMAGES}
                    ref={fileInputRef}
                  />
                  <button
                    type="button"
                    onClick={handleClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    disabled={formData.images.length >= MAX_IMAGES}
                  >
                    {formData.images.length === 0
                      ? t('contact.uploadPhotosText')
                      : `${formData.images.length} ${t('contact.photosSelected')}`}
                  </button>
                  <div className="mt-2">
                    {formData.images.length > 0 ? (
                      formData.images.map((file, index) => (
                        <div key={index} className="text-white text-sm">
                          {file.name}{' '}
                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-400 text-sm ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">{t('contact.noPhotosSelected')}</p>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    {t('contact.totalSizeLabel', {
                      used: totalSizeMB,
                      max: MAX_TOTAL_SIZE_MB,
                    })}
                  </p>
                </div>
              )}
              <div>
                <label className="block text-gray-300 text-sm font-medium">{t('contact.labels.service')}</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md mt-1 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t('contact.selectService')}</option>
                  {services.map((serviceKey, index) => (
                    <option key={index} value={serviceKey}>
                      {t(`contact.services.${serviceKey}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium">
                  {formData.purpose === t('contact.purposes.findTenant')
                    ? t('contact.propertyLocationLabel')
                    : t('contact.locationLabel')}
                </label>
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={libraries}>
                  <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={handlePlaceSelect}>
                    <input
                      type="text"
                      placeholder={t('contact.locationPlaceholder')}
                      ref={inputRef}
                      className="w-full p-2 border rounded-md mt-1 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </Autocomplete>
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '300px', marginTop: '10px' }}
                    center={mapCenter}
                    zoom={12}
                    onClick={handleMapClick}
                  >
                    {selectedCoords && <Marker position={selectedCoords} />}
                  </GoogleMap>
                </LoadScript>
                {selectedAddress && (
                  <div className="mt-2">
                    <span className="text-gray-300">{selectedAddress}</span>
                  </div>
                )}
                {locationError && <p className="text-red-500 text-sm mt-2">{t('contact.locationError')}</p>}
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
                <label className="block text-gray-300 text-sm font-medium">{t('contact.labels.requirement')}</label>
                <textarea
                  name="requirement"
                  placeholder={
                    formData.purpose === 'findTenant'
                      ? t('contact.requirementPlacetenant')
                      : t('contact.requirementPlaceholder')
                  }
                  value={formData.requirement}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full p-2 border rounded-md mt-1 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium">{t('contact.labels.email')}</label>
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
                <label className="block text-gray-300 text-sm font-medium">{t('contact.labels.phone')}</label>
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
                <label className="block text-gray-300 text-sm font-medium">{t('contact.labels.company')}</label>
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
                {isSubmitting ? t('contact.submittingButton') : t('contact.submitButton')}
              </button>
              {message && <p className="text-center text-sm text-green-400 mt-2">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      locale,
    },
  };
}
