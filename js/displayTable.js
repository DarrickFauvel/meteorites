const API_URL = "https://data.nasa.gov/resource/gh4g-9sfh.json"

/* These headers can be reordered or individually omitted, 
  and the table will dynamically display accordingly */
const headers = {
  name: "Name",
  id: "ID",
  nametype: "NameType",
  recclass: "recClass",
  mass: "Mass",
  fall: "Fall",
  year: "Year",
  reclat: "recLat",
  reclong: "recLong",
  geolocation: "Geolocation",
}

function renderTableHeader(table) {
  const thead = table.querySelector("thead")
  thead.innerHTML = "<tr></tr>"

  for (const headerProperty in headers) {
    const th = document.createElement("th")
    th.textContent = headers[headerProperty]
    thead.querySelector("tr").appendChild(th)
  }
}

async function renderTableBody(table) {
  const tbody = table.querySelector("tbody")
  tbody.innerHTML = "<tr><td>Loading...</td></tr>"

  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error("Network response was not OK")
    }
    const meteorites = await response.json()

    tbody.innerHTML = ""

    for (const meteorite of meteorites) {
      const tr = document.createElement("tr")
      for (const headerProperty in headers) {
        for (const meteoriteProperty in meteorite) {
          if (headerProperty === meteoriteProperty) {
            const td = document.createElement("td")
            if (headerProperty === "geolocation") {
              td.textContent = `Latitude: ${meteorite.geolocation.latitude}\nLongitude: ${meteorite.geolocation.longitude}`
            } else {
              td.textContent = `${meteorite[meteoriteProperty]}`
            }
            tr.appendChild(td)
          }
        }
      }
      tbody.appendChild(tr)
    }
  } catch (error) {
    tbody.innerHTML = `<tr><td colspan=${
      Object.keys(headers).length
    }>Sorry! There was a problem fetching the data.</td></tr>`
    console.error("There was a problem with your fetch operation:", error)
  }
}

function displayTable(table) {
  renderTableHeader(table)
  renderTableBody(table)
}

export default displayTable
