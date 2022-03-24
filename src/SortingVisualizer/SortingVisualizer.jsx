import React from "react";
import "./SortingVisualizer.css"
import { getMergeAni } from "../SortingAlgos/mergeSort";
import { getBubbleAni } from "../SortingAlgos/bubbleSort";
import Slider from '@mui/material/Slider';
import { Box, Button, ButtonGroup, SvgIcon, Typography } from '@mui/material';
import BarChart from "@mui/icons-material/BarChart";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import shadows from "@mui/material/styles/shadows";

let size = 20;
let show = false;

export class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                nums: Array(size).fill(0)
            }],
            step: 0,
            animations: [],
            sorted: false,
        }
    }

    resetArray() {
        const array = Array(size).fill(0);
        for (let i = 0; i < size; i++) {
            array[i] = randomIntFromInterval(5, 500);
            const existedBar = document.getElementById("bar" + i);
            if (existedBar) {
                existedBar.style.visibility = "hidden";
            }
        }

        this.setState({
            history: [{nums:array}],
            step: 0,
            sorted: false,
        });
    }

    display() {
        show ? show = false : show = true;
        for (let i = 0; i < size; i++) {
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
                <ButtonGroup variant="contained" aria-label="outlined primary button group" size="medium">
                    <Button startIcon={<BarChart/>} onClick={()=> {this.resetArray()}}> Generate New Array </Button>
                    <Button id="display-button" 
                        onClick={() => {this.display()}}
                        startIcon={show ? <VisibilityOffIcon/> : <VisibilityIcon/>}>
                        Show Element value </Button>
                    <Button startIcon={<PlayArrowIcon/>} onClick={()=>this.mergeSort()}>Demo MergeSort</Button>
                    <Button startIcon={<PlayArrowIcon/>} onClick={()=>this.bubbleSort()}>Demo BubbleSort</Button>
                </ButtonGroup>
                <Box>
                    <Typography id="input-slider" gutterBottom>
                        Array Size
                    </Typography>
                    <Slider min={20} max={50} sx={{width: 300}} aria-label="Size" 
                        valueLabelDisplay="auto" dots={true} 
                        marks={[20, 25, 30, 35, 40, 45, 50]} 
                        step={5} onChange={(_, value) => {size = value}}/>
                </Box>
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


const barStyle = {
    marginLeft:`${Math.floor(10 / size)}%`,
    marginRight:`${Math.floor(10 / size)}%`,
}

function Bar(props) {

    return (
            <div className="arr-bar" style={barStyle}>
            <div id={props.id} style={{visibility:"hidden", fontSize:"60%"}}>{props.value}</div>
            <Box    
                    value={props.value} 
                    id = {"long" + props.id} 
                    style={{height: `${props.value}px`, backgroundColor:"blue", width:`${25}px`}}>
                    
            </Box>
            </div>
            );
}


