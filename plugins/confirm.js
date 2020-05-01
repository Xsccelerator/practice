$.confirm = function(options){ //Создаем новый объект, который будет функцией
return new Promise((resolve, reject)=>{
    const modal = $.modal({     //Внутри нового плагина обращаемся к другому плагину
        title: options.title,
        width: '400px',
        closable: false,
        content: options.content,
        onClose(){
            modal.destroy()
        },
        footerButtons: [
            {text: 'Отменить', type:'secondary', handler(){     //Передаем настройки кнопки           
                modal.close()   
                reject()
            }},
            {text: 'Удалить', type:'danger', handler(){     //Передаем настройки кнопки
                
                modal.close()  
                resolve() 
            }}
        ]
    })
   setTimeout(()=>  modal.open(), 100 ) //задерживаем ненадолго появление модального окна, чтобы анимация заработала....
})
}

