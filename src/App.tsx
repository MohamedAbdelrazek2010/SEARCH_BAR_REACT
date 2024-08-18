import { useEffect, useRef, useState, useMemo } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const inputRef = useRef();
  const search = useRef();

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return item.toLowerCase().includes(query.toLowerCase());
    });
  }, [items, query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: HTMLFormElement) => {
    e.preventDefault();
    const value = inputRef.current.value;
    if (value == "") return;
    setItems((prev) => {
      return [...prev, value];
    });

    inputRef.current.value = "";
  };

  const reset = () => {
    setItems([])
    setQuery("")
  }

  return (
    <main className="App">
      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          ref={search}
          placeholder="Search for an item"
        />
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          style={{ outline: "none" }}
          placeholder="enter an item"
          ref={inputRef}
        />
        <button type="submit">Add</button>
        <button type="reset" onClick={reset}>
          Reset
        </button>
        {filteredItems.map((item, id) => {
          return <li key={id}>{item}</li>;
        })}
      </form>
    </main>
  );
}

export default App;
