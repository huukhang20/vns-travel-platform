// app/(tabs)/register.tsx
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  // Hàm xử lý nhập mật khẩu (chỉ cho phép số và giới hạn 6 ký tự)
  const handlePasswordChange = (
    text: string,
    field: "password" | "confirm"
  ) => {
    // Chỉ cho phép nhập số
    const numericText = text.replace(/[^0-9]/g, "");

    // Giới hạn 6 ký tự
    const limitedText = numericText.slice(0, 6);

    if (field === "password") {
      setPassword(limitedText);
      setPasswordError("");
    } else {
      setConfirmPassword(limitedText);
      setConfirmError("");
    }
  };

  const handleRegister = () => {
    let isValid = true;

    // Validate password
    if (!password) {
      setPasswordError("Vui lòng nhập mật khẩu");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Mật khẩu phải đủ 6 số");
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmError("Vui lòng xác nhận mật khẩu");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmError("Mật khẩu không khớp");
      isValid = false;
    }

    if (isValid) {
      Alert.alert("Thành công", "Tạo tài khoản thành công!", [
        {
          text: "OK",
          onPress: () => router.replace("/signin"),
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Vietnam Travel Explorer ✦</Text>
      <Text style={styles.title}>Tạo tài khoản</Text>

      <Text style={styles.label}>Họ và tên</Text>
      <TextInput style={styles.input} placeholder="Nhập họ tên" />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>SĐT</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Mật khẩu </Text>
      <TextInput
        style={[styles.input, passwordError ? styles.errorInput : null]}
        placeholder="••••••"
        value={password}
        onChangeText={(text) => handlePasswordChange(text, "password")}
        keyboardType="numeric"
        maxLength={6}
        secureTextEntry
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <Text style={styles.label}>Xác nhận mật khẩu</Text>
      <TextInput
        style={[styles.input, confirmError ? styles.errorInput : null]}
        placeholder="••••••"
        value={confirmPassword}
        onChangeText={(text) => handlePasswordChange(text, "confirm")}
        keyboardType="numeric"
        maxLength={6}
        secureTextEntry
      />
      {confirmError ? (
        <Text style={styles.errorText}>{confirmError}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Tạo Tài Khoản</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        Đã có tài khoản?{" "}
        <Text
          style={{ fontWeight: "bold" }}
          onPress={() => router.push("/signin")}
        >
          Đăng nhập
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  logo: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  label: { fontWeight: "600", marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#f1f3f9",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { fontWeight: "bold", fontSize: 16 },
  bottomText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 13,
    color: "#333",
  },
});
