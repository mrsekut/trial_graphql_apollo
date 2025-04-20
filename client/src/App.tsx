import "./index.css";
import { useGetBooksQuery } from "./graphql/types";

export function App() {
  const { data, loading, error } = useGetBooksQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {data?.books.map((book) => (
          <li key={book.id}>
            {book.title} / {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
