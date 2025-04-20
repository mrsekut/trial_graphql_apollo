import { useState } from 'react';
import { useGetBooksQuery, useAddBookMutation } from './graphql/types';
import { useQuery } from '@apollo/client';
// import { GET_IS_LOGGED_IN } from './graphql/isLoggedIn';
import { isLoggedInVar } from './state/auth';

function App() {
  const { data, loading, error, refetch } = useGetBooksQuery();
  const [addBook] = useAddBookMutation();
  // const { data: authData } = useQuery(GET_IS_LOGGED_IN);

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

      <div>
        {/* <p>Login Status: {authData?.isLoggedIn ? 'Logged In' : 'Logged Out'}</p> */}
        <button onClick={() => isLoggedInVar(!isLoggedInVar())}>
          Toggle Login State
        </button>
      </div>

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
