import React, { useEffect, useState } from "react";
import { SigmaContainer, ZoomControl, FullScreenControl } from "react-sigma-v2";
import { GraphDataController } from "./GraphDataController";
import { SearchField } from "./SearchField";
import "react-sigma-v2/lib/react-sigma-v2.css";
import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";
import { BiRadioCircleMarked, BiBookContent } from "react-icons/bi";
import { BsArrowsFullscreen, BsFullscreenExit, BsZoomIn, BsZoomOut } from "react-icons/bs";

const AutosysGraph = () => {
    const [dataset, setDataset] = useState(null);
    const [dataReady, setDataReady] = useState(false);
    const [hoverednode, setHoveredNode] = useState(null);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/dataset.json`)
            .then((res) => res.json())
            .then((dataset) => {
                setDataset(dataset);
                requestAnimationFrame(() => setDataReady(true));
            });
    }
    ,[]);

    if (!dataset) return null;

    return (

        <div id="app-root" className="show-contents">
            <SigmaContainer
                style={{ height: "800px", width: "150px" }}
                graphOptions={{ type: "directed" }}
                initialSettings= {{

                    nodeProgramClasses: { image: getNodeProgramImage() },
                    defaultEdgeType: "arrow",
                    labelDensity: 0.07,
                    labelGridCellSize:60,
                    labelRenderedSizeThreshold: 15,
                    labelFont: "Lato, sans-serif",
                    labelSize: 8,
                    zIndex: true


                }}
                className="react-sigma"
                
            >
                <GraphDataController dataset={dataset} />
                {
                    dataReady && (
                        <>
                            <div className="controls">
                                <FullScreenControl
                                    className="ico"
                                    customEnterFullScreen={<BsArrowsFullscreen/>}
                                    customExitFullScreen={< BsFullscreenExit/>}

                                />
                                <ZoomControl
                                    className="ico"
                                    customZoomIn={<BsZoomIn/>}
                                    customZoomOut={<BsZoomOut/>}
                                    customZoomCenter={< BiRadioCircleMarked />}
                                />
                            
                            </div>

                            <div className="contents">
                                <div className="panels">
                                    <SearchField />
                                </div>
                            </div>
                        </>

                    );
                }

            </SigmaContainer>
        </div>
    );
};

export default AutosysGraph;