getData()
    const productHref = document.createAttribute('href');
    productHref.value = `product.html?id=${product._id}`
    productAnchor.setAttributeNode(productHref);
    const productHdr = document.createElement('h3');
    productHdr.classList.add('productName');
    productHdr.innerText = product.name;
    const productImg = document.createElement('img');
    const imgSrc = document.createAttribute('src');
    imgSrc.value = product.imageUrl;
    const imgAlt = document.createAttribute('alt');
    imgAlt.value = product.altTxt;
    productImg.setAttributeNode(imgSrc);
    productImg.setAttributeNode(imgAlt);
    const productDesc = document.createElement('h3');
    productDesc.classList.add('productDescription');
    productDesc.innerText = product.description;
    // append each product to productView
    productArticle.append(productHdr);
    productArticle.append(productImg);
    productArticle.append(productDesc);
    productAnchor.append(productArticle);
    productView.append(productAnchor);


const productView = document.getElementById('items');

fetchKanap(kanapAPI);