import { useState } from 'react';
import { useAddBookMutation } from './graphql/addBook.generated';
import { useGetBooksQuery } from './graphql/books.generated';

function App() {
  const { data, loading, error, refetch } = useGetBooksQuery();
  const [addBook] = useAddBookMutation();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !author) return;

    await addBook({
      variables: {
        input: { title, author },
      },
    });
    await refetch();
    setTitle('');
    setAuthor('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Books</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>

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
