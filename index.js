const searchBarEle = document.querySelector("#search__bar");
const searchResultsEle = document.querySelector(".search__results__container");
const homeContainerEle = document.querySelector(".home__container");
const searchTermEle = document.querySelector("#search__term"); 

const showResults = (data) => {
    let dataVar = [];
    dataVar += data;
    const returnDataUnlessNull = (info, htmlTag1, htmlTag2) => {
        if (info === null || info.length < 1) {
            return htmlTag1 + "N/A" + htmlTag2;
         } else {
            return htmlTag1 + info + htmlTag2;
         }
    };

    if (data.length === 0) {
        searchResultsEle.innerHTML += `<p id="no__results">No results were found: </p>`;
    } else {
        try {
            for (let i = 0; i < data.length; i++) {
                searchResultsEle.innerHTML += `
                    <div  id="${i}" class="results">
                        <img id="booty "src="${data[i].show.image.medium}" alt="show photo" width="300px" height="300px">
                            <div class="results__info id="${i}" data-simplebar data-simplebar-auto-hide="false">
                                ${returnDataUnlessNull(data[i].show.name, `<h1 class id="results__title">`, `</h1>`)}
                                ${returnDataUnlessNull(data[i].show.rating.average, `<span>Rating: `, `</span>`)}
                                ${returnDataUnlessNull(data[i].show.genres, `<p>Genres: `, `</p>`)}
                                ${returnDataUnlessNull(data[i].show.runtime, `<p>Runtime: `, ' min</p>')}
                                ${returnDataUnlessNull(data[i].show.premiered, `<p>Aired: `, `</p>`)}
                                ${returnDataUnlessNull(data[i].show.status, `<span>Status:  `, `</span>`)}
                                ${returnDataUnlessNull(data[i].show.summary, `<p id="results__summary">Summary: `, `</p>`)}
                    </div>
                </div>`
            }
        } catch {
            let resultsEle = document.querySelectorAll(".results__info");
            resultsEle.forEach(element => {
                element.addEventListener("click", (event) => {
                    console.log(event.target.parent);
                //     searchResultsEle.innerHTML +=  `
                //     <div class="results">
                //         <img id="booty "src="${data[i].show.image.medium}" alt="show photo" width="600px" height="600px">
                //             <div class="results__info" data-simplebar data-simplebar-auto-hide="false">
                //                 ${returnDataUnlessNull(data[i].show.name, `<h1 class id="results__title">`, `</h1>`)}
                //                 ${returnDataUnlessNull(data[i].show.rating.average, `<span>Rating: `, `</span>`)}
                //                 ${returnDataUnlessNull(data[i].show.genres, `<p>Genres: `, `</p>`)}
                //                 ${returnDataUnlessNull(data[i].show.runtime, `<p>Runtime: `, ' min</p>')}
                //                 ${returnDataUnlessNull(data[i].show.premiered, `<p>Aired: `, `</p>`)}
                //                 ${returnDataUnlessNull(data[i].show.status, `<span>Status:  `, `</span>`)}
                //                 ${returnDataUnlessNull(data[i].show.summary, `<p id="results__summary">Summary: `, `</p>`)}
                //     </div>
                // </div>`
                })
            });
        }
    }           
}


searchBarEle.addEventListener("keypress", (btn) => {
    if (btn.key === "Enter") {
        searchResultsEle.innerHTML = "";
        homeContainerEle.innerHTML = "";
        async function obtainResults() {
            let response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchBarEle.value}`)
            let results = await response.json()
            showResults(results)
        }
        obtainResults();
        searchTermEle.innerHTML = "Showing results for: " + searchBarEle.value;
        searchBarEle.value = "";   
    }
});

