import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building,
  Package,
  Calendar,
  DollarSign,
  Star,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    profile: {
      businessName: "Loading...",
      businessCategory: "Loading...",
      isVerified: false,
      totalServices: 0,
      totalBookings: 0,
      totalRevenue: 0,
      averageRating: 0,
      totalReviews: 0,
    },
    recentBookings: [],
    quickStats: {
      pendingBookings: 0,
      confirmedBookings: 0,
      completedBookings: 0,
      cancelledBookings: 0,
    },
  });

  // In a real app, this would be an API call
  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData = {
      profile: {
        businessName: "Hanoi Heritage Hotel",
        businessCategory: "Hotel & Accommodation",
        isVerified: true,
        totalServices: 12,
        totalBookings: 124,
        totalRevenue: 45670000, // VND
        averageRating: 4.7,
        totalReviews: 89,
      },
      recentBookings: [
        {
          id: "B001",
          customer: "Nguyen Van A",
          service: "Deluxe Room",
          date: "2023-05-15",
          status: "confirmed",
          amount: 2500000,
        },
        {
          id: "B002",
          customer: "Tran Thi B",
          service: "City Tour",
          date: "2023-05-16",
          status: "pending",
          amount: 1200000,
        },
        {
          id: "B003",
          customer: "Le Van C",
          service: "Spa Package",
          date: "2023-05-14",
          status: "completed",
          amount: 800000,
        },
      ],
      quickStats: {
        pendingBookings: 5,
        confirmedBookings: 12,
        completedBookings: 89,
        cancelledBookings: 2,
      },
    };

    // Simulate API delay
    setTimeout(() => {
      setDashboardData(mockData);
    }, 1000);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận";
      case "pending":
        return "Chờ xử lý";
      case "cancelled":
        return "Đã hủy";
      case "completed":
        return "Hoàn thành";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-bg-light pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center pt-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Chào mừng trở lại, {dashboardData.profile.businessName}!
              </h1>
              <p className="text-gray-600">
                Theo dõi hiệu suất kinh doanh của bạn ở đây
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Dịch vụ</p>
                <p className="text-2xl font-bold">
                  {dashboardData.profile.totalServices}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Đặt chỗ</p>
                <p className="text-2xl font-bold">
                  {dashboardData.profile.totalBookings}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Doanh thu</p>
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(dashboardData.profile.totalRevenue)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600 mr-4">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Đánh giá</p>
                <p className="text-2xl font-bold">
                  {dashboardData.profile.averageRating}
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    ({dashboardData.profile.totalReviews})
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thống kê đặt chỗ
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-yellow-500 mr-2" />
                    <span>Chờ xử lý</span>
                  </div>
                  <span className="font-semibold">
                    {dashboardData.quickStats.pendingBookings}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Đã xác nhận</span>
                  </div>
                  <span className="font-semibold">
                    {dashboardData.quickStats.confirmedBookings}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    <span>Hoàn thành</span>
                  </div>
                  <span className="font-semibold">
                    {dashboardData.quickStats.completedBookings}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <XCircle className="w-4 h-4 text-red-500 mr-2" />
                    <span>Đã hủy</span>
                  </div>
                  <span className="font-semibold">
                    {dashboardData.quickStats.cancelledBookings}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Đặt chỗ gần đây
                </h3>
                <button
                  onClick={() => navigate("/partner/bookings")}
                  className="text-primary hover:text-primary-hover text-sm font-medium"
                >
                  Xem tất cả
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Mã
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Khách hàng
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Dịch vụ
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Ngày
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Trạng thái
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Số tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboardData.recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.service}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            {getStatusIcon(booking.status)}
                            <span className="ml-2">
                              {getStatusText(booking.status)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(booking.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
