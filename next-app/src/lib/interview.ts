import { connectToDatabase } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";
import GroupModel from "@/models/Group";
import QuestionModel from "@/models/Question";
import type { Category, Group, InterviewQuestion } from "@/types/interview";

function serializeDoc<T>(doc: T & { _id?: unknown }): T {
  const obj = doc as Record<string, unknown>;
  if (obj._id) obj._id = String(obj._id);
  return obj as T;
}

export async function getAllCategories(): Promise<Category[]> {
  await connectToDatabase();
  const docs = await CategoryModel.find()
    .sort({ groupSlug: 1, order: 1, title: 1 })
    .lean();
  return docs.map(serializeDoc) as Category[];
}

export async function getAllGroups(): Promise<Group[]> {
  await connectToDatabase();
  const docs = await GroupModel.find().sort({ order: 1, title: 1 }).lean();
  return docs.map(serializeDoc) as Group[];
}

type GroupWithCategories = {
  group: Group;
  categories: Category[];
};

export async function getGroupedCategories(): Promise<GroupWithCategories[]> {
  await connectToDatabase();

  const [groupDocs, categoryDocs] = await Promise.all([
    GroupModel.find().sort({ order: 1, title: 1 }).lean(),
    CategoryModel.find().sort({ groupSlug: 1, order: 1, title: 1 }).lean(),
  ]);

  const groups = groupDocs.map(serializeDoc) as Group[];
  const categories = categoryDocs.map(serializeDoc) as Category[];
  const grouped = new Map<string, Category[]>();

  for (const category of categories) {
    const existing = grouped.get(category.groupSlug) ?? [];
    existing.push(category);
    grouped.set(category.groupSlug, existing);
  }

  return groups
    .map((group) => ({
      group,
      categories: grouped.get(group.slug) ?? [],
    }))
    .filter((item) => item.categories.length > 0);
}

export async function getAllQuestions(): Promise<InterviewQuestion[]> {
  await connectToDatabase();
  const docs = await QuestionModel.find({ status: "published" })
    .sort({ order: 1 })
    .lean();
  return docs.map(serializeDoc) as InterviewQuestion[];
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  await connectToDatabase();
  const doc = await CategoryModel.findOne({ slug }).lean();
  if (!doc) return null;
  return serializeDoc(doc) as Category;
}

export async function getQuestionsByCategorySlug(
  categorySlug: string
): Promise<InterviewQuestion[]> {
  await connectToDatabase();
  const docs = await QuestionModel.find({ categorySlug, status: "published" })
    .sort({ order: 1 })
    .lean();
  return docs.map(serializeDoc) as InterviewQuestion[];
}

export function paginateQuestions<T>(
  items: T[],
  page: number,
  perPage: number
) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    page: safePage,
    totalPages,
    totalItems: items.length,
    start,
  };
}
