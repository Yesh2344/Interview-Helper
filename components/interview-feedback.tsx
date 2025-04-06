"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle } from "lucide-react"

interface FeedbackProps {
  feedback: {
    score: number
    strengths: string[]
    improvements: string[]
    starAnalysis: {
      situation: string
      task: string
      action: string
      result: string
    }
    transcript: string
  }
}

export function InterviewFeedback({ feedback }: FeedbackProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500 dark:text-green-400"
    if (score >= 70) return "text-yellow-500 dark:text-yellow-400"
    return "text-red-500 dark:text-red-400"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Your Feedback</h3>
        <div className="flex items-center">
          <span className="mr-2">Overall Score:</span>
          <span className={`text-xl font-bold ${getScoreColor(feedback.score)}`}>{feedback.score}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-600 dark:text-green-400">
              <CheckCircle className="mr-2 h-5 w-5" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-amber-600 dark:text-amber-400">
              <AlertCircle className="mr-2 h-5 w-5" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="mr-2 h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>STAR Method Analysis</CardTitle>
          <CardDescription>Evaluation of how well you structured your response</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-md">
                <h4 className="font-bold mb-2 flex items-center">
                  <Badge variant="outline" className="mr-2">
                    S
                  </Badge>
                  Situation
                </h4>
                <p className="text-sm">{feedback.starAnalysis.situation}</p>
              </div>
              <div className="p-4 border rounded-md">
                <h4 className="font-bold mb-2 flex items-center">
                  <Badge variant="outline" className="mr-2">
                    T
                  </Badge>
                  Task
                </h4>
                <p className="text-sm">{feedback.starAnalysis.task}</p>
              </div>
              <div className="p-4 border rounded-md">
                <h4 className="font-bold mb-2 flex items-center">
                  <Badge variant="outline" className="mr-2">
                    A
                  </Badge>
                  Action
                </h4>
                <p className="text-sm">{feedback.starAnalysis.action}</p>
              </div>
              <div className="p-4 border rounded-md">
                <h4 className="font-bold mb-2 flex items-center">
                  <Badge variant="outline" className="mr-2">
                    R
                  </Badge>
                  Result
                </h4>
                <p className="text-sm">{feedback.starAnalysis.result}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Response Transcript</CardTitle>
          <CardDescription>This is what our AI transcribed from your recording</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-md">
            <p className="whitespace-pre-line">{feedback.transcript}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

