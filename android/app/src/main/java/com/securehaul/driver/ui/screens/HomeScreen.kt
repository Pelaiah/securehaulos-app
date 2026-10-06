package com.securehaul.driver.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.securehaul.driver.model.DriverProfile
import com.securehaul.driver.model.ScheduleStop
import com.securehaul.driver.model.TelemetryData
import com.securehaul.driver.theme.*

@Composable
fun HomeScreen(
    driver: DriverProfile,
    telemetry: TelemetryData,
    onStartTrip: () -> Unit,
    onOpenInspection: () -> Unit
) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBackground)
            .padding(horizontal = 16.dp)
            .verticalScroll(scrollState)
    ) {
        Spacer(modifier = Modifier.height(8.dp))

        // 1. Driver Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .clip(CircleShape)
                        .background(DarkSurfaceVariant)
                        .border(2.dp, PrimaryGreen, CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Text("PN", color = Color.White, fontWeight = FontWeight.Bold)
                }

                Spacer(modifier = Modifier.width(12.dp))

                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            "DRIVER COCKPIT • Live ELD",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = GlowGreen
                        )
                    }
                    Text(
                        driver.name,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                    Text(
                        "Driver • Truck #${driver.truckNumber}",
                        fontSize = 12.sp,
                        color = MutedText
                    )
                }
            }

            IconButton(
                onClick = {},
                modifier = Modifier
                    .size(40.dp)
                    .background(DarkSurfaceVariant, CircleShape)
            ) {
                Icon(
                    Icons.Default.Notifications,
                    contentDescription = "Alerts",
                    tint = Color.White
                )
            }
        }

        // 2. Vehicle Status Card
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(DarkSurface, RoundedCornerShape(16.dp))
                .border(1.dp, BorderDark, RoundedCornerShape(16.dp))
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .background(Color(0xFF1E3A2E), RoundedCornerShape(10.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(Icons.Default.Shield, contentDescription = null, tint = GlowGreen, modifier = Modifier.size(20.dp))
                }
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Text("TR-001 (Volvo VNL 860)", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = Color.White)
                    Text("Fuel: ${telemetry.fuelPercent}% • Reefer: ${telemetry.reeferTempF}°F Normal", fontSize = 11.sp, color = MutedText)
                }
            }
            Text("Good >", color = GlowGreen, fontSize = 12.sp, fontWeight = FontWeight.Bold)
        }

        Spacer(modifier = Modifier.height(14.dp))

        // 3. Hero Card: ELD Status & Circular Ring
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(DarkSurface, RoundedCornerShape(24.dp))
                .border(1.dp, BorderDark, RoundedCornerShape(24.dp))
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("ELD STATUS", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = MutedText)
                Box(
                    modifier = Modifier
                        .background(Color(0xFF1E3A2E), RoundedCornerShape(20.dp))
                        .padding(horizontal = 10.dp, vertical = 4.dp)
                ) {
                    Text("ON DUTY", color = GlowGreen, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Large Hero Timer
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("REMAINING HOS", fontSize = 11.sp, fontWeight = FontWeight.SemiBold, color = MutedText)
                Text(
                    "07:28",
                    fontSize = 42.sp,
                    fontWeight = FontWeight.ExtraBold,
                    fontFamily = FontFamily.Monospace,
                    color = Color.White
                )
                Text("HOURS", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = GlowGreen)
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Mini stats: Drive 11:00, Duty 14:00, Cycle 34:28
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("Drive Limit", fontSize = 10.sp, color = MutedText)
                    Text("11:00", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color.White, fontFamily = FontFamily.Monospace)
                }
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("Duty Limit", fontSize = 10.sp, color = MutedText)
                    Text("14:00", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color.White, fontFamily = FontFamily.Monospace)
                }
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("Cycle Limit", fontSize = 10.sp, color = MutedText)
                    Text("34:28", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color.White, fontFamily = FontFamily.Monospace)
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Big Green "Start Trip" Button
            Button(
                onClick = onStartTrip,
                colors = ButtonDefaults.buttonColors(containerColor = PrimaryGreen),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp)
            ) {
                Icon(Icons.Default.PlayArrow, contentDescription = null, tint = Color.White)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Start Trip", fontSize = 16.sp, fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // 4. Pre-Trip Inspection Shortcut
        OutlinedButton(
            onClick = onOpenInspection,
            shape = RoundedCornerShape(14.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp)
        ) {
            Text("Complete Pre-Trip (DVIR Inspection) →", color = Color.White, fontWeight = FontWeight.SemiBold)
        }

        Spacer(modifier = Modifier.height(14.dp))

        // 5. Today's Schedule List
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(DarkSurface, RoundedCornerShape(20.dp))
                .border(1.dp, BorderDark, RoundedCornerShape(20.dp))
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("TODAY'S SCHEDULE", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color.White)
                Text("View All", fontSize = 12.sp, color = GlowGreen, fontWeight = FontWeight.Bold)
            }

            Spacer(modifier = Modifier.height(12.dp))

            val stops = listOf(
                Triple("1", "Harare Terminal (Pickup)", "Completed"),
                Triple("2", "Bindura Warehouse", "On Time"),
                Triple("3", "Chinhoyi Hub", "In 2h 34m"),
                Triple("4", "Bulawayo Freight Depot", "Scheduled")
            )

            stops.forEach { (num, name, status) ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 6.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(24.dp)
                                .background(DarkSurfaceVariant, CircleShape),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(num, fontSize = 11.sp, fontWeight = FontWeight.Bold, color = Color.White)
                        }
                        Spacer(modifier = Modifier.width(10.dp))
                        Text(name, fontSize = 12.sp, color = Color.White, fontWeight = FontWeight.Medium)
                    }
                    Text(status, fontSize = 11.sp, color = GlowGreen)
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))
    }
}
