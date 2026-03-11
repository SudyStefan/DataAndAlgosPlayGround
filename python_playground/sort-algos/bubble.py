def sort(list_to_sort: list[int]) -> list[int]:
  sorted_count = 1
  while sorted_count != len(list_to_sort):
    swapped = False
    for i in range(0, len(list_to_sort) - sorted_count):
      if list_to_sort[i] > list_to_sort[i+1]:
        list_to_sort[i], list_to_sort[i+1] = list_to_sort[i+1], list_to_sort[i]
        swapped = True
    if not swapped:
      break
    sorted_count += 1
  
  return list_to_sort