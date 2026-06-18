"use client";

import { useMemo, useState } from "react";
import CustomSelect from "@/components/admin/CustomSelect";

type GroupOption = {
  slug: string;
  title: string;
};

interface CategoryInitialData {
  _id?: string;
  title: string;
  slug: string;
  groupSlug: string;
  description?: string;
  order?: number;
}

interface CategoryFormProps {
  mode: "create" | "edit";
  formAction: (formData: FormData) => void | Promise<void>;
  initialData?: CategoryInitialData;
  groups: GroupOption[];
  submitLabel: string;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function CategoryForm({
  mode,
  formAction,
  initialData,
  groups,
  submitLabel,
}: CategoryFormProps) {
  const isCreateMode = mode === "create";
  const hasGroups = groups.length > 0;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [groupSlug, setGroupSlug] = useState(initialData?.groupSlug ?? groups[0]?.slug ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [order, setOrder] = useState(String(initialData?.order ?? 0));
  const [isSlugTouched, setIsSlugTouched] = useState(!isCreateMode);

  const slugWarning = useMemo(
    () =>
      mode === "edit"
        ? "Увага: якщо змінити slug категорії, питання зі старим categorySlug можуть перестати відображатися в цій категорії."
        : null,
    [mode]
  );

  return (
    <form
      action={formAction}
      className="rounded-xl border border-slate-800 bg-slate-900/50 p-6"
    >
      {mode === "edit" && initialData?._id && (
        <input type="hidden" name="categoryId" value={initialData._id} />
      )}

      <div className="grid gap-5">
        <CustomSelect
          label="Група"
          name="groupSlug"
          value={groupSlug}
          options={groups.map((group) => ({ label: group.title, value: group.slug }))}
          onChange={setGroupSlug}
          placeholder="Обери групу"
          required
          disabled={!hasGroups}
          helpText="Категорія належить до однієї group через поле groupSlug."
        />

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-200" htmlFor="title">
            Назва категорії
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={title}
            onChange={(event) => {
              const nextTitle = event.target.value;
              setTitle(nextTitle);
              if (isCreateMode && !isSlugTouched) {
                setSlug(slugify(nextTitle));
              }
            }}
            placeholder="React"
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-200" htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value);
              if (isCreateMode) {
                setIsSlugTouched(true);
              }
            }}
            placeholder="react"
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
          />
          {slugWarning && (
            <p className="mt-1 text-xs text-amber-300">{slugWarning}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-200" htmlFor="description">
            Опис
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Питання для підготовки до співбесід з React."
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-200" htmlFor="order">
            Порядок
          </label>
          <input
            id="order"
            name="order"
            type="number"
            value={order}
            onChange={(event) => setOrder(event.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={!hasGroups}
            className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
          >
            {submitLabel}
          </button>
          {!hasGroups && (
            <p className="mt-2 text-xs text-amber-300">
              Спочатку створи хоча б одну group у розділі Admin Groups.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
