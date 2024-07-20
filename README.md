# Yêu cầu hệ thống 
- NodeJS: 20.15 hoặc bản LTS mới nhất.
- JDK: 17.0.11
- Android Studio: Sử dụng để chạy ứng dụng, build aab, apk
- Android SDK: Android SDK 34 platform tools hoặc phiên bản phù hợp với phiên bản React-native đang sử dụng
---
# Hướng dẫn cài đặt 
---

## Setup Android Studio
- Cài đặt Android Studio [Hướng dẫn](https://developer.android.com/studio/install)
- Làm theo hướng dẫn của React-Native: [Hướng dẫn chính thức](https://reactnative.dev/docs/set-up-your-environment)
- Cài đặt Android SDK platform
- Yêu cầu thêm: NDK, SDK Command-lines Tools, SDK Platform-tools, CMAKE, Android Emulator. Cài đặt trong Android Studio SDK Manager
> *Với người dùng Linux, người dùng cần cài thêm phiên bản 32-bit cho các thư viện sau **glibc,ncurses, libstdc++, zlib***
---
## Setup android studio 
- Mở Device Manager của Android Studio, tạo thiết bị ảo mới hoặc edit thiết bị hiện có
- Chọn mở tab chọn image, chọn sang mục x86 Images
- Chọn Image phù hợp với phiên bản react-native đang sử dụng, ở project là 14, API version 34. Chọn type/target là Default android system images. Không chọn Google API hoặc AOSP ATD.
- Wipe data nếu cần thiết.
## Cài đặt dependencies
- Tại thư mục gốc của project, chạy lệnh sau trong shell hoặc terminal
    `npm install`
- Tại thư mục nodejs-assets/nodejs-project, chạy lệnh tương tự
    `npm install`

## Bundle Javascript cho backend
- Tại thư mục gốc chạy lệnh `npx webpack`
- Kiểm tra file ở thư mục **nodejs-assets/nodejs-project/dist/index.js** có tồn tại

---
# Chạy ứng dụng 
---

## Chạy ở local machine
- Thực hiện tất cả các bước ở hướng dẫn cài đặt trước khi chạy.
- Khởi động android studio, khởi động emulator.
- Mở một shell hoặc terminal ở thư mục gốc của project. Chạy lệnh `npm start`, hoặc `npm run android`.

## Build aab
- Ở thư mục gốc của ứng dụng chạy lệnh 
    `npx react-native build-android --mode=debug`
> *Đổi thành `mode=release` để có release build*
- File aab có thể tìm thấy ở android/app/build/outputs/bundle/debug/app-debug.aab

## Build APK 
- Build aab trước khi build apk
- Mở thư mục android bằng Android Studio
- Chọn tab Build => Generate Signed APK
- Cài đặt file APK trên thiết bị khác
