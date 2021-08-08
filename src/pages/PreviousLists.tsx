import React from "react";
import { Item } from '../types/item';
import { ListDisplay  } from "../components/ListDisplay";
import { ItemList } from "../components/ItemList";
import { useState } from "react";

import "../styles/previouslists.css";

export function PreviousLists(props: {
    dateMap: Map<number, Item[]>;
}) {
    let [selectedDate, setSelectedDate] = useState<number>(0);
    const dateList = [...props.dateMap.keys()].sort((date1, date2) => date2.valueOf() - date1.valueOf());
    const selectedItems = props.dateMap.get(selectedDate);
    return (
        <div style={{marginLeft: 10, width: "90%"}}>
            <p>Previous shopping lists({props.dateMap.size})</p>
            <div id="previous-lists-wrapper">
                <div>
                    <ol id="previous-lists" className="list-group list-group-numbered">
                        { dateList.map(date =>
                            <ListDisplay date={date} items={props.dateMap.get(date) || []}
                                key={date} selected={date === selectedDate} setSelectedDate={setSelectedDate} readOnly={true}/> )}
                    </ol>
                </div>
                <div id="previous-list-one">
                    { (selectedDate !== 0 && selectedItems !== undefined) && <ItemList list={selectedItems} copyList={true}/> }
                </div>
            </div>
        </div>
    );
}