# Selection Sort
 * Decrease and conquer: Do a linear scan of full array and find the minimum and put it on top
 * Now a do a linear scan of 1 to n and find the minimum element and put it on index: 1
 * Continue like that

# Insertion Sort
 * Decrease and conquer: Start with element array. That will be always sorted.
 * Now Increase the number of elements to 2. Assumption is n-1 element array is always sorted.
 * In this case it will be a 2-1 that is an one element array which is always sorted.
 * Generalize to n elements. If n-1 is sorted we can do a linear scan from end.
 * If value[n] is smaller than value[n-1] we shift n-1 to and keep on scanning
 * The moment we value[n] is greater tha value[n-k] k being between n-1 to 0.
 * We know that we need to push our element at n-k+1

 Example:
 Input: [2,6,1] temp=1 Assume we at index 2 value is 1
 0 [2,6,6] temp=1
 1 [2,2,6] temp=1
 2 [1,2,6] temp=null

* Insertion is intresting because if array is sorted the time complexity is O(n)
* It is great to sort arrays which are almost sorted.

