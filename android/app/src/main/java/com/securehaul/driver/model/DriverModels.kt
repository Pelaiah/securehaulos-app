package com.securehaul.driver.model

data class DriverProfile(
    val name: String = "Pelaiah N.",
    val truckNumber: String = "SH-8283",
    val truckModel: String = "Volvo VNL 860 Reefer",
    val eldLive: Boolean = true,
    val unreadNotifications: Int = 2,
    val safetyScore: Float = 99.4f,
    val tier: String = "Tier 1 Driver"
)

data class TelemetryData(
    val fuelPercent: Int = 78,
    val fuelRangeKm: Int = 850,
    val tirePressureFrontLeft: Int = 85,
    val tirePressureTarget: Int = 100,
    val engineTempC: Int = 92,
    val batteryVoltage: Float = 14.1f,
    val reeferTempF: Int = -4,
    val reeferTempC: Int = -20,
    val currentSpeedKmH: Int = 68,
    val speedLimitKmH: Int = 80,
    val odometerKm: Long = 248120L
)

data class ScheduleStop(
    val step: Int,
    val name: String,
    val location: String,
    val eta: String,
    val status: String,
    val distance: String
)

data class InspectionItem(
    val id: String,
    val title: String,
    val subtitle: String,
    val passed: Boolean = true
)

enum class HosStatus {
    ON_DUTY,
    DRIVING,
    REST,
    VIOLATION
}
