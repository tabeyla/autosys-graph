import React, { KeyboardEvent, ChangeEvent, useEffect, useState } from "react";
import { useSigma } from "react-sigma-v2";
import { BsSearch } from "react-icons/bs";

const GraphDataController = ({ dataset, children }) => {
    const sigma = useSigma();
    const graph = sigma.getGraph()

    useEffect(() => {
        if(!graph || !dataset)
            return;
    
    dataset.nodes.forEach((node) => 
        graph.addNode(node.key, {
            ...node,
        }),
    
    );

    dataset.edges.forEach((source, target) => graph.addEdge(source, target, { size: 1}));

    return () => graph.clear();

    }, [graph, dataset]);
    
    return (
        <> {children} </>
    );
}

export default GraphDataController;