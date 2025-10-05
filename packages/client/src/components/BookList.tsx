
import { Suspense } from "react";
import { useGetBooksSuspenseQuery } from "../graphql/books.generated";
import { useToggleFavoriteMutation } from "../graphql/toggleFavorite.generated";
import { BookFilter } from "../graphql/types";

type Props = {
	filter: BookFilter;
}

function BookListContent({ filter }: Props) {
	const { data } = useGetBooksSuspenseQuery({
		variables: { filter },
	});
	const [toggleFavorite] = useToggleFavoriteMutation();

	const handleToggleFavorite = async (id: string) => {
		const book = data?.books.find((b) => b.id === id);
		if (!book) return;

		await toggleFavorite({
			variables: { id },
			optimisticResponse: {
				toggleFavorite: {
					__typename: "Book",
					id,
					title: book.title,
					author: book.author,
					createdAt: book.createdAt,
					isFavorite: !book.isFavorite,
				},
			},
		});
	};

	return (
		<div className="book-list">
			{data?.books.map((book) => (
				<div key={book.id} className="book-item">
					<div className="book-info">
						<h3>{book.title}</h3>
						<p>{book.author}</p>
					</div>
					<button onClick={() => handleToggleFavorite(book.id)}>
						{book.isFavorite ? "★" : "☆"}
					</button>
				</div>
			))}
		</div>
	);
}

function BookListSkeleton() {
	return (
		<div className="book-list-skeleton">
			{[1, 2, 3].map((i) => (
				<div key={i} className="skeleton-item">
					<div className="skeleton-title"></div>
					<div className="skeleton-author"></div>
				</div>
			))}
		</div>
	);
}

export function BookList({ filter }: Props) {
	return (
		<Suspense fallback={<BookListSkeleton />}>
			<BookListContent filter={filter} />
		</Suspense>
	);
}