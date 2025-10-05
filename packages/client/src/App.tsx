import { useState, useTransition } from 'react';
import { useAddBookMutation } from './graphql/addBook.generated';
import { GetBooksDocument } from './graphql/books.generated';
import { BookFilter } from './graphql/types';
import { TabBar } from './components/TabBar';
import { BookList } from './components/BookList';

function App() {
  const [activeTab, setActiveTab] = useState<BookFilter>(BookFilter.All);
  const [isPending, startTransition] = useTransition();
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
      refetchQueries: [
        { query: GetBooksDocument, variables: { filter: activeTab } },
        { query: GetBooksDocument, variables: { filter: BookFilter.Recent } }
      ],
    });

    setTitle('');
    setAuthor('');
  };

  const handleTabChange = (tab: BookFilter) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📚 Book Library</h1>

      <div style={{ marginBottom: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2>本を追加</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <input
            type="text"
            placeholder="著者"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            追加
          </button>
        </form>
      </div>

      <TabBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div style={{ opacity: isPending ? 0.6 : 1, transition: 'opacity 0.3s' }}>
        <BookList filter={activeTab} />
      </div>
    </div>
  );
}

export default App;