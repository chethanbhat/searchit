const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  // Get search term
  const searchTerm = searchInput.value;
  // Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // Get limit
  const searchLimit = document.getElementById('limit').value;
  // Check input
  if(searchTerm === ''){
    // Show Message
    showMessage('Please add a search term', 'alert-danger')
  }
  // Clear input 
  searchInput.value = '';
  // Search Reddit
  
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