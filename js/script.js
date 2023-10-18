const URL = 'https://japceibal.github.io/japflix_api/movies-data.json';

//* ====== Elementos de DOM ====== *//

const lista = document.querySelector('#lista'),
	inputBuscar = document.querySelector('#inputBuscar'),
	btn = document.querySelector('#btnBuscar');

//* ====== Eventos ====== *//

// => Funciones Auxiliares

const incluyePelicula = function (elemento, valor, generos) {
	if (
		elemento.title.toLowerCase().includes(valor) ||
		elemento.tagline.toLowerCase().includes(valor) ||
		elemento.overview.toLowerCase().includes(valor) ||
		generos.toLowerCase().includes(valor)
	) {
		return true;
	} else {
		return false;
	}
};

document.addEventListener('DOMContentLoaded', () => {
	let dataArr = new Array();
	fetch(URL)
		.then((response) => response.json())
		.then((data) => {
			data.forEach((element) => {
				const li = document.createElement('li');
				li.setAttribute('hidden', true);
				li.classList.add('list-item');
				li.innerHTML = `
        <div class='data-content'>
          <h3>${element.title}</h3> 
          <p>${element.tagline}</p>
        </div>
        <div class='star-content'>
          <span>${element.vote_average}</span>
        </div>`;

				lista.appendChild(li);

				dataArr.push(element);
			});
		});
	btn.addEventListener('click', () => {
		const valueInputBuscar = inputBuscar.value.toLowerCase();

		dataArr.forEach((element) => {
			let generos = '';
			for (let elemento of element.genres) {
				generos += elemento.name + ' ';
			}
			if (incluyePelicula(element, valueInputBuscar, generos)) {
				document
					.getElementsByClassName('list-item')
					[dataArr.indexOf(element)].removeAttribute('hidden');
			} else {
				document
					.getElementsByClassName('list-item')
					[dataArr.indexOf(element)].setAttribute('hidden', true);
			}
		});
	});
});
