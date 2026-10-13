'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function TakeTestPage() {
  const { attemptId } = useParams();
  const [timeLeft, setTimeLeft] = useState<number>(3600);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Proctoring: Tab switch detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("Tab switched!");
        // Here you would log this event to your API
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    async function startProctoring() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      } catch (err) {
        console.error("Camera access denied", err);
        setCameraError('Camera access denied. Please allow camera permissions to proceed with the test.');
      }
    }
    startProctoring();

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Question 1</h1>
          <p className="text-lg text-gray-700">What is the time complexity of Binary Search?</p>
          <textarea className="mt-4 w-full h-32 border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-600 outline-none" />
          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Submit Answer</button>
        </div>
      </main>

      <aside className="w-80 bg-gray-900 text-white p-6 flex flex-col border-l border-gray-800">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-xl font-bold">Proctoring</h2>
          </div>
          <div className="text-4xl font-mono text-blue-400 mb-8 tracking-widest">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
          <div className="bg-black rounded-lg aspect-video mb-4 overflow-hidden border border-gray-700 shadow-inner">
             <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          </div>
          <p className="text-xs text-gray-400">Camera activity monitored for integrity.</p>
      </aside>
    </div>
  );
}
