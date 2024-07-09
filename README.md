Pokemon app using bare React Native and React-Navigation

- biggest problem right now: Adding Onyx (precisely adding sqlite)

Problem occurs while trying to build application after installing sqlite, it doesn't if before or after onyx installation.
```
--- xcodebuild: WARNING: Using the first of multiple matching destinations:
{ platform:iOS Simulator, id:45A8E93D-E18F-463E-A834-1C83A375BF7D, OS:17.5, name:iPhone 15 Pro }
{ platform:iOS Simulator, id:45A8E93D-E18F-463E-A834-1C83A375BF7D, OS:17.5, name:iPhone 15 Pro }
** BUILD FAILED **


The following build commands failed:
        CompileC /Users/wiktorgut/Library/Developer/Xcode/DerivedData/pokender-chpgqoegwpbveohdimpbqvdczsza/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/react-native-quick-sqlite.build/Objects-normal/arm64/QuickSQLite.o /Users/wiktorgut/Desktop/pokedex/pokender/node_modules/react-native-quick-sqlite/ios/QuickSQLite.mm normal arm64 objective-c++ com.apple.compilers.llvm.clang.1_0.compiler (in target 'react-native-quick-sqlite' from project 'Pods')
(1 failure)
```