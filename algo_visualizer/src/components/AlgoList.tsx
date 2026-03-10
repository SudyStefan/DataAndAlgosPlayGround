import { useDroppable } from "@dnd-kit/core";
import type SortAlgorithm from "../algos/SortAlgorithm";
import AlgoItem from "./AlgoItem";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export type AlgoListProps = {
  algos: SortAlgorithm[];
  listId: string;
  listTitle: string;
};

const AlgoList = ({ algos, listId, listTitle }: AlgoListProps) => {
  const { setNodeRef } = useDroppable({
    id: listId
  });

  return (
    <div ref={setNodeRef}>
      <h2 className="algoListHeader">{listTitle}</h2>
      <SortableContext id={listId} items={algos.map((algo) => algo.name)} strategy={verticalListSortingStrategy}>
        {algos.map((algo) => (
          <AlgoItem key={algo.name} algo={algo} />
        ))}
      </SortableContext>
    </div>
  );
};

export default AlgoList;
