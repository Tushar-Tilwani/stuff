/*
'''
True Summits

While on a hike, you are standing on the trail, looking up a peak, and wondering if it is the top of the mountain: the true summit. But the highest point is not always in view. It may be obscured by a false summit, a position that is lower than the true summit but stands in the way and obscures the highest point from view. For example:

                              /
            / \             /
          /     \ _ _ _ _ /
        /
    _ /
X /
0 1 1 2 3 4 5 4 3 3 3 3 3 4 5 6 - elevations

In this case, the person standing at the X is looking up at a peak 6 units away that is 5 units high. So even though there is a higher peak further back, it can't be seen because a false summit is in the line of site. So for input [0, 1, 1, 2, 3, 4, 5, 4, 3, 3, 3, 3, 3, 4, 5, 6], the result should be false; you cannot see the true summit, because there is another point in the way, blocking the view.

                    | \
                    |   \
                    |     \
                    |       _ _
                    |
                    |
                    |
            / \     |
          /     \ _ |
        /
    _ /
X /
0 1 1 2 3 4 5 4 3 3 11 10 9 8 7 7 - elevations

The input [0, 1, 1, 2, 3, 4, 5, 4, 3, 3, 11, 10, 9, 8, 7, 7] will return true because the true summit is tall enough to be seen above everything in the foreground. However, if the value 11 is instead a 9, the true summit will be obscured by the value 1 at the second index. The value 1 then becomes a false summit!

We can think about this from an urban perspective also! Imagine you are standing on a sidewalk somewhere in Manhattan. As you look around you, can you see the top of the tallest building on the island, One World Trade Center? From some positions, it is visible, but from most, it is not. Shorter buildings are standing in the way: Consider this situation where one building obscures a taller one behind it:

                  |
                  |
             |    |
             |    |
             |    |
             |    |
             |    |
             |    |
             |    |
          X  |    |
  Height: 0  8  0  10
Position: 0  1  2  3  4  5  6

The function takes an array of elevations. The first elevation (at index 0) will be zero and is the position of the viewer. From there, the elevations at each position will potentially change and indicate the elevation at that point relative to the viewpoint. Return true if the highest visible point is the true summit.

* For a visualization of the 3 examples, please view the Verbal Explanation spoiler section
 

EXAMPLE(S)
canSeeTrueSummit([0, 1, 2, 3, 4, 5]) == true
canSeeTrueSummit([0, 2, 3]) == false
canSeeTrueSummit([0, 1, 1, 2, 3, 4, 5, 4, 3, 3, 9, 9, 9, 8, 7, 7]) == false
canSeeTrueSummit([0, 1, 1, 2, 3, 4, 5, 4, 3, 3, 11, 10, 9, 8, 7, 7]) == true
canSeeTrueSummit([0, 1, 1, 2, 3, 4, 5, 4, 3, 3, 9, 11, 9, 8, 7, 7]) == false


    | 
x. |

FUNCTION SIGNATURE
function canSeeTrueSummit(elevations)
'''

0 1 2 3 4
0 2 3

0, 1, 2, 3, 4, 5, 6, 7


2 - 0 = 2
3 - 2 = 1

5 - 0 = 5
9 - 5 = 4

5 - 0 = 5
11 - 5 = 6 because this diff is bigger than the local maxima, return true

you are maintaining a sightline as long as the list is ascending 

*/

// loop through and determine the local maxmium
// when we see a "dip" we set the minimum to the one before the dip

// for (let i = 0; )

// const canSeeTrueSummit = (range: number[]) => {

//   let minimum = 0
//   let maximum = 0

//   for (let i = 0; i < range.length; i++) {
//     const curr = range[i];
//     const next = range[i + 1];
//     if (curr < next) { // what about equals
//       maximum = next
//       minimum = curr
//     } else {
//       minimum = curr
//     }
//   }
// }


// ([0, 1, 1, 2, 3, 4, 5, 4, 3, 3, 11, 10, 9, 8, 7, 7]) 


// 0 10 -> 15
/// 0 -> 10
// 15

// 15/10
// 1.5

// 0 - 0
// 1 - 1.5
// 2 - 3 // 5


function canSeeTrueSummit(arr) {

  const maxValue = Math.max(...arr);
  const maxValueIndex = arr.findIndex((val) => val === maxValue);
  const stepheight = maxValue / (maxValueIndex);
  // console.log({ stepheight, maxValue, maxValueIndex });
  for (let i = 1; i < maxValueIndex; i++) {
    if ((stepheight * i) < arr[i]) {
      return false;
    }
  }
  return true;
}




console.log(canSeeTrueSummit([0, 1, 2, 3, 4, 5]) == true)

console.log(canSeeTrueSummit([0, 2, 3]) == false)

console.log(canSeeTrueSummit([0, 1, 1, 2, 3, 4, 5, 4, 3, 3, 9, 9, 9, 8, 7, 7]) == false)

console.log(canSeeTrueSummit([0, 1, 1, 2, 3, 4, 5, 4, 3, 3, 11, 10, 9, 8, 7, 7]) == true)

