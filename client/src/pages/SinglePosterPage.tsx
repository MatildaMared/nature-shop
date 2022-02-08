import React from "react";
import { useParams } from "react-router-dom";

function SinglePosterPage() {
	const { id } = useParams();

	return (
		<div>
			<p>Poster id {id}</p>
			<h1>Single Poster</h1>
		</div>
	);
}

export default SinglePosterPage;
