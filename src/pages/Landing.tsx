import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Shield, Sparkles, Trophy, Users, Zap } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Welcome to QuizMaster Pro</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Transform Learning with
            <br />
            Interactive Quizzes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A comprehensive quiz platform designed for educators and students, featuring real-time analytics, gamification, and adaptive learning.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription>Manage quizzes, students, and view analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Create and manage quizzes
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Manage student accounts
                </li>
                <li className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  Track performance analytics
                </li>
              </ul>
              <Button 
                onClick={() => navigate('/admin/login')} 
                className="w-full"
                size="lg"
              >
                Admin Login
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-accent">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Student Portal</CardTitle>
              <CardDescription>Take quizzes and track your progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-accent" />
                  Take interactive quizzes
                </li>
                <li className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-accent" />
                  Earn badges and achievements
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent" />
                  Compete on leaderboards
                </li>
              </ul>
              <Button 
                onClick={() => navigate('/student/login')} 
                className="w-full bg-accent hover:bg-accent/90"
                size="lg"
              >
                Student Login
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground mb-8">Everything you need for modern education</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Sparkles, label: 'Adaptive Learning' },
              { icon: Trophy, label: 'Gamification' },
              { icon: Zap, label: 'Real-time Results' },
              { icon: Users, label: 'Collaboration' },
            ].map((feature) => (
              <div key={feature.label} className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
