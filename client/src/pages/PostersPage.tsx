import React, { useState, useEffect } from "react";
import { Poster } from "../models/Poster";
import styled from "styled-components";
import PostersList from "../components/PostersList/PostersList";
import Heading from "../components/Heading/Heading";

interface Props {
	posters: Poster[] | null;
}

function PostersPage(props: Props) {
	const { posters } = props;
	const [filteredPosters, setFilteredPosters] = useState(posters);
	const [activeCategory, setActiveCategory] = useState("all");
	const [searchString, setSearchString] = useState("");
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

		setFilteredPosters(filtered);
	}, [activeCategory, posters, searchString]);

	return (
		<Wrapper>
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
			</Side>
			<section>
				<Heading>Our Posters</Heading>
				<PostersList posters={filteredPosters} />
			</section>
		</Wrapper>
	);
}

const Wrapper = styled.main`
	max-width: var(--max-width);
	margin: 0 auto;
	background-color: var(--color-white);
	height: 100%;
	padding: 4rem 2rem;
	display: grid;
	grid-template-columns: auto 1fr;
	min-height: 800px;
`;

const Search = styled.section`
	width: fit-content;
	margin: 0 auto;
	position: relative;
	margin-top: -1rem;
	margin-bottom: 1rem;

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
`;

const Categories = styled.div`
	margin-top: 2rem;
	position: relative;
	border: 1px solid var(--color-primary-lightest);
	border-radius: 4px;
	padding: 1.5rem 1rem 1rem 1rem;

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

		&.active,
		&:hover {
			font-weight: 600;
			border-bottom: 1px solid var(--color-primary-lightest);
		}
	}
`;

export default PostersPage;
