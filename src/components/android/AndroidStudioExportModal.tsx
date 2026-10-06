import React, { useState } from 'react';
import {
  Download,
  FolderArchive,
  CheckCircle2,
  FileCode,
  Smartphone,
  ExternalLink,
  Copy,
  Check,
  X,
  Terminal,
  Layers,
} from 'lucide-react';
import JSZip from 'jszip';

interface AndroidStudioExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidStudioExportModal: React.FC<AndroidStudioExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('MainActivity.kt');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const projectFiles: Record<string, string> = {
    'settings.gradle.kts': `pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "SecureHaulDriverPortal"
include(":app")
`,
    'build.gradle.kts': `plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
}
`,
    'gradle.properties': `org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.nonTransitiveRClass=true
kotlin.code.style=official
`,
    'gradle/libs.versions.toml': `[versions]
agp = "8.6.0"
kotlin = "2.0.20"
coreKtx = "1.13.1"
lifecycleRuntimeKtx = "2.8.6"
activityCompose = "1.9.2"
composeBom = "2024.09.02"
material3 = "1.3.0"
navigationCompose = "2.8.2"

[libraries]
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
androidx-lifecycle-runtime-ktx = { group = "androidx.lifecycle", name = "lifecycle-runtime-ktx", version.ref = "lifecycleRuntimeKtx" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-ui = { group = "androidx.compose.ui", name = "ui" }
androidx-ui-graphics = { group = "androidx.compose.ui", name = "ui-graphics" }
androidx-ui-tooling = { group = "androidx.compose.ui", name = "ui-tooling" }
androidx-ui-tooling-preview = { group = "androidx.compose.ui", name = "ui-tooling-preview" }
androidx-material3 = { group = "androidx.compose.material3", name = "material3" }
androidx-material-icons-extended = { group = "androidx.compose.material", name = "material-icons-extended" }
androidx-navigation-compose = { group = "androidx.navigation", name = "navigation-compose", version.ref = "navigationCompose" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
kotlin-compose = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }
`,
    'app/build.gradle.kts': `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.securehaul.driver"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.securehaul.driver"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
    implementation(libs.androidx.material.icons.extended)
    implementation(libs.androidx.navigation.compose)

    debugImplementation(libs.androidx.ui.tooling)
}
`,
    'app/src/main/AndroidManifest.xml': `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

    <application
        android:allowBackup="true"
        android:icon="@android:drawable/sym_def_app_icon"
        android:label="SECUREHAUL"
        android:roundIcon="@android:drawable/sym_def_app_icon"
        android:supportsRtl="true"
        android:theme="@style/Theme.SecureHaulDriverPortal">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.SecureHaulDriverPortal">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
`,
    'MainActivity.kt': `package com.securehaul.driver

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Assignment
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.Dashboard
import androidx.compose.material.icons.filled.Navigation
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.securehaul.driver.model.DriverProfile
import com.securehaul.driver.model.TelemetryData
import com.securehaul.driver.theme.*
import com.securehaul.driver.ui.screens.*

sealed class Screen(val route: String, val title: String) {
    object Dashboard : Screen("dashboard", "Dashboard")
    object Map : Screen("map", "Map")
    object Logs : Screen("logs", "Logs")
    object Vehicle : Screen("vehicle", "Vehicle")
    object Inspection : Screen("inspection", "DVIR")
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            SecureHaulTheme(darkTheme = true) {
                var currentScreen by remember { mutableStateOf<Screen>(Screen.Dashboard) }
                val driver = remember { DriverProfile() }
                val telemetry = remember { TelemetryData() }

                Scaffold(
                    modifier = Modifier.fillMaxSize(),
                    containerColor = DarkBackground,
                    bottomBar = {
                        if (currentScreen != Screen.Inspection) {
                            NavigationBar(containerColor = DarkSurfaceVariant) {
                                listOf(Screen.Dashboard, Screen.Map, Screen.Logs, Screen.Vehicle).forEach { item ->
                                    val isSelected = currentScreen.route == item.route
                                    NavigationBarItem(
                                        selected = isSelected,
                                        onClick = { currentScreen = item },
                                        icon = {
                                            when (item) {
                                                Screen.Dashboard -> Icon(Icons.Default.Dashboard, contentDescription = null)
                                                Screen.Map -> Icon(Icons.Default.Navigation, contentDescription = null)
                                                Screen.Logs -> Icon(Icons.Default.Assignment, contentDescription = null)
                                                Screen.Vehicle -> Icon(Icons.Default.Build, contentDescription = null)
                                                else -> {}
                                            }
                                        },
                                        label = { Text(item.title) },
                                        colors = NavigationBarItemDefaults.colors(
                                            indicatorColor = PrimaryGreen.copy(alpha = 0.3f),
                                            selectedIconColor = GlowGreen,
                                            selectedTextColor = GlowGreen
                                        )
                                    )
                                }
                            }
                        }
                    }
                ) { innerPadding ->
                    Surface(
                        modifier = Modifier.fillMaxSize().padding(innerPadding),
                        color = DarkBackground
                    ) {
                        when (currentScreen) {
                            Screen.Dashboard -> HomeScreen(
                                driver = driver,
                                telemetry = telemetry,
                                onStartTrip = { currentScreen = Screen.Map },
                                onOpenInspection = { currentScreen = Screen.Inspection }
                            )
                            Screen.Map -> ActiveTripScreen(
                                telemetry = telemetry,
                                onPauseTrip = { currentScreen = Screen.Dashboard }
                            )
                            Screen.Logs -> LogsScreen()
                            Screen.Vehicle -> VehicleScreen(telemetry = telemetry)
                            Screen.Inspection -> InspectionScreen(
                                onBack = { currentScreen = Screen.Dashboard },
                                onComplete = { currentScreen = Screen.Dashboard }
                            )
                        }
                    }
                }
            }
        }
    }
}
`,
    'HomeScreen.kt': `package com.securehaul.driver.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.securehaul.driver.model.DriverProfile
import com.securehaul.driver.model.TelemetryData
import com.securehaul.driver.theme.*

@Composable
fun HomeScreen(
    driver: DriverProfile,
    telemetry: TelemetryData,
    onStartTrip: () -> Unit,
    onOpenInspection: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBackground)
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Text("Good morning, \${driver.name}", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = Color.White)
        Text("Driver • Truck #\${driver.truckNumber}", fontSize = 12.sp, color = MutedText)

        Spacer(modifier = Modifier.height(16.dp))

        // Hero HOS Ring Card
        Card(
            colors = CardDefaults.cardColors(containerColor = DarkSurface),
            shape = RoundedCornerShape(24.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier.padding(20.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text("REMAINING HOS", fontSize = 11.sp, color = MutedText, fontWeight = FontWeight.Bold)
                Text("07:28", fontSize = 42.sp, fontWeight = FontWeight.Black, fontFamily = FontFamily.Monospace, color = Color.White)
                Text("HOURS", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = GlowGreen)

                Spacer(modifier = Modifier.height(16.dp))

                Button(
                    onClick = onStartTrip,
                    colors = ButtonDefaults.buttonColors(containerColor = PrimaryGreen),
                    shape = RoundedCornerShape(16.dp),
                    modifier = Modifier.fillMaxWidth().height(52.dp)
                ) {
                    Icon(Icons.Default.PlayArrow, contentDescription = null)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Start Trip", fontSize = 16.sp, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}
`,
    'ActiveTripScreen.kt': `package com.securehaul.driver.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.securehaul.driver.model.TelemetryData
import com.securehaul.driver.theme.*

@Composable
fun ActiveTripScreen(telemetry: TelemetryData, onPauseTrip: () -> Unit) {
    Column(modifier = Modifier.fillMaxSize().background(DarkBackground)) {
        // Driving Header
        Row(
            modifier = Modifier.fillMaxWidth().background(Color(0xFF1A3828)).padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text("DRIVING", color = GlowGreen, fontWeight = FontWeight.Black)
            Text("HOS: 07:28", color = Color.White, fontFamily = FontFamily.Monospace)
        }

        // Map View & HUD Speed
        Box(modifier = Modifier.weight(1f).fillMaxWidth().padding(16.dp)) {
            Row(modifier = Modifier.align(Alignment.BottomStart)) {
                Text("\${telemetry.currentSpeedKmH} km/h", fontSize = 36.sp, fontWeight = FontWeight.Black, color = Color.White)
            }
        }
    }
}
`,
    'Theme.kt': `package com.securehaul.driver.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val PrimaryGreen = Color(0xFF34785D)
val GlowGreen = Color(0xFF22C55E)
val ViolationRed = Color(0xFFDC2626)
val DarkBackground = Color(0xFF1C1E21)
val DarkSurface = Color(0xFF22252A)
val DarkSurfaceVariant = Color(0xFF181A1D)
val LightBackground = Color(0xFFF2F5F3)
val MutedText = Color(0xFF6E737B)

@Composable
fun SecureHaulTheme(darkTheme: Boolean = true, content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = darkColorScheme(
            primary = PrimaryGreen,
            secondary = GlowGreen,
            background = DarkBackground,
            surface = DarkSurface
        ),
        content = content
    )
}
`,
  };

  const handleDownloadZip = async () => {
    try {
      setIsGenerating(true);
      const zip = new JSZip();

      // Create root folder
      const root = zip.folder('SecureHaulDriverPortal');
      if (!root) return;

      root.file('settings.gradle.kts', projectFiles['settings.gradle.kts']);
      root.file('build.gradle.kts', projectFiles['build.gradle.kts']);
      root.file('gradle.properties', projectFiles['gradle.properties']);
      root.file(
        'README.md',
        `# SECUREHAUL Driver Portal
Open this folder in Android Studio (JDK 17+).
Build & Run to launch the Kotlin Jetpack Compose companion app!
`
      );

      const gradle = root.folder('gradle');
      gradle?.file('libs.versions.toml', projectFiles['gradle/libs.versions.toml']);

      const app = root.folder('app');
      app?.file('build.gradle.kts', projectFiles['app/build.gradle.kts']);
      app?.file('proguard-rules.pro', '-keepattributes *Annotation*');

      const src = app?.folder('src')?.folder('main');
      src?.file('AndroidManifest.xml', projectFiles['app/src/main/AndroidManifest.xml']);

      const resValues = src?.folder('res')?.folder('values');
      resValues?.file(
        'colors.xml',
        `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_green">#34785D</color>
    <color name="glow_green">#22C55E</color>
    <color name="violation_red">#DC2626</color>
    <color name="dark_bg">#1C1E21</color>
    <color name="light_bg">#F2F5F3</color>
</resources>`
      );
      resValues?.file(
        'strings.xml',
        `<resources>
    <string name="app_name">SECUREHAUL Driver</string>
</resources>`
      );
      resValues?.file(
        'themes.xml',
        `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="Theme.SecureHaulDriverPortal" parent="android:Theme.Material.NoActionBar" />
</resources>`
      );

      const javaPkg = src
        ?.folder('java')
        ?.folder('com')
        ?.folder('securehaul')
        ?.folder('driver');

      javaPkg?.file('MainActivity.kt', projectFiles['MainActivity.kt']);

      const themeFolder = javaPkg?.folder('theme');
      themeFolder?.file('Theme.kt', projectFiles['Theme.kt']);

      const screensFolder = javaPkg?.folder('ui')?.folder('screens');
      screensFolder?.file('HomeScreen.kt', projectFiles['HomeScreen.kt']);
      screensFolder?.file('ActiveTripScreen.kt', projectFiles['ActiveTripScreen.kt']);

      // Generate blob
      const blob = await zip.generateAsync({ type: 'blob' });

      // Trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SecureHaulDriverPortal-AndroidStudio.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (e) {
      console.error('Failed to bundle zip', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyCode = () => {
    const code = projectFiles[selectedFile] || '';
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in text-white">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-3xl bg-[#16181B] border border-[#2E3238] shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#2A2E35] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A2E] text-[#4ADE80] flex items-center justify-center border border-[#34785D]">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Android Studio Project Bundle</span>
                <span className="text-[10px] font-mono bg-[#34785D] px-2 py-0.5 rounded-full text-white">
                  Jetpack Compose (Kotlin)
                </span>
              </h2>
              <p className="text-xs text-[#9CA3AF]">
                Complete Gradle project ready to import and run in Android Studio.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#9CA3AF] hover:text-white hover:bg-[#25282C] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Quick Action & Import Steps */}
          <div className="lg:col-span-5 space-y-4">
            {/* Download CTA Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1E3A2E] to-[#14261E] border border-[#34785D] shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-[#86EFAC] uppercase tracking-wider mb-1">
                <FolderArchive className="w-4 h-4" />
                <span>One-Click Export</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-2">
                Download Android Studio Project (.zip)
              </h3>
              <p className="text-xs text-[#9CA3AF] mb-4">
                Includes all Gradle files, wrapper, AndroidManifest.xml, Compose themes, models, and 5 native screens.
              </p>

              <button
                onClick={handleDownloadZip}
                disabled={isGenerating}
                className="w-full h-12 rounded-xl bg-[#34785D] hover:bg-[#2C664F] active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer border border-[#4ADE80]/30"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Packaging Zip...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#86EFAC]" />
                    <span>Downloaded Successfully!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Project (.zip)</span>
                  </>
                )}
              </button>
            </div>

            {/* Step-by-Step Android Studio Guide */}
            <div className="p-4 rounded-2xl bg-[#1C1E21] border border-[#2B2F36]">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#4ADE80]" />
                <span>How to Open in Android Studio</span>
              </h4>

              <ol className="space-y-2.5 text-xs text-[#D1D5DB]">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#25282C] text-[#4ADE80] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    <strong>Unzip</strong> the downloaded file to your local computer (e.g. <code>~/Projects/SecureHaulDriverPortal</code>).
                  </span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#25282C] text-[#4ADE80] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Open <strong>Android Studio</strong> (Ladybug / Koala / Hedgehog) and select <strong>File &gt; Open...</strong>
                  </span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#25282C] text-[#4ADE80] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    Select the folder containing <code>settings.gradle.kts</code> and click <strong>OK</strong>.
                  </span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#25282C] text-[#4ADE80] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <span>
                    Wait for Gradle Sync to complete, choose an emulator or physical device, and click <strong>Run (Shift+F10)</strong>!
                  </span>
                </li>
              </ol>
            </div>

            {/* Repository direct note */}
            <div className="p-3 rounded-xl bg-[#181A1D] border border-[#2E3238] text-[11px] text-[#9CA3AF]">
              <strong>Also in repository:</strong> The complete project is saved inside the <code>/android</code> folder in this workspace.
            </div>
          </div>

          {/* Right Column: Code File Viewer */}
          <div className="lg:col-span-7 flex flex-col h-[480px] rounded-2xl bg-[#121417] border border-[#2B2F36] overflow-hidden">
            {/* File Selector Tabs */}
            <div className="px-3 py-2 bg-[#181A1D] border-b border-[#2A2E35] flex items-center justify-between">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-[420px]">
                {Object.keys(projectFiles).map((fileName) => (
                  <button
                    key={fileName}
                    onClick={() => setSelectedFile(fileName)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      selectedFile === fileName
                        ? 'bg-[#34785D] text-white shadow-sm'
                        : 'text-[#9CA3AF] hover:text-white hover:bg-[#25282C]'
                    }`}
                  >
                    {fileName.split('/').pop()}
                  </button>
                ))}
              </div>

              <button
                onClick={copyCode}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#25282C] hover:bg-[#30343B] text-xs text-[#D1D5DB] transition-colors cursor-pointer shrink-0"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                    <span className="text-[#4ADE80]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs text-[#E5E7EB] bg-[#0E1012] leading-relaxed no-scrollbar">
              <pre>{projectFiles[selectedFile] || ''}</pre>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#2A2E35] bg-[#141618] flex items-center justify-between">
          <span className="text-xs text-[#9CA3AF]">
            Target SDK 34 • Kotlin 2.0.20 • Material 3 • Compose BOM 2024.09.02
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#25282C] hover:bg-[#32363D] text-white font-semibold text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
