const fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://image.freepik.com/free-vector/red-apple-with-happy-face_1308-9211.jpg'},
    {id: 2, title: 'Ананасы', price: 50, img: 'https://image.freepik.com/free-photo/juicy-pineapple-white-background-isolated_96064-298.jpg'},
    {id: 3, title: 'Клубника', price: 220, img: 'https://image.freepik.com/free-photo/strawberry-isolated-white-background_1232-1974.jpg'}

]

const modal = $.modal({
    title: 'Simple modal',  //Заголовок модального окна
    closable: true,         //Может ли закрываться
    //content - кастомное содержимое модального окна
    content: `              
    <h4>Modal test text</h4>  
    <p>Modal test text</p>   
    `,
    width: '400px',     //ширина
    footerButtons: [    //объект с кнопками
        {text: 'Ок', type:'primary', handler(){     //Передаем настройки кнопки
            console.log('primary btn clicked')      //(текст, тип это класс бутстрапа, обработкик собития)
            modal.close()   
        }},
        {text: 'НиОк', type:'danger', handler(){
            console.log('danger btn clicked')
            modal.close()
        }}
    ]
})


