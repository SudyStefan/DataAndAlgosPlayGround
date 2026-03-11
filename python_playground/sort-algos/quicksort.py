def partition(list_to_sort: list[int], low: int, high: int):
    pivot = list_to_sort[high]
    i = low - 1
    for j in range(low, high):
        if list_to_sort[j] < pivot:
            i += 1
            swap(list_to_sort, i, j)
    swap(list_to_sort, i + 1, high)
    return i + 1


def swap(list_to_sort: list[int], i: int, j: int):
    list_to_sort[i], list_to_sort[j] = list_to_sort[j], list_to_sort[i]


def quickSort(list_to_sort: list[int], low: int, high: int):
    if low < high:
        partition_index = partition(list_to_sort, low, high)

        quickSort(list_to_sort, low, partition_index - 1)
        quickSort(list_to_sort, partition_index + 1, high)


def sort(list_to_sort: list[int]) -> list[int]:
    quickSort(list_to_sort, 0, len(list_to_sort) - 1)
    return list_to_sort
