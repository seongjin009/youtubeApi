const frame = document.querySelector('section');

const api_key = 'AIzaSyBeyx3w05cE1C0QSSKMjxzYcZckN_hyNT4';
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = `PLJ0_dUpwgnHGNKFN5G2r6rsMf51JmkB7M`;
const num = 5;
const tit_num = 30;
const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResult=${num}`;

let text = 'beaf-letters-tomato';
text = text
	.split('-') //기존 문자열에서 -을 기준으로 배열로 분리
	.map((el) => el.charAt(0).toUpperCase() + el.slice(1)) //분리된 문자값을 반복돌면서 첫번째 글자만 대문자변경+첫번째를 제외한 나머지 문자 이어붙임 (각단어의 첫글자만 대문자로 변경되서 배열로 전환)
	.join(' '); //첫글자만 대문자로 변경된 단어들을 다시 빈칸으로 이어붙이기
console.log(text);

//일정 글자수 이상일 때 글자짜르고 말줄임표 붙이기
//문자열,substr(시작위치, 자를 글자수)

fetch(resultURL)
	.then((data) => data.json())
	.then((json) => {
		console.log(json.items);
		let tag = '';
		json.items.map((data) => {
			let desc = data.snippet.description;
			desc.length > 120 ? (desc = desc.substr(0, 120) + '...') : desc;
			let date = data.snippet.publishedAt.split('T')[0];
			date = date.split('-').join('.');

			tag += `
      <article>
        <h2>${
					data.snippet.title.length > tit_num
						? data.snippet.title.substr(0, tit_num) + '...'
						: data.snippet.title
				}</h2>
        <div class='txt'>
        <p>${data.snippet.description}</p>
        <span>${date}</span>
        </div>
        <div class='pic'>
          <img src='${data.snippet.thumbnails.standard.url}'>
        </div>
      </article>
      `;
		});
		frame.innerHTML = tag;
	});

//이벤트 위임 (event delegation)
//동적으로 생성되는 요소에 이벤트 연결이 불가, 이벤트 연결 시점에는 해당 돔이 생성되지 않았기 때문
//항상 있는 body요소에다가 이벤트를 위임을해서 추후 동적 dom이 생기면 이벤트를 전달받도록 처리

window.addEventListener('click', (e) => {
	//e.currentTarget : 이벤트가 연결되어 있는 선택자를 반환
	//e.target : 실제 화면상에서 이벤트가 발생한 요소를 반환

	if (e.target.nodeName === 'IMG') {
		console.log(e.target);
	}
});

const pic = document.querySelectorAll('.pic');
