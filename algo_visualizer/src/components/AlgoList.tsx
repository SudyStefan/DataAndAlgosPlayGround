import { useDroppable } from "@dnd-kit/core";
import type SortAlgorithm from "../algos/SortAlgorithm";
import AlgoItem from "./AlgoItem";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

export type AlgoListProps = {
  algos: SortAlgorithm[];
  listId: string;
  listTitle: string;
};

const AlgoList = ({ algos, listId, listTitle }: AlgoListProps) => {
  const { setNodeRef } = useDroppable({ id: listId });

  return (
    <div
      className="flex flex-col items-center basis-1/2 w-1/4"
      ref={setNodeRef}
    >
      <h1 className="w-full text-center text-slate-300 text-xl p-2 bg-stone-700 cursor-default">
        {listTitle}
      </h1>
      <SortableContext
        id={listId}
        items={algos.map((algo) => algo.name)}
        strategy={verticalListSortingStrategy}
      >
        {algos.map((algo) => (
          <AlgoItem
            key={algo.name}
            algo={algo}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default AlgoList;
