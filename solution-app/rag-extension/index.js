async function getRecommendations() {
  const titleQuery = document.getElementById('query-input').value;
  const language = document.querySelector('input[name="language"]:checked').value;

  // Add loading message
  const placeholderElement = document.getElementById('no-results-message');
  placeholderElement.innerText = 'Getting recommendations...';

  recommendations = [];

  try {
    // Need to encode title query as special characters like spacing is possible
    const encodedTitleQuery = encodeURIComponent(titleQuery);
    
    const response = await fetch(
      `http://localhost:3000/recommendations?query=${encodedTitleQuery}&language=${language}`
    );

    recommendations = await response.json();

    const featuredFilmElement = document.getElementById('review-content');
    featuredFilmElement.innerText = recommendations.featuredReview;

    const resultsElement = document.getElementById('results-container');
    resultsElement.innerHTML = '<h2>Recommendations</h2>' + recommendations.movies.map((movie) => {
        return `<div class="movie-container">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-metadata">
                        <span>${movie.vote_average}/10</span>
                        <span>${movie.original_language.toUpperCase()}</span>
                    </div>
                    <p class="movie-overview">${movie.overview}</p>
                </div>`;
    });

  } catch (error) {
    console.log('Unable to get recommendations');
    placeholderElement.innerText = 'No recommendations available';
  } 
}
