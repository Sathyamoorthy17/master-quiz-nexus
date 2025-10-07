import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  type: 'mcq';
}

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [timeLimit, setTimeLimit] = useState('30');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const addQuestion = () => {
    if (!currentQuestion.trim() || currentOptions.some(opt => !opt.trim())) {
      toast({
        title: 'Incomplete Question',
        description: 'Please fill in all question fields and options.',
        variant: 'destructive',
      });
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      question: currentQuestion,
      options: [...currentOptions],
      correctAnswer,
      type: 'mcq',
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion('');
    setCurrentOptions(['', '', '', '']);
    setCorrectAnswer(0);

    toast({
      title: 'Question Added',
      description: 'Question added successfully!',
    });
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (questions.length === 0) {
      toast({
        title: 'No Questions',
        description: 'Please add at least one question.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'quizzes'), {
        title: quizTitle,
        description: quizDescription,
        subject,
        timeLimit: parseInt(timeLimit),
        questions,
        createdAt: new Date(),
        active: true,
      });

      toast({
        title: 'Quiz Created',
        description: 'Your quiz has been created successfully!',
      });
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create quiz',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Create New Quiz</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quiz Details */}
          <Card>
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
              <CardDescription>Basic information about your quiz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title *</Label>
                <Input
                  id="title"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  placeholder="e.g., Mathematics Quiz 1"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  placeholder="Brief description of the quiz"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Mathematics"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time Limit (minutes) *</Label>
                  <Input
                    id="time"
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(e.target.value)}
                    min="1"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Question */}
          <Card>
            <CardHeader>
              <CardTitle>Add Question</CardTitle>
              <CardDescription>Create multiple-choice questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Question Text *</Label>
                <Textarea
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  placeholder="Enter your question here"
                />
              </div>
              
              {currentOptions.map((option, index) => (
                <div key={index} className="space-y-2">
                  <Label>Option {index + 1} *</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...currentOptions];
                        newOptions[index] = e.target.value;
                        setCurrentOptions(newOptions);
                      }}
                      placeholder={`Option ${index + 1}`}
                    />
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={correctAnswer === index}
                      onChange={() => setCorrectAnswer(index)}
                      className="w-4 h-4"
                    />
                  </div>
                </div>
              ))}
              
              <Button type="button" onClick={addQuestion} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Question to Quiz
              </Button>
            </CardContent>
          </Card>

          {/* Questions List */}
          {questions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Questions ({questions.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {questions.map((q, index) => (
                  <div key={q.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">Q{index + 1}: {q.question}</p>
                      <div className="mt-2 space-y-1 text-sm">
                        {q.options.map((opt, i) => (
                          <p key={i} className={i === q.correctAnswer ? 'text-success font-medium' : 'text-muted-foreground'}>
                            {i + 1}. {opt} {i === q.correctAnswer && '✓'}
                          </p>
                        ))}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(q.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating Quiz...' : 'Create Quiz'}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default CreateQuiz;
