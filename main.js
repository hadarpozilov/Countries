$(() => {
    $.get("https://restcountries.com/v3.1/all", function (countries) {
        for (const country of countries) {
            displayCountry(country);
            contentCountry(country);
        }
    });
 // פונקציית הצגת מדינות
    function displayCountry(country) {
        $(".country").append(
            `<div class="cardCountry">
            <div class="card" >
              <img src=${country.flags.png } class="card-img-top" alt="...">
              <div class="card-body">
               <h1 class="card-text">${country.name.common} </h1>
              <h3 class="card-text">Population:${country.population }</h3></div></div> 
            </div>`
        );
        //   הצגת מידע בעזרת כפתור
        $('#all').click(function () {
            location.reload();
        });
    }

    let numcountries = 0;
    let p = 0;
    let numAsia = 0;
    let numEurope = 0;
    let numAfrica = 0;
    let numAmericas = 0;
    let numAntarctic = 0;
    let namecurrencies = [];

    // קבלת מידע מדינות
    function contentCountry(country) {
        numcountries++;
        p = p + country.population;
        let avg = p / numcountries;
        let av = Math.floor(avg);

       namecurrencies.push(country.currencies);

        switch (country.region) {
            case "Asia":
                numAsia++;
                break;
            case "Europe":
                numEurope++;
                break;
            case "Africa":
                numAfrica++;
                break;
            case "Americas":
                numAmericas++;
                break;
            case "Antarctic":
                numAntarctic++;
                break;
        }

        $("#result").html(`Total countries result:  ${numcountries}`);
        $("#population").html(`Total Countries Population: ${p}`);
        $("#average").html(`Average Population:${av}`);
        $("#region").html(`region: <br> Asia: ${numAsia},|| Europe: ${numEurope}|| Africa: ${numAfrica}|| Americas: ${numAmericas}|| Antarctic: ${numAntarctic}`);      
    }

    $("input").keyup(function () {
        numcountries = 0;
        p = 0;
        numAsia = 0;
        numEurope = 0;
        numAfrica = 0;
        numAmericas = 0;
        numAntarctic = 0;

        let text = $("input").val().toLowerCase();

        $.get(`https://restcountries.com/v3.1/name/${text}`, function (countries) {
            console.log(countries);
            $(".country").html("");
            for (const country of countries) {
                displayCountry(country);
                contentCountry(country);
            }
        });
    });
});