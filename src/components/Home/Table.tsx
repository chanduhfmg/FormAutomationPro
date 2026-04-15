import React, { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, Search } from "lucide-react";

type SortDir = "asc" | "desc" | null;

type Column<T> = {
  key: keyof T | string;
  title?: React.ReactNode;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  width?: number | string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
};

type RowKeyFn<T> = (row: T, index: number) => string;

interface TableProps<T> {
  data: T[];
  column?: Column<T>[];
  columns?: Column<T>[];
  rowKey?: keyof T | RowKeyFn<T>;
  className?: string;
  style?: React.CSSProperties;
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ChevronsUpDown size={13} className="ml-1 text-gray-300" />;
  if (dir === "asc") return <ChevronUp size={13} className="ml-1" style={{ color: "#1a5c38" }} />;
  if (dir === "desc") return <ChevronDown size={13} className="ml-1" style={{ color: "#1a5c38" }} />;
  return null;
}

export default function Table<T extends Record<string, any>>({
  data,
  column,
  columns,
  rowKey,
  className,
  style,
  pageSize = 7,
  searchable = false,
  searchPlaceholder = "Search…",
}: TableProps<T>) {
  const cols = column ?? columns ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [search, setSearch] = useState("");

  const getRowKey = (row: T, index: number): string => {
    if (typeof rowKey === "function") return rowKey(row, index);
    if (typeof rowKey === "string" && rowKey in row) return String(row[rowKey]);
    if ("id" in row) return String((row as any).id);
    return String(index);
  };

  const handleSort = (key: string) => {
    if (sortKey !== key) { setSortKey(key); setSortDir("asc"); }
    else if (sortDir === "asc") setSortDir("desc");
    else { setSortKey(null); setSortDir(null); }
    setCurrentPage(1);
  };

  // Filter
  const filtered = data.filter((row) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return Object.values(row).some((v) =>
      String(v ?? "").toLowerCase().includes(q)
    );
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    return sortDir === "asc"
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av));
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginatedData = sorted.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className={className} style={style}>
      {/* Search */}
      {searchable && (
        <div className="relative mb-4 w-64">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder={searchPlaceholder}
            className="pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none w-full shadow-sm"
            onFocus={(e) => (e.target.style.borderColor = "#1a5c38")}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />
        </div>
      )}

      {/* Table card */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: "collapse", tableLayout: "fixed" }}>

            {/* Head */}
            <thead>
              <tr style={{ backgroundColor: "rgba(26,92,56,0.05)", borderBottom: "1px solid rgba(26,92,56,0.12)" }}>
                {cols.map((col, ci) => (
                  <th
                    key={String(col.key) + ci}
                    className="px-4 py-3 text-xs font-bold tracking-wide whitespace-nowrap select-none"
                    style={{
                      width: col.width,
                      textAlign: col.align || "left",
                      color: "#1a5c38",
                    }}
                  >
                    {col.sortable ? (
                      <button
                        onClick={() => handleSort(String(col.key))}
                        className="inline-flex items-center hover:opacity-75 transition-opacity"
                      >
                        {col.title ?? String(col.key)}
                        <SortIcon
                          active={sortKey === String(col.key)}
                          dir={sortKey === String(col.key) ? sortDir : null}
                        />
                      </button>
                    ) : (
                      col.title ?? String(col.key)
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={cols.length} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                        <Search size={20} className="text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-medium text-sm">No records found</p>
                      <p className="text-gray-400 text-xs">Try adjusting your search</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, ri) => (
                  <tr
                    key={getRowKey(row, ri)}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70 transition-colors duration-150"
                  >
                    {cols.map((col, ci) => {
                      const raw =
                        (col.key as keyof T) in row
                          ? (row as any)[col.key as keyof T]
                          : undefined;

                      const content = col.render
                        ? col.render(raw, row, ri)
                        : raw ?? "—";

                      return (
                        <td
                          key={String(col.key) + ci}
                          className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-600"
                          style={{ width: col.width, textAlign: col.align || "left" }}
                        >
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50">
            <p className="text-xs text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-600">
                {(currentPage - 1) * pageSize + 1}–
                {Math.min(currentPage * pageSize, sorted.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-600">{sorted.length}</span>
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setCurrentPage(n)}
                  className="w-7 h-7 rounded-lg text-xs font-semibold transition-all"
                  style={
                    n === currentPage
                      ? { backgroundColor: "#1a5c38", color: "white" }
                      : { color: "#6b7280", border: "1px solid #e5e7eb" }
                  }
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}