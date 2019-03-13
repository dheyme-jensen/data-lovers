let searIndicators = document.querySelector("#butSearch");
searIndicators.addEventListener("click", createTable);

function createTable() {
    let navDados = document.querySelector("#navDados");
    navDados.setAttribute("class", "showTable");

    let selCountry = document.querySelector("#selCountry");
    let countryFilter = selCountry.options[selCountry.selectedIndex].value;
    let selTheme = document.querySelector("#selTheme");
    let themeFilter = selTheme.options[selTheme.selectedIndex].value;

    let countryData = WORLDBANK[countryFilter].indicators.filter(indicator => {
        return (indicator.indicatorName.toUpperCase().includes(themeFilter));
    });

    countryData.sort(function(a, b) {return a.indicatorName.localeCompare(b.indicatorName);});

    let table = document.querySelector("#tabIndicators");
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    const initialYear = 2013;
    const endYear = 2017;
    const qtyYearCells = 5;

    countryData.forEach(indicator => {
        let row = table.insertRow();
        row.setAttribute("class", "valueRow");
        let cell = row.insertCell(-1);
        cell.textContent = indicator.indicatorName;
        let total = 0.00;
        for (let year=initialYear; year<=endYear; year++) {
            cell = row.insertCell(-1);

            let indicatorValue = parseFloat(indicator.data[year]);
            if (isNaN(indicatorValue)) {
              cell.textContent = "--";
            } else {
              total += indicatorValue;
              cell.textContent = indicatorValue.toFixed(2);
            }
        }
        let average = total / qtyYearCells;
        cell = row.insertCell(-1);
        cell.textContent = average.toFixed(2);
    });

    let secDados = document.querySelector("#secDados");
    if (table.rows.length > 1) {
      secDados.removeAttribute("class");
      secDados.setAttribute("class", "secDados");
      table.setAttribute("class", "visible");
    } else {
      secDados.setAttribute("class", "bigTitle");
      table.setAttribute("class", "invisible");
    }
}