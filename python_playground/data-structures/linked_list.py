from __future__ import annotations


class ListNode:
    def __init__(
        self, value: int, prev: ListNode | None = None, next: ListNode | None = None
    ):
        self.value = value
        self.next = next
        self.prev = prev


class List:
    def __init__(self):
        self.anchor = ListNode(2)

    def getLast(self):
        current_index = self.anchor
        while current_index.next:
            current_index = current_index.next
        return current_index

    def push(self, value: int):
        last = self.getLast()
        last.next = ListNode(value, last)

    def pop(self):
        last = self.getLast()
        if last.prev:
            last.prev.next = None
        last.prev = None
