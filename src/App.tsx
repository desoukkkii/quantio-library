import { useState, useCallback, useEffect, type FC } from "react";
import { useStore } from "./lib/store";
import { ToastProvider, useToast } from "./hooks/useToast";
import { today } from "./lib/utils";
import type { View } from "./types";
import Sidebar from "./components/Sidebar";
import Dashboard from "./views/Dashboard";
import Books from "./views/Books";
import Members from "./views/Members";
import Borrowing from "./views/Borrowing";
import Overdue from "./views/Overdue";

const VIEWS: Record<View, FC> = {
  dashboard: Dashboard,
  books: Books,
  members: Members,
  borrowing: Borrowing,
  overdue: Overdue,
};

function AppContent() {
  const { state } = useStore();
  const { addToast } = useToast();
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleNavigate = useCallback((view: View) => {
    setActiveView(view);
  }, []);

  const handleExport = useCallback(() => {
    const rows = [
      ["ID", "Title", "Author", "ISBN", "Genre", "Year", "Quantity"],
    ];
    state.books.forEach((b) =>
      rows.push([String(b.id), b.title, b.author, b.isbn, b.genre, String(b.year), String(b.qty)]),
    );
    const csv = rows
      .map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `quantio_books_${today()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
    addToast("Books exported as CSV", "s");
  }, [state.books, addToast]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !["INPUT", "SELECT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>(
          `#view-${activeView} input[type="search"]`,
        );
        input?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [activeView]);

  const ActiveViewComponent = VIEWS[activeView];

  return (
    <div className="min-h-screen bg-bg text-text font-sans">
      <a
        href="#content"
        className="fixed top-3 left-3 z-[9999] px-4 py-2 bg-p text-white text-[0.82rem] font-semibold rounded-sm no-underline -translate-y-[100px] focus:translate-y-0 transition-transform duration-[0.22s]"
      >
        Skip to main content
      </a>

      {/* Top mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-[56px] bg-white border-b border-border flex items-center gap-3 px-4 z-[101] shadow-xs">
        <button
          onClick={() => setSidebarOpen((p) => !p)}
          className="w-9 h-9 flex items-center justify-center rounded-md text-t2 hover:bg-s3 hover:text-text transition-all duration-[0.15s]"
          aria-label="Toggle sidebar"
        >
          <i aria-hidden="true" className="fa-solid fa-bars text-lg" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-p to-p-light flex items-center justify-center text-white text-[0.65rem] shadow-xs">
            <i aria-hidden="true" className="fa-solid fa-book-open-reader" />
          </div>
          <span className="font-heading font-extrabold text-text text-[0.95rem]">Quantio</span>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[99] animate-bg-fade"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-[100] transform transition-transform duration-[0.25s] lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <Sidebar activeView={activeView} onNavigate={(v) => { handleNavigate(v); setSidebarOpen(false); }} onExport={handleExport} />
      </div>

      {/* Main content */}
      <main
        id="content"
        tabIndex={-1}
        className="min-h-screen lg:ml-[240px] pt-[72px] lg:pt-6 px-6 xl:px-10 pb-9 max-[640px]:px-4 max-[640px]:pt-[64px] max-[640px]:pb-5"
      >
        <div className="max-w-[1400px] mx-auto">
          <div id={`view-${activeView}`} key={activeView}>
            <ActiveViewComponent />
          </div>
        </div>
      </main>


    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
