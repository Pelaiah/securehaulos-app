# SECUREHAUL Driver Portal — Android Studio Project

Native Android companion app for long-haul truck drivers built with **Kotlin** and **Jetpack Compose (Material 3)**.

---

## Quick Start in Android Studio

1. **Open Android Studio** (Hedgehog, Iguana, Koala, Ladybug, or newer with JDK 17+).
2. Click **File > Open...** (or "Open existing project" from the welcome screen).
3. Navigate to and select this `android` folder (containing `settings.gradle.kts` and `build.gradle.kts`).
4. Wait for Gradle sync to complete:
   - Target SDK: **34** (Android 14)
   - Min SDK: **26** (Android 8.0 Oreo)
   - Compose Compiler: **Kotlin 2.0.20** with Compose BOM 2024.09.02
5. Select a device or Android Virtual Device (AVD Emulator) and click **Run (Shift+F10)**.

---

## Project Structure

```
android/
├── settings.gradle.kts       # Project repositories and included modules
├── build.gradle.kts          # Top-level build configuration
├── gradle.properties         # JVM args and AndroidX flags
├── gradle/
│   ├── libs.versions.toml    # Version catalog for Compose & Material 3
│   └── wrapper/
│       └── gradle-wrapper.properties
└── app/
    ├── build.gradle.kts      # Application module dependencies & plugins
    ├── proguard-rules.pro
    └── src/main/
        ├── AndroidManifest.xml
        ├── res/values/
        │   ├── colors.xml    # #34785D primary green, #DC2626 violation red
        │   ├── strings.xml
        │   └── themes.xml
        └── java/com/securehaul/driver/
            ├── MainActivity.kt        # Edge-to-edge Compose scaffold & navigation
            ├── theme/
            │   ├── Color.kt           # Design tokens (#34785D, #22C55E, #1C1E21)
            │   └── Theme.kt           # Dark mode first & light inspection theme
            ├── model/
            │   └── DriverModels.kt    # HOS, Telemetry, Stops, Inspection items
            └── ui/screens/
                ├── HomeScreen.kt      # Screen 1: Stationary Cockpit & HOS Ring
                ├── ActiveTripScreen.kt# Screen 3: Turn-by-turn driving HUD
                ├── InspectionScreen.kt# Screen 2: Pre-Trip light-mode DVIR & signature
                ├── LogsScreen.kt      # Screen 4: 24h HOS compliance timeline
                └── VehicleScreen.kt   # Screen 5: Telemetry & tire pressure alert
```

---

## Companion Features

- **HOS Compliance**: Real-time 70h/8d cycle limit, 11h drive limit, and 14h duty clock.
- **Glanceability**: Very large tabular speedometer (68 km/h) and remaining HOS timers (07:28).
- **Light-Mode DVIR Walkaround**: 12/12 checklist with digital signature verification.
- **Cold-Chain Telemetry**: Continuous Reefer monitoring at -4°F (-20°C) for pharmaceutical cargo.
