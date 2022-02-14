import React, { useState, useEffect, useContext } from "react";
import { Poster } from "../models/Poster";
import styled from "styled-components";
import PostersList from "../components/PostersList/PostersList";
import { UserContext } from "../context/UserContext";
import Heading from "../components/Heading/Heading";
import {
	getFavorites,
	addToFavorites,
	removeFromFavorites,
} from "../services/localStorageService";

interface Props {
	posters: Poster[] | null;
}

function PostersPage(props: Props) {
	const [context, updateContext] = useContext(UserContext);
	const { posters } = props;
	const [filteredPosters, setFilteredPosters] = useState<Poster[] | null>(
		posters
	);
	const [activeCategory, setActiveCategory] = useState<string>("all");
	const [searchString, setSearchString] = useState<string>("");
	const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
	const categories = setCategories();

	function setCategories() {
		const arr: string[] = [];

		posters &&
			posters.forEach((poster) => {
				if (arr.includes(poster.category)) {
					return;
				} else {
					arr.push(poster.category);
				}
			});

		return arr;
	}

	function onFavoriteClick(id: string) {
		let newFavorites = [];
		const favorites = getFavorites();
		if (favorites?.includes(id)) {
			newFavorites = removeFromFavorites(id);
		} else {
			newFavorites = addToFavorites(id);
		}

		updateContext({
			favorites: newFavorites,
		});
	}

	useEffect(() => {
		setFilteredPosters(posters);
	}, [posters]);

	useEffect(() => {
		let filtered: Poster[] | [] = [];

		if (activeCategory === "all") {
			if (posters) {
				filtered = posters;
			}
		} else {
			if (posters) {
				filtered =
					posters &&
					posters.filter((poster) => poster.category === activeCategory);
			}
		}

		if (searchString.length > 0) {
			filtered =
				filtered &&
				filtered.filter((poster) =>
					poster.title.toLowerCase().includes(searchString.toLowerCase())
				);
		}

		if (showOnlyFavorites) {
			filtered =
				filtered &&
				filtered.filter((poster) => context.favorites?.includes(poster.id));
		}

		setFilteredPosters(filtered);
	}, [
		activeCategory,
		posters,
		searchString,
		context.favorites,
		showOnlyFavorites,
	]);

	return (
		<Wrapper>
			<Heading>Our Posters</Heading>
			<Grid>
				<Side>
					<Search>
						<label htmlFor="search">Search by title</label>
						<input
							name="search"
							type="text"
							value={searchString}
							onChange={(e) => setSearchString(e.target.value)}
						/>
					</Search>
					<Categories>
						<h3>Categories</h3>
						<ul>
							<li>
								<button
									className={activeCategory === "all" ? "active" : ""}
									onClick={() => setActiveCategory("all")}
								>
									Show all
								</button>
							</li>
							{categories &&
								categories.map((category) => (
									<li key={category}>
										<button
											className={activeCategory === category ? "active" : ""}
											onClick={() => setActiveCategory(category)}
										>
											{category.charAt(0).toUpperCase() + category.slice(1)}
										</button>
									</li>
								))}
						</ul>
					</Categories>
					<Favorites>
						<h3>Favorites</h3>
						<input
							type="checkbox"
							id="favorites"
							name="favorites"
							checked={showOnlyFavorites}
							onChange={() => setShowOnlyFavorites(!showOnlyFavorites)}
						/>
						<label htmlFor="favorites">Show only favorites</label>
					</Favorites>
				</Side>
				<section>
					<PostersList
						favorites={context.favorites}
						onFavoriteClick={onFavoriteClick}
						posters={filteredPosters}
					/>
				</section>
			</Grid>
		</Wrapper>
	);
}

const Wrapper = styled.main`
	max-width: var(--max-width);
	margin: 0 auto;
	background-color: var(--color-white);
	height: 100%;
	padding: 4rem 2rem;

	& > h2 {
		border-bottom: 1px solid var(--color-primary-lightest);
	}
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	min-height: 800px;

	@media (max-width: 650px) {
		grid-template-columns: 1fr;
	}
`;

const Search = styled.section`
	margin: 0 auto;
	position: relative;
	margin-top: -1rem;
	margin-bottom: 1rem;
	width: fit-content;
	min-width: 225px;

	& label {
		position: absolute;
		top: -10px;
		left: 16px;
		width: fit-content;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		padding: 2px;
		background-color: var(--color-white);
		color: var(--color-primary-dark);
	}

	& input {
		border-radius: 4px;
		font: inherit;
		padding: 16px;
		border: 1px solid var(--color-primary-lightest);
		background: transparent;
		outline: none;

		&:focus {
			border-color: var(--color-primary);
			border-width: 2px;
			padding: 15px;
		}
	}
`;

const Side = styled.section`
	padding-top: 4rem;

	@media (max-width: 650px) {
		padding: 2rem 0;
		border-bottom: 1px solid var(--color-primary-lightest);
	}
`;

const Categories = styled.div`
	margin: 0 auto;
	margin-top: 2rem;
	position: relative;
	border: 1px solid var(--color-primary-lightest);
	border-radius: 4px;
	padding: 1.5rem 1rem 1rem 1rem;
	width: fit-content;
	min-width: 225px;

	& h3 {
		position: absolute;
		top: -10px;
		left: 16px;
		width: fit-content;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		padding: 2px;
		background-color: var(--color-white);
		font-weight: 400;
	}

	& ul {
		list-style-type: none;
		padding: 0;
	}

	& li {
		margin-bottom: 0.5rem;

		&:last-of-type {
			margin-bottom: 0;
		}
	}

	& button {
		border: none;
		background: transparent;
		cursor: pointer;
		font-size: 0.9rem;
		border-bottom: 1px solid transparent;
		margin-left: 0;
		transition: all 0.3s;

		&.active,
		&:hover {
			margin-left: 0.5rem;
			font-weight: 600;
			border-bottom: 1px solid var(--color-primary-lightest);
		}
	}
`;

const Favorites = styled.div`
	margin: 0 auto;
	margin-top: 2rem;
	position: relative;
	border: 1px solid var(--color-primary-lightest);
	border-radius: 4px;
	padding: 1.25rem 1rem 0.75rem 1rem;
	position: relative;
	display: flex;
	align-items: center;
	width: fit-content;
	min-width: 225px;

	& h3 {
		position: absolute;
		top: -10px;
		left: 16px;
		width: fit-content;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		padding: 2px;
		background-color: var(--color-white);
		font-weight: 400;
	}

	& label {
		margin-left: 0.5rem;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.3s;
		padding: 4px;
		border-bottom: 1px solid transparent;

		&:hover {
			border-bottom: 1px solid var(--color-primary-lightest);
		}
	}

	& input {
		cursor: pointer;
	}
`;

export default PostersPage;
