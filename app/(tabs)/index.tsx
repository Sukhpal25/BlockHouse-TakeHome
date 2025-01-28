import React, { useState } from 'react'; // Import React and useState hook for state management
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native'; // Import various React Native components for building the UI

const AuthScreens = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Sign Up screens
  const [email, setEmail] = useState(''); // State to manage the email input
  const [password, setPassword] = useState(''); // State to manage the password input
  const [confirmPassword, setConfirmPassword] = useState(''); // State for the confirm password input (used only in Sign Up)
  const [errors, setErrors] = useState<Record<string, string>>({}); // State to manage form validation errors

  // Function to validate the form inputs
  const validateForm = () => {
    const newErrors: Record<string, string> = {}; // Object to store validation errors
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to validate email format

    if (!email) {
      newErrors.email = 'Email is required'; // Check if email is empty
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format'; // Check if email format is valid
    }

    if (!password) {
      newErrors.password = 'Password is required'; // Check if password is empty
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'; // Check password length
    }

    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'; // Ensure passwords match in Sign Up
    }

    setErrors(newErrors); // Update the errors state
    return Object.keys(newErrors).length === 0; // Return true if there are no validation errors
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', { email, password }); // Log the submitted data
      // Add your authentication logic here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Wrapper for safe area to avoid overlaps with device notches */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        {/* Handles keyboard behavior to avoid overlapping input fields */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Allows scrolling when the content overflows */}
          <View style={styles.formContainer}>
            {/* Main form container with a styled card appearance */}
            <Text style={styles.title}>
              {isLogin ? 'Login' : 'Sign Up'}
            </Text>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail} // Update email state on input change
                placeholder="Enter your email"
                keyboardType="email-address" // Show email-specific keyboard
                autoCapitalize="none" // Disable auto-capitalization
                autoCorrect={false} // Disable auto-correction
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword} // Update password state on input change
                placeholder="Enter your password"
                secureTextEntry // Mask the input for security
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Confirm Password Input (Only for Sign Up) */}
            {!isLogin && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword} // Update confirm password state
                  placeholder="Confirm your password"
                  secureTextEntry // Mask the input for security
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit} // Call handleSubmit on press
              activeOpacity={0.8} // Adjust opacity for a better click effect
            >
              <Text style={styles.submitButtonText}>
                {isLogin ? 'Login' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            {/* Toggle Button to Switch Between Login and Sign Up */}
            <TouchableOpacity
              onPress={() => {
                setIsLogin(!isLogin); // Toggle between Login and Sign Up
                setErrors({}); // Clear existing errors
                setEmail(''); // Reset email input
                setPassword(''); // Reset password input
                setConfirmPassword(''); // Reset confirm password input
              }}
              style={styles.switchButton}
            >
              <Text style={styles.switchButtonText}>
                {isLogin
                  ? 'Need an account? Sign up' // Text for switching to Sign Up
                  : 'Already have an account? Login'} // Text for switching to Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background for the screen
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Center content vertically
    padding: 20, // Add padding around the content
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10, // Rounded corners for the form container
    padding: 20, // Padding inside the form
    shadowColor: '#000', // Shadow color for elevation
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Android-specific shadow
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold', // Bold text for the title
    textAlign: 'center', // Center the title text
    marginBottom: 20,
    color: '#333', // Dark gray color for the title
  },
  inputGroup: {
    marginBottom: 15, // Spacing between input groups
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333', // Dark gray color for labels
    fontWeight: '500', // Semi-bold text
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd', // Light gray border
    borderRadius: 8, // Rounded input corners
    padding: 12, // Padding inside input fields
    fontSize: 16,
    backgroundColor: '#fff', // White background for inputs
  },
  errorText: {
    color: '#dc2626', // Red color for error messages
    fontSize: 14,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#2563eb', // Blue background for the button
    padding: 15, // Padding inside the button
    borderRadius: 8, // Rounded corners for the button
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white', // White text color for the button
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600', // Semi-bold text
  },
  switchButton: {
    marginTop: 15,
    padding: 10,
  },
  switchButtonText: {
    color: '#2563eb', // Blue text for the toggle button
    textAlign: 'center',
    fontSize: 14,
  },
});

export default AuthScreens; // Export the component
