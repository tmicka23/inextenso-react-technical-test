import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([
    { label: "item1", checked: false },
    { label: "item2", checked: true },
    { label: "item3", checked: false },
    { label: "item4", checked: false },
    { label: "item5", checked: true },
  ]);

  const [allChecked, setAllChecked] = useState(false);

  /**
   * @function handleChange
   * @param {import("react").SyntheticEvent} e
   * @description
   * Modifies the "checked" value individually of each checkbox according to the "onChange" event listener.
   *
   * if all checkboxes are checked, then update the state "allChecked" to true
   *
   * if at least one checkbox is not checked, then update the state "allChecked" to false
   */
  const handleChange = (e) => {
    const value = e.target.id;
    const newItems = items.map((i) => {
      if (i.label === value) {
        return { ...i, checked: !i.checked };
      } else {
        return i;
      }
    });

    if (newItems.filter((i) => i.checked).length < newItems.length) {
      setAllChecked(false);
    }
    if (newItems.filter((i) => i.checked).length === newItems.length) {
      setAllChecked(true);
    }
    setItems(newItems);
  };

  /**
   * @function handleAllChecked
   * @param {import("react").SyntheticEvent} e
   * @description
   * Modifies the state of the checkbox which manages the selection / deselection of all the checkboxes in the list
   *
   * then iterates over the list of checkboxes and modifies the "checked" value of all the checkboxes in the list according to the event
   */
  const handleAllChecked = (e) => {
    const { checked } = e.target;

    const newItems = items.map((i) => ({ ...i, checked }));

    setAllChecked(!allChecked);
    setItems(newItems);
  };

  return (
    <div className="App">
      <h1>CheckBox</h1>
      <label htmlFor="allItems">
        {allChecked ? "Deselect all" : "Select all"}
      </label>
      <input
        type="checkbox"
        checked={allChecked}
        onChange={handleAllChecked}
        id="allItems"
      />

      <ul>
        {items?.map((item, index) => (
          <li key={`${item?.label}-${index}`}>
            <label htmlFor={item?.label}>{item?.label}</label>
            <input
              type="checkbox"
              id={item?.label}
              checked={item?.checked}
              onChange={handleChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
