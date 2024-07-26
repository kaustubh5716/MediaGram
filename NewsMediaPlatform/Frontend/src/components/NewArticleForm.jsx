// ./src/components/NewArticleForm.js

import React, { useState } from 'react';

function NewArticleForm({ setAuther }) {
	const [formData, setFormData] = useState({
		title: '',
		author: '',
		content: '',
		category: ''
	});

	const handleChange = event => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			const response = await
				fetch('http://localhost:5000/api/articles', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				});

			if (!response.ok) {
				throw new Error('Failed to create article');
			}

			// Reset form data after successful submission
			setFormData({
				title: '',
				author: '',
				content: '',
				category: ''
			});

			alert("Article Added..")
			setAuther(false)

		} catch (error) {
			console.error('Error creating article:', error);
		}
	};

	return (
		<div> {/* Centered container */}
			<div className="form-container">
				<h2>Add New Article</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label >
							Title:
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleChange}
								className="form-input"
							/>
						</label>
					</div>
					<div className="form-group">
						<label>
							Author:
							<input
								type="text"
								name="author"
								value={formData.author}
								onChange={handleChange}
								className="form-input"
							/>
						</label>
					</div>
					<div className="form-group">
						<label>
							Content:
							<textarea
								name="content"
								value={formData.content}
								onChange={handleChange}
								className="form-textarea"
							/>
						</label>
					</div>
					<div className="form-group">
						<label>
							Category:
							<input
								type="text"
								name="category"
								value={formData.category}
								onChange={handleChange}
								className="form-input"
							/>
						</label>
					</div>
					<button type="submit"
						className="submit-button">
						Add Article
					</button>
				</form>
			</div>


		</div>
	);
}

export default NewArticleForm;
