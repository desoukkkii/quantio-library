import { useState, useEffect, useRef } from "react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  delay?: number;
}

export default function SearchBox({ value, onChange, placeholder, label, delay = 200 }: SearchBoxProps) {
  const [local, setLocal] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(() => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (local !== value) onChange(local);
    }, delay);
    return () => { if (timer.current !== null) clearTimeout(timer.current); };
  }, [local, delay]);

  return (
    <div className="flex-1 min-w-[180px] max-[400px]:min-w-0 flex items-center gap-2.5 bg-white border border-border rounded-lg px-3.5 py-[9px] transition-all duration-[0.22s] shadow-xs focus-within:border-p focus-within:shadow-[0_0_0_3px_rgba(79,70,229,0.1)]">
      <i aria-hidden="true" className="fa-solid fa-magnifying-glass text-t3 text-[0.82rem] shrink-0" />
      <input
        type="search"
        placeholder={placeholder}
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        className="border-none outline-none bg-transparent font-sans text-[0.87rem] text-text w-full placeholder:text-t4"
        aria-label={label}
      />
      {local && (
        <button
          onClick={() => { setLocal(""); onChange(""); }}
          className="bg-transparent border-none text-t3 cursor-pointer hover:text-text transition-colors duration-[0.15s] p-0.5 text-sm"
          aria-label="Clear search"
        >
          <i aria-hidden="true" className="fa-solid fa-xmark" />
        </button>
      )}
    </div>
  );
}
