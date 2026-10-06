package com.securehaul.driver.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.securehaul.driver.model.HosStatus
import com.securehaul.driver.theme.*

@Composable
fun LogsScreen() {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBackground)
            .padding(16.dp)
            .verticalScroll(scrollState)
    ) {
        // Segmented Tabs: HOS, Logs, DVIR, Fuel
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(DarkSurface, RoundedCornerShape(14.dp))
                .padding(4.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            listOf("HOS", "Logs", "DVIR", "Fuel").forEachIndexed { index, title ->
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .background(
                            if (index == 0) PrimaryGreen else Color.Transparent,
                            RoundedCornerShape(10.dp)
                        )
                        .padding(vertical = 8.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        title,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = if (index == 0) Color.White else MutedText
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Date Selector: "Today, Sep 1, 2026"
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(DarkSurfaceVariant, RoundedCornerShape(12.dp))
                .padding(horizontal = 14.dp, vertical = 10.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("<", color = MutedText, fontWeight = FontWeight.Bold)
            Text("Today, Sep 1, 2026", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color.White)
            Text(">", color = MutedText, fontWeight = FontWeight.Bold)
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Large Ring & Hero Card
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(DarkSurface, RoundedCornerShape(24.dp))
                .border(1.dp, BorderDark, RoundedCornerShape(24.dp))
                .padding(18.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text("REMAINING DRIVE TIME", fontSize = 11.sp, color = MutedText, fontWeight = FontWeight.SemiBold)
            Text(
                "07:28",
                fontSize = 44.sp,
                fontWeight = FontWeight.Black,
                fontFamily = FontFamily.Monospace,
                color = Color.White
            )
            Text("HOURS", fontSize = 12.sp, color = GlowGreen, fontWeight = FontWeight.Bold)

            Spacer(modifier = Modifier.height(16.dp))

            // Limits
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("Drive Limit", fontSize = 10.sp, color = MutedText)
                    Text("11:00", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color.White)
                }
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("Duty Limit", fontSize = 10.sp, color = MutedText)
                    Text("14:00", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color.White)
                }
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("Cycle Limit", fontSize = 10.sp, color = MutedText)
                    Text("34:28", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color.White)
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // HOS Timeline (Today) Rows
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(DarkSurface, RoundedCornerShape(20.dp))
                .padding(16.dp)
        ) {
            Text("HOS Timeline (Today)", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = Color.White)
            Spacer(modifier = Modifier.height(10.dp))

            val timelineRows = listOf(
                Triple("Off Duty", "00:00 - 06:00", "6h 00m"),
                Triple("On Duty", "06:00 - 07:28", "1h 28m"),
                Triple("Driving", "07:28 - 12:00", "4h 32m"),
                Triple("Sleeper Berth", "12:00 - 14:00", "2h 00m")
            )

            timelineRows.forEach { (status, time, dur) ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 6.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(status, fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = Color.White)
                    Column(horizontalAlignment = Alignment.End) {
                        Text(dur, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = GlowGreen)
                        Text(time, fontSize = 10.sp, color = MutedText)
                    }
                }
            }
        }
    }
}
