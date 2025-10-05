
import { useTransition } from "react";
import { BookFilter } from "../graphql/types";

type Props = {
	activeTab: BookFilter;
	onTabChange: (tab: BookFilter) => void;
}

export function TabBar({ activeTab, onTabChange }: Props) {
	const [isPending, startTransition] = useTransition();

	const tabs = [
		{ id: BookFilter.All, label: "すべて" },
		{ id: BookFilter.Recent, label: "最近追加" },
		{ id: BookFilter.Favorite, label: "お気に入り" },
	];

	const handleTabClick = (tab: BookFilter) => {
		startTransition(() => {
			onTabChange(tab);
		});
	};

	return (
		<div className="tab-bar">
			<div className="tabs">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						className={`tab ${activeTab === tab.id ? "active" : ""}`}
						onClick={() => handleTabClick(tab.id)}
						disabled={isPending}
					>
						{tab.label}
					</button>
				))}
			</div>
		</div>
	);
}