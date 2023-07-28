REPO_COUNT = 3
POPIN_DELAY = 350 // in milliseconds
POPIN_DELAY_FADE_FACTOR = 100

function getTimeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 2) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 2) {
        return Math.floor(interval) + " days ago";
    }
    return "Today";
}

function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

async function getRecentProjects(user) {
    try {
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos`);
        const repos = await repoResponse.json();

        const reposParent = document.getElementById(`projects-list`);

        if (repoResponse.status === 403) {
            reposParent.getElementsByTagName('li')[0].innerHTML = "Really? Rate limited? Just email me already...";
            return;
        }

        // Sort the repositories by last push date in descending order
        repos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

        // Get the 4 most recently pushed repositories
        let recentRepos = repos.slice(0, REPO_COUNT);

        // Update the HTML
        // reposParent.removeChild(reposParent.getElementsByTagName('li')[0]);
        for (let i = 0; i < recentRepos.length; i++) {
            const repo = recentRepos[i];

            let repoElement = document.createElement('li');

            const timeSince = getTimeSince(new Date(repo.pushed_at));
            repoElement.innerHTML = `<a href="${repo.html_url}"><span class="underlined">${repo.name}</span> (${timeSince})</a>`;

            if (i == 0) {
                reposParent.replaceChild(repoElement, reposParent.getElementsByTagName('li')[0])
            } else {
                reposParent.appendChild(repoElement)
            }
            // Wait before fetching the next repo
            await delay(POPIN_DELAY + (i * POPIN_DELAY_FADE_FACTOR));
        }

    } catch (error) {
        console.error(error);
        const reposParent = document.getElementById(`projects-list`);
        reposParent.getElementsByTagName('li')[0].innerHTML = "Uh oh! Something made a fucky wucky! Sowwy! ;-;";
    }
}

// New function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle Intersection Observer callback
function handleIntersect(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // When the element is in the viewport, fetch and display the recent projects
            getRecentProjects('skchuong100');
            // Disconnect the observer after the first time it's triggered (optional)
            observer.disconnect();
        }
    });
}

// Function to set up Intersection Observer
function observeProjectsList() {
    const projectsList = document.getElementById('projects-list');
    const observer = new IntersectionObserver(handleIntersect, { threshold: 0 });
    observer.observe(projectsList);
}

// Call the function to set up Intersection Observer
observeProjectsList();

//getRecentProjects('skchuong100');







