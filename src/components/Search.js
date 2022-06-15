import axios from "axios";
import { useEffect, useState } from "react";
import "./styles/App.css";

function Search() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [initialList, setInitialList] = useState([]);
  const [search, setSearch] = useState("");
  const [fullName, setFullName] = useState(
    localStorage.getItem("UserFirstName") +
      " " +
      localStorage.getItem("UserLastName")
  );
  const handleSearch = ({ target }) => {
    setSearch(target.value);
    if (!target.value) {
      setItems(initialList);
      return;
    }
    const lowerSeach = target.value.toLowerCase();
    const filter = items.filter(({ lastName }) =>
      lastName.toLowerCase().includes(lowerSeach)
    );
    setItems(filter);
  };
  async function load() {
    fetch("http://localhost:3001/user")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setInitialList(result);
        },
        (error) => {
          setIsLoaded(false);
          setError(error);
        }
      );
  }

  useEffect(() => {
    load();
  }, []);

  const styles = {
    search: {
      marginTop: 300,
    },
    text: {
      color: "black",
    },
  };

  return (
    <>
      {error && <div>Error: {error.message}</div>}
      {!isLoaded && <div>Loading...</div>}
      {items.length > 0 && (
        <div className="wrapper">
          <div className={styles.search}>
            <input
              placeholder="Search..."
              className="search-t"
              type="text"
              name="search"
              value={search}
              onChange={handleSearch}
              
            />
          </div>
          <ul className="card-grid">
            {items.map((item) => (
              <li className={styles.text} key={item.lastName}>
                <article className="card">
                  {/* <div className="card-image">
                    <img src={item.flags.png} alt={item.name.common} />
                  </div> */}
                  <div className="card-content">
                    <h2 className="text">{item.firstName} {item.lastName}</h2>
                    <ol className="card-list">
                      <li>
                        population: <span className="text">{item.email}</span>
                      </li>
                      <li>
                        Region: <span className="text">{item.firstName}</span>
                      </li>
                      <li className={styles.text}>
                        Capital: <span className="text">{item.address}</span>
                      </li>
                    </ol>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Search;
