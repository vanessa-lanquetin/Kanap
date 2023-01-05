// seleccioner l'element sectin avec id "items"
const itemsSection = document.getElementById('items')
//cree un element
//const para = document.createElement('p')
// lui donner de proprieté innerText 'hello
//para.innerText = 'hello'
// rajouter au DOM
//itemsSection.appendChild(para)
// console.log(para)

//img = document.createElement('img')
//img.setAttribute('src', 'http://localhost:3000/images/kanap01.jpeg')
//itemsSection.appendChild(img)

function getData() {
	fetch('http://localhost:3000/api/products').then((res) => {
		if (res.ok) {
			res.json().then((data) => {
				console.log(data)
				console.log(document.body)
				
				for (let index = 0; index < data.length ; index++) {
					const element = data[index]
					console.log(element)

					const lien = createElem('a')
					lien.setAttribute("href",`./product.html?id=${element._id}`)
					itemsSection.appendChild(lien)

					const article = createElem('article')
					lien.appendChild(article)


					 const img = createElem('img')
					 const imgUrl= element.imageUrl
					 img.setAttribute("src",imgUrl)
					 article.appendChild(img)

					 const altTxt= element.altTxt
					 img.alt=altTxt

					const titre = createElem('h3')
					titre.innerText = element.name
					article.appendChild(titre)*
					titre.classList.add('productName')

					const description = createElem('p')
					description.innerText = element.description
					article.appendChild(description)
					description.classList.add('productDescription')
				}
			})
		} else {
			alert('no canape !!')
		}
	})
}

function createElem(ele) {
	return document.createElement(ele)
}

getData()

