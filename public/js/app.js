(function() {
    const app = {
        config: {
            searchUrl: '/api/v1/search'
        },
        elements: {
            form: document.getElementsByTagName('form')[0],
            searchInput: document.querySelector('input[name="search"]'),
            searchText: document.getElementById('search-text'),
            searchResults: document.getElementById('search-results')
        }
    }
    app.elements.form.addEventListener('submit', (e) => {
        e.preventDefault()
        const query = app.elements.searchInput.value

        // this shouldn't be necessary because of html5 `minlength` attribute
        if (!query) {
            return
        }

        // for modern browsers only - sorry IE users
        const searchUrl = `${app.config.searchUrl}?searchText=${query}`
        fetch(searchUrl)
        .then(response => response.json())
        .then(results => app.displayResults(results.data))
        .catch(error => {
            console.error(error)
        })
    })
    app.displayResults = (data) => {
        let html = '<ul class="list-group">'
        data.forEach(item => {
            html += `<li class="list-group-item">${JSON.stringify(item)}</li>`
        })
        html += '</ul>'
        app.elements.searchResults.innerHTML = ''
        app.elements.searchResults.innerHTML = html
    }
})()