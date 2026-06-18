"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PAGE_SIZE_OPTIONS = [20, 50, 100] as const;

interface Props {
  value: number;
}

export default function PageSizeSelect({ value }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (nextPerPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("perPage", String(nextPerPage));
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <label className="inline-flex items-center gap-2 text-sm text-slate-400">
      Показувати
      <select
        value={value}
        onChange={(event) => handleChange(Number(event.target.value))}
        className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
      >
        {PAGE_SIZE_OPTIONS.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      на сторінці
    </label>
  );
}
