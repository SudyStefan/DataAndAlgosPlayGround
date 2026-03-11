def sort(list_to_sort: list[int]) -> list[int]:
    for i in range(1, len(list_to_sort)):
        key = list_to_sort[i]
        j = i - 1
        while j >= 0:
            if list_to_sort[j] > key:
                list_to_sort[j + 1] = list_to_sort[j]
                j -= 1
            else:
                break
        list_to_sort[j + 1] = key

    return list_to_sort
