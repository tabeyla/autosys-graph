import { SigmaContainer } from "@react-sigma/core";
import Graph from "graphology";
import data from "./data.json";
import "@react-sigma/core/lib/react-sigma.min.css";


const SigmaGraph = () => {
    const graph = new Graph();
    graph.import(data);
    const suggestions = ["a", "b", "c"];
    return (
       <div id="search">
        <input type="search" id="search-input" list="suggestions" placeholder="Search for a node..."></input>
        <datalist id="suggestions"></datalist>
        <div id="sigma-container">
            <SigmaContainer graphOptions={{ type: "directed"}} style={{ height: "800px", width: "1500px"}} graph={graph}/>
        </div>
       </div>
    );
   
};

export default SigmaGraph;