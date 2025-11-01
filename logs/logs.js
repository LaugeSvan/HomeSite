document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.github.com/repos/vilhelmfox/vfox/commits')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch commits from GitHub API');
            }
            return response.json();
        })
        .then(data => {
            const logsDiv = document.getElementById('logs');
            logsDiv.innerHTML = ''; // Clear the placeholder text

            if (data.length === 0) {
                logsDiv.innerHTML = '<p>No commits available.</p>';
                return;
            }

            const ul = document.createElement('ul');
            data.forEach((commit, index) => {
                const li = document.createElement('li');
                const date = new Date(commit.commit.author.date).toLocaleDateString();
                li.innerHTML = `<strong>${date}</strong>: ${commit.commit.message}`;
                ul.appendChild(li);
                // Add <br> after each li except the last one
                if (index < data.length - 1) {
                    ul.appendChild(document.createElement('br'));
                }
            });
            logsDiv.appendChild(ul);
        })
        .catch(error => {
            console.error('Error loading commits:', error);
            document.getElementById('logs').innerHTML = '<p>Error loading commits. Please try again later.</p>';
        });
});