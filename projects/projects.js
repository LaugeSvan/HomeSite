    const USERNAME = "LaugeSvan";
    const container = document.querySelector(".projects-grid");

    async function loadRepos() {
        const res = await fetch(`https://api.github.com/users/${USERNAME}/repos`);
        const repos = await res.json();

        // Sortér: dem med homepage først
        repos.sort((a, b) => {
            const hasHomeA = a.homepage && a.homepage.trim() !== "";
            const hasHomeB = b.homepage && b.homepage.trim() !== "";
            return hasHomeA === hasHomeB ? 0 : hasHomeA ? -1 : 1;
        });

        repos.forEach(repo => {
            const hasHomepage = repo.homepage && repo.homepage.trim() !== "";

            const card = document.createElement("div");
            card.className = "project-card";

            card.innerHTML = `
                <h2>${repo.name}</h2>
                <p>${repo.description || "No description"}</p>
                <a href="${repo.html_url}" target="_blank">View Repository</a>
                ${hasHomepage ? `<a href="${repo.homepage}" target="_blank" class="homepage-link">Visit Website</a>` : ""}
            `;

            container.appendChild(card);
        });
    }

    loadRepos();