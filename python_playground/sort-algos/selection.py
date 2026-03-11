def sort(list_to_sort: list[int]) -> list[int]:
    for i in range(0, len(list_to_sort) - 1):
        min_index = i
        for k in range(i + 1, len(list_to_sort)):
            if list_to_sort[k] < list_to_sort[min_index]:
                min_index = k
        if min_index != i:
            list_to_sort[i], list_to_sort[min_index] = list_to_sort[min_index], list_to_sort[i]
    return list_to_sort
