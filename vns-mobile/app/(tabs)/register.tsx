// app/(tabs)/register.tsx
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

// Types
interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password: string;
  confirmPassword: string;
}

// Constants
const API_ENDPOINTS = {
  REGISTER: "http://172.16.17.3/api/Auth/register",
} as const;

const VALIDATION_MESSAGES = {
  NAME_REQUIRED: "Vui lòng nhập họ tên",
  EMAIL_REQUIRED: "Vui lòng nhập email",
  PHONE_REQUIRED: "Vui lòng nhập số điện thoại",
  PASSWORD_REQUIRED: "Vui lòng nhập mật khẩu",
  PASSWORD_LENGTH: "Mật khẩu phải có ít nhất 6 số",
  CONFIRM_PASSWORD_REQUIRED: "Vui lòng xác nhận mật khẩu",
  PASSWORD_MISMATCH: "Mật khẩu không khớp",
  REGISTER_SUCCESS: "Tạo tài khoản thành công!",
  REGISTER_FAILED: "Đăng ký thất bại",
  CONNECTION_ERROR: "Không thể kết nối đến máy chủ",
} as const;

const PASSWORD_CONFIG = {
  MAX_LENGTH: 12,
  MIN_LENGTH: 6,
  REGEX: /^[a-zA-Z0-9]*$/,
} as const;

export default function RegisterScreen() {
  // State management
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // Utility functions
  const isValidNumericInput = (text: string): boolean => {
    return PASSWORD_CONFIG.REGEX.test(text);
  };

  const clearError = (field: keyof FormErrors): void => {
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  // Event handlers
  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNumericInput = (text: string, field: "password" | "confirmPassword"): void => {
    if (isValidNumericInput(text)) {
      const limitedText = text.slice(0, PASSWORD_CONFIG.MAX_LENGTH);
      
      setFormData(prev => ({ ...prev, [field]: limitedText }));
      
      if (field === "password") {
        clearError("password");
      } else {
        clearError("confirmPassword");
      }
    }
  };

  // Validation functions
  const validateForm = (): boolean => {
    let isValid = true;

    // Basic field validation
    if (!formData.name.trim()) {
      Alert.alert("Lỗi", VALIDATION_MESSAGES.NAME_REQUIRED);
      isValid = false;
    }

    if (!formData.email.trim()) {
      Alert.alert("Lỗi", VALIDATION_MESSAGES.EMAIL_REQUIRED);
      isValid = false;
    }

    if (!formData.phone.trim()) {
      Alert.alert("Lỗi", VALIDATION_MESSAGES.PHONE_REQUIRED);
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: VALIDATION_MESSAGES.PASSWORD_REQUIRED }));
      isValid = false;
    } else if (formData.password.length < PASSWORD_CONFIG.MIN_LENGTH) {
      setErrors(prev => ({ ...prev, password: VALIDATION_MESSAGES.PASSWORD_LENGTH }));
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: VALIDATION_MESSAGES.CONFIRM_PASSWORD_REQUIRED }));
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: VALIDATION_MESSAGES.PASSWORD_MISMATCH }));
      isValid = false;
    }

    return isValid;
  };

  // API functions
  const registerUser = async (): Promise<void> => {
    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
          fullName: formData.name.trim(),
          phoneNumber: formData.phone.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Thành công", VALIDATION_MESSAGES.REGISTER_SUCCESS, [
          {
            text: "OK",
            onPress: () => router.replace("/signin"),
          },
        ]);
      } else {
        Alert.alert("Lỗi", data.message || VALIDATION_MESSAGES.REGISTER_FAILED);
      }
    } catch (error) {
      Alert.alert("Lỗi", VALIDATION_MESSAGES.CONNECTION_ERROR);
    }
  };

  // Main handlers
  const handleRegister = async (): Promise<void> => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await registerUser();
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignIn = (): void => {
    router.push("/signin");
  };

  // Render functions
  const renderFormField = (
    label: string,
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    options?: {
      keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
      autoCapitalize?: "none" | "sentences" | "words" | "characters";
      secureTextEntry?: boolean;
      maxLength?: number;
      error?: string;
    }
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, options?.error ? styles.errorInput : null]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={options?.keyboardType || "default"}
        autoCapitalize={options?.autoCapitalize}
        secureTextEntry={options?.secureTextEntry}
        maxLength={options?.maxLength}
      />
      {options?.error && <Text style={styles.errorText}>{options.error}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.logo}>Vietnam Travel Explorer ✦</Text>
        <Text style={styles.title}>Tạo tài khoản</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        {renderFormField(
          "Họ và tên",
          "Nhập họ tên",
          formData.name,
          (text) => handleInputChange("name", text)
        )}

        {renderFormField(
          "Email",
          "Nhập email",
          formData.email,
          (text) => handleInputChange("email", text),
          {
            keyboardType: "email-address",
            autoCapitalize: "none",
          }
        )}

        {renderFormField(
          "SĐT",
          "Nhập số điện thoại",
          formData.phone,
          (text) => handleInputChange("phone", text),
          {
            keyboardType: "phone-pad",
          }
        )}

        {renderFormField(
          "Mật khẩu",
          "••••••",
          formData.password,
          (text) => handleNumericInput(text, "password"),
          {
            keyboardType: "numeric",
            secureTextEntry: true,
            maxLength: PASSWORD_CONFIG.MAX_LENGTH,
            error: errors.password,
          }
        )}

        {renderFormField(
          "Xác nhận mật khẩu",
          "••••••",
          formData.confirmPassword,
          (text) => handleNumericInput(text, "confirmPassword"),
          {
            keyboardType: "numeric",
            secureTextEntry: true,
            maxLength: PASSWORD_CONFIG.MAX_LENGTH,
            error: errors.confirmPassword,
          }
        )}
      </View>

      {/* Action Section */}
      <View style={styles.actionSection}>
        <TouchableOpacity 
          style={[styles.button, loading && styles.disabledButton]} 
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Đang xử lý..." : "Tạo Tài Khoản"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.bottomText}>
          Đã có tài khoản?{" "}
          <Text style={styles.linkText} onPress={navigateToSignIn}>
            Đăng nhập
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: "center",
  },
  formSection: {
    flex: 1,
    paddingHorizontal: 24,
  },
  actionSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  logo: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  fieldContainer: {
    marginBottom: 4,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  errorInput: {
    borderColor: "#ff4444",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#b0c4de",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#666",
  },
  linkText: {
    fontWeight: "bold",
    color: "#007AFF",
  },
});