import React, { useState } from "react";
import {
  Car,
  MapPin,
  DollarSign,
  Calendar,
  Settings,
  Camera,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Users,
  Fuel,
  Zap,
} from "lucide-react";

const PartnerCarRentalRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Vehicle Details
    make: "",
    model: "",
    year: "",
    transmission: "automatic",
    fuelType: "petrol",
    seatingCapacity: 4,

    // Location & Pickup Info
    address: "",
    pickupOptions: [],
    dropoffOptions: [],

    // Pricing & Availability
    dailyRate: "",
    hourlyRate: "",
    availableDates: [],

    // Features & Extras
    features: [],
    extras: [],

    // Photos
    images: [],

    // Policies
    cancellationPolicy: "flexible",
    houseRules: "",
  });

  const steps = [
    { id: 1, title: "Vehicle Details", icon: Car },
    { id: 2, title: "Location & Pickup", icon: MapPin },
    { id: 3, title: "Pricing & Availability", icon: DollarSign },
    { id: 4, title: "Features & Extras", icon: Settings },
    { id: 5, title: "Add Photos", icon: Camera },
    { id: 6, title: "Policies", icon: FileText },
    { id: 7, title: "Review & Publish", icon: CheckCircle },
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 7) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const toggleFeature = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const toggleExtra = (extra) => {
    setFormData((prev) => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter((e) => e !== extra)
        : [...prev.extras, extra],
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Vehicle Details
            </h2>
            <p className="text-gray-600 mb-4">Tell us about your vehicle</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Car Make *
                </label>
                <input
                  type="text"
                  value={formData.make}
                  onChange={(e) => updateFormData("make", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Toyota"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model *
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => updateFormData("model", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Camry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year *
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => updateFormData("year", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 2020"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transmission
                </label>
                <select
                  value={formData.transmission}
                  onChange={(e) =>
                    updateFormData("transmission", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  value={formData.fuelType}
                  onChange={(e) => updateFormData("fuelType", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seating Capacity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      updateFormData(
                        "seatingCapacity",
                        Math.max(1, formData.seatingCapacity - 1)
                      )
                    }
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">
                    {formData.seatingCapacity}
                  </span>
                  <button
                    onClick={() =>
                      updateFormData(
                        "seatingCapacity",
                        formData.seatingCapacity + 1
                      )
                    }
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Location & Pickup Info
            </h2>
            <p className="text-gray-600 mb-4">
              Where can guests pick up your vehicle?
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Options
                </label>
                <div className="space-y-2">
                  {["Airport", "Hotel", "Home Address", "Office"].map(
                    (option) => (
                      <div key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`pickup-${option}`}
                          checked={formData.pickupOptions.includes(option)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateFormData("pickupOptions", [
                                ...formData.pickupOptions,
                                option,
                              ]);
                            } else {
                              updateFormData(
                                "pickupOptions",
                                formData.pickupOptions.filter(
                                  (o) => o !== option
                                )
                              );
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`pickup-${option}`}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {option}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Drop-off Options
                </label>
                <div className="space-y-2">
                  {[
                    "Same Location",
                    "Different Location",
                    "Airport",
                    "Hotel",
                  ].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`dropoff-${option}`}
                        checked={formData.dropoffOptions.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFormData("dropoffOptions", [
                              ...formData.dropoffOptions,
                              option,
                            ]);
                          } else {
                            updateFormData(
                              "dropoffOptions",
                              formData.dropoffOptions.filter(
                                (o) => o !== option
                              )
                            );
                          }
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`dropoff-${option}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Pricing & Availability
            </h2>
            <p className="text-gray-600 mb-4">
              Set your rates and availability
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Daily Rate ($)
                </label>
                <input
                  type="number"
                  value={formData.dailyRate}
                  onChange={(e) => updateFormData("dailyRate", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => updateFormData("hourlyRate", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Dates
              </label>
              <div className="border border-gray-300 rounded-lg p-4">
                <p className="text-gray-500 text-center">
                  Calendar will appear here in full version
                </p>
                <p className="text-gray-400 text-center text-sm mt-2">
                  (Select available dates for booking)
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Features & Extras
            </h2>
            <p className="text-gray-600 mb-4">
              What features and extras do you offer?
            </p>

            <div>
              <h3 className="font-medium text-gray-700 mb-3">Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { value: "ac", label: "Air Conditioning", icon: Zap },
                  { value: "gps", label: "GPS Navigation", icon: MapPin },
                  { value: "bluetooth", label: "Bluetooth", icon: Settings },
                  { value: "usb", label: "USB Ports", icon: Settings },
                  { value: "sunroof", label: "Sunroof", icon: Settings },
                  { value: "cruise", label: "Cruise Control", icon: Settings },
                ].map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.features.includes(feature.value)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => toggleFeature(feature.value)}
                    >
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="text-sm font-medium">
                          {feature.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-3">Extras</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { value: "baby", label: "Baby Seat" },
                  { value: "insurance", label: "Insurance" },
                  { value: "wifi", label: "WiFi" },
                  { value: "charger", label: "Phone Charger" },
                ].map((extra) => (
                  <div
                    key={extra.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.extras.includes(extra.value)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => toggleExtra(extra.value)}
                  >
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{extra.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Add Photos</h2>
            <p className="text-gray-600 mb-4">
              Upload clear photos of your vehicle (minimum 4)
            </p>

            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload files</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="h-24 w-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = [...formData.images];
                        newImages.splice(index, 1);
                        setFormData({ ...formData, images: newImages });
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Policies</h2>
            <p className="text-gray-600 mb-4">Set your rental policies</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cancellation Policy
              </label>
              <select
                value={formData.cancellationPolicy}
                onChange={(e) =>
                  updateFormData("cancellationPolicy", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="flexible">
                  Flexible - Full refund 24 hours prior
                </option>
                <option value="moderate">
                  Moderate - Full refund 5 days prior
                </option>
                <option value="strict">
                  Strict - 50% refund up until 1 week prior
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Rules
              </label>
              <textarea
                value={formData.houseRules}
                onChange={(e) => updateFormData("houseRules", e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. No smoking, No pets, Return with full tank"
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Review & Publish
            </h2>
            <p className="text-gray-600 mb-4">
              Review your listing before publishing
            </p>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">Vehicle</h3>
                  <p className="text-gray-600">
                    {formData.year} {formData.make} {formData.model}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Transmission</h3>
                  <p className="text-gray-600">
                    {formData.transmission.charAt(0).toUpperCase() +
                      formData.transmission.slice(1)}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Fuel Type</h3>
                  <p className="text-gray-600">
                    {formData.fuelType.charAt(0).toUpperCase() +
                      formData.fuelType.slice(1)}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Seating</h3>
                  <p className="text-gray-600">
                    {formData.seatingCapacity} passengers
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Daily Rate</h3>
                  <p className="text-gray-600">
                    ${formData.dailyRate || "Not set"}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Hourly Rate</h3>
                  <p className="text-gray-600">
                    ${formData.hourlyRate || "Not set"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Pickup Location</h3>
                <p className="text-gray-600">
                  {formData.address || "Not provided"}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Features</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.features.length > 0 ? (
                    formData.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {feature.toUpperCase()}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-600">None selected</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Extras</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.extras.length > 0 ? (
                    formData.extras.map((extra) => (
                      <span
                        key={extra}
                        className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                      >
                        {extra.charAt(0).toUpperCase() + extra.slice(1)}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-600">None selected</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="publish-confirmation"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="publish-confirmation"
                className="ml-2 block text-sm text-gray-900"
              >
                I confirm that all information is accurate and I agree to the
                terms and conditions
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            List Your Vehicle
          </h1>
          <p className="text-gray-600 mt-2">
            Follow the steps to create your car rental listing
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between relative">
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
          <div
            className="absolute top-4 left-0 h-1 bg-blue-600 -z-10 transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          ></div>

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === step.id
                      ? "bg-blue-600 text-white border-2 border-blue-600"
                      : currentStep > step.id
                      ? "bg-green-500 text-white border-2 border-green-500"
                      : "bg-white border-2 border-gray-300 text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium text-center ${
                    currentStep === step.id ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`flex items-center px-5 py-2 rounded-lg ${
            currentStep === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </button>

        {currentStep < 7 ? (
          <button
            onClick={nextStep}
            className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Publish Listing
          </button>
        )}
      </div>
    </div>
  );
};

export default PartnerCarRentalRegistration;
