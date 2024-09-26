const url = "https://countries.trevorblades.com/"; // Reemplaza con la URL de tu API GraphQL

const mutation = `
  query GetCountry {
  country(code: "BR") {
    name
    native
    capital
    states {
      code
      name
    }
    emoji
    currency
    languages {
      code
      name
    }
  }
 
}
`;

fetch(url, {
	method: "POST", // Método de la solicitud
	headers: {
		"Content-Type": "application/json", // Tipo de contenido
	},
	body: JSON.stringify({query: mutation}), // Convierte la mutación a una cadena JSON
})
	.then((response) => {
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json(); // Convierte la respuesta a JSON
	})
	.then((data) => {
		console.log("Success:", data); // Maneja los datos de la respuesta
	})
	.catch((error) => {
		console.error("Error:", error); // Maneja cualquier error
	});
