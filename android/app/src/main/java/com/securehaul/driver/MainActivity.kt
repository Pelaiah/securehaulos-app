package com.securehaul.driver

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
import androidx.compose.ui.graphics.vector.ImageVector
import com.securehaul.driver.model.DriverProfile
import com.securehaul.driver.model.TelemetryData
import com.securehaul.driver.theme.DarkBackground
import com.securehaul.driver.theme.DarkSurfaceVariant
import com.securehaul.driver.theme.GlowGreen
import com.securehaul.driver.theme.MutedText
import com.securehaul.driver.theme.PrimaryGreen
import com.securehaul.driver.theme.SecureHaulTheme
import com.securehaul.driver.ui.screens.*

sealed class Screen(val route: String, val title: String, val icon: ImageVector) {
    object Dashboard : Screen("dashboard", "Dashboard", Icons.Default.Dashboard)
    object Map : Screen("map", "Map", Icons.Default.Navigation)
    object Logs : Screen("logs", "Logs", Icons.Default.Assignment)
    object Vehicle : Screen("vehicle", "Vehicle", Icons.Default.Build)
    object Inspection : Screen("inspection", "DVIR", Icons.Default.Assignment)
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
                            NavigationBar(
                                containerColor = DarkSurfaceVariant
                            ) {
                                val navItems = listOf(
                                    Screen.Dashboard,
                                    Screen.Map,
                                    Screen.Logs,
                                    Screen.Vehicle
                                )
                                navItems.forEach { item ->
                                    val isSelected = currentScreen.route == item.route
                                    NavigationBarItem(
                                        selected = isSelected,
                                        onClick = { currentScreen = item },
                                        icon = {
                                            Icon(
                                                item.icon,
                                                contentDescription = item.title,
                                                tint = if (isSelected) GlowGreen else MutedText
                                            )
                                        },
                                        label = {
                                            Text(
                                                item.title,
                                                color = if (isSelected) GlowGreen else MutedText
                                            )
                                        },
                                        colors = NavigationBarItemDefaults.colors(
                                            indicatorColor = PrimaryGreen.copy(alpha = 0.3f)
                                        )
                                    )
                                }
                            }
                        }
                    }
                ) { innerPadding ->
                    Surface(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(innerPadding),
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
