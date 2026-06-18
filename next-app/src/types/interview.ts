export type Difficulty = "junior" | "middle" | "senior";

export type FullAnswerAccess = "free" | "premium";

export type QuestionStatus = "draft" | "published" | "archived";

export type TrickyQuestion = {
  question: string;
  answer: string;
};

export type Group = {
  _id?: string;
  slug: string;
  title: string;
  description?: string;
  order?: number;
};

export type Category = {
  _id?: string;
  slug: string;
  title: string;
  description?: string;
  groupSlug: string;
  order?: number;
};

export type InterviewQuestion = {
  _id?: string;
  slug: string;
  question: string;
  shortAnswer: string;
  fullAnswer: string;
  fullAnswerAccess: FullAnswerAccess;
  categorySlug: string;
  sectionSlug?: string;
  tags?: string[];
  difficulty: Difficulty;
  order?: number;
  trickyQuestion?: TrickyQuestion;
  /** @deprecated Use trickyQuestion instead. */
  trickyQuestions?: TrickyQuestion[];
  /** @deprecated Use trickyQuestion instead. */
  followUpQuestions?: TrickyQuestion[];
  status: QuestionStatus;
};
