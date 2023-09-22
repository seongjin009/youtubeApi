const frame = document.querySelector('section');

const api_key = 'AIzaSyBeyx3w05cE1C0QSSKMjxzYcZckN_hyNT4';
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = `PLJ0_dUpwgnHGNKFN5G2r6rsMf51JmkB7M`;
const num = 5;
const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResult=${num}`;

fetch(resultURL)
	.then((data) => data.json())
	.then((json) => {
		console.log(json.items);
		let tag = '';
		json.items.map((data) => {
			tag += `
      <article>
        <h2>${data.snippet.title}</h2>
        <div class='txt'>
        <p>${data.snippet.description}</p>
        <span>${data.snippet.publishedAT}</span>
        </div>
        <div class='pic'>
          <img src='data.snippet.thumbnails.standard.url'>
        </div>
      </article>
      `;
		});
		frame.innerHTML = tag;
	});
