package com.securehaul.driver.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.securehaul.driver.model.TelemetryData
import com.securehaul.driver.theme.*

@Composable
fun VehicleScreen(telemetry: TelemetryData) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBackground)
            .padding(16.dp)
            .verticalScroll(scrollState)
    ) {
        // Red Alert Banner
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(ViolationRed, RoundedCornerShape(16.dp))
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(Icons.Default.Warning, contentDescription = null, tint = Color.White)
            Spacer(modifier = Modifier.width(10.dp))
            Column {
                Text("CRITICAL SENSOR ALERT", fontSize = 10.sp, fontWeight = FontWeight.Black, color = Color.White)
                Text(
                    "Low Tire Pressure, Front Left: ${telemetry.tirePressureFrontLeft} PSI (Target: 100 PSI)",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Truck Specs Card
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(DarkSurface, RoundedCornerShape(20.dp))
                .border(1.dp, BorderDark, RoundedCornerShape(20.dp))
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("Volvo VNL 860 Reefer", fontWeight = FontWeight.Bold, color = Color.White, fontSize = 14.sp)
                Text("#SH-8283", color = GlowGreen, fontWeight = FontWeight.Bold, fontSize = 12.sp)
            }
            Text("Odometer: ${telemetry.odometerKm} km • CAN-bus Live", fontSize = 11.sp, color = MutedText)
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Telemetry Grid
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            // Fuel
            Card(
                colors = CardDefaults.cardColors(containerColor = DarkSurface),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier.weight(1f)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text("Fuel Level", fontSize = 10.sp, color = MutedText, fontWeight = FontWeight.Bold)
                    Text("${telemetry.fuelPercent}%", fontSize = 22.sp, fontWeight = FontWeight.Black, color = Color.White)
                    Text("~${telemetry.fuelRangeKm} km", fontSize = 11.sp, color = GlowGreen)
                }
            }

            // Tire Pressure Alert
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFF2A1E20)),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier.weight(1f).border(1.dp, ViolationRed, RoundedCornerShape(16.dp))
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text("Tire Pressure", fontSize = 10.sp, color = Color(0xFFFCA5A5), fontWeight = FontWeight.Bold)
                    Text("${telemetry.tirePressureFrontLeft} PSI", fontSize = 22.sp, fontWeight = FontWeight.Black, color = ViolationRed)
                    Text("Front Left (Low)", fontSize = 11.sp, color = Color(0xFFFCA5A5))
                }
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            // Engine Temp
            Card(
                colors = CardDefaults.cardColors(containerColor = DarkSurface),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier.weight(1f)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text("Engine Temp", fontSize = 10.sp, color = MutedText, fontWeight = FontWeight.Bold)
                    Text("${telemetry.engineTempC}°C", fontSize = 22.sp, fontWeight = FontWeight.Black, color = Color.White)
                    Text("Normal", fontSize = 11.sp, color = GlowGreen)
                }
            }

            // Battery
            Card(
                colors = CardDefaults.cardColors(containerColor = DarkSurface),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier.weight(1f)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text("Battery Voltage", fontSize = 10.sp, color = MutedText, fontWeight = FontWeight.Bold)
                    Text("${telemetry.batteryVoltage}V", fontSize = 22.sp, fontWeight = FontWeight.Black, color = Color.White)
                    Text("Normal", fontSize = 11.sp, color = GlowGreen)
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Vehicle Health List
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(DarkSurface, RoundedCornerShape(20.dp))
                .padding(16.dp)
        ) {
            Text("Vehicle Health", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = Color.White)
            Spacer(modifier = Modifier.height(10.dp))

            listOf("Engine", "Transmission", "Brakes").forEach { sys ->
                Row(
                    modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(sys, fontSize = 12.sp, color = Color.White)
                    Text("Good", color = GlowGreen, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                }
            }
        }
    }
}
