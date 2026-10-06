package com.securehaul.driver.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.securehaul.driver.theme.*

@Composable
fun InspectionScreen(
    onBack: () -> Unit,
    onComplete: () -> Unit
) {
    val scrollState = rememberScrollState()

    // LIGHT MODE SCREEN: #F2F5F3 as required
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(LightBackground)
            .padding(16.dp)
            .verticalScroll(scrollState)
    ) {
        // Top Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onBack) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = PrimaryGreen)
            }
            Text("Pre-Trip Inspection", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color(0xFF1C1E21))
            Text("DVIR", color = PrimaryGreen, fontWeight = FontWeight.Bold, fontSize = 12.sp)
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Green Progress Bar 12/12
        Card(
            colors = CardDefaults.cardColors(containerColor = Color.White),
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(14.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("Safety Walkaround Checklist", fontSize = 12.sp, color = Color.DarkGray)
                    Text("12/12 Completed", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = PrimaryGreen)
                }
                Spacer(modifier = Modifier.height(8.dp))
                LinearProgressIndicator(
                    progress = { 1f },
                    modifier = Modifier.fillMaxWidth().height(8.dp),
                    color = PrimaryGreen,
                    trackColor = Color(0xFFE5EAE7)
                )
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // 6 Primary Checklist Cards
        val checkItems = listOf(
            "Exterior Walkaround" to "Chassis, mirrors, reflectors & lights clean",
            "Engine Compartment" to "Oil levels, coolant, fan belts & fluid lines",
            "Brakes & Air System" to "Governor 125 PSI, brake shoes & air lines",
            "Coupling & Trailer" to "5th wheel locked, kingpin secured",
            "Safety Equipment" to "Fire extinguisher charged, 3 triangles present",
            "Inside Cab" to "Seatbelts, defroster, horn & ELD terminal active"
        )

        checkItems.forEach { (title, subtitle) ->
            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(14.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(12.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(title, fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color(0xFF1C1E21))
                        Text(subtitle, fontSize = 11.sp, color = MutedText)
                    }
                    Box(
                        modifier = Modifier
                            .size(28.dp)
                            .background(PrimaryGreen, RoundedCornerShape(8.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.Check, contentDescription = null, tint = Color.White, modifier = Modifier.size(18.dp))
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Driver Signature Pad
        Card(
            colors = CardDefaults.cardColors(containerColor = Color.White),
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(14.dp)) {
                Text("Driver Signature Pad", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color.DarkGray)
                Spacer(modifier = Modifier.height(8.dp))
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(80.dp)
                        .background(Color(0xFFF8FAF9), RoundedCornerShape(10.dp))
                        .border(1.dp, Color(0xFFCBD5E1), RoundedCornerShape(10.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Text("Pelaiah N. (Digitally Signed)", color = PrimaryGreen, fontWeight = FontWeight.Bold)
                }
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    "“By signing, I confirm the vehicle is safe and roadworthy.”",
                    fontSize = 11.sp,
                    color = MutedText
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Complete Button
        Button(
            onClick = onComplete,
            colors = ButtonDefaults.buttonColors(containerColor = PrimaryGreen),
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier.fillMaxWidth().height(52.dp)
        ) {
            Text("Complete Inspection", fontWeight = FontWeight.Bold, fontSize = 15.sp)
        }

        Spacer(modifier = Modifier.height(20.dp))
    }
}
