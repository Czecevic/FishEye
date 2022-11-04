export default class Filter {
    filterTags() {
        let filtres = document.querySelector('ul');
        let articles = document.querySelectorAll('.articlePh');

        filtres.addEventListener('click', event => {
            let classValue = event.target.classList.value;

            if (-1 === classValue.indexOf('actived')) {
                event.target.classList.add('actived')
            } else {
                event.target.classList.remove('actived')
            }

            this.sortDomArticle(articles);
        });
    }

    getActiveFilters() {
        let currentFilters = document.querySelectorAll('ul li.actived');
        let filterSelected = []

        currentFilters.forEach(function (currentFilters) {
            filterSelected.push(currentFilters.getAttribute("data-filter"));
        });

        return filterSelected;
    }

    ownAllFilters(article) {
        let filters = this.getActiveFilters();
        let classValue = article.classList.value;
        let classes = classValue.split(' ');
        let intersection = filters.filter(
            x => classes.includes(x)
        );

        return filters.length = intersection.length;
    }

    sortDomArticle(articles) {
        articles.forEach((article) => {
            if(this.ownAllFilters(article)) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }
}