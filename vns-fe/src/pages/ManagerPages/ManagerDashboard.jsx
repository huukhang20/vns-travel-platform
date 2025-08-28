import React from "react";
import {
  Calendar,
  Package,
  Gift,
  Megaphone,
  DollarSign,
  TrendingUp,
  Plus,
  Settings,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Users,
  BarChart3,
  MapPin,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

const ManagerDashboard = () => {
  const managerData = {
    name: "Minh Tri",
    businessName: "Travel Group",
    stats: {
      totalServices: 24,
      activeCombos: 8,
      livePromotions: 3,
      totalBookings: 142,
      totalRevenue: 28750,
      totalEmployees: 12,
      totalCustomers: 342,
    },
    recentBookings: [
      {
        id: 1,
        customer: "Nguyen Van A",
        service: "Tour biển đẹp",
        time: "2:00 PM",
        status: "confirmed",
      },
      {
        id: 2,
        customer: "Tran Thi B",
        service: "Tour núi rừng",
        time: "3:30 PM",
        status: "pending",
      },
      {
        id: 3,
        customer: "Le Van C",
        service: "Tour văn hóa",
        time: "4:00 PM",
        status: "confirmed",
      },
      {
        id: 4,
        customer: "Pham Thi D",
        service: "Tour ẩm thực",
        time: "5:00 PM",
        status: "confirmed",
      },
    ],
    topServices: [
      { id: 1, name: "Tour biển đẹp", bookings: 42 },
      { id: 2, name: "Tour núi rừng", bookings: 38 },
      { id: 3, name: "Tour văn hóa", bookings: 31 },
    ],
    teamMembers: [
      { id: 1, name: "Nguyen Van A", role: "Tour Guide", status: "active" },
      { id: 2, name: "Tran Thi B", role: "Customer Service", status: "active" },
      { id: 3, name: "Le Van C", role: "Driver", status: "inactive" },
    ],
  };

  const StatCard = ({ icon: Icon, number, label, color = "blue" }) => {
    const colorClasses = {
      blue: "bg-blue-50 text-blue-600",
      green: "bg-green-50 text-green-600",
      purple: "bg-purple-50 text-purple-600",
      orange: "bg-orange-50 text-orange-600",
      emerald: "bg-emerald-50 text-emerald-600",
      indigo: "bg-indigo-50 text-indigo-600",
      pink: "bg-pink-50 text-pink-600",
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-900">
              {number.toLocaleString()}
            </p>
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    );
  };

  const BookingItem = ({ booking }) => {
    const statusColors = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };

    const StatusIcon =
      booking.status === "confirmed" ? CheckCircle : AlertCircle;

    return (
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
          <div>
            <p className="font-medium text-gray-900">{booking.customer}</p>
            <p className="text-sm text-gray-600">{booking.service}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{booking.time}</p>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                statusColors[booking.status]
              }`}
            >
              <StatusIcon className="w-3 h-3 mr-1" />
              {booking.status === "confirmed"
                ? "Đã xác nhận"
                : booking.status === "pending"
                ? "Đang chờ"
                : "Đã hủy"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const ServiceItem = ({ service }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center space-x-3">
        <MapPin className="w-5 h-5 text-gray-400" />
        <span className="font-medium text-gray-900">{service.name}</span>
      </div>
      <span className="text-sm font-medium text-gray-600">
        {service.bookings} bookings
      </span>
    </div>
  );

  const TeamMember = ({ member }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-3">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
        <div>
          <p className="font-medium text-gray-900">{member.name}</p>
          <p className="text-sm text-gray-500">{member.role}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            member.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {member.status === "active" ? "Active" : "Inactive"}
        </span>
        <button className="text-gray-400 hover:text-blue-600">
          <Eye className="w-4 h-4" />
        </button>
        <button className="text-gray-400 hover:text-blue-600">
          <Edit className="w-4 h-4" />
        </button>
        <button className="text-gray-400 hover:text-red-600">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#e9e9e9] p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center pt-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Chào mừng trở lại, {managerData.name}
            </h1>
            <p className="text-gray-600 mt-1">
              Quản lý và theo dõi hoạt động của doanh nghiệp
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto pt-8">
        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 mb-8">
          <StatCard
            icon={Package}
            number={managerData.stats.totalServices}
            label="Tổng Dịch Vụ"
            color="blue"
          />
          <StatCard
            icon={Gift}
            number={managerData.stats.activeCombos}
            label="Combo Hoạt Động"
            color="purple"
          />
          <StatCard
            icon={Megaphone}
            number={managerData.stats.livePromotions}
            label="Khuyến Mãi Hiện Tại"
            color="orange"
          />
          <StatCard
            icon={Calendar}
            number={managerData.stats.totalBookings}
            label="Tổng Đặt Chỗ"
            color="green"
          />
          <StatCard
            icon={DollarSign}
            number={managerData.stats.totalRevenue}
            label="Tổng Doanh Thu"
            color="emerald"
          />
          <StatCard
            icon={Users}
            number={managerData.stats.totalEmployees}
            label="Nhân Viên"
            color="indigo"
          />
          <StatCard
            icon={User}
            number={managerData.stats.totalCustomers}
            label="Khách Hàng"
            color="pink"
          />
        </div>

        {/* Team Management Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Quản Lý Nhân Sự
            </h3>
            <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-1" />
              Thêm Nhân Viên
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {managerData.teamMembers.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
