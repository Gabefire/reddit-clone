import { useContext, useEffect, useState } from "react";
import type { forumDataType } from "../forum/types/forumData";
import { TailSpin } from "react-loader-spinner";
import { ObjIcon } from "../shared/objIcon";
import { ThemeContext } from "../../../global-contexts/themeContext";
import type { user } from "../../auth/types/user";
import { Link } from "react-router-dom";

interface searchBoxType {
	displaySearchBox: boolean;
	searchBoxRef?: React.LegacyRef<HTMLDivElement>;
	searchTerm: string;
}

export default function SearchBox({
	displaySearchBox,
	searchBoxRef,
	searchTerm,
}: searchBoxType) {
	const [forums, setForums] = useState([] as forumDataType[]);
	const [loadingSearchResults, setLoadingSearchResults] = useState(true);
	const { enabled } = useContext(ThemeContext);

	useEffect(() => {
		// api call for search results fuzzy search
		const getForums = () => {
			const userOne: user = {
				displayName: "Gabe",
				id: "1",
				color: "blue",
			};
			const userTwo: user = {
				displayName: "Test",
				id: "2",
				color: "blue",
			};
			const forumOne: forumDataType = {
				color: "red",
				description: "test",
				title: "this is a test dasfdasdfasdfsadfasdfsadfasdfasdfas",
				following: true,
				owner: userOne,
			};
			const forumTwo: forumDataType = {
				color: "red",
				description: "test",
				title: "test1",
				following: true,
				owner: userTwo,
				file: "test",
			};
			let forums: forumDataType[];
			if (searchTerm === "") {
				forums = [];
			} else {
				forums = [forumOne, forumTwo];
			}
			setForums(forums);
			setLoadingSearchResults(false);
		};
		getForums();
	}, [searchTerm]);

	return (
		<>
			{displaySearchBox ? (
				<div className="pl-2 pb-2 flex flex-col" ref={searchBoxRef}>
					{loadingSearchResults ? (
						<div className="self-center flex flex-col m-5 h-full">
							<TailSpin
								height="20"
								width="20"
								color={enabled ? "white" : "black"}
								ariaLabel="tail spin loading"
								wrapperClass="load-search"
							/>
						</div>
					) : (
						<div className="w-full flex flex-col gap-2">
							{forums.length > 0 ? (
								forums.map((forum) => {
									return (
										<Link
											reloadDocument
											to={`/r/${forum.title}`}
											key={forum.title}
											className="flex gap-1 text-sm items-center"
										>
											<ObjIcon obj={forum} />
											<div className="truncate">{`r/${forum.title}`}</div>
										</Link>
									);
								})
							) : (
								<div className="no-results">No Results</div>
							)}
						</div>
					)}
				</div>
			) : undefined}
		</>
	);
}
