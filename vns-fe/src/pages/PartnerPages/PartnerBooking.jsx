import React, { useState } from "react";
import { Eye, Filter as FilterIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PartnerBooking = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([
    {
      id: "01",
      customerName: "Nguyễn Văn A",
      email: "nguyen.a@email.com",
      phone: "+84 123 456 789",
      serviceType: "Villa Sana",
      bookingDate: "2024-03-15",
      timeSlot: "10:00 AM - 12:00 PM",
      status: "confirmed",
      amount: 150.0,
      address: "123 Đường Chính, Hà Nội",
      notes: "Vui lòng mang theo các sản phẩm thân thiện với môi trường",
    },
    {
      id: "02",
      customerName: "Trần Thị Bích",
      email: "tran.b@email.com",
      phone: "+84 987 654 321",
      serviceType: "Thuê Xe Vin",
      bookingDate: "2024-03-16",
      timeSlot: "2:00 PM - 4:00 PM",
      status: "pending",
      amount: 80.0,
      address: "456 Đường Cây, Hồ Chí Minh",
      notes: "",
    },
    {
      id: "03",
      customerName: "Nguyễn Văn Tùng",
      email: "nguyen.t@email.com",
      phone: "+84 123 456 789",
      serviceType: "Oceanview Homestay",
      bookingDate: "2024-03-16",
      timeSlot: "2:00 PM - 4:00 PM",
      status: "pending",
      amount: 80.0,
      address: "123 Nguyen Hue Street, Ben Nghe Ward",
      notes: "",
    },
  ]);
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận";
      case "pending":
        return "Đang chờ";
      case "completed":
        return "Đã hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const filteredBookings =
    activeTab === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === activeTab);

  const handleConfirmBooking = (bookingId) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: "confirmed" } : booking
    );
    setBookings(updatedBookings);
    alert("Đặt chỗ đã được xác nhận");
  };

  const handleCancelBooking = (bookingId) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: "cancelled" } : booking
    );
    setBookings(updatedBookings);
    setShowCancelModal(false); // Close the cancel modal after booking is cancelled
    alert("Đặt chỗ đã bị hủy");
  };

  const viewDetail = () => {
    navigate("/PartnerBookingDetails");
  };

  return (
    <div className="min-h-screen bg-[#e9e9e9] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center pt-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quản lý đặt chỗ
            </h1>
            <p className="text-gray-600 mt-1">
              Theo dõi và quản lý các đặt chỗ của bạn
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: "all", label: "Tất cả đặt chỗ" },
                { key: "pending", label: "Đang chờ" },
                { key: "confirmed", label: "Đã xác nhận" },
                { key: "cancelled", label: "Đã hủy" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? "border-[#008fa0] text-[#008fa0]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {activeTab === "all"
                  ? "Tất cả đặt chỗ"
                  : `${
                      activeTab === "pending"
                        ? "Đang chờ"
                        : activeTab === "confirmed"
                        ? "Đã xác nhận"
                        : activeTab === "cancelled"
                        ? "Đã hủy"
                        : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                    } đặt chỗ`}
              </h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đặt chỗ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dịch vụ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày & Giờ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.serviceType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.bookingDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "USD",
                      }).format(booking.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={viewDetail}
                          className="text-[#008fa0] hover:text-[#007a8a]"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {booking.status === "pending" && (
                          <button
                            onClick={() => handleConfirmBooking(booking.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Xác nhận
                          </button>
                        )}
                        {booking.status !== "cancelled" &&
                          booking.status !== "completed" && (
                            <button
                              onClick={() => {
                                setSelectedBooking(booking);
                                setShowCancelModal(true);
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              Hủy
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-10 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Hủy đặt chỗ
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Bạn có chắc chắn muốn hủy đặt chỗ này không?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                Không
              </button>
              <button
                onClick={() => handleCancelBooking(selectedBooking.id)}
                className="bg-red-600 text-white rounded px-4 py-2"
              >
                Có, Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerBooking;
