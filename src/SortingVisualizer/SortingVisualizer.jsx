import React from "react";
import "./SortingVisualizer.css"
import { getAnimations } from "../SortingAlgos/mergeSort";

export class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                nums: Array(50).fill(0)
            }],
            step: 0,
            disVal: false,
            animations: [[0, 1], [2, 3], [4, 5]],
        }
    }

    resetArray() {
        const array = Array(50).fill(0);
        for (let i = 0; i < 50; i++) {
            array[i] = randomIntFromInterval(5, 500);
        }

        this.setState({
            history: [{nums:array}],
            step: 0,
        });
    }

    display() {
        if (!this.state.disVal) {
            for (let i = 0; i < 50; i++) {
                document.getElementById("bar" + i).style.visibility="visible";
            }
            this.setState({disVal:true});
        } else {
            for (let i = 0; i < 50; i++) {
                document.getElementById("bar" + i).style.visibility="hidden";
            }
            this.setState({disVal:false});
        }
    }

    mergeSortHelper(i, j) {
        const history = this.state.history.slice();
        const step = this.state.step;
        var nums = history[step].nums.slice();
        const num1 = nums[i];
        const num2 = nums[j];
        nums[i] = num2;
        nums[j] = num1;
        this.setState({
            history: history.concat({nums:nums}),
            step: step + 1, 
        });
    }

    mergeSort(ani) {
        const bar1 = document.getElementById("longbar" + ani[0]);
        const val1 = document.getElementById("bar" + ani[0]);
        const bar2 = document.getElementById("longbar" + ani[1]);
        const val2 = document.getElementById("bar" + ani[1]);
        bar1.style.backgroundColor = "red";
        bar2.style.backgroundColor = "red";
        setTimeout(() => {
            const num1 = val1.innerHTML;
            const num2 = val2.innerHTML;
            val2.innerHTML = num1;
            val1.innerHTML = num2;
            bar1.style.height = num2 + "px";
            bar2.style.height = num1 + "px";
            bar1.style.backgroundColor = "blue";
            bar2.style.backgroundColor = "blue";
        }, 150);
    
    
    }
    
    getMergeSortAni() {
        let arr = this.state.history[this.state.step].nums.slice();
        const steps = getAnimations(arr);
        return steps;
    }
    
    autoClick() {
        const steps = this.getMergeSortAni();
        for (let i = 0; i < steps.length; i++) {
            const ani = steps[i].slice();
            const bar1 = document.getElementById("longbar" + ani[0]);
            const val1 = document.getElementById("bar" + ani[0]);
            const bar2 = document.getElementById("longbar" + ani[1]);
            const val2 = document.getElementById("bar" + ani[1]);
            setTimeout(() => {
                const num1 = val1.innerHTML;
                const num2 = val2.innerHTML;
                val2.innerHTML = num1;
                val1.innerHTML = num2;
                bar1.style.height = num2 + "px";
                bar2.style.height = num1 + "px";
            }, (i+1) * 100);
        }
    }

    handleClick(i) {
        const curr = this.state.history[this.state.step].nums.slice();
        document.getElementById("bar" + i).setAttribute("value", `${curr[i]}`);


    }





    //TODO: create a new class called array bar, and add handclick function to it
    //so each time click on the bar the value of this bar will appear
    render() {
        const current = this.state.history[this.state.step];
        const arr = current.nums.slice();
        return (
            <div>
                <button onClick={()=>this.resetArray()}> {"generate array"} </button>
                <button onClick={()=>this.display()}>{"display value"}</button>
                <button onClick={()=>this.getMergeSortAni()}> {"merge-sort"} </button>
                <button onClick={()=>this.autoClick()}>{"auto"}</button>
                <div className="arr-container">
                    {arr.map((value, idx) => (<Bar value={value} key={idx} id={"bar" + idx} onClick={()=>this.handleClick(idx)}></Bar>))}
                </div>
            </div>
        );
    }
}


function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Bar(props) {

    return (
            <div className="arr-bar">
            <div id={props.id} style={{visibility:"hidden"}}>{props.value}</div>
            <button  
                    value={props.value} 
                    onClick={()=>props.onClick()}
                    id = {"long" + props.id} 
                    style={{height: `${props.value}px`, backgroundColor:"blue"}}>
                    
            </button>
            </div>
            );
}

