import React, { useState } from "react";
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Coffee,
  Tv,
  AirVent,
  Users,
  Bed,
  Bath,
  Calendar,
  Clock,
  Shield,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  Check,
  X,
  AlertCircle,
  Camera,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  TrendingUp,
  DollarSign,
  Percent,
} from "lucide-react";

const PartnerServiceDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  // Mock data based on the database schema - Updated to Oceanview Homestay
  const serviceData = {
    serviceId: "123e4567-e89b-12d3-a456-426614174000",
    title: "Oceanview Homestay - Căn hộ sang trọng với tầm nhìn sông",
    description:
      "Căn hộ sang trọng tại trung tâm Thành phố Hồ Chí Minh với tầm nhìn sông tuyệt đẹp. Không gian rộng rãi, hiện đại, lý tưởng cho gia đình và nhóm bạn bè du lịch.",
    propertyType: "homestay",
    homestayType: "entire_place",
    location: {
      address: "123 Đường Nguyễn Huệ, Phường Bến Nghé",
      city: "Thành phố Hồ Chí Minh",
      district: "Quận 1",
      ward: "Phường Bến Nghé",
      latitude: 10.7769,
      longitude: 106.7009,
    },
    pricing: {
      basePrice: 1500000,
      weekendPrice: 1800000,
      cleaningFee: 200000,
      serviceFeePct: 10,
    },
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
    },
    policies: {
      checkInTime: "15:00",
      checkOutTime: "11:00",
      cancellationPolicy: "Linh hoạt - Hoàn 100% nếu hủy trước 1 ngày",
      houseRules:
        "Không hút thuốc, Không thú cưng, Giờ yên tĩnh từ 22:00 - 8:00",
    },
    amenities: [
      { id: "wifi", name: "WiFi miễn phí", icon: Wifi, available: true },
      {
        id: "kitchen",
        name: "Bếp đầy đủ tiện nghi",
        icon: Coffee,
        available: true,
      },
      { id: "tv", name: "TV màn hình phẳng", icon: Tv, available: true },
      {
        id: "parking",
        name: "Chỗ đậu xe miễn phí",
        icon: Car,
        available: true,
      },
      { id: "ac", name: "Điều hòa", icon: AirVent, available: true },
      { id: "heater", name: "Máy sưởi", icon: AirVent, available: false },
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    ],
    host: {
      name: "Nguyễn Thị Lan Anh",
      avatar:
        "  https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      joinedDate: "2022-03-15",
      responseRate: 98,
      responseTime: "Trong vòng 1 giờ",
      verified: true,
    },
    ratings: {
      overall: 4.8,
      totalReviews: 127,
    },
    availability: {
      minNights: 2,
      isInstantBook: true,
      currentlyAvailable: true,
    },
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-08-10T15:30:00Z",
    isActive: true,
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === serviceData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? serviceData.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {serviceData.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center">
                {renderStars(serviceData.ratings.overall)}
                <span className="ml-2 font-medium">
                  {serviceData.ratings.overall}
                </span>
                <span className="ml-1">
                  ({serviceData.ratings.totalReviews} đánh giá)
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>
                  {serviceData.location.address},{" "}
                  {serviceData.location.district}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images and Details */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="relative rounded-xl overflow-hidden mb-8">
            <div className="aspect-video bg-gray-200">
              <img
                src={serviceData.images[currentImageIndex]}
                alt={`Hình ảnh ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {serviceData.images.length}
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              {serviceData.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex
                      ? "border-white"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              {serviceData.images.length > 4 && (
                <button className="w-12 h-12 bg-black/60 rounded-lg flex items-center justify-center text-white text-xs">
                  +{serviceData.images.length - 4}
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex gap-8">
              {[
                { id: "overview", label: "Tổng quan" },
                { id: "amenities", label: "Tiện nghi" },
                { id: "policies", label: "Chính sách" },
                { id: "reviews", label: "Đánh giá" },
                { id: "location", label: "Vị trí" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-[#008fa0] text-[#008fa0]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Property Info */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Thông tin bất động sản
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Users className="w-6 h-6 text-[#008fa0]" />
                      <div>
                        <div className="font-medium">
                          {serviceData.capacity.maxGuests} khách
                        </div>
                        <div className="text-sm text-gray-600">Tối đa</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Bed className="w-6 h-6 text-[#008fa0]" />
                      <div>
                        <div className="font-medium">
                          {serviceData.capacity.bedrooms} phòng ngủ
                        </div>
                        <div className="text-sm text-gray-600">Riêng tư</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Bath className="w-6 h-6 text-[#008fa0]" />
                      <div>
                        <div className="font-medium">
                          {serviceData.capacity.bathrooms} phòng tắm
                        </div>
                        <div className="text-sm text-gray-600">Đầy đủ</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Shield className="w-6 h-6 text-[#008fa0]" />
                      <div>
                        <div className="font-medium">Đặt phòng tức thì</div>
                        <div className="text-sm text-gray-600">Khả dụng</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Mô tả</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {serviceData.description}
                  </p>
                </div>

                {/* Host Info */}
                <div className="border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Thông tin chủ nhà
                  </h3>
                  <div className="flex items-start gap-4">
                    <img
                      src={serviceData.host.avatar}
                      alt={serviceData.host.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-lg">
                          {serviceData.host.name}
                        </h4>
                        {serviceData.host.verified && (
                          <div className="bg-[#008fa0] text-white px-2 py-1 rounded-full text-xs">
                            Đã xác minh
                          </div>
                        )}
                      </div>
                      <div className="text-gray-600 text-sm space-y-1">
                        <div>Tham gia tháng 3 năm 2022</div>
                        <div>
                          Tỷ lệ phản hồi: {serviceData.host.responseRate}%
                        </div>
                        <div>
                          Thời gian phản hồi: {serviceData.host.responseTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 border rounded-lg hover:bg-gray-50">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      <button className="p-2 border rounded-lg hover:bg-gray-50">
                        <Phone className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "amenities" && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Tiện nghi có sẵn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceData.amenities.map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <div
                        key={amenity.id}
                        className="flex items-center gap-3 p-3"
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            amenity.available
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        />
                        <span
                          className={`${
                            amenity.available
                              ? "text-gray-900"
                              : "text-gray-400 line-through"
                          }`}
                        >
                          {amenity.name}
                        </span>
                        {amenity.available ? (
                          <Check className="w-4 h-4 text-green-600 ml-auto" />
                        ) : (
                          <X className="w-4 h-4 text-red-500 ml-auto" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "policies" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Chính sách nhận/trả phòng
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <Clock className="w-6 h-6 text-[#008fa0]" />
                      <div>
                        <div className="font-medium">Nhận phòng</div>
                        <div className="text-gray-600">
                          Sau {serviceData.policies.checkInTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <Clock className="w-6 h-6 text-[#008fa0]" />
                      <div>
                        <div className="font-medium">Trả phòng</div>
                        <div className="text-gray-600">
                          Trước {serviceData.policies.checkOutTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Chính sách hủy phòng</h4>
                  <p className="text-gray-700 p-4 bg-gray-50 rounded-lg">
                    {serviceData.policies.cancellationPolicy}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Nội quy nhà</h4>
                  <p className="text-gray-700 p-4 bg-gray-50 rounded-lg">
                    {serviceData.policies.houseRules}
                  </p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Lưu ý quan trọng:</p>
                    <p>
                      Vui lòng đọc kỹ các chính sách và nội quy nhà trước khi
                      đặt phòng để đảm bảo chuyến lưu trú suôn sẻ.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Đánh giá của khách hàng
                  </h3>

                  {/* Rating Overview */}
                  <div className="flex">
                    <div className="text-center justify-center">
                      <div className="text-4xl font-bold text-[#008fa0] mb-2">
                        {serviceData.ratings.overall}
                      </div>
                      <div className="flex justify-center mb-2">
                        {renderStars(serviceData.ratings.overall)}
                      </div>
                      <div className="text-gray-600">
                        {serviceData.ratings.totalReviews} đánh giá
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      user: "Trần Văn Nam",
                      avatar:
                        "  https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
                      date: "2025-07-15",
                      rating: 5,
                      comment:
                        "Căn hộ đẹp và sạch sẽ. Vị trí thuận tiện, gần nhiều điểm tham quan. Chủ nhà rất thân thiện và nhiệt tình. Sẽ quay lại!",
                    },
                    {
                      user: "Nguyễn Thị Mai",
                      avatar:
                        "  https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
                      date: "2025-07-08",
                      rating: 4,
                      comment:
                        "Không gian rộng rãi và mát mẻ, tầm nhìn sông đẹp. Trang bị đầy đủ, phù hợp cho gia đình. Chỉ có chỗ đậu xe hơi chật.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-medium">{review.user}</h5>
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-gray-500 text-sm">
                              {new Date(review.date).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "location" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Vị trí</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#008fa0] mt-0.5" />
                      <div>
                        <div className="font-medium">
                          {serviceData.location.address}
                        </div>
                        <div className="text-gray-600">
                          {serviceData.location.ward},{" "}
                          {serviceData.location.district}
                        </div>
                        <div className="text-gray-600">
                          {serviceData.location.city}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Management Actions - Only visible to property owner/admin */}
      <div className="mt-16 border-t pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Quản lý dịch vụ
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Cập nhật lần cuối:{" "}
              {new Date(serviceData.updatedAt).toLocaleDateString("vi-VN")} •
              Trạng thái:{" "}
              <span
                className={`font-medium ${
                  serviceData.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {serviceData.isActive ? "Đang hoạt động" : "Không hoạt động"}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-blue-700 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100">
              <Edit className="w-4 h-4" />
              <span>Chỉnh sửa</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-red-700 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100">
              <Trash2 className="w-4 h-4" />
              <span>Xóa</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-900">28</div>
                <div className="text-sm text-blue-700">Đặt phòng tháng này</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-900">
                  {serviceData.ratings.overall}
                </div>
                <div className="text-sm text-green-700">
                  Đánh giá trung bình
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Percent className="w-6 h-6 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-900">94%</div>
                <div className="text-sm text-yellow-700">Tỷ lệ lấp đầy</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-900">
                  {formatPrice(42000000).replace("₫", "").trim()}
                </div>
                <div className="text-sm text-purple-700">
                  Doanh thu tháng này
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerServiceDetails;
