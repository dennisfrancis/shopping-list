import React from "react";
import { Item } from '../types/item';
import { ListDisplay  } from "../components/ListDisplay";
import { useState } from "react";

export function PreviousLists(props: {
    masterItems: Item[];
    dateMap: Map<number, Item[]>;
    runFetchEffect: boolean;
    setRunFetchEffect: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    let [selectedDate, setSelectedDate] = useState<number>(0);
    const dateList = [...props.dateMap.keys()].sort((date1, date2) => date2.valueOf() - date1.valueOf());
    return (
        <div>
            <div style={{margin: 10}}>
                <p>Previous shopping lists({props.dateMap.size})</p>
                <ol className="list-group list-group-numbered" style={{maxHeight: "80vh", maxWidth: 300, overflowY:"auto"}}>
                    { dateList.map(date =>
                        <ListDisplay date={date} items={props.dateMap.get(date) || []}
                            key={date} selected={date === selectedDate} setSelectedDate={setSelectedDate}/> )}
                </ol>
            </div>
        </div>
    );
}