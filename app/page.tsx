import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Mic, Code, BookOpen } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">AI Interview Helper</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Prepare for your next interview with AI-powered feedback and coaching
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5" />
                Behavioral Interviews
              </CardTitle>
              <CardDescription>
                Practice answering common behavioral questions with STAR method feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Our AI analyzes your responses for structure, clarity, and impact, providing actionable feedback to
                improve your storytelling.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/interview/behavioral" className="w-full">
                <Button className="w-full">
                  Start Practice
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Technical Interviews
              </CardTitle>
              <CardDescription>Practice coding problems and system design with real-time feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Get feedback on your problem-solving approach, code quality, and communication of technical concepts.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/interview/technical" className="w-full">
                <Button className="w-full" variant="outline">
                  Coming Soon
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Interview Library
              </CardTitle>
              <CardDescription>Browse our collection of interview questions and best practices</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Study common interview questions, review best practices, and learn strategies for answering effectively.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/library" className="w-full">
                <Button className="w-full" variant="secondary">
                  Browse Library
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/auth/login">
            <Button size="lg" variant="default">
              Sign In to Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

