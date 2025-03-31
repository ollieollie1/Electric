import { 
  users, type User, type InsertUser,
  quizQuestions, type QuizQuestion, type InsertQuizQuestion,
  userQuizAttempts, type UserQuizAttempt, type InsertUserQuizAttempt,
  educationalContent, type EducationalContent, type InsertEducationalContent
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quiz questions operations
  getAllQuizQuestions(): Promise<QuizQuestion[]>;
  getQuizQuestion(id: number): Promise<QuizQuestion | undefined>;
  createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion>;
  
  // User quiz attempts operations
  getUserQuizAttempts(userId: number): Promise<UserQuizAttempt[]>;
  createUserQuizAttempt(attempt: InsertUserQuizAttempt): Promise<UserQuizAttempt>;
  
  // Educational content operations
  getAllEducationalContent(): Promise<EducationalContent[]>;
  getEducationalContentBySection(section: string): Promise<EducationalContent[]>;
  createEducationalContent(content: InsertEducationalContent): Promise<EducationalContent>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quizQuestions: Map<number, QuizQuestion>;
  private userQuizAttempts: Map<number, UserQuizAttempt>;
  private educationalContent: Map<number, EducationalContent>;
  private currentUserId: number;
  private currentQuizQuestionId: number;
  private currentUserQuizAttemptId: number;
  private currentEducationalContentId: number;

  constructor() {
    this.users = new Map();
    this.quizQuestions = new Map();
    this.userQuizAttempts = new Map();
    this.educationalContent = new Map();
    this.currentUserId = 1;
    this.currentQuizQuestionId = 1;
    this.currentUserQuizAttemptId = 1;
    this.currentEducationalContentId = 1;

    // Initialize with default educational content and quiz questions
    this.initializeDefaultData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Quiz questions operations
  async getAllQuizQuestions(): Promise<QuizQuestion[]> {
    return Array.from(this.quizQuestions.values());
  }

  async getQuizQuestion(id: number): Promise<QuizQuestion | undefined> {
    return this.quizQuestions.get(id);
  }

  async createQuizQuestion(insertQuestion: InsertQuizQuestion): Promise<QuizQuestion> {
    const id = this.currentQuizQuestionId++;
    const question: QuizQuestion = { ...insertQuestion, id };
    this.quizQuestions.set(id, question);
    return question;
  }

  // User quiz attempts operations
  async getUserQuizAttempts(userId: number): Promise<UserQuizAttempt[]> {
    return Array.from(this.userQuizAttempts.values()).filter(
      (attempt) => attempt.userId === userId,
    );
  }

  async createUserQuizAttempt(insertAttempt: InsertUserQuizAttempt): Promise<UserQuizAttempt> {
    const id = this.currentUserQuizAttemptId++;
    const attempt: UserQuizAttempt = { ...insertAttempt, id };
    this.userQuizAttempts.set(id, attempt);
    return attempt;
  }

  // Educational content operations
  async getAllEducationalContent(): Promise<EducationalContent[]> {
    return Array.from(this.educationalContent.values());
  }

  async getEducationalContentBySection(section: string): Promise<EducationalContent[]> {
    return Array.from(this.educationalContent.values())
      .filter((content) => content.section === section)
      .sort((a, b) => a.order - b.order);
  }

  async createEducationalContent(insertContent: InsertEducationalContent): Promise<EducationalContent> {
    const id = this.currentEducationalContentId++;
    const content: EducationalContent = { ...insertContent, id };
    this.educationalContent.set(id, content);
    return content;
  }

  private initializeDefaultData() {
    // Initialize quiz questions
    const defaultQuizQuestions: InsertQuizQuestion[] = [
      {
        question: "According to Coulomb's Law, if the distance between two charges is doubled, how does the force between them change?",
        options: ["The force doubles", "The force is halved", "The force is reduced to one-quarter of its original value", "The force is quadrupled"],
        correctAnswer: 2,
        explanation: "According to Coulomb's Law (F ∝ 1/r²), when the distance doubles, the force decreases to one-quarter of its original value."
      },
      {
        question: "Which of the following statements about electric charges is NOT true?",
        options: ["Like charges repel each other", "Unlike charges attract each other", "The SI unit of electric charge is the coulomb (C)", "Electric charge can be created or destroyed"],
        correctAnswer: 3,
        explanation: "Electric charge is conserved; it cannot be created or destroyed. It can only be transferred from one object to another."
      },
      {
        question: "What happens to the electric force between two charges if the charge of one object is doubled?",
        options: ["The force remains the same", "The force is doubled", "The force is halved", "The force is quadrupled"],
        correctAnswer: 1,
        explanation: "According to Coulomb's Law (F ∝ q₁q₂), if one of the charges is doubled, the force between them doubles."
      },
      {
        question: "Electric field lines...",
        options: ["Start from negative charges and end at positive charges", "Start from positive charges and end at negative charges", "Can cross each other", "Form closed loops"],
        correctAnswer: 1,
        explanation: "Electric field lines start from positive charges and end at negative charges. They cannot cross each other, and they do not form closed loops."
      },
      {
        question: "What is the direction of the electric field at a point?",
        options: ["The direction a negative charge would move if placed at that point", "The direction a positive charge would move if placed at that point", "Perpendicular to the direction of the force", "Always pointing towards the center of the Earth"],
        correctAnswer: 1,
        explanation: "The electric field at a point is defined as the direction a positive test charge would move if placed at that point."
      }
    ];

    defaultQuizQuestions.forEach(question => {
      this.createQuizQuestion(question);
    });

    // Initialize educational content
    const defaultEducationalContent: InsertEducationalContent[] = [
      {
        section: "basic_charges",
        title: "Electric Charges",
        content: "Electric charge is a fundamental property of matter. There are two types of electric charges: positive and negative. Like charges repel each other (positive repels positive, negative repels negative). Unlike charges attract each other (positive attracts negative). The SI unit of electric charge is the coulomb (C). Charge is conserved - it cannot be created or destroyed. The elementary charge (e) is the charge of a proton or electron: e = 1.602 × 10⁻¹⁹ C.",
        order: 1
      },
      {
        section: "coulombs_law",
        title: "Coulomb's Law",
        content: "Coulomb's Law describes the electrostatic force between two charged particles: F = k × |q₁ × q₂| / r², where F is the electrostatic force (in newtons, N), k is Coulomb's constant (8.99 × 10⁹ N·m²/C²), q₁ and q₂ are the magnitudes of the charges (in coulombs, C), and r is the distance between the charges (in meters, m). The force is repulsive if the charges have the same sign, and attractive if they have opposite signs.",
        order: 1
      },
      {
        section: "electric_fields",
        title: "Electric Fields",
        content: "An electric field is a region where electric charges experience a force. The electric field at a point is defined as the force per unit charge that would be exerted on a small test charge placed at that point: E = F / q, where E is the electric field (in N/C), F is the force experienced by the charge (in N), and q is the magnitude of the test charge (in C). Electric field lines start from positive charges and end at negative charges, never cross each other, and the denser the lines, the stronger the field.",
        order: 1
      }
    ];

    defaultEducationalContent.forEach(content => {
      this.createEducationalContent(content);
    });
  }
}

export const storage = new MemStorage();
