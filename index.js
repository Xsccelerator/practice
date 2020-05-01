let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://image.freepik.com/free-vector/red-apple-with-happy-face_1308-9211.jpg'},
    {id: 2, title: 'Ананасы', price: 50, img: 'https://image.freepik.com/free-photo/juicy-pineapple-white-background-isolated_96064-298.jpg'},
    {id: 3, title: 'Клубника', price: 220, img: 'https://image.freepik.com/free-photo/strawberry-isolated-white-background_1232-1974.jpg'}

]

const toHTML = fruit =>  `
<div class="col">
    <div class="card">
        <img src="${fruit.img}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
        </div>
    </div>
</div>   
    `

    
function render(){
    const html = fruits.map(toHTML).join('') //Преобразовываем каждый элемент массива при помощи созданной функции toHTML

    //после метода map() мы получаем массив строк, которые соеденяем методом join('') по пустой строке
    document.querySelector('#fruits').innerHTML = html // говорим что внутренний html равен некому html
}
render()


const priceModal = $.modal({
    title: 'Цена на товар',  //Заголовок модального окна
    closable: true,         //Может ли закрываться
    //content - кастомное содержимое модального окна
    
    width: '400px',     //ширина
    footerButtons: [    //объект с кнопками
        {text: 'закрыть', type:'primary', handler(){     //Передаем настройки кнопки
            // console.log('primary btn clicked')      //(текст, тип это класс бутстрапа, обработкик собития)
            priceModal.close()   
        }}
    ]
})

document.addEventListener('click', event => {     //вместо function(event) можем воспользоваться ES6 
    event.preventDefault()                        //Убираем стандартное поведение чтобы убрать хэш
const btnType = event.target.dataset.btn         //и просто передав параметр event вызвать стрелочную ф-ю
const id = +event.target.dataset.id    
const fruit = fruits.find(f => f.id === id)         //Определяем id элемента на который кликнули
if(btnType === 'price')   {   
      //Ищем в массиве фруктов тот, по которому был совершен клик сравнивая его с id  
         //Задаем динамическое содержимое окну.
        priceModal.setContent(`                  
        <p>Цена на ${fruit.title}: <strong>${fruit.price}</strong></p>
        
        `) 
        priceModal.open()
        console.log(fruit)
    }     else if(btnType === 'remove'){
        $.confirm({
            title: 'Вы уверены?',
            content: ` <p>Вы удаляете <strong>${fruit.title}</strong></p>  `
        }).then(()=>{
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch( () => {
            console.log('close')
        })
      
        
    }                                
})  



