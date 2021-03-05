import React, { useEffect, useState } from "react";

function App() {
  // start checkboxes
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
  // end checkoxes

  const [users, setUsers] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const defaultMessage = "please enter a github username in the previous field";
  const [message, setMessage] = useState(defaultMessage);

  /**
   * @function fetchUsers
   * @param {String} term
   * @description
   * fetch 20 first results of github search APi (users)
   *
   * if the request limit is reached, we display a message to user and we set "users" state at null
   *
   * if an error has occured, we display a message to user and we set "users" state at null
   */
  const fetchUsers = (term) => {
    if (term && term.length >= 3) {
      window
        .fetch(
          `https://api.github.com/search/users?q=${term}&page=1&per_page=20`
        )
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              setUsers(data.items);
              setMessage(defaultMessage);
            });
          } else if (response.status === 403) {
            setUsers(null);
            setMessage("you have reached the limit of 10 searches per minute");
          }
        })
        .catch((error) => {
          setUsers(null);
          setMessage(
            "an error has occured, please try again. if problem persist, contact us"
          );
          console.warn(error);
        });
    }
  };

  /**
   * @function handleSearch
   * @param {import("react").SyntheticEvent} e
   * @description
   * Updates the "searchTerm" state according to the onChange event listener of the search field
   */

  const handleSearch = async (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  useEffect(() => {
    fetchUsers(searchTerm);
    // eslint-disable-next-line
  }, [searchTerm]);

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
      <hr />
      <h1>Github API</h1>

      <input
        type="text"
        placeholder="search github users"
        onChange={handleSearch}
        value={searchTerm}
      />
      <ul>
        {!users ? (
          <li>{message}</li>
        ) : (
          users.map((u) => {
            return (
              <li key={u.id}>
                <a
                  href={`https://github.com/${u.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {u.login}
                </a>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default App;
