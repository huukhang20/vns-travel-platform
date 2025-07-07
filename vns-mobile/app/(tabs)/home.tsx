// app/(tabs)/home.tsx
import { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Animated,
  Pressable,
  FlatList,
} from "react-native";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

// Dữ liệu mẫu
const vietnamDestinations = [
  {
    id: 1,
    name: "Vịnh Hạ Long",
    location: "Quảng Ninh",
    price: "4.5",
    image: require("@/assets/images/halong.jpg"),
    category: "Sea",
    progress: 0.8,
  },
  {
    id: 2,
    name: "Phong Nha",
    location: "Quảng Bình",
    price: "4.2",
    image: require("@/assets/images/phongnha.jpg"),
    category: "Mountain",
    progress: 0.65,
  },
  {
    id: 3,
    name: "Hồ Hoàn Kiếm",
    location: "Hà Nội",
    price: "3.8",
    image: require("@/assets/images/hoankiem.jpg"),
    category: "Lake",
    progress: 0.4,
  },
];

const groupTrips = [
  {
    id: 1,
    name: "Tour Sapa",
    location: "Lào Cai",
    members: 12,
    image: require("@/assets/images/sapa.jpg"),
    progress: 0.8,
  },
  {
    id: 2,
    name: "Tour Đà Lạt",
    location: "Lâm Đồng",
    members: 8,
    image: require("@/assets/images/dalat.jpg"),
    progress: 0.6,
  },
];

const notifications = [
  {
    id: 1,
    title: "Ưu đãi đặc biệt",
    message: "Giảm 20% cho các tour biển trong tháng này",
    time: "10 phút trước",
    read: false,
  },
  {
    id: 2,
    title: "Đặt tour thành công",
    message: "Bạn đã đặt tour Đà Nẵng thành công",
    time: "2 giờ trước",
    read: true,
  },
];

const categories = ["Tất cả", "Biển", "Núi", "Hồ", "Di tích"];

export default function HomeScreen() {
  const [currentLocation] = useState("Hà Nội, Việt Nam");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [menuHeight] = useState(new Animated.Value(0));
  const scrollRef = useRef<ScrollView>(null);

  const handleLogout = () => {
    setShowMenu(false);
    router.replace("/signin");
  };

  const menuItems = [
    {
      id: 1,
      title: "Thông tin cá nhân",
      icon: "person",
      onPress: () => console.log("Profile"),
    },
    {
      id: 2,
      title: "Đơn hàng của tôi",
      icon: "receipt",
      onPress: () => console.log("Orders"),
    },
    {
      id: 3,
      title: "Hỗ trợ khách hàng",
      icon: "support",
      onPress: () => console.log("Support"),
    },
    { id: 4, title: "Đăng xuất", icon: "logout", onPress: handleLogout },
  ];

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    Animated.timing(fadeAnim, {
      toValue: showNotifications ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const toggleMenu = () => {
    const targetHeight = showMenu ? 0 : menuItems.length * 50 + 20;
    setShowMenu((prev) => !prev);
    Animated.timing(menuHeight, {
      toValue: targetHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const renderDestinationItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.tripCard}>
      <Image source={item.image} style={styles.tripImage} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.tripGradient}
      />
      <View style={styles.tripInfo}>
        <Text style={styles.tripName}>{item.name}</Text>
        <View style={styles.tripLocationContainer}>
          <MaterialIcons name="location-on" size={14} color="#FFF" />
          <Text style={styles.tripLocation}>{item.location}</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${item.progress * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round(item.progress * 100)}% đã đặt
          </Text>
        </View>
      </View>
      <View style={styles.priceTag}>
        <Text style={styles.priceText}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderGroupTripItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.groupTripCard}>
      <Image source={item.image} style={styles.groupTripImage} />
      <View style={styles.groupTripInfo}>
        <Text style={styles.groupTripName}>{item.name}</Text>
        <View style={styles.groupTripLocationContainer}>
          <Ionicons name="location-sharp" size={14} color="#4A90E2" />
          <Text style={styles.groupTripLocation}>{item.location}</Text>
        </View>
        <View style={styles.groupTripFooter}>
          <View style={styles.membersContainer}>
            <Ionicons name="people" size={16} color="#666" />
            <Text style={styles.membersText}>{item.members} thành viên</Text>
          </View>
          <View style={styles.groupProgressContainer}>
            <Text style={styles.groupProgressText}>
              {Math.round(item.progress * 100)}%
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderNotificationItem = ({ item }: { item: any }) => (
    <View
      style={[styles.notificationItem, !item.read && styles.unreadNotification]}
    >
      <Text style={styles.notificationItemTitle}>{item.title}</Text>
      <Text style={styles.notificationItemMessage}>{item.message}</Text>
      <Text style={styles.notificationItemTime}>{item.time}</Text>
    </View>
  );

  const renderMenuItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.onPress}
    >
      <MaterialIcons
        name={item.icon}
        size={24}
        color="#4A90E2"
        style={styles.menuIcon}
      />
      <Text style={styles.menuText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#4A90E2", "#5D9DF5"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity onPress={toggleMenu} style={styles.headerLeft}>
          <Image
            source={require("@/assets/images/user.jpg")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>Xin chào!</Text>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={20} color="#FFF" />
              <Text style={styles.locationText}>{currentLocation}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleNotifications}>
          <View style={styles.notificationIcon}>
            <FontAwesome name="bell" size={24} color="#FFF" />
            <View style={styles.notificationBadge} />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      {/* Menu Dropdown */}
      <Animated.View style={[styles.menuContainer, { height: menuHeight }]}>
        {showMenu && (
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        )}
      </Animated.View>

      {/* Nội dung chính */}
      <ScrollView
        ref={scrollRef}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons
            name="search"
            size={24}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm điểm du lịch..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Khám phá</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryItem,
                activeCategory === category && styles.activeCategoryItem,
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Trips */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Địa điểm nổi bật</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={vietnamDestinations}
          renderItem={renderDestinationItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListContent}
        />

        {/* Group Trips */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tour nhóm</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={groupTrips}
          renderItem={renderGroupTripItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.groupTripsContainer}
        />
      </ScrollView>

      {/* Notification Modal */}
      <Modal
        transparent
        visible={showNotifications}
        animationType="fade"
        onRequestClose={toggleNotifications}
      >
        <Pressable style={styles.modalOverlay} onPress={toggleNotifications}>
          <Animated.View
            style={[
              styles.notificationModal,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>Thông báo</Text>
              <TouchableOpacity onPress={toggleNotifications}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={notifications}
              renderItem={renderNotificationItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.notificationList}
            />
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
  },
  greeting: {
    fontSize: 16,
    color: "#FFF",
    opacity: 0.8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: 4,
  },
  notificationIcon: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4757",
  },
  menuContainer: {
    backgroundColor: "#FFF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 24,
    marginTop: 20,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  seeAll: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "500",
  },
  categoriesContainer: {
    paddingLeft: 24,
  },
  categoriesContent: {
    paddingRight: 24,
  },
  categoryItem: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeCategoryItem: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryText: {
    color: "#666",
    fontSize: 15,
    fontWeight: "600",
  },
  activeCategoryText: {
    color: "#FFF",
    fontWeight: "600",
  },
  horizontalListContent: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  tripCard: {
    width: width * 0.7,
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
    position: "relative",
  },
  tripImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  tripGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "60%",
  },
  tripInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  tripName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  tripLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tripLocation: {
    fontSize: 14,
    color: "#FFF",
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFF",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: "#FFF",
    opacity: 0.8,
  },
  priceTag: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  groupTripsContainer: {
    paddingHorizontal: 24,
  },
  groupTripCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    flexDirection: "row",
    height: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  groupTripImage: {
    width: 120,
    height: "100%",
    resizeMode: "cover",
  },
  groupTripInfo: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  groupTripName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  groupTripLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  groupTripLocation: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  groupTripFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  membersContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  membersText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  groupProgressContainer: {
    backgroundColor: "#E8F0FE",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  groupProgressText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  notificationModal: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    maxHeight: height * 0.7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  notificationList: {
    paddingHorizontal: 16,
  },
  notificationItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  unreadNotification: {
    backgroundColor: "#F8F9FA",
  },
  notificationItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  notificationItemMessage: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  notificationItemTime: {
    fontSize: 12,
    color: "#999",
  },
});
