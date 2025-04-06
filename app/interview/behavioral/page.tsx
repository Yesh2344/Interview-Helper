"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { AudioRecorder } from "@/components/audio-recorder"
import { InterviewFeedback } from "@/components/interview-feedback"

const BEHAVIORAL_QUESTIONS = [
  "Tell me about a time when you had to deal with a difficult team member.",
  "Describe a situation where you had to meet a tight deadline.",
  "Give an example of a time when you showed leadership.",
  "Tell me about a time when you failed and what you learned from it.",
  "Describe a situation where you had to solve a complex problem.",
]

export default function BehavioralInterview() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [feedback, setFeedback] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("question")

  const currentQuestion = BEHAVIORAL_QUESTIONS[currentQuestionIndex]

  const handleStartRecording = () => {
    setIsRecording(true)
    setFeedback(null)
  }

  const handleStopRecording = async (audioBlob: Blob) => {
    setIsRecording(false)
    setIsProcessing(true)

    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false)
      setFeedback({
        score: 78,
        strengths: [
          "Good use of the STAR method structure",
          "Clear explanation of the situation",
          "Demonstrated problem-solving skills",
        ],
        improvements: [
          "Could provide more specific details about your actions",
          "The result section was brief and could be expanded",
          "Consider quantifying your impact more clearly",
        ],
        starAnalysis: {
          situation: "Well described, provided good context",
          task: "Clearly stated your responsibility",
          action: "Somewhat vague, could use more specific details",
          result: "Brief mention of outcome, lacks quantifiable impact",
        },
        transcript:
          "In my previous role at ABC Company, we had a critical project with a tight deadline. I was responsible for coordinating the team's efforts. I organized daily stand-ups and created a tracking system to monitor progress. We managed to deliver the project on time and the client was satisfied with our work.",
      })
      setActiveTab("feedback")
    }, 3000)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < BEHAVIORAL_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setFeedback(null)
      setActiveTab("question")
    } else {
      // End of interview
      router.push("/interview/complete")
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setFeedback(null)
      setActiveTab("question")
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Behavioral Interview Practice</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Question {currentQuestionIndex + 1} of {BEHAVIORAL_QUESTIONS.length}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Question</CardTitle>
            <CardDescription>
              Answer this question using the STAR method (Situation, Task, Action, Result)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md mb-6">
              <p className="text-lg font-medium">{currentQuestion}</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="question">Question & Recording</TabsTrigger>
                <TabsTrigger value="feedback" disabled={!feedback}>
                  Feedback
                </TabsTrigger>
              </TabsList>
              <TabsContent value="question" className="pt-4">
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                    <h3 className="font-medium mb-2">STAR Method Reminder:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>
                        <strong>Situation:</strong> Describe the context and background
                      </li>
                      <li>
                        <strong>Task:</strong> Explain your responsibility in that situation
                      </li>
                      <li>
                        <strong>Action:</strong> Detail the specific steps you took
                      </li>
                      <li>
                        <strong>Result:</strong> Share the outcomes and what you learned
                      </li>
                    </ul>
                  </div>

                  <AudioRecorder
                    isRecording={isRecording}
                    onStartRecording={handleStartRecording}
                    onStopRecording={handleStopRecording}
                    isProcessing={isProcessing}
                  />
                </div>
              </TabsContent>
              <TabsContent value="feedback" className="pt-4">
                {feedback && <InterviewFeedback feedback={feedback} />}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={handleNextQuestion} disabled={!feedback}>
              {currentQuestionIndex < BEHAVIORAL_QUESTIONS.length - 1 ? (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Complete Interview"
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interview Progress</CardTitle>
            <CardDescription>Track your progress through the interview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {BEHAVIORAL_QUESTIONS.map((question, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md border ${
                    index === currentQuestionIndex
                      ? "border-primary bg-primary/5"
                      : index < currentQuestionIndex
                        ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                        : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Question {index + 1}</span>
                    {index < currentQuestionIndex && (
                      <span className="text-xs text-green-600 dark:text-green-400">Completed</span>
                    )}
                  </div>
                  <p className="text-xs mt-1 truncate">
                    {question.length > 60 ? `${question.substring(0, 60)}...` : question}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

