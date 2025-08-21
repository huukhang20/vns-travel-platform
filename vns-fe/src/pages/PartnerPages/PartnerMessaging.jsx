import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";

const PartnerMessaging = () => {
  const [activeConversation, setActiveConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock data for conversations
  const [conversations, setConversations] = useState([
    {
      id: 1,
      customerName: "Sarah Johnson",
      avatar: "SJ",
      lastMessage:
        "Cảm ơn bạn đã phản hồi nhanh! Khi nào chúng ta có thể lên lịch cài đặt?",
      timestamp: "2:30 PM",
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "Chào, tôi quan tâm đến gói dịch vụ cao cấp của bạn.",
          timestamp: "2:15 PM",
          status: "read",
        },
        {
          id: 2,
          sender: "partner",
          content:
            "Xin chào Sarah! Tôi rất sẵn lòng giúp bạn với điều đó. Gói cao cấp của chúng tôi bao gồm hỗ trợ 24/7 và cài đặt ưu tiên.",
          timestamp: "2:18 PM",
          status: "read",
        },
        {
          id: 3,
          sender: "customer",
          content: "Nghe có vẻ tuyệt vời! Giá của gói cao cấp là bao nhiêu?",
          timestamp: "2:25 PM",
          status: "read",
        },
        {
          id: 4,
          sender: "partner",
          content:
            "Gói cao cấp là 299$/tháng, bao gồm tất cả các tính năng cộng với hỗ trợ chuyên biệt. Bạn có muốn tôi gửi cho bạn bản phân tích chi tiết không?",
          timestamp: "2:28 PM",
          status: "read",
        },
        {
          id: 5,
          sender: "customer",
          content:
            "Cảm ơn bạn đã phản hồi nhanh! Khi nào chúng ta có thể lên lịch cài đặt?",
          timestamp: "2:30 PM",
          status: "delivered",
        },
      ],
    },
    {
      id: 2,
      customerName: "Michael Chen",
      avatar: "MC",
      lastMessage: "Đã hiểu, cảm ơn bạn đã làm rõ điều đó.",
      timestamp: "1:45 PM",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "Tôi đang gặp sự cố với quá trình cài đặt.",
          timestamp: "1:30 PM",
          status: "read",
        },
        {
          id: 2,
          sender: "partner",
          content:
            "Tôi có thể giúp bạn với điều đó. Bạn đang bị kẹt ở bước cụ thể nào?",
          timestamp: "1:35 PM",
          status: "read",
        },
        {
          id: 3,
          sender: "customer",
          content: "Trình hướng dẫn cấu hình không thể tiến hành qua bước 3.",
          timestamp: "1:40 PM",
          status: "read",
        },
        {
          id: 4,
          sender: "partner",
          content:
            "Đây thường là do vấn đề cấu hình mạng. Bạn có thể kiểm tra xem cổng 8080 có mở trên tường lửa của bạn không?",
          timestamp: "1:42 PM",
          status: "read",
        },
        {
          id: 5,
          sender: "customer",
          content: "Đã hiểu, cảm ơn bạn đã làm rõ điều đó.",
          timestamp: "1:45 PM",
          status: "read",
        },
      ],
    },
    {
      id: 3,
      customerName: "Emily Rodriguez",
      avatar: "ER",
      lastMessage: "Tuyệt vời! Tôi sẽ tiến hành đặt hàng.",
      timestamp: "11:20 AM",
      unreadCount: 0,
      isOnline: true,
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "Bạn có thể cung cấp thêm chi tiết về bảo hành không?",
          timestamp: "11:15 AM",
          status: "read",
        },
        {
          id: 2,
          sender: "partner",
          content:
            "Tuyệt đối! Bảo hành của chúng tôi bao gồm tất cả phần cứng trong 2 năm và hỗ trợ phần mềm trong 3 năm.",
          timestamp: "11:18 AM",
          status: "read",
        },
        {
          id: 3,
          sender: "customer",
          content: "Tuyệt vời! Tôi sẽ tiến hành đặt hàng.",
          timestamp: "11:20 AM",
          status: "read",
        },
      ],
    },
    {
      id: 4,
      customerName: "David Park",
      avatar: "DP",
      lastMessage: "Khi nào là thời điểm tốt để gọi điện?",
      timestamp: "Hôm qua",
      unreadCount: 1,
      isOnline: false,
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "Tôi cần thảo luận một số tùy chọn tùy chỉnh.",
          timestamp: "Hôm qua",
          status: "read",
        },
        {
          id: 2,
          sender: "partner",
          content:
            "Tôi rất sẵn lòng thảo luận về tùy chỉnh. Hãy cho tôi biết những tính năng cụ thể bạn đang tìm kiếm.",
          timestamp: "Hôm qua",
          status: "read",
        },
        {
          id: 3,
          sender: "customer",
          content: "Khi nào là thời điểm tốt để gọi điện?",
          timestamp: "Hôm qua",
          status: "delivered",
        },
      ],
    },
    {
      id: 5,
      customerName: "Lisa Thompson",
      avatar: "LT",
      lastMessage: "Cảm ơn sự giúp đỡ của bạn!",
      timestamp: "Thứ Hai",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "Tôi đã hoàn thành cài đặt thành công.",
          timestamp: "Thứ Hai",
          status: "read",
        },
        {
          id: 2,
          sender: "partner",
          content: "Tuyệt vời! Mọi thứ đang hoạt động thế nào?",
          timestamp: "Thứ Hai",
          status: "read",
        },
        {
          id: 3,
          sender: "customer",
          content: "Mọi thứ đang chạy trơn tru. Cảm ơn sự giúp đỡ của bạn!",
          timestamp: "Thứ Hai",
          status: "read",
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter conversations based on search
  const filteredConversations = conversations.filter((conv) =>
    conv.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation]);

  // Handle sending message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const updatedConversations = conversations.map((conv) => {
        if (conv.id === activeConversation) {
          const newMsg = {
            id: conv.messages.length + 1,
            sender: "partner",
            content: newMessage,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status: "sent",
          };
          return {
            ...conv,
            messages: [...conv.messages, newMsg],
            lastMessage: newMessage,
            timestamp: newMsg.timestamp,
          };
        }
        return conv;
      });
      setConversations(updatedConversations);
      setNewMessage("");

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const activeConv = conversations.find(
    (conv) => conv.id === activeConversation
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Conversations List */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-semibold mb-6">Tin nhắn</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm cuộc trò chuyện..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 border-b border-gray-700 cursor-pointer transition-colors duration-200 hover:bg-gray-700 ${
                activeConversation === conversation.id ? "bg-teal-600" : ""
              }`}
              onClick={() => setActiveConversation(conversation.id)}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {conversation.avatar}
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                {/* Conversation Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">
                      {conversation.customerName}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 truncate mt-1">
                    {conversation.lastMessage}
                  </p>
                </div>

                {/* Unread Badge */}
                {conversation.unreadCount > 0 && (
                  <div className="bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Area - Message Thread */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {activeConv ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {activeConv.avatar}
                  </div>
                  {activeConv.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-medium text-gray-900">
                    {activeConv.customerName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {activeConv.isOnline
                      ? "Đang hoạt động"
                      : "Vừa mới hoạt động"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeConv.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "partner"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow-sm ${
                      message.sender === "partner"
                        ? "bg-teal-500 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div
                      className={`flex items-center justify-between mt-1 text-xs ${
                        message.sender === "partner"
                          ? "text-teal-100"
                          : "text-gray-500"
                      }`}
                    >
                      <span>{message.timestamp}</span>
                      {message.sender === "partner" && (
                        <span className="ml-2">
                          {message.status === "sent" && "✓"}
                          {message.status === "delivered" && "✓✓"}
                          {message.status === "read" && (
                            <span className="text-teal-200">✓✓</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập tin nhắn..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    rows={1}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không có cuộc trò chuyện nào được chọn
              </h3>
              <p className="text-gray-500">
                Chọn một cuộc trò chuyện từ thanh bên để bắt đầu nhắn tin
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerMessaging;
