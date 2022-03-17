import React from "react";
import "./SortingVisualizer.css"
import { getMergeAni } from "../SortingAlgos/mergeSort";
import { getBubbleAni } from "../SortingAlgos/bubbleSort";

export class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                nums: Array(35).fill(0)
            }],
            step: 0,
            animations: [[0, 1], [2, 3], [4, 5]],
            sorted: false,
        }
    }

    resetArray() {
        const array = Array(35).fill(0);
        for (let i = 0; i < 35; i++) {
            array[i] = randomIntFromInterval(5, 500);
        }

        this.setState({
            history: [{nums:array}],
            step: 0,
            sorted: false,
        });
    }

    display() {

        for (let i = 0; i < 35; i++) {
            const val = document.getElementById("bar" + i);
            if (val.style.visibility === "hidden") {
                val.style.visibility = "visible";
            } else {
                val.style.visibility = "hidden";
            }
        }

    }


    mergeSort() {
        if (!this.state.sorted) {
            let arr = this.state.history[this.state.step].nums.slice();
            const steps = getMergeAni(arr);
            this.showAnimation(steps, 100);
        }
    }

    bubbleSort() {
        if (!this.state.sorted) {
            let arr = this.state.history[this.state.step].nums.slice();
            const steps = getBubbleAni(arr);
            this.showAnimation(steps, 40);
        }
    }




    showAnimation(steps, speed) {
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
            }, (i+1) * speed);
        }
        this.setState({sorted:true});
    }

    handleClick(i) {
        const bar = document.getElementById("longbar" + i);
        if (bar.style.backgroundColor==="blue") {
            bar.style.backgroundColor="red";
        } else {
            bar.style.backgroundColor="blue";
        }
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
                <button onClick={()=>this.mergeSort()}>{"merge-sort"}</button>
                <button onClick={()=>this.bubbleSort()}>{"bubble-sort"}</button>
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

