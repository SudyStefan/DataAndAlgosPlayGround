import { useEffect, useState } from "react";
import AlgoList from "./AlgoList";
import type SortAlgorithm from "../algos/SortAlgorithm";
import Bubble from "../algos/bubble";
import Insertion from "../algos/insertion";
import Selection from "../algos/selection";
import Quick from "../algos/quick";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  defaultDropAnimationSideEffects
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import AlgoItem from "./AlgoItem";
import { runBenchmarks, type BenchmarkDataPoint } from "../algos/runner";
import PerformanceChart from "./PerformanceChart";
import Merge from "../algos/merge";
import { cn } from "../helpers/utils";

export const App = () => {
  const [availableAlgos, setAvailableAlgos] = useState<SortAlgorithm[]>([]);
  const [selectedAlgos, setSelectedAlgos] = useState<SortAlgorithm[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkDataPoint[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [maxN, setMaxN] = useState<number>(10000);
  const [intervals, setIntervals] = useState<number>(10);

  const activeItem = [...availableAlgos, ...selectedAlgos].find(
    (a) => a.name === activeId
  );

  useEffect(() => {
    setAvailableAlgos([
      new Bubble(),
      new Insertion(),
      new Selection(),
      new Quick(),
      new Merge()
    ]);
  }, []);

  const moveAllToSelected = () => {
    setSelectedAlgos((prev) => [...prev, ...availableAlgos]);
    setAvailableAlgos([]);
  };

  const moveAllToAvailable = () => {
    setAvailableAlgos((prev) => [...prev, ...selectedAlgos]);
    setSelectedAlgos([]);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer === overContainer) {
      if (activeContainer === "available") {
        setAvailableAlgos((items) => {
          const oldIndex = items.findIndex((i) => i.name === active.id);
          const newIndex = items.findIndex((i) => i.name === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      } else {
        setSelectedAlgos((items) => {
          const oldIndex = items.findIndex((i) => i.name === active.id);
          const newIndex = items.findIndex((i) => i.name === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
      return;
    }

    // Moving from Available -> Selected
    if (activeContainer === "available" && overContainer === "selected") {
      const itemToMove = availableAlgos.find((a) => a.name === active.id);
      if (!itemToMove) return;

      setAvailableAlgos((prev) => prev.filter((a) => a.name !== active.id));
      setSelectedAlgos((prev) => {
        const overIndex = prev.findIndex((i) => i.name === over.id);
        const next = [...prev];
        next.splice(overIndex >= 0 ? overIndex : next.length, 0, itemToMove);
        return next;
      });
    }

    // Moving from Selected -> Available
    else if (activeContainer === "selected" && overContainer === "available") {
      const itemToMove = selectedAlgos.find((a) => a.name === active.id);
      if (!itemToMove) return;

      setSelectedAlgos((prev) => prev.filter((a) => a.name !== active.id));
      setAvailableAlgos((prev) => {
        const overIndex = prev.findIndex((i) => i.name === over.id);
        const next = [...prev];
        next.splice(overIndex >= 0 ? overIndex : next.length, 0, itemToMove);
        return next;
      });
    }

    setActiveId(null);
  };

  const handleRunBenchmark = async () => {
    if (intervals <= 0 || maxN <= 0) {
      alert("Please enter values greater than zero.");
      return;
    }

    setIsCalculating(true);
    setBenchmarkData([]);

    // Pass the user-defined values into the runner
    await runBenchmarks(selectedAlgos, maxN, intervals, (newDataPoint) => {
      setBenchmarkData((prev) => [...prev, newDataPoint]);
    });

    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen w-full bg-stone-800">
      <div
        className={cn(
          "grid mx-auto p-6 grid-cols-1",
          benchmarkData.length > 0 ? "lg:grid-cols-3" : "",
          "justify-items-center items-center min-h-screen"
        )}
      >
        <div
          className={cn(
            "flex flex-col justify-center",
            "items-center max-w-90 w-full",
            benchmarkData.length > 0 ? "lg:col-span-1" : ""
          )}
        >
          <h1 className="mx-2 text-slate-400 font-bold text-6xl cursor-default">
            Algo Visualizer
          </h1>
          <button
            onClick={handleRunBenchmark}
            disabled={isCalculating || selectedAlgos.length === 0}
            className={cn(
              "bg-slate-700 w-full text-slate-300",
              "font-medium text-2xl rounded-sm",
              "py-2 my-2",
              "hover:bg-slate-600 hover:cursor-pointer"
            )}
          >
            {isCalculating ? "Calculating..." : "Run Benchmarks"}
          </button>
          <div className="flex w-full flex-col border-teal-400 border-2 rounded-l-sm">
            <div className="flex w-full text-slate-300 text-xl text-center">
              <label className="basis-1/4 min-w-1/4 m-2">Max N:</label>
              <input
                className="basis-3/4 min-w-0 text-center bg-stone-700 py-2"
                type="number"
                value={maxN}
                onChange={(e) => setMaxN(Number(e.target.value))}
              />
            </div>
            <div className="flex w-full text-slate-300 text-xl text-center">
              <label className="basis-1/4 min-w-1/4 m-2">Intervals:</label>
              <input
                className="basis-3/4 min-w-0 text-center bg-stone-700 py-2"
                type="number"
                value={intervals}
                onChange={(e) => setIntervals(Number(e.target.value))}
              />
            </div>
          </div>
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
          >
            <div
              className={cn(
                "flex w-full m-auto overflow-hidden",
                "border-teal-400 border-2 rounded-l-sm",
                "my-2"
              )}
            >
              <AlgoList
                algos={availableAlgos}
                listId="available"
                listTitle="Available"
              ></AlgoList>
              <div className="flex flex-col">
                <button
                  className={cn(
                    "h-1/2 text-6xl p-1 bg-stone-700 text-slate-500 font-extrabold",
                    "hover:bg-stone-600 hover:cursor-pointer"
                  )}
                  onClick={moveAllToSelected}
                >
                  {">"}
                </button>
                <button
                  className={cn(
                    "h-1/2 text-6xl p-1 bg-stone-700 text-slate-500 font-extrabold",
                    "hover:bg-stone-600 hover:cursor-pointer"
                  )}
                  onClick={moveAllToAvailable}
                >
                  {"<"}
                </button>
              </div>
              <AlgoList
                algos={selectedAlgos}
                listId="selected"
                listTitle="Selected"
              ></AlgoList>
            </div>

            <DragOverlay
              dropAnimation={{
                sideEffects: defaultDropAnimationSideEffects({
                  styles: { active: { opacity: "0.5" } }
                })
              }}
            >
              {activeItem ? <AlgoItem algo={activeItem} /> : null}
            </DragOverlay>
          </DndContext>
          <a
            className="text-slate-500"
            href="https://github.com/SudyStefan/DataAndAlgosPlayGround"
          >
            {">> GitHub Repo <<"}
          </a>
        </div>
        {benchmarkData.length > 0 && (
          <PerformanceChart
            algos={selectedAlgos}
            data={benchmarkData}
          />
        )}
      </div>
    </div>
  );
};
