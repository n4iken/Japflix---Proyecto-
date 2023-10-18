const URL = 'https://japceibal.github.io/japflix_api/movies-data.json';

//* ====== Elementos de DOM ====== *//

const lista = document.querySelector('#lista'),
	inputBuscar = document.querySelector('#inputBuscar'),
	btn = document.querySelector('#btnBuscar');

//* ====== Eventos ====== *//

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
		console.log(dataArr[0].title);
		const valueInputBuscar = inputBuscar.value.toLowerCase();
		dataArr.forEach((pelicula) => {
			if (
				pelicula.title.toLowerCase().includes(valueInputBuscar) ||
				pelicula.tagline.toLowerCase().includes(valueInputBuscar) ||
				pelicula.overview.toLowerCase().includes(valueInputBuscar) ||
				pelicula.genres.some((genero) => genero.name.toLowerCase().includes(valueInputBuscar))
			) {
				document
					.getElementsByClassName('list-item')
					[dataArr.indexOf(pelicula)].removeAttribute('hidden');
			} else {
				document
					.getElementsByClassName('list-item')
					[dataArr.indexOf(pelicula)].setAttribute('hidden', true);
			}
		});
	});
});
