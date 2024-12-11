"use client"
import Image from "next/image";
import FeaturesSection from "./components/FeaturesSection";
import { useState } from "react";
import { app } from '../../firebase';
import { getAuth, deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleDeleteRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Warning before proceeding with deletion
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) {
        setError("Account deletion canceled.");
        return; // Exit the function if the user cancels
    }

    // Debugger before signing in
    debugger; // Check email and password before sign-in
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            debugger; // Check userCredential after sign-in
            const user = userCredential.user;

            if (user) {
                // Delete user data from Firestore
                const userId = user.uid; // Get the user ID
                try {
                    await deleteDoc(doc(db, "passengers", userId)); // Delete the document from Firestore
                    console.log("User data deleted from Firestore");

                    // Now delete the user account
                    await deleteUser(user);
                    const userName = user.displayName || "User"; // Get the user's display name or default to "User"
                    setMessage(`Goodbye, ${userName}. Your account has been deleted successfully.`);
                    setEmail("");
                    setPassword("");
                } catch (error) {
                    console.error("Error deleting user data from Firestore:", error);
                    setError("Failed to delete user data.");
                }
            } else {
                setError("No authenticated user found.");
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error signing in:", error);
            setError(errorMessage); // Display error message
        });
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              Your Local Ride, <br />Just a Tap Away.
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Experience hassle-free local transportation with Trissea in Tuguegarao City. Book tricycles instantly, track your ride in real-time, and travel safely within your community.
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
      

      {/* Account Deletion Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="max-w-screen-xl px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Request Account Deletion
          </h2>
          <p className="text-center mb-8 text-gray-600 dark:text-gray-300">
            We're sorry to see you go. Please provide your email and password below to delete your account.
          </p>
          <form onSubmit={handleDeleteRequest} className="max-w-md mx-auto flex flex-col items-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Account
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-green-600 dark:text-green-400">
              {message}
            </p>
          )}
          {error && (
            <p className="mt-4 text-center text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
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
