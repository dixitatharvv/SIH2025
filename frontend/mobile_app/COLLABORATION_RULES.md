# 🤝 Collaboration Rules for Pravah Mobile App

## 🎯 **Team Assignment**

### **Person A (You)**
- **Primary Features**: Home screen, Location services, Risk assessment
- **Files to Work On**:
  - `lib/features/home/` (entire folder)
  - `lib/services/location_service.dart`
  - `lib/core/` (shared utilities)

### **Person B (Your Friend)**
- **Primary Features**: Reports, Community, Profile
- **Files to Work On**:
  - `lib/features/reports/` (entire folder)
  - `lib/features/community/` (entire folder)
  - `lib/features/profile/` (entire folder)

## 📋 **Daily Workflow**

### **Before Starting Work**
```bash
# 1. Always pull latest changes first
git pull origin flutwick_ps

# 2. Check current branch
git branch
```

### **Creating a Feature Branch**
```bash
# Create and switch to new feature branch
git checkout -b feature/your-name/feature-description

# Examples:
git checkout -b feature/john/location-tracking
git checkout -b feature/sarah/report-creation
```

### **Working on Your Feature**
```bash
# Make your changes
# Test your changes
flutter run

# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add location tracking to home screen"

# Push to your feature branch
git push origin feature/your-name/feature-description
```

### **Merging Your Work**
1. **Create Pull Request** on GitHub from your feature branch to `flutwick_ps`
2. **Request Review** from your teammate
3. **Merge** after approval

## 🚫 **What NOT to Do**

### **Never Do These:**
- ❌ Work directly on `flutwick_ps` branch
- ❌ Modify files outside your assigned area without asking
- ❌ Commit broken code
- ❌ Force push to shared branches
- ❌ Delete other people's code

### **Always Ask Before:**
- 🔄 Changing shared models (`lib/models/`)
- 🔄 Modifying core services (`lib/services/`)
- 🔄 Updating dependencies (`pubspec.yaml`)
- 🔄 Changing app constants (`lib/core/constants/`)

## 📁 **File Ownership**

### **Shared Files (Coordinate Changes)**
```
lib/
├── models/           # Data models - coordinate changes
├── services/         # API services - coordinate changes
├── core/            # Core utilities - coordinate changes
└── main.dart        # App entry point - coordinate changes
```

### **Your Files (Person A)**
```
lib/features/home/   # Home screen and widgets
lib/services/location_service.dart
```

### **Friend's Files (Person B)**
```
lib/features/reports/    # Report functionality
lib/features/community/  # Community features
lib/features/profile/    # Profile management
```

## 🔄 **Conflict Resolution**

### **If You Have Merge Conflicts:**
1. **Don't panic!** This is normal
2. **Communicate** with your teammate
3. **Pull latest changes**: `git pull origin flutwick_ps`
4. **Resolve conflicts** in your editor
5. **Test** the resolved code
6. **Commit** the resolution

### **Conflict Prevention:**
- **Communicate** before making changes to shared files
- **Pull frequently** to stay updated
- **Work on different features** simultaneously
- **Use feature branches** for all work

## 📱 **Testing Before Committing**

### **Always Test:**
```bash
# Check for linting errors
flutter analyze

# Run tests
flutter test

# Test on device/emulator
flutter run
```

### **If Tests Fail:**
- **Fix the issues** before committing
- **Ask for help** if you're stuck
- **Don't commit broken code**

## 💬 **Communication Protocol**

### **Daily Check-ins:**
- **Morning**: Share what you plan to work on
- **Evening**: Share progress and any blockers

### **When to Communicate:**
- 🔄 Before changing shared files
- 🐛 When you find bugs
- ❓ When you need help
- ✅ When you complete a feature

### **Communication Channels:**
- **GitHub Issues** for bugs and feature requests
- **Pull Request Comments** for code reviews
- **Team Chat** for quick questions

## 🎯 **Feature Development Process**

### **1. Planning Phase**
- **Discuss** the feature with your teammate
- **Break down** into smaller tasks
- **Assign** specific tasks to each person

### **2. Development Phase**
- **Create feature branch**
- **Implement** your assigned tasks
- **Test** thoroughly
- **Commit** with descriptive messages

### **3. Integration Phase**
- **Create Pull Request**
- **Review** each other's code
- **Test** the integrated feature
- **Merge** after approval

## 📊 **Progress Tracking**

### **Use GitHub Issues to Track:**
- [ ] Feature requests
- [ ] Bug reports
- [ ] Tasks and subtasks
- [ ] Progress updates

### **Label Your Issues:**
- `feature` - New features
- `bug` - Bug fixes
- `enhancement` - Improvements
- `documentation` - Documentation updates

## 🚀 **Release Process**

### **Before Each Release:**
1. **Complete all features** in feature branches
2. **Merge all Pull Requests** to `flutwick_ps`
3. **Test the complete app** thoroughly
4. **Create release branch** from `flutwick_ps`
5. **Merge to main** after final testing

## 🆘 **Getting Help**

### **When You're Stuck:**
1. **Check documentation** first
2. **Search GitHub issues** for similar problems
3. **Ask your teammate** for help
4. **Create GitHub issue** if it's a bug
5. **Ask in team chat** for quick questions

### **Emergency Situations:**
- **Broken main branch**: Contact team lead immediately
- **Data loss**: Don't panic, use git reflog to recover
- **Critical bugs**: Create urgent issue and notify team

---

## 📝 **Quick Reference Commands**

```bash
# Daily workflow
git pull origin flutwick_ps
git checkout -b feature/your-name/feature-name
# ... make changes ...
git add .
git commit -m "feat: your feature description"
git push origin feature/your-name/feature-name

# Check status
git status
git branch
git log --oneline

# Resolve conflicts
git pull origin flutwick_ps
# ... resolve conflicts ...
git add .
git commit -m "resolve: merge conflicts"
```

Remember: **Communication is key!** When in doubt, ask your teammate. It's better to ask questions than to break the codebase! 🚀
