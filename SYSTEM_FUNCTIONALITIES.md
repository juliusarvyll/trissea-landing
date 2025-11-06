# TODA Booking System - Complete Functionalities

## Table of Contents
1. [System Overview](#system-overview)
2. [User Roles](#user-roles)
3. [Authentication & Authorization](#authentication--authorization)
4. [Passenger Features](#passenger-features)
5. [Driver Features](#driver-features)
6. [TODA Management](#toda-management)
7. [Booking System](#booking-system)
8. [Real-Time Features](#real-time-features)
9. [Payment System](#payment-system)
10. [Notifications](#notifications)
11. [Location Services](#location-services)
12. [API Endpoints](#api-endpoints)
13. [Data Models](#data-models)

---

## System Overview

**TODA Booking System** is a mobile application that connects passengers with TODA (Tricycle Operators and Drivers Association) drivers for shared tricycle rides. The system manages queue-based bookings, real-time updates, and trip management.

### Key Features
- 📱 Mobile-first Flutter application
- 🔄 Real-time updates via Pusher
- 🗺️ Google Maps integration
- 🚕 Queue-based ride sharing
- 💰 Fare calculation and management
- 📊 Trip history and analytics

---

## User Roles

### 1. **Passenger**
- Book tricycle rides
- Join shared trips
- View booking status
- Track trip progress
- View trip history
- Cancel bookings

### 2. **Driver**
- Join TODA queue
- Accept passenger bookings
- Manage trip capacity
- Start and complete trips
- View earnings
- View trip history

### 3. **Admin** (Future)
- Manage TODAs
- Monitor system activity
- Generate reports
- Manage users

---

## Authentication & Authorization

### Registration
- **Phone Number Verification**
  - OTP-based authentication
  - Firebase Authentication integration
  - Secure token storage

### Login
- **Phone + OTP Login**
  - Send OTP to phone number
  - Verify OTP code
  - Generate JWT token
  - Store token securely

### Profile Management
- **View Profile**
  - Display user information
  - Show role (Passenger/Driver)
  - Display contact details

- **Update Profile**
  - Edit name
  - Update phone number
  - Upload profile picture
  - Update emergency contact

### Security
- JWT token authentication
- Secure storage (Flutter Secure Storage)
- Token refresh mechanism
- Session management

---

## Passenger Features

### 1. Browse TODAs
**Functionality:** View available TODA associations

**Features:**
- List all active TODAs
- View TODA details
  - Name
  - Operating routes
  - Available drivers
  - Base fare
- Search and filter TODAs
- View TODA ratings

**Implementation:**
```dart
// API: GET /api/todas
await todaProvider.fetchAllTodas();
```

---

### 2. Book a Ride
**Functionality:** Create a new booking request

**Features:**
- Select pickup location (map or address)
- Select dropoff location
- Choose TODA association
- Select route
- Specify passenger count (1-5)
- View fare estimate
- Add special notes
- Confirm booking

**Booking Flow:**
1. Select locations on map
2. Choose TODA and route
3. Enter passenger count
4. Review fare breakdown
5. Confirm booking
6. Join queue automatically

**Implementation:**
```dart
// API: POST /api/toda-bookings
await todaProvider.bookTricycle(
  todaId: todaId,
  passengerId: passengerId,
  pickupAddress: pickupAddress,
  dropoffAddress: dropoffAddress,
  passengerCount: passengerCount,
  fare: fare,
);
```

---

### 3. View Bookings
**Functionality:** View all passenger bookings

**Features:**
- **Active Bookings**
  - Current trip status
  - Queue position
  - Estimated departure time
  - Driver information (when assigned)
  - Real-time passenger count
  - Available seats

- **Booking History**
  - Completed trips
  - Cancelled bookings
  - Trip details
  - Fare paid
  - Trip duration

**Booking Statuses:**
- `pending` - Waiting for queue
- `waiting` - In queue, waiting for more passengers
- `in_progress` - Trip started
- `completed` - Trip finished
- `cancelled` - Booking cancelled

**Implementation:**
```dart
// API: GET /api/todas/passengers/{passenger_id}/bookings
await todaProvider.fetchPassengerBookings(passengerId);
```

---

### 4. Cancel Booking
**Functionality:** Cancel a pending or waiting booking

**Features:**
- Cancel before trip starts
- Provide cancellation reason
- Automatic refund (if applicable)
- Notify driver
- Update queue positions

**Restrictions:**
- Cannot cancel in-progress trips
- Cannot cancel completed trips

**Implementation:**
```dart
// API: DELETE /api/toda-bookings/{booking_id}
await todaProvider.cancelBooking(bookingId);
```

---

### 5. Track Trip
**Functionality:** Real-time trip tracking

**Features:**
- View current location
- See driver location (when available)
- Estimated arrival time
- Trip progress
- Contact driver
- Emergency button

**Real-Time Updates:**
- Passenger joined queue
- Booking full
- Trip started
- Trip in progress
- Trip completed

---

### 6. View Trip Details
**Functionality:** Detailed view of a specific booking

**Features:**
- Booking information
  - Booking ID
  - Status badge
  - TODA name
  - Route details
- Passenger information
  - Passenger count
  - Available seats
  - Queue position
- Fare breakdown
  - Fare per passenger
  - Total fare
  - Payment method
- Trip timeline
  - Created at
  - Scheduled departure
  - Actual departure
  - Completed at
- Driver information (when assigned)
  - Driver name
  - Driver phone
  - Contact button
- Cancellation details (if cancelled)
  - Cancellation reason
  - Cancelled at

---

## Driver Features

### 1. Driver Dashboard
**Functionality:** Overview of driver status and activities

**Features:**
- Current status (In Queue / Available / On Trip)
- Active booking details
- Today's earnings
- Trip statistics
- Quick actions

---

### 2. Join TODA Queue
**Functionality:** Enter the queue to accept passengers

**Features:**
- Select TODA association
- View queue position
- View available routes
- Set maximum passengers (1-5)
- Wait for passenger bookings

**Queue System:**
- FIFO (First In, First Out)
- Automatic assignment
- Real-time position updates

**Implementation:**
```dart
// API: POST /api/driver/join-queue
await todaProvider.joinQueue(
  driverId: driverId,
  todaId: todaId,
);
```

---

### 3. View Driver Bookings
**Functionality:** View assigned bookings and trip history

**Features:**
- **Current Trip**
  - Active booking details
  - Passenger list
  - Current passenger count
  - Available seats
  - Route information
  - Fare details

- **Trip History**
  - Completed trips
  - Cancelled trips
  - Earnings per trip
  - Trip duration
  - Passenger ratings

**Implementation:**
```dart
// API: GET /api/driver/{driver_id}/current-trip
// API: GET /api/driver/{driver_id}/trip-history
await todaProvider.fetchDriverBookings(driverId);
```

---

### 4. Manage Passengers
**Functionality:** Track passengers joining the trip

**Features:**
- View passenger list
- See passenger count in real-time
- View available seats
- Contact passengers
- Monitor queue position

**Real-Time Updates:**
- Passenger joined notification
- Passenger left notification
- Booking full alert

---

### 5. Start Trip
**Functionality:** Begin the trip when ready

**Features:**
- Start button (enabled when booking is full or ready)
- Confirm departure
- Update status to "in_progress"
- Record actual departure time
- Notify all passengers

**Conditions:**
- Booking must be in "waiting" status
- At least 1 passenger required
- Can start before full capacity

**Implementation:**
```dart
// API: POST /api/driver/trips/{booking_id}/start
await todaProvider.startTrip(bookingId, driverId);
```

---

### 6. Complete Trip
**Functionality:** Mark trip as completed

**Features:**
- Complete button (enabled during trip)
- Confirm arrival
- Update status to "completed"
- Record completion time
- Calculate final fare
- Notify all passengers
- Return to available status

**Implementation:**
```dart
// API: POST /api/driver/trips/{booking_id}/complete
await todaProvider.completeTrip(bookingId);
```

---

### 7. Driver Trip History
**Functionality:** View past trips and earnings

**Features:**
- List of completed trips
- Trip details
  - Date and time
  - Route taken
  - Passengers count
  - Fare earned
  - Trip duration
- Filter by date range
- Search by booking ID
- Export trip report

---

### 8. Leave Queue
**Functionality:** Exit the TODA queue

**Features:**
- Leave queue button
- Confirm action
- Update status to "available"
- Notify system
- Clear current booking (if no passengers)

**Restrictions:**
- Cannot leave if passengers already joined
- Must complete or cancel trip first

**Implementation:**
```dart
// API: POST /api/driver/leave-queue
await todaProvider.leaveQueue(driverId);
```

---

## TODA Management

### 1. TODA Information
**Functionality:** Display TODA association details

**Features:**
- TODA name
- Operating area
- Available routes
- Active drivers count
- Base fare structure
- Operating hours
- Contact information

---

### 2. Route Management
**Functionality:** Manage TODA routes

**Features:**
- List all routes
- Route details
  - Origin barangay
  - Destination barangay
  - Distance
  - Base fare
  - Estimated duration
- Add new routes
- Update route information
- Deactivate routes

---

### 3. Driver Management
**Functionality:** Manage drivers in TODA

**Features:**
- List active drivers
- Driver status
  - Available
  - In queue
  - On trip
- Driver statistics
  - Total trips
  - Earnings
  - Ratings
- Approve/suspend drivers

---

## Booking System

### 1. Queue Management
**Functionality:** Manage booking queue system

**Features:**
- **Queue Logic**
  - First driver in queue gets first passenger
  - Passengers join existing waiting trips
  - Maximum 5 passengers per trip
  - Automatic queue progression

- **Queue Position**
  - Real-time position updates
  - Position displayed to drivers
  - Automatic reordering

- **Queue Rules**
  - Drivers must wait for turn
  - Cannot skip queue
  - Auto-remove on timeout (optional)

---

### 2. Shared Ride System
**Functionality:** Multiple passengers per trip

**Features:**
- **Passenger Pooling**
  - Up to 5 passengers per trip
  - Same route sharing
  - Individual fare calculation
  - Real-time seat availability

- **Booking Aggregation**
  - Combine multiple bookings
  - Track individual passengers
  - Manage passenger list
  - Calculate total fare

---

### 3. Fare Calculation
**Functionality:** Calculate trip fares

**Features:**
- **Fare Components**
  - Base fare (per TODA)
  - Distance-based fare
  - Per-passenger fare
  - Route-specific pricing

- **Fare Display**
  - Fare per passenger
  - Total trip fare
  - Fare breakdown
  - Payment method

**Formula:**
```
fare_per_passenger = base_fare + (distance * rate_per_km)
total_fare = fare_per_passenger * passenger_count
```

---

### 4. Booking Status Management
**Functionality:** Track and update booking status

**Status Flow:**
```
pending → waiting → in_progress → completed
                 ↓
              cancelled
```

**Status Definitions:**
- **pending**: Booking created, waiting for queue
- **waiting**: In queue, waiting for more passengers or departure
- **in_progress**: Trip started, en route
- **completed**: Trip finished successfully
- **cancelled**: Booking cancelled by passenger or system

---

## Real-Time Features

### 1. Pusher Integration
**Functionality:** Real-time event broadcasting

**Channels:**
- `toda-bookings.{toda_id}` - TODA-wide updates
- `toda-booking.{booking_id}` - Booking-specific updates
- `driver.{driver_id}` - Driver-specific updates
- `passenger.{passenger_id}` - Passenger-specific updates

---

### 2. Real-Time Events

#### **passenger-joined-queue**
**Triggered:** When a passenger joins a waiting trip

**Payload:**
```json
{
  "booking": { /* full booking object */ },
  "passenger_id": 123,
  "queue_position": 3,
  "available_seats": 2,
  "message": "Passenger joined the queue (Position #3)"
}
```

**Receivers:**
- TODA channel
- Booking channel
- Driver channel

**UI Updates:**
- Update passenger count
- Update available seats
- Show notification
- Refresh booking list

---

#### **passenger-left-queue**
**Triggered:** When a passenger cancels their booking

**Payload:**
```json
{
  "booking_id": 789,
  "passenger_id": 123,
  "current_passenger_count": 2,
  "available_seats": 3,
  "was_cancelled": false,
  "message": "Passenger left the queue"
}
```

**Receivers:**
- Booking channel

**UI Updates:**
- Update passenger count
- Update available seats
- Show notification
- Remove booking if all passengers left

---

#### **booking-full**
**Triggered:** When trip reaches maximum capacity (5 passengers)

**Payload:**
```json
{
  "booking": { /* full booking object */ },
  "message": "Booking is now full! Ready to depart.",
  "passenger_count": 5,
  "max_passengers": 5
}
```

**Receivers:**
- TODA channel
- Booking channel
- Driver channel

**UI Updates:**
- Enable "Start Trip" button
- Show full capacity badge
- Notify driver to depart
- Update booking status

---

#### **trip-started**
**Triggered:** When driver starts the trip

**Payload:**
```json
{
  "booking": { /* full booking object */ },
  "message": "Trip has started",
  "departure_time": "2025-11-06T10:30:00.000000Z"
}
```

**Receivers:**
- Booking channel
- Driver channel
- All passenger channels

**UI Updates:**
- Update status to "in_progress"
- Show trip progress
- Enable tracking
- Disable cancel button

---

#### **trip-completed**
**Triggered:** When driver completes the trip

**Payload:**
```json
{
  "booking": { /* full booking object */ },
  "message": "Trip completed successfully",
  "completed_at": "2025-11-06T11:00:00.000000Z",
  "total_fare": 250.00
}
```

**Receivers:**
- Booking channel
- Driver channel
- All passenger channels

**UI Updates:**
- Update status to "completed"
- Show completion message
- Display final fare
- Move to history

---

### 3. Real-Time Notifications

**Notification Types:**
- ✅ Passenger joined (green)
- ⚠️ Passenger left (orange)
- 🎉 Booking full (green)
- 🚗 Trip started (blue)
- ✅ Trip completed (purple)
- ❌ Trip cancelled (red)

**Notification Features:**
- Snackbar display
- Icon indicators
- Color coding
- Auto-dismiss
- Action buttons (optional)

---

## Payment System

### 1. Payment Methods
**Supported Methods:**
- Cash (default)
- Digital wallets (future)
- Credit/Debit cards (future)

---

### 2. Fare Collection
**Process:**
- Fare calculated on booking
- Displayed to passenger
- Collected by driver
- Recorded in system

---

### 3. Payment Tracking
**Features:**
- Payment status
- Payment method
- Amount paid
- Payment timestamp
- Receipt generation (future)

---

## Notifications

### 1. Push Notifications
**Functionality:** Firebase Cloud Messaging

**Notification Types:**
- Booking confirmed
- Passenger joined
- Booking full
- Trip started
- Trip completed
- Booking cancelled
- Driver assigned

---

### 2. In-App Notifications
**Functionality:** Real-time in-app alerts

**Features:**
- Notification badge
- Notification list
- Mark as read
- Notification history
- Action buttons

---

### 3. SMS Notifications (Future)
**Functionality:** SMS alerts for critical events

**Events:**
- Booking confirmation
- Trip started
- Trip completed
- Emergency alerts

---

## Location Services

### 1. Google Maps Integration
**Features:**
- Map display
- Location picker
- Route display
- Distance calculation
- Geocoding
- Reverse geocoding

---

### 2. Location Tracking
**Features:**
- Current location
- Real-time tracking
- Location updates
- Geofencing (future)

---

### 3. Route Planning
**Features:**
- Origin to destination
- Route optimization
- Distance calculation
- Duration estimation
- Alternative routes

---

## API Endpoints

### Authentication
```
POST   /api/register              - Register new user
POST   /api/login                 - Login user
POST   /api/logout                - Logout user
GET    /api/user                  - Get current user
PUT    /api/user/profile          - Update profile
```

### TODA Management
```
GET    /api/todas                 - Get all TODAs
GET    /api/todas/{id}            - Get TODA details
GET    /api/todas/{id}/routes     - Get TODA routes
GET    /api/todas/{id}/drivers    - Get TODA drivers
```

### Passenger Endpoints
```
GET    /api/todas/passengers/{id}/bookings  - Get passenger bookings
POST   /api/toda-bookings                   - Create booking
DELETE /api/toda-bookings/{id}              - Cancel booking
GET    /api/toda-bookings/{id}              - Get booking details
```

### Driver Endpoints
```
POST   /api/driver/join-queue                  - Join TODA queue
POST   /api/driver/leave-queue                 - Leave queue
GET    /api/driver/{id}/status                 - Get driver status
GET    /api/driver/{id}/current-trip           - Get current trip
GET    /api/driver/{id}/trip-history           - Get trip history
POST   /api/driver/trips/{id}/start            - Start trip
POST   /api/driver/trips/{id}/complete         - Complete trip
```

### Booking Management
```
GET    /api/toda-bookings/{id}              - Get booking details
PUT    /api/toda-bookings/{id}/status       - Update booking status
GET    /api/toda-bookings/{id}/passengers   - Get booking passengers
```

---

## Data Models

### 1. User
```dart
class User {
  int id;
  String name;
  String phone;
  String email;
  String role; // 'passenger' | 'driver' | 'admin'
  DateTime createdAt;
  DateTime updatedAt;
}
```

---

### 2. TODA
```dart
class Toda {
  int id;
  String name;
  String description;
  String operatingArea;
  double baseFare;
  String contactNumber;
  bool isActive;
  DateTime createdAt;
}
```

---

### 3. TodaRoute
```dart
class TodaRoute {
  int id;
  int todaId;
  int originBarangayId;
  int destinationBarangayId;
  double distance;
  double baseFare;
  int estimatedDuration;
  bool isActive;
}
```

---

### 4. TodaBooking
```dart
class TodaBooking {
  int id;
  int todaId;
  int passengerId;
  int? driverId;
  int? todaRouteId;
  String status; // 'pending' | 'waiting' | 'in_progress' | 'completed' | 'cancelled'
  double? farePerPassenger;
  double? totalFare;
  int? maxPassengers;
  int? currentPassengerCount;
  String? todaName;
  String? routeName;
  String? passengerName;
  String? passengerPhone;
  String? driverName;
  String? driverPhone;
  int? queuePosition;
  DateTime createdAt;
  DateTime? completedAt;
  DateTime? cancelledAt;
  DateTime? scheduledDepartureTime;
  DateTime? actualDepartureTime;
  String? cancellationReason;
}
```

---

### 5. TodaStatus (Driver)
```dart
class TodaStatus {
  int? todaId;
  String? todaName;
  int? queuePosition;
  int? waitingPassengers;
  String status; // 'available' | 'in_queue' | 'on_trip'
  bool inQueue;
  DateTime? joinedQueueAt;
}
```

---

### 6. Pusher Events
```dart
// PassengerJoinedQueueEvent
class PassengerJoinedQueueEvent {
  TodaBooking booking;
  int passengerId;
  int queuePosition;
  int availableSeats;
  String message;
  DateTime timestamp;
}

// PassengerLeftQueueEvent
class PassengerLeftQueueEvent {
  int bookingId;
  int passengerId;
  int currentPassengerCount;
  int availableSeats;
  bool wasCancelled;
  String message;
  DateTime timestamp;
}

// BookingFullEvent
class BookingFullEvent {
  TodaBooking booking;
  int passengerCount;
  int maxPassengers;
  String message;
  DateTime timestamp;
}

// TripStartedEvent
class TripStartedEvent {
  TodaBooking booking;
  DateTime departureTime;
  String message;
  DateTime timestamp;
}

// TripCompletedEvent
class TripCompletedEvent {
  TodaBooking booking;
  DateTime completedAt;
  double totalFare;
  String message;
  DateTime timestamp;
}
```

---

## System Architecture

### Frontend (Flutter)
```
lib/
├── models/              # Data models
│   ├── toda.dart
│   ├── toda_booking.dart
│   ├── toda_status.dart
│   └── pusher_event.dart
├── services/            # API and business logic
│   ├── toda_service.dart
│   ├── pusher_service.dart
│   └── storage_service.dart
├── providers/           # State management
│   └── toda_provider.dart
├── screens/             # UI screens
│   ├── toda/
│   │   ├── driver/
│   │   └── passenger/
│   └── auth/
└── widgets/             # Reusable widgets
    └── realtime_notification.dart
```

### Backend (Laravel)
```
app/
├── Models/
│   ├── User.php
│   ├── Toda.php
│   ├── TodaRoute.php
│   └── TodaBooking.php
├── Http/
│   ├── Controllers/
│   │   ├── TodaController.php
│   │   ├── BookingController.php
│   │   └── DriverController.php
│   └── Resources/
│       └── TodaBookingResource.php
├── Events/
│   └── TodaBooking/
│       ├── PassengerJoinedQueue.php
│       ├── BookingFull.php
│       ├── TripStarted.php
│       └── TripCompleted.php
└── Broadcasting/
    └── Channels/
```

---

## Technology Stack

### Frontend
- **Framework:** Flutter 3.7+
- **State Management:** Provider
- **HTTP Client:** http package
- **Real-Time:** Pusher Channels Flutter
- **Maps:** Google Maps Flutter
- **Storage:** Flutter Secure Storage
- **Authentication:** Firebase Auth

### Backend
- **Framework:** Laravel 10+
- **Database:** MySQL/PostgreSQL
- **Real-Time:** Laravel Broadcasting + Pusher
- **Authentication:** Laravel Sanctum
- **API:** RESTful API

### Infrastructure
- **Push Notifications:** Firebase Cloud Messaging
- **Real-Time Events:** Pusher
- **Maps:** Google Maps API
- **Storage:** Cloud storage (future)

---

## Security Features

### Authentication
- JWT token-based auth
- Secure token storage
- Token refresh mechanism
- Session management

### Authorization
- Role-based access control
- Route protection
- API middleware
- Permission checks

### Data Protection
- Encrypted storage
- HTTPS communication
- Input validation
- SQL injection prevention
- XSS protection

---

## Performance Optimization

### Frontend
- Lazy loading
- Image caching
- State management optimization
- Debouncing API calls
- Pagination

### Backend
- Database indexing
- Query optimization
- Caching (Redis)
- API rate limiting
- Load balancing

---

## Future Enhancements

### Phase 2
- [ ] In-app payments
- [ ] Driver ratings and reviews
- [ ] Passenger ratings
- [ ] Trip scheduling
- [ ] Favorite routes
- [ ] Promo codes and discounts

### Phase 3
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Revenue management
- [ ] Driver performance metrics
- [ ] Heat maps
- [ ] Demand forecasting

### Phase 4
- [ ] Multi-language support
- [ ] Accessibility features
- [ ] Offline mode
- [ ] Voice commands
- [ ] AI-powered route optimization
- [ ] Predictive analytics

---

## Summary

The TODA Booking System is a comprehensive solution for managing tricycle ride-sharing with:

✅ **Queue-based booking system**
✅ **Real-time updates via Pusher**
✅ **Shared ride pooling (up to 5 passengers)**
✅ **Driver and passenger management**
✅ **Location services with Google Maps**
✅ **Fare calculation and tracking**
✅ **Push notifications**
✅ **Trip history and analytics**
✅ **Secure authentication**
✅ **Role-based access control**

The system provides a seamless experience for both passengers and drivers, with real-time updates ensuring everyone stays informed about booking status, trip progress, and queue positions.
