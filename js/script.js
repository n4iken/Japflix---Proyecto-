const URL = 'https://japceibal.github.io/japflix_api/movies-data.json';

//* ====== Elementos de DOM ====== *//

const lista = document.querySelector('#lista'),
	inputBuscar = document.querySelector('#inputBuscar'),
	btn = document.querySelector('#btnBuscar'),
	listItem = document.getElementsByClassName('list-item');

//* ====== Eventos ====== *//

document.addEventListener('DOMContentLoaded', () => {
	let peliculasArr = new Array();
	fetch(URL)
		.then((response) => response.json())
		.then((data) => {
			data.forEach((pelicula) => {
				const li = document.createElement('li');
				li.setAttribute('hidden', true);
				li.setAttribute('data-bs-toggle', 'offcanvas');
				li.setAttribute('data-bs-target', '#offcanvasTop');
				li.setAttribute('aria-controls', 'offcanvasTop');

				li.classList.add('list-item');
				li.innerHTML = `
        <div class='data-content'>
          <h3>${pelicula.title}</h3> 
          <p>${pelicula.tagline}</p>
        </div>
        <div class='star-content'>
					<span class="fa fa-star"></span>
					<span class="fa fa-star"></span>
					<span class="fa fa-star"></span>
					<span class="fa fa-star"></span>
					<span class="fa fa-star"></span>
        </div>`;

				lista.appendChild(li);

				const stars = li.querySelectorAll('.fa-star');
				for (let i = 0; i < (pelicula.vote_average - 1) / 2; i++) {
					stars[i].classList.add('checked');
				}
				peliculasArr.push(pelicula);
			});
		});

	const buscarBtnFunc = () => {
		const valueInputBuscar = inputBuscar.value.toLowerCase();
		peliculasArr.forEach((pelicula) => {
			if (
				pelicula.title.toLowerCase().includes(valueInputBuscar) ||
				pelicula.tagline.toLowerCase().includes(valueInputBuscar) ||
				pelicula.overview.toLowerCase().includes(valueInputBuscar) ||
				pelicula.genres.some((genero) => genero.name.toLowerCase().includes(valueInputBuscar))
			) {
				listItem[peliculasArr.indexOf(pelicula)].removeAttribute('hidden');
			} else {
				listItem[peliculasArr.indexOf(pelicula)].setAttribute('hidden', true);
			}
		});
	};

	btn.addEventListener('click', buscarBtnFunc);

	window.addEventListener('keydown', (e) => {
		if (e.keyCode === 13) {
			buscarBtnFunc();
		}
	});
});
