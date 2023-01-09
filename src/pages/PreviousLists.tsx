import React, { useState } from 'react';
import { Item } from '../types/item';
import { ListDisplay } from '../components/ListDisplay';
import { ItemList } from '../components/ItemList';

import '../styles/previouslists.css';

export default function PreviousLists(props: {
  dateMap: Map<number, Item[]>;
  setNewList: React.Dispatch<React.SetStateAction<Item[]>>;
  date: Date;
}) {
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const { dateMap, setNewList, date } = props;
  const dateList = [...dateMap.keys()]
    .sort((date1, date2) => date2.valueOf() - date1.valueOf());
  const selectedItems = dateMap.get(selectedDate);
  return (
    <div style={{ marginLeft: 10, width: '90%' }}>
      <p>
        Previous shopping lists(
        {dateMap.size}
        )
      </p>
      <div id="previous-lists-wrapper">
        <div>
          <ol id="previous-lists" className="list-group list-group-flush list-group-numbered">
            {dateList.map((thisDate) => (
              <ListDisplay
                date={thisDate}
                items={dateMap.get(thisDate) || []}
                key={thisDate}
                selected={thisDate === selectedDate}
                setSelectedDate={setSelectedDate}
                readOnly
              />
            ))}
          </ol>
        </div>
        {dateList.length !== 0 && <div className="sepline" />}
        <div id="previous-list-one">
          {
            (selectedDate !== 0 && selectedItems !== undefined) && (
            <ItemList
              list={selectedItems}
              copyList
              setNewList={setNewList}
              date={date}
            />
            )
          }
        </div>
      </div>
      <br />
    </div>
  );
}
