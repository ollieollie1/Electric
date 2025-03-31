import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema, insertQuizQuestionSchema, insertUserQuizAttemptSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Educational Content Routes
  app.get("/api/content", async (req: Request, res: Response) => {
    const allContent = await storage.getAllEducationalContent();
    res.json(allContent);
  });

  app.get("/api/content/:section", async (req: Request, res: Response) => {
    const { section } = req.params;
    const content = await storage.getEducationalContentBySection(section);
    res.json(content);
  });

  // Quiz Routes
  app.get("/api/quiz", async (req: Request, res: Response) => {
    const questions = await storage.getAllQuizQuestions();
    
    // Map questions to remove the correct answer for client-side display
    const clientQuestions = questions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options
    }));
    
    res.json(clientQuestions);
  });

  app.post("/api/quiz/submit", async (req: Request, res: Response) => {
    const AnswerSubmissionSchema = z.object({
      questionId: z.number(),
      selectedAnswerIndex: z.number()
    });

    try {
      const data = AnswerSubmissionSchema.parse(req.body);
      const question = await storage.getQuizQuestion(data.questionId);
      
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      
      const isCorrect = question.correctAnswer === data.selectedAnswerIndex;
      
      res.json({
        isCorrect,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid submission data" });
    }
  });

  app.post("/api/quiz/result", async (req: Request, res: Response) => {
    const QuizResultSchema = z.object({
      userId: z.number().optional(),
      score: z.number(),
      totalQuestions: z.number(),
    });

    try {
      const data = QuizResultSchema.parse(req.body);
      
      // If userId is not provided, we're just recording an anonymous attempt
      const userId = data.userId || 0;
      
      const attempt = await storage.createUserQuizAttempt({
        userId,
        score: data.score,
        totalQuestions: data.totalQuestions,
        completedAt: new Date().toISOString()
      });
      
      res.json(attempt);
    } catch (error) {
      res.status(400).json({ message: "Invalid quiz result data" });
    }
  });

  // User Routes (if needed for future authentication)
  app.post("/api/users/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.status(201).json({ id: user.id, username: user.username });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
