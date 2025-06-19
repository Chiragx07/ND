import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/colors';
import { UserPlus, ArrowLeft } from 'lucide-react-native';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: string, value: string) => {
    let error = '';

    switch (field) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Full name is required';
        } else if (value.trim().length < 2) {
          error = 'Full name must be at least 2 characters';
        }
        break;

      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'phoneNumber':
        const cleanPhone = value.replace(/\D/g, '');
        if (!value) {
          error = 'Phone number is required';
        } else if (cleanPhone.length !== 10) {
          error = 'Please enter a valid 10-digit phone number';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = 'Password must contain uppercase, lowercase, and number';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = ['fullName', 'email', 'phoneNumber', 'password', 'confirmPassword'];

    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    // Mark all required fields as touched
    const requiredFields = ['fullName', 'email', 'phoneNumber', 'password', 'confirmPassword'];
    const newTouched: Record<string, boolean> = {};
    requiredFields.forEach(field => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Registration Successful!',
        'Welcome to NextDoor! You can now access all local home services.',
        [
          {
            text: 'Get Started',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Registration Failed', 'Please check your information and try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Validate field on blur if it was touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleFieldBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Link href="/auth/login" asChild>
          <TouchableOpacity style={styles.backButton}>
            <ArrowLeft size={24} color={Colors.neutral[700]} />
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <UserPlus size={32} color={Colors.primary[600]} />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join NextDoor for trusted local home services</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            value={formData.fullName}
            onChangeText={(value) => updateFormData('fullName', value)}
            onBlur={() => handleFieldBlur('fullName')}
            placeholder="Enter your full name"
            error={touched.fullName ? errors.fullName : ''}
            required
            autoCapitalize="words"
            autoComplete="name"
          />

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChangeText={(value) => updateFormData('email', value)}
            onBlur={() => handleFieldBlur('email')}
            placeholder="Enter your email address"
            error={touched.email ? errors.email : ''}
            required
            autoCapitalize="none"
            autoComplete="email"
          />

          <Input
            label="Phone Number"
            type="phone"
            value={formData.phoneNumber}
            onChangeText={(value) => updateFormData('phoneNumber', value)}
            onBlur={() => handleFieldBlur('phoneNumber')}
            placeholder="Enter your 10-digit phone number"
            error={touched.phoneNumber ? errors.phoneNumber : ''}
            required
            maxLength={10}
            autoComplete="tel"
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChangeText={(value) => updateFormData('password', value)}
            onBlur={() => handleFieldBlur('password')}
            placeholder="Create a strong password"
            error={touched.password ? errors.password : ''}
            hint="Must contain uppercase, lowercase, and number"
            required
            autoCapitalize="none"
            autoComplete="new-password"
          />

          <Input
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChangeText={(value) => updateFormData('confirmPassword', value)}
            onBlur={() => handleFieldBlur('confirmPassword')}
            placeholder="Confirm your password"
            error={touched.confirmPassword ? errors.confirmPassword : ''}
            required
            autoCapitalize="none"
            autoComplete="new-password"
          />

          <Input
            label="Address (Optional)"
            value={formData.address}
            onChangeText={(value) => updateFormData('address', value)}
            placeholder="Enter your delivery address"
            multiline
            numberOfLines={2}
            autoCapitalize="words"
            autoComplete="street-address"
          />

          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Link href="/auth/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    flex: 1,
  },
  registerButton: {
    marginTop: 8,
    marginBottom: 32,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary[600],
  },
});