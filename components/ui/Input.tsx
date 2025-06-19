import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import { Colors } from '@/constants/colors';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  type?: 'text' | 'email' | 'password' | 'phone';
  required?: boolean;
}

export function Input({
  label,
  error,
  hint,
  type = 'text',
  required = false,
  style,
  onBlur,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'phone':
        return 'phone-pad';
      default:
        return 'default';
    }
  };

  const getSecureTextEntry = () => {
    return type === 'password' && !isPasswordVisible;
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError,
      ]}>
        <TextInput
          style={[styles.input, style]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType={getKeyboardType()}
          secureTextEntry={getSecureTextEntry()}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          autoCorrect={false}
          spellCheck={false}
          {...props}
        />
        {type === 'password' && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={Colors.neutral[500]} />
            ) : (
              <Eye size={20} color={Colors.neutral[500]} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {hint && !error && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.neutral[700],
    marginBottom: 8,
  },
  required: {
    color: Colors.error[500],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.neutral[300],
    borderRadius: 12,
    backgroundColor: Colors.white,
    minHeight: 48,
  },
  inputContainerFocused: {
    borderColor: Colors.primary[600],
    shadowColor: Colors.primary[600],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  inputContainerError: {
    borderColor: Colors.error[500],
    shadowColor: Colors.error[500],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[900],
    lineHeight: 20,
  },
  eyeIcon: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.error[500],
    marginTop: 6,
    marginLeft: 4,
  },
  hint: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
    marginTop: 6,
    marginLeft: 4,
  },
});