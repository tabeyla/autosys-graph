import React, { KeyboardEvent, ChangeEvent, useEffect, useState } from "react";
import { useSigma } from "react-sigma-v2";
import { BsSearch } from "react-icons/bs";

const SearchField = () => {

    const sigma = useSigma();
    const [search, setSearch] = useState("");
    const [values, setValues] = useState([]);
    const [selected, setSelected] = useState(null);

    const refreshValues = () => {
        const newValues = [];
        const lcSearch = search.toLowerCase();

        if(!selected && search.length >1) {
            sigma.getGraph().forEachNode((key, attributes) => {
                if(!attributes.hidden && attributes.label.toLowerCase().indexOf(lcSearch) === 0) {
                    newValues.push({id: key, label: attributes.label })
                }
                
            });
        }
        setValues(newValues);
    };

    useEffect(() => refreshValues(), [search]);

    useEffect(() => {
        if(!selected) return;

        sigma.getGraph().setNodeAttribute(selected, "highlighted", true);
        const nodeDisplayData = sigma.getNodeDisplayData(selected);

        if(nodeDisplayData) {
            sigma.getCamera().animate(
                { ...nodeDisplayData, ratio: 0.05}, { duration: 600 },
            );
        }

        return () => {
            sigma.getGraph().setNodeAttribute(selected, "highlighted", false);
        }

    }, [selected]);


    const onInputChange = (e) => {
        const searchString = e.target.value;
        const valueItem = values.find((value) => values.label === searchString);

        if(valueItem) {
            setSearch(valueItem.label);
            setValues([]);
        }
        else {
            setSelected(null);
            setSearch(searchString);
        }
    };

    const onKeyPress = (e) => {

        if(e.key === 'Enter' && values.length) {
            setSearch(values[0].label);
            setSelected(values[0].id);
        }
    };

    return (

        <div className="search-wrapper">
            <input
                type="search"
                placeholder="Search in nodes..."
                list="nodes"
                value={search}
                onChange={onInputChange}
                onKeyPress={onKeyPress}
            />
            <BsSearch className="icon" />
            <datalist id="nodes">
                {
                    values.map((value) => (
                        <option key={values.id} value={value.label} />
                    ))
                }
            </datalist>
        </div>
    );
};

export default SearchField;