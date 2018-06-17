import reddit from './redditAPI';
import moment from 'moment';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  // Get search term
  const searchTerm = searchInput.value;
  // Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // Get Time
  const time = document.querySelector('input[name="time"]:checked').value;
  // Get limit
  const searchLimit = document.getElementById('limit').value;
  // Check input
  if(searchTerm === ''){
    // Show Message
    showMessage('Please add a search term', 'alert-danger')
  }
  // Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy, time)
    .then(results => {
      console.log(results)
      let output = '<div class="card-columns">';
      results.forEach(post => {
        // Check for image
        const image = post.preview ? post.preview.images[0].source.url : 'https://i2-prod.mirror.co.uk/incoming/article4648052.ece/ALTERNATES/s810/Reddit-logo.jpg';

        output+= `
        <div class="card">
        <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateText(post.selftext, 100)}</p>
          <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
          <hr>
          <h6>Posted: ${moment.unix(post.created_utc).fromNow()}</h6>
          <a href="https://www.reddit.com/r/${post.permalink}" target="_blank"><span class="badge badge-primary">Comments</span></a>
          <a href="https://www.reddit.com/r/${post.subreddit}" target="_blank"><span class="badge badge-secondary">r/${post.subreddit}</span></a>
          <span class="badge badge-dark">Points: ${post.score}</span>
        </div>
      </div>
        `;
      });
      output+= '</div>';
      document.getElementById('results').innerHTML = output;
    });
});

// Show Message
function showMessage(message, className){
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add Text
  div.appendChild(document.createTextNode(message));
  // Get Parent Container
  const searchContainer = document.getElementById('search-container');
  // Get search
  const search = document.getElementById('search');

  // Insert the message. 
  searchContainer.insertBefore(div, search);
  // Timeout alert
  setTimeout(() => document.querySelector('.alert').remove(), 1000);
}

function truncateText(text, limit){
  const shortened = text.indexOf(' ', limit);
  if(shortened == -1) return text;
  return text.substring(0, shortened);
}