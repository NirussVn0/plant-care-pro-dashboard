"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MdSearch, MdLocalFlorist, MdTaskAlt, MdBook } from "react-icons/md";
import { useGlobalSearch } from "@/contexts/GlobalSearchContext";
import { useDebounce } from "@/hooks/useDebounce";
import ServiceFactory from "@/services/ServiceFactory";
import { Plant } from "@/models/Plant";
import { Task } from "@/models/Task";

type SearchResult = 
  | { type: "PLANT"; data: Plant }
  | { type: "TASK"; data: Task }
  | { type: "ENCYCLOPEDIA"; data: Plant };

export default function GlobalSearch() {
  const { isOpen, closeSearch } = useGlobalSearch();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        // If imports/context setup allows, we could toggle here, 
        // but this component mounts only when provider wraps app. 
        // We rely on GlobalSearchContext for the trigger, 
        // but we can listen for close (Esc) here.
      }
      if (e.key === "Escape" && isOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeSearch]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const performSearch = async () => {
      setIsLoading(true);
      try {
        const term = debouncedQuery.toLowerCase();
        
        // Parallel fetch
        const [plants, allTasks] = await Promise.all([
          ServiceFactory.getPlantService().getAllPlants(),
          ServiceFactory.getTaskService().getAllTasks()
        ]);

        const searchResults: SearchResult[] = [];

        // Search Plants (My Jungle)
        plants.forEach(plant => {
          if (plant.name.toLowerCase().includes(term) || plant.scientificName.toLowerCase().includes(term)) {
            searchResults.push({ type: "PLANT", data: plant });
          }
        });

        // Search Tasks
        // Note: Tasks don't have titles, so we search note/type or plant name lookups
        // For simplicity, let's search task type and notes
        allTasks.forEach(task => {
          if (
            task.type.toLowerCase().includes(term) || 
            (task.note && task.note.toLowerCase().includes(term)) ||
            (task.plantId && plants.find(p => p.id === task.plantId)?.name.toLowerCase().includes(term))
          ) {
            searchResults.push({ type: "TASK", data: task });
          }
        });

        // Search Encyclopedia (same as plants for now, but semantically distinct)
        // In real app, might be separate DB. Reusing plants for demo.
        plants.forEach(plant => {
             // Only add if not already added as "PLANT" to avoid dupe visual? 
             // Or distinguish "My Plant" vs "Encyclopedia Entry".
             // For this demo, let's just mark encyclopedia matches if they are valid species
             if (plant.scientificName.toLowerCase().includes(term)) {
               searchResults.push({ type: "ENCYCLOPEDIA", data: plant });
             }
        });

        setResults(searchResults.slice(0, 10)); // Limit results
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  const handleSelect = (result: SearchResult) => {
    closeSearch();
    setQuery(""); // Reset query
    
    switch (result.type) {
      case "PLANT":
        // Navigate to jungle filter or detail? For now, jungle page.
        // Ideally: /jungle?search=...
        router.push("/jungle"); 
        // In a real app, we'd open the PlantDetailsModal via global event or URL param
        break;
      case "TASK":
        router.push("/schedule");
        break;
      case "ENCYCLOPEDIA":
        router.push("/encyclopedia");
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
         onClick={closeSearch}>
      <div 
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-[#1e2626] rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300 border border-[#e6f4f2] dark:border-[#354545]"
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#e6f4f2] dark:border-[#354545]">
          <MdSearch className="text-2xl text-text-muted" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none text-lg text-text-main dark:text-text-inverse placeholder:text-text-muted focus:ring-0 focus:outline-none"
            placeholder="Search plants, tasks, care guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={closeSearch} className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <span className="text-xs font-mono text-text-muted border border-text-muted/30 rounded px-1.5 py-0.5">ESC</span>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading ? (
             <div className="p-8 text-center text-text-muted">Searching...</div>
          ) : results.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-bold text-text-muted uppercase tracking-wider">Results</div>
              {results.map((result, idx) => (
                <button
                  key={`${result.type}-${idx}`}
                  onClick={() => handleSelect(result)}
                  className="w-full text-left px-4 py-3 hover:bg-[#e6f4f2] dark:hover:bg-[#354545] flex items-center gap-4 transition-colors group"
                >
                  <div className={`p-2 rounded-lg 
                    ${result.type === 'PLANT' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : ''}
                    ${result.type === 'TASK' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                    ${result.type === 'ENCYCLOPEDIA' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                  `}>
                    {result.type === 'PLANT' && <MdLocalFlorist size={20} />}
                    {result.type === 'TASK' && <MdTaskAlt size={20} />}
                    {result.type === 'ENCYCLOPEDIA' && <MdBook size={20} />}
                  </div>
                  <div>
                    <h4 className="font-medium text-text-main dark:text-text-inverse">
                      {result.type === 'PLANT' ? (result.data as Plant).name : ''}
                      {result.type === 'TASK' ? `Task: ${(result.data as Task).type}` : ''}
                      {result.type === 'ENCYCLOPEDIA' ? (result.data as Plant).scientificName : ''}
                    </h4>
                    <p className="text-xs text-text-muted truncate">
                       {result.type === 'PLANT' && (result.data as Plant).room}
                       {result.type === 'TASK' && (result.data as Task).note || (result.data as Task).type}
                       {result.type === 'ENCYCLOPEDIA' && "Encyclopedia Entry"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="p-8 text-center text-text-muted">No results found for &quot;{query}&quot;</div>
          ) : (
             <div className="p-8 text-center text-text-muted text-sm">
                Type something to search across your jungle.
             </div>
          )}
        </div>
        
        <div className="bg-[#fcfbf9] dark:bg-[#2a3434] px-4 py-2 border-t border-[#e6f4f2] dark:border-[#354545] text-[10px] text-text-muted flex justify-between">
           <span>Navigate with arrows</span>
           <span>Press Enter to select</span>
        </div>
      </div>
    </div>
  );
}
