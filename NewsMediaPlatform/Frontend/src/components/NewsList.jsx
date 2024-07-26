// ./src/components/NewsList.js

import React, { useState, useEffect } from 'react';

function NewsList() {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		// Fetch articles from backend when component mounts
		fetch('http://localhost:5000/api/articles')
			.then(response => response.json())
			.then(data => setArticles(data))
			.catch(error =>
				console.error('Error fetching articles:', error));
	}, []);

	return (
		<div>
			<div className="App">
				<div class="container">
					{articles.map(article => (
						<div class="card">

							<div class="card__body">
								<span class="tag tag-green">
									{article.category}
								</span>
								<h4>{article.title}</h4>
								<p>{article.content}</p>
							</div>
							<div class="card__footer">
								<div class="user">
									<div class="user__info">
										<h5>{article.author}</h5>
										<small>{article.createdAt}</small>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

		</div>
	);
}

export default NewsList;
