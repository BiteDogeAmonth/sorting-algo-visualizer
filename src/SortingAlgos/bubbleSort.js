export function getBubbleAni(nums) {
    const ani = [];
    bubbleSort(nums, ani);
    console.log(nums);
    return ani;
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