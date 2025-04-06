import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Clock, BarChart, History } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserNav />
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Link href="/interview/new">
            <Button>
              New Interview Session
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Interview History</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Practice Sessions</CardTitle>
                  <History className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Practice Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.5 hours</div>
                  <p className="text-xs text-muted-foreground">+45 minutes from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Improvement Score</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+18%</div>
                  <p className="text-xs text-muted-foreground">Based on feedback metrics</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Interview Sessions</CardTitle>
                <CardDescription>Your last 5 practice interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      title: "Behavioral Interview - Leadership",
                      date: "Today, 2:30 PM",
                      score: 85,
                    },
                    {
                      id: 2,
                      title: "Behavioral Interview - Problem Solving",
                      date: "Yesterday, 10:15 AM",
                      score: 78,
                    },
                    {
                      id: 3,
                      title: "Behavioral Interview - Teamwork",
                      date: "May 2, 2023",
                      score: 92,
                    },
                  ].map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{session.title}</p>
                        <p className="text-sm text-muted-foreground">{session.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">Score: {session.score}%</span>
                        <Link href={`/interview/review/${session.id}`}>
                          <Button variant="ghost" size="sm">
                            Review
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/interview/history" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All History
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interview History</CardTitle>
                <CardDescription>A complete record of your practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  You have completed 12 practice interviews in total.
                </p>
                {/* Interview history would be listed here */}
                <p className="text-center text-sm text-muted-foreground py-8">
                  Detailed interview history will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your improvement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Your skills have improved by 18% over the last month.
                </p>
                {/* Progress charts would be displayed here */}
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <p className="text-center text-sm text-muted-foreground">Progress charts will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

