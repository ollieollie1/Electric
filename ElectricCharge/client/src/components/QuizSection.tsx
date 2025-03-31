import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Trophy } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

interface QuizAnswer {
  questionId: number;
  selectedAnswerIndex: number;
}

interface AnswerFeedback {
  isCorrect: boolean;
  correctAnswer: number;
  explanation: string;
}

const QuizSection = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Fetch quiz questions
  const { data: questions, isLoading } = useQuery<QuizQuestion[]>({
    queryKey: ["/api/quiz"],
  });

  // Submit answer mutation
  const submitAnswerMutation = useMutation({
    mutationFn: async (data: QuizAnswer) => {
      const response = await apiRequest("POST", "/api/quiz/submit", data);
      return response.json();
    },
    onSuccess: (data: AnswerFeedback) => {
      setFeedback(data);
      if (data.isCorrect) {
        setScore(prev => prev + 1);
      }
    },
  });

  // Submit quiz results mutation
  const submitQuizResultMutation = useMutation({
    mutationFn: async (data: { score: number; totalQuestions: number }) => {
      const response = await apiRequest("POST", "/api/quiz/result", data);
      return response.json();
    },
  });

  const handleAnswerSelection = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !questions) return;

    const currentQuestion = questions[currentQuestionIndex];
    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedAnswerIndex: selectedAnswer,
    };

    // Add to answers array
    setAnswers(prev => [...prev, answer]);

    // Submit answer for validation
    submitAnswerMutation.mutate(answer);
  };

  const handleNextQuestion = () => {
    if (!questions) return;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setFeedback(null);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      
      // Submit quiz results
      submitQuizResultMutation.mutate({
        score,
        totalQuestions: questions.length,
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setFeedback(null);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setFeedback(null);
    setQuizCompleted(false);
    setScore(0);
  };

  if (isLoading || !questions) {
    return (
      <section id="quiz" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="font-header font-bold text-2xl md:text-3xl text-primary mb-8 text-center">
            Test Your Knowledge
          </h2>
          <div className="flex justify-center">
            <p>Loading quiz questions...</p>
          </div>
        </div>
      </section>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <section id="quiz" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="font-header font-bold text-2xl md:text-3xl text-primary mb-8 text-center">
          Test Your Knowledge
        </h2>

        <div className="max-w-3xl mx-auto">
          {!quizCompleted ? (
            <Card>
              <CardHeader className="bg-primary text-white">
                <CardTitle className="font-header font-medium text-lg">Electric Charges Quiz</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Quiz progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Question <span>{currentQuestionIndex + 1}</span> of <span>{totalQuestions}</span></span>
                    <span>Score: <span>{score}</span>/<span>{totalQuestions}</span></span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-secondary h-2.5 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question container */}
                <div>
                  <h4 className="font-header font-medium text-lg mb-4">{currentQuestion.question}</h4>

                  <RadioGroup 
                    value={selectedAnswer?.toString()} 
                    onValueChange={value => handleAnswerSelection(parseInt(value))}
                    className="space-y-3 mb-6"
                    disabled={!!feedback}
                  >
                    {currentQuestion.options.map((option, index) => (
                      <div 
                        key={index}
                        className={`flex items-center border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer ${
                          feedback && index === feedback.correctAnswer ? "bg-green-50 border-green-300" : ""
                        }`}
                      >
                        <RadioGroupItem value={index.toString()} id={`q${currentQuestionIndex}-${index}`} />
                        <Label htmlFor={`q${currentQuestionIndex}-${index}`} className="ml-3 block text-sm font-medium">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {/* Answer feedback */}
                  {feedback && (
                    <div className="mb-6">
                      <div className={`p-4 rounded-lg ${
                        feedback.isCorrect 
                          ? "bg-green-100/20 border border-green-300" 
                          : "bg-red-100/20 border border-red-300"
                      }`}>
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            {feedback.isCorrect 
                              ? <CheckCircle className="text-green-500 h-5 w-5" />
                              : <AlertCircle className="text-red-500 h-5 w-5" />
                            }
                          </div>
                          <div className="ml-3">
                            <h3 className={feedback.isCorrect ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                              {feedback.isCorrect ? "Correct!" : "Incorrect"}
                            </h3>
                            <p className="text-sm">{feedback.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0 || !feedback}
                    >
                      Previous
                    </Button>
                    
                    {!feedback ? (
                      <Button 
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null || submitAnswerMutation.isPending}
                      >
                        Submit Answer
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleNextQuestion}
                      >
                        {currentQuestionIndex < totalQuestions - 1 ? 'Next' : 'Finish Quiz'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="bg-green-500 text-white">
                <CardTitle className="font-header font-medium text-lg">Quiz Completed!</CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <div className="mb-6">
                  <div className="inline-block p-4 rounded-full bg-green-100 text-green-500 mb-4">
                    <Trophy className="h-10 w-10" />
                  </div>
                  <h3 className="font-header font-medium text-xl mb-2">Great job!</h3>
                  <p>You scored <span className="font-medium">{score}</span> out of <span>{totalQuestions}</span> correct!</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" onClick={() => {}}>
                    Review Answers
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90" onClick={handleRestartQuiz}>
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
