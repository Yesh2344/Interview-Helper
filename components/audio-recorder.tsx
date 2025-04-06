"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Mic, MicOff, StopCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AudioRecorderProps {
  isRecording: boolean
  isProcessing: boolean
  onStartRecording: () => void
  onStopRecording: (audioBlob: Blob) => void
}

export function AudioRecorder({ isRecording, isProcessing, onStartRecording, onStopRecording }: AudioRecorderProps) {
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      // Clean up on unmount
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [audioStream])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setAudioStream(stream)

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const audioChunks: BlobPart[] = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
        onStopRecording(audioBlob)
        setRecordingTime(0)
      }

      mediaRecorder.start()
      onStartRecording()

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)

      setError(null)
    } catch (err) {
      setError("Could not access microphone. Please check your browser permissions.")
      console.error("Error accessing microphone:", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop())
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col items-center justify-center p-6 border rounded-md bg-slate-50 dark:bg-slate-900">
        {isRecording ? (
          <>
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4 animate-pulse">
              <Mic className="h-8 w-8 text-red-500 dark:text-red-400" />
            </div>
            <p className="text-lg font-medium mb-2">Recording... {formatTime(recordingTime)}</p>
            <Button variant="destructive" onClick={stopRecording} className="flex items-center">
              <StopCircle className="mr-2 h-4 w-4" />
              Stop Recording
            </Button>
          </>
        ) : isProcessing ? (
          <>
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              <Loader2 className="h-8 w-8 text-slate-500 animate-spin" />
            </div>
            <p className="text-lg font-medium mb-2">Processing your response...</p>
            <Progress value={45} className="w-full max-w-xs" />
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              <MicOff className="h-8 w-8 text-slate-500" />
            </div>
            <p className="text-lg font-medium mb-2">Ready to record your answer</p>
            <Button onClick={startRecording} className="flex items-center">
              <Mic className="mr-2 h-4 w-4" />
              Start Recording
            </Button>
          </>
        )}
      </div>

      <div className="text-sm text-slate-500 dark:text-slate-400">
        <p>Tips:</p>
        <ul className="list-disc list-inside space-y-1 mt-1">
          <li>Speak clearly and at a moderate pace</li>
          <li>Structure your answer using the STAR method</li>
          <li>Aim for 1-2 minutes for your response</li>
        </ul>
      </div>
    </div>
  )
}

