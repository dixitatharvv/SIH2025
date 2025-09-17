import 'package:flutter/material.dart';
import '../../../core/constants/app_constants.dart';
import '../widgets/auth_header.dart';
import '../widgets/role_selector.dart';
import '../widgets/auth_footer.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  String _selectedRole = 'Citizen';
  bool _isLoading = false;
  bool _obscurePassword = true;

  @override
  void dispose() {
    _emailController.dispose();
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _handleSignup() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
    });

    try {
      // TODO: Implement actual signup logic with backend
      await Future.delayed(const Duration(seconds: 2)); // Simulate API call
      
      if (mounted) {
        // Navigate to home screen on successful signup
        Navigator.of(context).pushReplacementNamed('/home');
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Signup failed: ${e.toString()}'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  void _navigateToLogin() {
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF0F8FF), // Light blue background
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppConstants.defaultPadding),
          child: Column(
            children: [
               // Top row with optional Skip action
              Row(
                children: [
                  const Spacer(),
                  TextButton(
                    onPressed: () {
                      Navigator.of(context).pushReplacementNamed('/home');
                    },
                    child: const Text(
                      'Skip',
                      style: TextStyle(
                        color: Color(0xFF3B82F6),
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Header with logo and title
              const AuthHeader(),
              const SizedBox(height: 40),   
              // Main card container
              Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.1),
                      blurRadius: 20,
                      offset: const Offset(0, 10),
                    ),
                  ],
                ),
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Welcome text
                        const Text(
                          'Welcome',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF1F2937),
                          ),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'Create an account to get started!',
                          style: TextStyle(
                            fontSize: 14,
                            color: Color(0xFF6B7280),
                          ),
                        ),
                        
                        const SizedBox(height: 24),
                        
                        // Tab buttons
                        Row(
                          children: [
                            Expanded(
                              child: GestureDetector(
                                onTap: _navigateToLogin,
                                child: Container(
                                  padding: const EdgeInsets.symmetric(vertical: 12),
                                  child: const Text(
                                    'Sign In',
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                      fontSize: 16,
                                      color: Color(0xFF6B7280),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            Expanded(
                              child: Container(
                                padding: const EdgeInsets.symmetric(vertical: 12),
                                decoration: const BoxDecoration(
                                  border: Border(
                                    bottom: BorderSide(
                                      color: Color(0xFF3B82F6),
                                      width: 2,
                                    ),
                                  ),
                                ),
                                child: const Text(
                                  'Sign Up',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w600,
                                    color: Color(0xFF3B82F6),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                        
                        const SizedBox(height: 32),
                        
                        // Role selector
                        const Text(
                          'I am a:',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            color: Color(0xFF374151),
                          ),
                        ),
                        const SizedBox(height: 12),
                        RoleSelector(
                          selectedRole: _selectedRole,
                          onRoleChanged: (role) {
                            setState(() {
                              _selectedRole = role;
                            });
                          },
                        ),
                        
                        const SizedBox(height: 24),
                        
                        // Email field
                        const Text(
                          'Email Address',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            color: Color(0xFF374151),
                          ),
                        ),
                        const SizedBox(height: 8),
                        TextFormField(
                          controller: _emailController,
                          keyboardType: TextInputType.emailAddress,
                          cursorColor: const Color(0xFF1F2937),
                          style: const TextStyle(color: Color(0xFF111827)),
                          decoration: InputDecoration(
                            hintText: 'your@email.com',
                            hintStyle: const TextStyle(color: Color(0xFF9CA3AF)),
                            prefixIcon: const Icon(
                              Icons.email_outlined,
                              color: Color(0xFF9CA3AF),
                            ),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(color: Color(0xFF3B82F6)),
                            ),
                            filled: true,
                            fillColor: const Color(0xFFF9FAFB),
                          ),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter your email';
                            }
                            final emailRegex = RegExp(r'^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$');
                            if (!emailRegex.hasMatch(value)) return 'Please enter a valid email';
                            return null;
                          },
                        ),
                        
                        const SizedBox(height: 20),
                        
                        // Username field
                        const Text(
                          'Username',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            color: Color(0xFF374151),
                          ),
                        ),
                        const SizedBox(height: 8),
                        TextFormField(
                          controller: _usernameController,
                          cursorColor: const Color(0xFF1F2937),
                          style: const TextStyle(color: Color(0xFF111827)),
                          decoration: InputDecoration(
                            hintText: 'oceankeeper123',
                            hintStyle: const TextStyle(color: Color(0xFF9CA3AF)),
                            prefixIcon: const Icon(
                              Icons.person_outline,
                              color: Color(0xFF9CA3AF),
                            ),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(color: Color(0xFF3B82F6)),
                            ),
                            filled: true,
                            fillColor: const Color(0xFFF9FAFB),
                          ),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter a username';
                            }
                            if (value.length < 3) {
                              return 'Username must be at least 3 characters';
                            }
                            return null;
                          },
                        ),
                        
                        const SizedBox(height: 20),
                        
                        // Password field
                        const Text(
                          'Password',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            color: Color(0xFF374151),
                          ),
                        ),
                        const SizedBox(height: 8),
                        TextFormField(
                          controller: _passwordController,
                          obscureText: _obscurePassword,
                          cursorColor: const Color(0xFF1F2937),
                          style: const TextStyle(color: Color(0xFF111827)),
                          decoration: InputDecoration(
                            hintText: 'Enter your password',
                            hintStyle: const TextStyle(color: Color(0xFF9CA3AF)),
                            prefixIcon: const Icon(
                              Icons.lock_outline,
                              color: Color(0xFF9CA3AF),
                            ),
                            suffixIcon: IconButton(
                              onPressed: () {
                                setState(() {
                                  _obscurePassword = !_obscurePassword;
                                });
                              },
                              icon: Icon(
                                _obscurePassword
                                    ? Icons.visibility_off_outlined
                                    : Icons.visibility_outlined,
                                color: const Color(0xFF9CA3AF),
                              ),
                            ),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(color: Color(0xFF3B82F6)),
                            ),
                            filled: true,
                            fillColor: const Color(0xFFF9FAFB),
                          ),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter your password';
                            }
                            if (value.length < 6) {
                              return 'Password must be at least 6 characters';
                            }
                            return null;
                          },
                        ),
                        
                        const SizedBox(height: 32),
                        
                        // Create Account button
                        SizedBox(
                          width: double.infinity,
                          height: 50,
                          child: ElevatedButton(
                            onPressed: _isLoading ? null : _handleSignup,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF3B82F6),
                              foregroundColor: Colors.white,
                              elevation: 0,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            child: _isLoading
                                ? const SizedBox(
                                    height: 20,
                                    width: 20,
                                    child: CircularProgressIndicator(
                                      strokeWidth: 2,
                                      valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                                    ),
                                  )
                                : const Text(
                                    'Create Account',
                                    style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                          ),
                        ),
                        
                        const SizedBox(height: 24),
                        
                        // Footer
                        const AuthFooter(),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
