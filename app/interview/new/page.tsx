"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Mic, Code, BookOpen } from "lucide-react"

export default function NewInterview() {
  const router = useRouter()
  const [interviewType, setInterviewType] = useState<string>("behavioral")

  const handleStartInterview = () => {
    if (interviewType === "behavioral") {
      router.push("/interview/behavioral")
    } else if (interviewType === "technical") {
      router.push("/interview/technical")
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Start a New Interview</h1>
        <p className="text-slate-600 dark:text-slate-400">Choose the type of interview you want to practice</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Select Interview Type</CardTitle>
          <CardDescription>Choose the type of interview you want to practice</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={interviewType} onValueChange={setInterviewType} className="space-y-4">
            <div className="flex items-start space-x-4 border p-4 rounded-md">
              <RadioGroupItem value="behavioral" id="behavioral" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="behavioral" className="text-base font-medium flex items-center">
                  <Mic className="mr-2 h-4 w-4" />
                  Behavioral Interview
                </Label>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Practice answering common behavioral questions using the STAR method. Get feedback on your structure,
                  clarity, and impact.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 border p-4 rounded-md">
              <RadioGroupItem value="technical" id="technical" className="mt-1" disabled />
              <div className="flex-1">
                <Label htmlFor="technical" className="text-base font-medium flex items-center text-slate-500">
                  <Code className="mr-2 h-4 w-4" />
                  Technical Interview (Coming Soon)
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                  Practice coding problems and system design questions. Get feedback on your problem-solving approach
                  and technical communication.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 border p-4 rounded-md">
              <RadioGroupItem value="custom" id="custom" className="mt-1" disabled />
              <div className="flex-1">
                <Label htmlFor="custom" className="text-base font-medium flex items-center text-slate-500">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Custom Interview (Coming Soon)
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                  Create a custom interview with your own questions or select from our library of industry-specific
                  questions.
                </p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleStartInterview}>
            Start Interview
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

