/**
 * about.js
 * Fetches the README.md content from a specified GitHub repository
 * and renders it as HTML on the page.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const GITHUB_OWNER = 'LaugeSvan';
    const GITHUB_REPO = 'HomeSite';
    const GITHUB_BRANCH = 'main'; // Use 'master' if your repo still uses the old name

    // Construct the URL to the raw README file
    const RAW_README_URL = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/README.md`;
    
    // Get the container element where the content will be placed
    const container = document.getElementById('readme-content');

    // Check if Marked.js is available
    if (typeof marked === 'undefined') {
        container.innerHTML = '<h1>Error</h1><p>Markdown rendering library (Marked.js) is not loaded.</p>';
        return;
    }

    /**
     * Fetches the raw Markdown content from GitHub.
     */
    async function fetchReadme() {
        try {
            const response = await fetch(RAW_README_URL);

            if (!response.ok) {
                // Handle cases where the file or repo doesn't exist (e.g., 404)
                if (response.status === 404) {
                    throw new Error(`README.md not found in ${GITHUB_OWNER}/${GITHUB_REPO} on the ${GITHUB_BRANCH} branch.`);
                }
                throw new Error(`GitHub fetch failed with status: ${response.status}`);
            }

            // Get the plain text content
            const markdownText = await response.text();
            
            // Convert Markdown to HTML using Marked.js
            // The 'marked' function is globally available thanks to the CDN link in index.html
            const renderedHtml = marked.parse(markdownText);

            // Inject the rendered HTML into the container
            container.innerHTML = renderedHtml;

        } catch (error) {
            console.error('Failed to load GitHub README:', error);
            container.innerHTML = `
                <h1 id="error-loading">Error Loading Content</h1>
                <p>Could not load the README from GitHub. Please check the console for details.</p>
                <p>(${error.message})</p>
                <hr>
                <p>Note: This content is usually loaded dynamically from the GitHub repository <strong>${GITHUB_OWNER}/${GITHUB_REPO}</strong>.</p>
            `;
        }
    }

    // Run the function to fetch and display the README
    fetchReadme();
});