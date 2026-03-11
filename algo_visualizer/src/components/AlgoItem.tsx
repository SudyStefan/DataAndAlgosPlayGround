import type SortAlgorithm from "../algos/SortAlgorithm";
import { cn } from "../helpers/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type ListItemProps = { algo: SortAlgorithm };

const AlgoItem = ({ algo }: ListItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: algo.name });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "flex justify-center items-center px-4 py-2",
        "w-full border-b-2 border-teal-400 transition",
        "cursor-default hover:bg-stone-600 hover:cursor-grab",
        "active:cursor-grabbing active:opacity-25"
      )}
    >
      <span style={{ color: algo.chartColor }}>{algo.name}</span>
    </div>
  );
};

export default AlgoItem;
