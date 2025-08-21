import React, { useState } from "react";
import {
  Home,
  MapPin,
  Users,
  Wifi,
  DollarSign,
  Camera,
  FileText,
  Bed,
  Bath,
  Car,
  Coffee,
  Tv,
  AirVent,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PartnerRentalRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: "apartment",
    propertyName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: [],
    basePrice: "",
    cleaningFee: "",
    securityDeposit: "",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "flexible",
    houseRules: "",
    images: [],
  });
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: "Loại bất động sản", icon: Home },
    { id: 2, title: "Vị trí", icon: MapPin },
    { id: 3, title: "Phòng & Khách", icon: Users },
    { id: 4, title: "Tiện nghi", icon: Wifi },
    { id: 5, title: "Giá cả", icon: DollarSign },
    { id: 6, title: "Hình ảnh", icon: Camera },
    { id: 7, title: "Chính sách", icon: FileText },
    { id: 8, title: "Xem lại & Đăng", icon: CheckCircle },
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 8) setCurrentStep(currentStep + 1);
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

  const toggleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Bạn đang đăng loại bất động sản nào?
            </h2>
            <p className="text-gray-600 mb-4">
              Chọn tùy chọn mô tả chính xác không gian của bạn
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  value: "apartment",
                  label: "Căn hộ",
                  desc: "Một nơi có nội thất trong tòa nhà",
                },
                {
                  value: "house",
                  label: "Nhà riêng",
                  desc: "Một tòa nhà dân cư",
                },
                {
                  value: "condo",
                  label: "Chung cư",
                  desc: "Một đơn vị sở hữu riêng trong tòa nhà",
                },
                {
                  value: "studio",
                  label: "Studio",
                  desc: "Một phòng đơn với bếp và nhà tắm",
                },
              ].map((type) => (
                <div
                  key={type.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.propertyType === type.value
                      ? "border-[#008fa0] bg-[#e6f7f9]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => updateFormData("propertyType", type.value)}
                >
                  <h3 className="font-medium text-gray-900">{type.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{type.desc}</p>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên bất động sản *
              </label>
              <input
                type="text"
                value={formData.propertyName}
                onChange={(e) => updateFormData("propertyName", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                placeholder="Nhập tên cho bất động sản của bạn"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Bất động sản của bạn nằm ở đâu?
            </h2>
            <p className="text-gray-600 mb-4">
              Cung cấp địa chỉ đầy đủ cho dịch vụ của bạn
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ đường *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                  placeholder="123 Đường Chính"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thành phố *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                    placeholder="Hồ Chí Minh"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tỉnh/Thành phố *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => updateFormData("state", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                    placeholder="TP.HCM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mã bưu điện *
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData("zipCode", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                    placeholder="700000"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Hãy cho chúng tôi biết về không gian của bạn
            </h2>
            <p className="text-gray-600 mb-4">
              Bạn có bao nhiêu phòng và khách có thể ở được?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-[#008fa0] rounded-full">
                  <Bed className="w-8 h-8 text-white" />
                </div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phòng ngủ
                </label>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() =>
                      updateFormData(
                        "bedrooms",
                        Math.max(0, formData.bedrooms - 1)
                      )
                    }
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">
                    {formData.bedrooms}
                  </span>
                  <button
                    onClick={() =>
                      updateFormData("bedrooms", formData.bedrooms + 1)
                    }
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-[#008fa0] rounded-full">
                  <Bath className="w-8 h-8 text-white" />
                </div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phòng tắm
                </label>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() =>
                      updateFormData(
                        "bathrooms",
                        Math.max(0, formData.bathrooms - 1)
                      )
                    }
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">
                    {formData.bathrooms}
                  </span>
                  <button
                    onClick={() =>
                      updateFormData("bathrooms", formData.bathrooms + 1)
                    }
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-[#008fa0] rounded-full">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số khách tối đa
                </label>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() =>
                      updateFormData(
                        "maxGuests",
                        Math.max(1, formData.maxGuests - 1)
                      )
                    }
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">
                    {formData.maxGuests}
                  </span>
                  <button
                    onClick={() =>
                      updateFormData("maxGuests", formData.maxGuests + 1)
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

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Bạn cung cấp những tiện nghi nào?
            </h2>
            <p className="text-gray-600 mb-4">
              Chọn tất cả các tiện nghi có sẵn cho khách của bạn
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { value: "wifi", label: "WiFi", icon: Wifi },
                { value: "kitchen", label: "Bếp", icon: Coffee },
                { value: "tv", label: "TV", icon: Tv },
                { value: "parking", label: "Đỗ xe miễn phí", icon: Car },
                { value: "ac", label: "Điều hòa", icon: AirVent },
                { value: "heating", label: "Sưởi ấm", icon: AirVent },
              ].map((amenity) => {
                const Icon = amenity.icon;
                const isSelected = formData.amenities.includes(amenity.value);

                return (
                  <div
                    key={amenity.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#008fa0] bg-[#e6f7f9]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => toggleAmenity(amenity.value)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <Icon className="w-6 h-6 mb-2 text-gray-600" />
                      <span className="text-sm font-medium">
                        {amenity.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Đặt giá của bạn
            </h2>
            <p className="text-gray-600 mb-4">
              Xác định mức giá cạnh tranh cho bất động sản của bạn
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá cơ bản mỗi đêm *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">₫</span>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) =>
                      updateFormData("basePrice", e.target.value)
                    }
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                    placeholder="120"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phí dọn dẹp
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">₫</span>
                  <input
                    type="number"
                    value={formData.cleaningFee}
                    onChange={(e) =>
                      updateFormData("cleaningFee", e.target.value)
                    }
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                    placeholder="25"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiền đặt cọc
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">₫</span>
                  <input
                    type="number"
                    value={formData.securityDeposit}
                    onChange={(e) =>
                      updateFormData("securityDeposit", e.target.value)
                    }
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                    placeholder="200"
                  />
                </div>
              </div>
            </div>

            {formData.basePrice && (
              <div className="bg-[#e6f7f9] p-4 rounded-lg">
                <h3 className="font-medium text-[#008fa0] mb-2">
                  Tổng cộng cho 3 đêm
                </h3>
                <div className="space-y-1 text-sm text-[#007a8a]">
                  <div className="flex justify-between">
                    <span>
                      {parseInt(formData.basePrice).toLocaleString()}₫ × 3 đêm
                    </span>
                    <span>{(formData.basePrice * 3).toLocaleString()}₫</span>
                  </div>
                  {formData.cleaningFee > 0 && (
                    <div className="flex justify-between">
                      <span>Phí dọn dẹp</span>
                      <span>
                        {parseInt(formData.cleaningFee).toLocaleString()}₫
                      </span>
                    </div>
                  )}
                  <div className="border-t border-[#007a8a] pt-1 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Tổng cộng</span>
                      <span>
                        {(
                          formData.basePrice * 3 +
                          (parseInt(formData.cleaningFee) || 0)
                        ).toLocaleString()}
                        ₫
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Thêm ảnh về không gian của bạn
            </h2>
            <p className="text-gray-600 mb-4">
              Những bức ảnh đẹp giúp danh sách của bạn nổi bật. Thêm ít nhất 5
              ảnh.
            </p>

            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#008fa0] hover:text-[#007a8a]">
                    <span>Tải lên tệp</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">hoặc kéo và thả</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF tối đa 10MB
                </p>
              </div>
            </div>

            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Xem trước"
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

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Đặt chính sách của bạn
            </h2>
            <p className="text-gray-600 mb-4">
              Thiết lập thời gian nhận phòng và nội quy nhà cho khách
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giờ nhận phòng
                </label>
                <input
                  type="time"
                  value={formData.checkInTime}
                  onChange={(e) =>
                    updateFormData("checkInTime", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giờ trả phòng
                </label>
                <input
                  type="time"
                  value={formData.checkOutTime}
                  onChange={(e) =>
                    updateFormData("checkOutTime", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chính sách hủy bỏ
              </label>
              <select
                value={formData.cancellationPolicy}
                onChange={(e) =>
                  updateFormData("cancellationPolicy", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
              >
                <option value="flexible">
                  Linh hoạt - Hoàn tiền đầy đủ 1 ngày trước
                </option>
                <option value="moderate">
                  Vừa phải - Hoàn tiền đầy đủ 5 ngày trước
                </option>
                <option value="strict">
                  Nghiêm ngặt - Hoàn 50% đến 1 tuần trước
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nội quy nhà
              </label>
              <textarea
                value={formData.houseRules}
                onChange={(e) => updateFormData("houseRules", e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008fa0] focus:border-[#008fa0]"
                placeholder="Không hút thuốc, Không thú cưng, Giờ yên tĩnh 22:00-8:00"
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Xem lại danh sách của bạn
            </h2>
            <p className="text-gray-600 mb-4">
              Hãy đảm bảo mọi thứ đều ổn trước khi đăng
            </p>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Tên bất động sản
                  </h3>
                  <p className="text-gray-600">
                    {formData.propertyName || "Chưa cung cấp"}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">
                    Loại bất động sản
                  </h3>
                  <p className="text-gray-600">
                    {formData.propertyType === "apartment"
                      ? "Căn hộ"
                      : formData.propertyType === "house"
                      ? "Nhà riêng"
                      : formData.propertyType === "condo"
                      ? "Chung cư"
                      : "Studio"}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Vị trí</h3>
                  <p className="text-gray-600">
                    {formData.address}, {formData.city}, {formData.state}{" "}
                    {formData.zipCode}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Sức chứa</h3>
                  <p className="text-gray-600">
                    {formData.bedrooms} phòng ngủ, {formData.bathrooms} phòng
                    tắm, tối đa {formData.maxGuests} khách
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Giá</h3>
                  <p className="text-gray-600">
                    {parseInt(formData.basePrice || 0).toLocaleString()}₫ mỗi
                    đêm
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Phí dọn dẹp</h3>
                  <p className="text-gray-600">
                    {parseInt(formData.cleaningFee || 0).toLocaleString()}₫
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Tiện nghi</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.amenities.length > 0 ? (
                    formData.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 bg-[#008fa0] text-white text-sm rounded-full"
                      >
                        {amenity === "wifi"
                          ? "WiFi"
                          : amenity === "kitchen"
                          ? "Bếp"
                          : amenity === "tv"
                          ? "TV"
                          : amenity === "parking"
                          ? "Đỗ xe miễn phí"
                          : amenity === "ac"
                          ? "Điều hòa"
                          : "Sưởi ấm"}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-600">Không có tiện nghi nào</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Chính sách</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Nhận phòng:</span>{" "}
                    {formData.checkInTime}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Trả phòng:</span>{" "}
                    {formData.checkOutTime}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Hủy bỏ:</span>{" "}
                    {formData.cancellationPolicy === "flexible"
                      ? "Linh hoạt"
                      : formData.cancellationPolicy === "moderate"
                      ? "Vừa phải"
                      : "Nghiêm ngặt"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Nội quy nhà</h3>
                <p className="text-gray-600">
                  {formData.houseRules || "Không có nội quy đặc biệt"}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="publish-confirmation"
                type="checkbox"
                className="h-4 w-4 text-[#008fa0] focus:ring-[#008fa0] border-gray-300 rounded"
              />
              <label
                htmlFor="publish-confirmation"
                className="ml-2 block text-sm text-gray-900"
              >
                Tôi xác nhận rằng tất cả thông tin đều chính xác và tôi đồng ý
                với các điều khoản và điều kiện
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const publishListing = () => {
    navigate("/PartnerService");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Đăng bất động sản của bạn
          </h1>
          <p className="text-gray-600 mt-2">
            Làm theo các bước để tạo danh sách cho thuê của bạn
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between relative">
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
          <div
            className="absolute top-4 left-0 h-1 bg-[#008fa0] -z-10 transition-all duration-500"
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
                      ? "bg-[#008fa0] text-white border-2 border-[#008fa0]"
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
                    currentStep === step.id ? "text-[#008fa0]" : "text-gray-500"
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
          Trước
        </button>

        {currentStep < 8 ? (
          <button
            onClick={nextStep}
            className="flex items-center px-5 py-2 bg-[#008fa0] text-white rounded-lg hover:bg-[#007a8a]"
          >
            Tiếp theo
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={publishListing}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Đăng dịch vụ
          </button>
        )}
      </div>
    </div>
  );
};

export default PartnerRentalRegistration;
