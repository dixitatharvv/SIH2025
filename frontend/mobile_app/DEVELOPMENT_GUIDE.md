# Pravah Mobile App - Development Guide

## 📁 Project Structure

```
lib/
├── core/                    # ✅ Core functionality
│   ├── constants/          # ✅ App constants
│   ├── theme/             # ✅ Fixed theme
│   └── utils/             # ✅ Utilities
├── features/              # ✅ Feature-based modules
│   ├── home/             # ✅ Home feature
│   │   ├── screens/      # ✅ Home screen
│   │   └── widgets/      # ✅ All widgets moved here
│   ├── reports/          # ✅ Report feature
│   ├── community/        # ✅ Community feature
│   └── profile/          # ✅ Profile feature
├── models/               # ✅ Data models
├── services/             # ✅ API services
└── main.dart            # ✅ App entry point
```

## 🤝 Collaboration Guidelines

### Branch Strategy
- **Main Branch**: `main` - Production-ready code
- **Development Branch**: `flutwick_ps` - Your current working branch
- **Feature Branches**: Create new branches for each feature

### Working with Your Friend

#### 1. **Feature-Based Development**
Each person should work on different features:
- **Person A**: Home screen, Location services, Risk assessment
- **Person B**: Reports, Community, Profile features

#### 2. **Branch Naming Convention**
```
feature/[your-name]/[feature-name]
```
Examples:
- `feature/john/report-creation`
- `feature/sarah/community-chat`
- `feature/john/location-tracking`

#### 3. **Daily Workflow**
```bash
# 1. Pull latest changes
git pull origin flutwick_ps

# 2. Create feature branch
git checkout -b feature/your-name/feature-name

# 3. Work on your feature
# ... make changes ...

# 4. Commit your changes
git add .
git commit -m "feat: add report creation screen"

# 5. Push to your feature branch
git push origin feature/your-name/feature-name

# 6. Create Pull Request to flutwick_ps branch
```

### 4. **File Organization Rules**

#### **DO:**
- Work in your assigned feature folder
- Use the existing models and services
- Follow the established naming conventions
- Test your changes before committing

#### **DON'T:**
- Modify files outside your feature area without coordination
- Change core constants without discussing
- Commit broken code
- Work directly on `flutwick_ps` branch

### 5. **Communication**
- Use GitHub Issues for bug reports
- Use Pull Request comments for code reviews
- Coordinate on shared components (like models)

## 🛠️ Development Setup

### Prerequisites
- Flutter SDK (latest stable)
- Android Studio or VS Code
- Git

### Setup Commands
```bash
# Clone the repository
git clone [repository-url]
cd SIH2025/frontend/mobile_app

# Install dependencies
flutter pub get

# Run the app
flutter run
```

### Environment Setup
Create a `.env` file in the root directory:
```
API_BASE_URL=http://localhost:8000
```

## 📱 Testing

### Run Tests
```bash
# Unit tests
flutter test

# Integration tests
flutter test integration_test/
```

### Device Testing
```bash
# List available devices
flutter devices

# Run on specific device
flutter run -d [device-id]
```

## 🚀 Deployment

### Build for Android
```bash
# Debug build
flutter build apk --debug

# Release build
flutter build apk --release
```

### Build for iOS
```bash
# Debug build
flutter build ios --debug

# Release build
flutter build ios --release
```

## 📋 Code Standards

### Naming Conventions
- **Files**: `snake_case.dart`
- **Classes**: `PascalCase`
- **Variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`

### Code Style
- Use meaningful variable names
- Add comments for complex logic
- Follow Flutter/Dart conventions
- Use const constructors where possible

### Commit Messages
Use conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes

## 🔧 Troubleshooting

### Common Issues
1. **Dependencies**: Run `flutter pub get`
2. **Build errors**: Run `flutter clean && flutter pub get`
3. **Device not found**: Check `flutter devices`

### Getting Help
- Check Flutter documentation
- Ask in team chat
- Create GitHub issue for bugs

## 📊 Progress Tracking

### Current Features
- ✅ Home screen with cards
- ✅ Basic navigation
- ✅ Theme setup
- ⏳ Report creation
- ⏳ Community features
- ⏳ Profile management

### Next Steps
1. Implement report creation screen
2. Add community features
3. Integrate with backend API
4. Add push notifications
5. Implement offline functionality
