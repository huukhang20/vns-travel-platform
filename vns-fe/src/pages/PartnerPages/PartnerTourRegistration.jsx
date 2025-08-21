import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Camera,
  FileText,
  DollarSign,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Star,
  Navigation,
  Utensils,
  Wifi,
  Car,
  Plane,
  Ticket,
} from "lucide-react";

const PartnerTourRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    title: "",
    description: "",
    destination: "",
    category: "",
    duration: "",
    groupSize: "",

    // Schedule & Availability
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    availableDays: [],
    season: "",

    // Pricing & Inclusions
    price: "",
    currency: "USD",
    includes: [],
    excludes: [],
    discounts: "",

    // Media & Details
    images: [],
    itinerary: "",
    cancellationPolicy: "",
    highlights: [],
    languages: [],
    meetingPoint: "",
    requirements: "",

    // Additional Features
    difficulty: "Beginner",
    ageGroup: "All Ages",
    physicalRating: "Low",
    specialFeatures: [],
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const steps = [
    { id: 1, title: "Thông tin cơ bản", icon: MapPin },
    { id: 2, title: "Lịch trình & Khả dụng", icon: Calendar },
    { id: 3, title: "Giá & Bao gồm", icon: DollarSign },
    { id: 4, title: "Hình ảnh & Chi tiết", icon: Camera },
    { id: 5, title: "Tính năng bổ sung", icon: Star },
    { id: 6, title: "Xem lại & Đăng", icon: CheckCircle },
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Thông tin tour cơ bản
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiêu đề tour *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ví dụ: Trải nghiệm Kayak ngắm hoàng hôn tại Bali"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa điểm *
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ví dụ: Bali, Indonesia"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả tour *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mô tả chi tiết trải nghiệm tour của bạn..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danh mục
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Chọn danh mục</option>
                  <option value="Adventure">Phiêu lưu</option>
                  <option value="Cultural">Văn hóa</option>
                  <option value="Food & Culinary">Ẩm thực</option>
                  <option value="Nature & Wildlife">
                    Thiên nhiên & Động vật
                  </option>
                  <option value="Relaxation">Thư giãn</option>
                  <option value="Historical">Lịch sử</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thời lượng
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ví dụ: 4 giờ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kích thước nhóm
                </label>
                <input
                  type="text"
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ví dụ: tối đa 10 người"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Lịch trình & Khả dụng
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày bắt đầu
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày kết thúc
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giờ bắt đầu
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giờ kết thúc
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Các ngày khả dụng
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                    <label key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="availableDays"
                        value={day}
                        checked={formData.availableDays.includes(day)}
                        onChange={handleChange}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mùa
                </label>
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Chọn mùa</option>
                  <option value="Year-round">Quanh năm</option>
                  <option value="Summer">Mùa hè</option>
                  <option value="Winter">Mùa đông</option>
                  <option value="Spring">Mùa xuân</option>
                  <option value="Autumn">Mùa thu</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Giá & Bao gồm</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá mỗi người *
                </label>
                <div className="flex">
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="VND">VND</option>
                  </select>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border-t border-b border-r border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thông tin giảm giá
                </label>
                <input
                  type="text"
                  name="discounts"
                  value={formData.discounts}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ví dụ: Giảm 10% cho nhóm từ 5 người trở lên"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Những gì được bao gồm
                </label>
                <textarea
                  name="includes"
                  value={formData.includes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Liệt kê những gì được bao gồm trong giá tour..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Những gì không được bao gồm
                </label>
                <textarea
                  name="excludes"
                  value={formData.excludes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Liệt kê những gì không được bao gồm trong giá tour..."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Hình ảnh & Chi tiết
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ảnh tour
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
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
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Xem trước"
                          className="h-20 w-full object-cover rounded"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lịch trình chi tiết *
                </label>
                <textarea
                  name="itinerary"
                  value={formData.itinerary}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mô tả lịch trình chi tiết của tour..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Điểm hẹn
                </label>
                <input
                  type="text"
                  name="meetingPoint"
                  value={formData.meetingPoint}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ví dụ: Cổng chính của Tòa thị chính"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chính sách hủy bỏ
                </label>
                <textarea
                  name="cancellationPolicy"
                  value={formData.cancellationPolicy}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mô tả chính sách hủy bỏ của bạn..."
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Tính năng bổ sung
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mức độ khó
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Beginner">Người mới bắt đầu</option>
                  <option value="Intermediate">Trung cấp</option>
                  <option value="Advanced">Nâng cao</option>
                  <option value="Expert">Chuyên gia</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nhóm tuổi
                </label>
                <select
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All Ages">Mọi lứa tuổi</option>
                  <option value="Adults Only">Chỉ người lớn</option>
                  <option value="Children Friendly">
                    Thân thiện với trẻ em
                  </option>
                  <option value="Teens">Thanh thiếu niên</option>
                  <option value="Seniors">Người cao tuổi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Đánh giá thể chất
                </label>
                <select
                  name="physicalRating"
                  value={formData.physicalRating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Low">Thấp (Ít đi bộ)</option>
                  <option value="Moderate">Trung bình (2-3 dặm)</option>
                  <option value="High">Cao (5+ dặm)</option>
                  <option value="Extreme">Cực đoan (Hoạt động gắng sức)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngôn ngữ
                </label>
                <input
                  type="text"
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ví dụ: Tiếng Anh, Tiếng Tây Ban Nha, Tiếng Pháp"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Điểm nổi bật của tour
                </label>
                <textarea
                  name="highlights"
                  value={formData.highlights}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Liệt kê các điểm nổi bật chính của tour..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yêu cầu đặc biệt
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Liệt kê bất kỳ yêu cầu đặc biệt nào cho người tham gia..."
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Xem lại & Đăng</h2>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">Tiêu đề tour</h3>
                  <p className="text-gray-600">
                    {formData.title || "Chưa cung cấp"}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Địa điểm</h3>
                  <p className="text-gray-600">
                    {formData.destination || "Chưa cung cấp"}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Danh mục</h3>
                  <p className="text-gray-600">
                    {formData.category || "Chưa cung cấp"}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Thời lượng</h3>
                  <p className="text-gray-600">
                    {formData.duration || "Chưa cung cấp"}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Kích thước nhóm</h3>
                  <p className="text-gray-600">
                    {formData.groupSize || "Chưa cung cấp"}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Giá</h3>
                  <p className="text-gray-600">
                    {formData.price
                      ? `${formData.currency} ${formData.price}`
                      : "Chưa cung cấp"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Mô tả</h3>
                <p className="text-gray-600">
                  {formData.description || "Chưa cung cấp"}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Lịch trình</h3>
                <p className="text-gray-600">
                  {formData.itinerary || "Chưa cung cấp"}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">
                  Những gì được bao gồm
                </h3>
                <p className="text-gray-600">
                  {formData.includes || "Chưa cung cấp"}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Điểm hẹn</h3>
                <p className="text-gray-600">
                  {formData.meetingPoint || "Chưa cung cấp"}
                </p>
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

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tạo tour mới</h1>
          <p className="text-gray-600 mt-2">
            Làm theo các bước để đăng ký trải nghiệm tour của bạn
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between relative">
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
          <div
            className="absolute top-4 left-0 h-1 bg-blue-600 -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === s.id
                    ? "bg-blue-600 text-white border-2 border-blue-600"
                    : step > s.id
                    ? "bg-green-500 text-white border-2 border-green-500"
                    : "bg-white border-2 border-gray-300 text-gray-500"
                }`}
              >
                {step > s.id ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <s.icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium text-center ${
                  step === s.id ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className={`flex items-center px-5 py-2 rounded-lg ${
            step === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Trước
        </button>

        {step < steps.length ? (
          <button
            onClick={nextStep}
            className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tiếp theo
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Đăng tour
          </button>
        )}
      </div>
    </div>
  );
};

export default PartnerTourRegistration;
