"use client"
import Image from "next/image";
import FeaturesSection from "./components/FeaturesSection";

export default function Home() {

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              Your TODA Ride, <br />Just a Tap Away.
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Experience hassle-free TODA transportation with Trissea in Tuguegarao City. Queue-based booking system with shared rides, real-time tracking, and seamless ride-sharing for up to 5 passengers per trip.
            </p>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              {/* Download buttons */}
              <DownloadButton 
                platform="android"
                label="Download for Android"
              />
              <DownloadButton 
                platform="ios"
                label="Coming Soon"
              />
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image
              src="/images/final_logo.png"
              alt="Tricycle booking app"
              width={500}
              height={500}
            />
          </div>
        </div>
        <FeaturesSection />
      </section>

      {/* Key Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-screen-xl px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            How Trissea Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Passenger Features */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                🚶 For Passengers
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">📍</span>
                  <span><strong>Book Rides:</strong> Select pickup and dropoff locations on the map</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">👥</span>
                  <span><strong>Shared Rides:</strong> Join trips with up to 5 passengers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📊</span>
                  <span><strong>Queue System:</strong> See your position and estimated departure time</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔔</span>
                  <span><strong>Real-Time Updates:</strong> Get notified when passengers join or trip starts</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💰</span>
                  <span><strong>Transparent Fares:</strong> See fare breakdown before booking</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📜</span>
                  <span><strong>Trip History:</strong> View all your past and active bookings</span>
                </li>
              </ul>
            </div>

            {/* Driver Features */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                🚗 For Drivers
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">🎯</span>
                  <span><strong>Join Queue:</strong> Enter TODA queue and wait for passengers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">👥</span>
                  <span><strong>Manage Passengers:</strong> Track passengers joining your trip in real-time</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🚦</span>
                  <span><strong>Start Trip:</strong> Begin trip when ready or when booking is full</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span><strong>Complete Trip:</strong> Mark trip as completed and collect fare</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💵</span>
                  <span><strong>Earnings Tracking:</strong> View trip history and earnings</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔔</span>
                  <span><strong>Notifications:</strong> Get alerted when passengers join or leave</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Flow Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-screen-xl px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Simple Booking Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-300">1</span>
              </div>
              <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Select Location</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Choose pickup and dropoff points on the map</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-300">2</span>
              </div>
              <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Join Queue</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Book your ride and join the TODA queue</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-300">3</span>
              </div>
              <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Wait & Track</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get real-time updates as passengers join</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-300">4</span>
              </div>
              <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Ride & Pay</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enjoy your ride and pay the driver</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-screen-xl px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Powered by Modern Technology
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Real-Time Updates</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pusher integration for instant notifications and live booking updates</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Google Maps</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accurate location tracking and route planning</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Secure & Safe</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Firebase authentication and encrypted data storage</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
// Helper Components
function DownloadButton({ platform, label }: { platform: 'android' | 'ios', label: string }) {
  return (
    <a href="https://play.google.com/store/apps/details?id=com.trissea.spup" className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-black rounded-lg sm:w-auto hover:bg-green-400 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800">
      {platform === 'android' ? (
        <svg className="w-4 h-4 mr-2" viewBox="0 0 512 512">
          <path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
        </svg>
      ) : (
        <svg className="w-4 h-4 mr-2" viewBox="0 0 384 512">
          <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
        </svg>
      )}
      {label}
    </a>
  );
}
