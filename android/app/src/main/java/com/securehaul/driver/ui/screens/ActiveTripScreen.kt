package com.securehaul.driver.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Navigation
import androidx.compose.material.icons.filled.VolumeUp
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
fun ActiveTripScreen(
    telemetry: TelemetryData,
    onPauseTrip: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF141618))
    ) {
        // 1. Top Green Driving Banner
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xFF1A3828))
                .padding(horizontal = 16.dp, vertical = 10.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                "DRIVING",
                color = GlowGreen,
                fontWeight = FontWeight.ExtraBold,
                fontSize = 13.sp
            )
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text("HOS REMAINING ", fontSize = 11.sp, color = Color(0xFF86EFAC))
                Text(
                    "07:28",
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
            }
        }

        // 2. Turn-by-Turn Card
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp)
                .background(DarkSurface, RoundedCornerShape(16.dp))
                .border(1.dp, BorderDark, RoundedCornerShape(16.dp))
                .padding(12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(44.dp)
                        .background(PrimaryGreen, RoundedCornerShape(12.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(Icons.Default.Navigation, contentDescription = null, tint = Color.White)
                }
                Spacer(modifier = Modifier.width(12.dp))
                Column {
                    Text("1.2 km", fontSize = 20.sp, fontWeight = FontWeight.Black, color = Color.White)
                    Text("Turn right onto A5 (Mazowe-Bindura Rd)", fontSize = 12.sp, color = Color.White)
                }
            }

            IconButton(onClick = {}) {
                Icon(Icons.Default.VolumeUp, contentDescription = "Mute", tint = GlowGreen)
            }
        }

        // 3. Map Viewport & Speed HUD
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .background(Color(0xFF111316))
                .padding(16.dp)
        ) {
            // Stylized Route Indicator
            Text(
                "GPS MAP VIEW • A5 CORRIDOR",
                color = MutedText,
                fontSize = 11.sp,
                modifier = Modifier.align(Alignment.TopCenter)
            )

            // Large Speed HUD + Speed Limit Sign
            Row(
                modifier = Modifier.align(Alignment.BottomStart),
                verticalAlignment = Alignment.Bottom
            ) {
                Column(
                    modifier = Modifier
                        .background(DarkSurface, RoundedCornerShape(16.dp))
                        .padding(horizontal = 16.dp, vertical = 10.dp)
                ) {
                    Text("SPEED", fontSize = 10.sp, color = MutedText, fontWeight = FontWeight.Bold)
                    Row(verticalAlignment = Alignment.Bottom) {
                        Text(
                            "${telemetry.currentSpeedKmH}",
                            fontSize = 38.sp,
                            fontWeight = FontWeight.Black,
                            fontFamily = FontFamily.Monospace,
                            color = Color.White
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("km/h", fontSize = 12.sp, color = MutedText)
                    }
                }

                Spacer(modifier = Modifier.width(10.dp))

                // Speed Limit 80 Sign
                Box(
                    modifier = Modifier
                        .size(54.dp)
                        .background(Color.White, CircleShape)
                        .border(4.dp, ViolationRed, CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("80", fontWeight = FontWeight.Black, fontSize = 18.sp, color = Color.Black)
                        Text("LIMIT", fontSize = 7.sp, fontWeight = FontWeight.Bold, color = Color.DarkGray)
                    }
                }
            }
        }

        // 4. Bottom Trip Bar
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(DarkSurface)
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Column {
                    Text("Remaining", fontSize = 10.sp, color = MutedText)
                    Text("237 km", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color.White)
                }
                Column {
                    Text("Duration", fontSize = 10.sp, color = MutedText)
                    Text("3h 26m", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color.White)
                }
                Column {
                    Text("ETA", fontSize = 10.sp, color = MutedText)
                    Text("14:35", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = GlowGreen)
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            Text("Next: Bindura Regional Warehouse • 78% Fuel", fontSize = 12.sp, color = Color.White)
        }
    }
}
