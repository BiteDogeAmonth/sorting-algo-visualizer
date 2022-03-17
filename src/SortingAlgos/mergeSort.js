export function getMergeAni(nums) {
    const ani = [];
    mergeSort(nums, 0, nums.length - 1, ani);
    console.log(nums);
    return ani;
}


export function getBubbleAni(nums) {
    const ani = [];
    bubbleSort(nums, ani);
    console.log(nums);
    return ani;
}






function mergeSort(nums, beg, end, ani) {
    if (beg >= end) {
        return;
    }
    let mid = Math.floor((beg + end) / 2);

    mergeSort(nums, beg, mid, ani);
    mergeSort(nums, mid+1, end, ani);

    let i = beg;
    let j = mid + 1;

    while (i <= mid && j <= end) {
        if (nums[i] <= nums[j]) {
            i++;
        } else {
            let index = j;
            let val = nums[j];
            while (index > i) {
                nums[index] = nums[index-1];
                ani.push([index, index-1]);
                index--;
            }
            nums[i] = val;
            i++;
            j++;
            mid++;
        }
    }
    return;
}

function bubbleSort(nums, ani) {
    for (let i = 0; i < nums.length; i++) {

        for (let j = 0; j < nums.length-i-1; j++) {
            if (nums[j] > nums[j+1]) {
                const num1 = nums[j];
                const num2 = nums[j+1];
                nums[j+1] = num1;
                nums[j] = num2;
                ani.push([j, j+1]);
            }
        }
    }






}