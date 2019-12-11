let API = `http://5deeedd6e17c8300140d7c6f.mockapi.io/Products`
let arrayData
async function setHTML() {
    //get API set value arrayData
    await axios.get(API)
        .then(item => { arrayData = item.data })
    //viet HTML
    let rowNumber
    if (arrayData.length % 4 == 0) {
        rowNumber = arrayData.length / 4
    }
    else rowNumber = Math.floor(arrayData.length / 4)
    setNews = document.querySelector('.content')
    for (let i = 0; i < rowNumber; i++) {
        setNews.insertAdjacentHTML('beforeend', `<div class="news"></div>`)
    }
    setNewsItem = document.querySelectorAll('.news')
    for (let i = 0; i < rowNumber - 1; i++) {
        for (let index = 0; index < 4; index++) {
            setNewsItem[i].insertAdjacentHTML('afterbegin', ` <div class="news-item">
            <div class="news-item-img">
                <a href="index3.html"><img src="" alt="anh" target ="_self" ></a>
            </div>
            <h4></h4>
            <p></p>
        </div>`)
        }
    }
    for (let i = 0; i < arrayData.length - (rowNumber - 1) * 4; i++) {
        setNewsItem[rowNumber - 1].insertAdjacentHTML('afterbegin', ` <div class="news-item">
        <div class="news-item-img">
            <a href="index3.html"><img src="" alt="anh" target ="_self" ></a>
        </div>
        <h4></h4>
        <p></p>
    </div>`)
    }
    //set value cho HTML, add event day id len localStorage
    let setNewsContents = document.querySelectorAll('.news-item')
    for (let i = 0; i < arrayData.length; i++) {
        setNewsContents[i].children[1].innerHTML = `${arrayData[i].name}`
        setNewsContents[i].children[2].innerHTML = `${arrayData[i].description}`
        setNewsContents[i].children[0].children[0].children[0].src = arrayData[i].image
        setNewsContents[i].addEventListener('click',function(){
            localStorage.setItem('id',arrayData[i].id)
        })
    }
    //set display cac hang tu thu 2 tro di = none
    for(let i = 1;i<rowNumber;i++){
        setNewsItem[i].style.display = `none`
    }
    //show more
    showMore = function(){
        if(document.querySelectorAll('.btn-primary')[1].innerHTML === `Show More`){
            document.querySelectorAll('.btn-primary')[1].innerHTML = `Show Less`
            for(let i = 1;i<rowNumber;i++){
                setNewsItem[i].style.display = `grid`
            }
        }
        else{
            document.querySelectorAll('.btn-primary')[1].innerHTML = `Show More`
            for(let i = 1;i<rowNumber;i++){
                setNewsItem[i].style.display = `none`
            }
        }
    }
    //validate form Search
    let valueSearch = document.querySelector('.input-search').children[0]
    valueSearch.placeholder = `Search value 1-${arrayData.length}`
    checkSearch = function(){
        console.log(Number(valueSearch.value));
      
        console.log(typeof Number(valueSearch.value));
      
        if (Number(valueSearch.value) < 1 || Number(valueSearch.value) > 20 || isNaN(Number(valueSearch.value))) {
          alert('Moi ban nhap tu 1 - 20')
          valueSearch.value = ''
        }
        else {
          localStorage.setItem('id', Number(valueSearch.value));
          window.open('index3.html','_self')
        }
      }
}
setHTML()