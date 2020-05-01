Element.prototype.appendAfter = function(element){      //Обращаемся к прототипу класса Element, и создаем у него метод appendAfter
//это функция, которая принимает element в качестве аргумента
//тоесть для элемента, который вставляем, вызываем метод appendAfter, а в аргумент передаем элемент, после которого его надо вставить
    element.parentNode.insertBefore(this, element.nextSubling) //Вот реализация данного метода(с сайта stack overflow)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function noop(){}
function _createModalFooter(buttons = []){              //создаем функцию создания футера
    if(buttons.length === 0){
        return document.createElement('div')
    }
    const wrap  = document.createElement('div')     //Создаем пустой элемент div
    wrap.classList.add('modal-footer')              //Добавляем ему класс modal-footer
    buttons.forEach(btn =>{                         //Обрабатываем каждую кнопку массива (btn - отдельная кнопка)
        const $btn = document.createElement('button')   //Создаем html-node (узел) button - короче создаем кнопку
        $btn.textContent = btn.text                     //присваиваем данному узлу textContent = btn.text (btn.text - это )
        $btn.classList.add('btn')                       //присваиваем класс btn для подтягивания стилей
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)    //Подтягиваем из options type(класс бутстрапа для кнопки) или используем по умолчанию
        $btn.onclick = btn.handler || noop                      //Присваиваем обработчик события из options или пустую функцию-заглушку
        wrap.appendChild($btn)                                  //вставляем в созданный div созданную кнопку
    })


    return wrap                                                 //Функция возвращает итоговый шаблон
}
function _createModal(options){
    const DEFAULT_WIDTH = '600px'    
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `   
    <div class="modal-overlay"  data-close="true">
        <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
            <div class="modal-header">
                <span class="modal-title">${options.title || 'Window'}</span>
                ${options.closable ?  `<span class="modal-close" data-close="true">&times;</span>` : ''} 
            </div>
            <div class="modal-body" data-content>   
               ${options.content || ' '}
            </div>
        </div>
    </div>
    `)
    const footer = _createModalFooter(options.footerButtons) //Вызываем функцию создания футера передавая в нее правильный массив из options
    footer.appendAfter(modal.querySelector('[data-content]'))   //Вставляем футер после ноды у которой есть data-content
    document.body.appendChild(modal)
    return modal
}
$.modal = function(options){
    const $modal = _createModal(options)    //Создание модального окна
    const ANIMATION_SPEED = 200             //время анимации
    let closing = false      //Флаг для отслеживания процесса закрытия окна
    let destroyed = false   //Флаг для отслеживания, уничтожено ли окно
    const modal = {
        open(){
            if(destroyed){              
                return console.log('modal is destroyed')
            }
            !closing &&  $modal.classList.add('open')   
        },
        close(){
            closing = true //Меняем состояние на true, что означает ("В процессе закрытия")
            $modal.classList.remove('open')       //Утираем класс open, чтобы закрыть окно      
            $modal.classList.add('hide')        //Добавляем класс hide, для которого прописана анимация скрытия 
            setTimeout(()=>{                    //По таймауту этот класс удалится
                $modal.classList.remove('hide') //За это время анимация успеет отработать
                closing = false                 //снова меняем флаг, что означает ("Не в процессе закрытия")
            if(typeof options.onClose === 'function'){  //Проверяем является ли onClose функцией. т.е. есть ли он вообще
                options.onClose()
            }
            }, ANIMATION_SPEED)                 //В данной константе лежит время анимации по умолчанию
        },

    }
    const listener = event =>{
        if (event.target.dataset.close){        //раньше этот код был вместо listener ниже
            modal.close()                       //теперь мы его перенесли в отдельную переменную
        }                                       //которую можем использовать в addEventListener
    }                                           //и removeEventListener
    $modal.addEventListener('click', listener)






 //копируем объект modal в пустой объект
 //Теперь в конечном счете функция будет возвращать именно его
    return Object.assign(modal, {
        //в пустом объекте создаем нужные нам методы destroy()
        destroy(){
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        // еще один нужный нам метод - setContent()
        setContent(html){   //Передаем html в качестве аргумента, т.е. либо переменную в которой html, либо конкретно кусок кода
            $modal.querySelector('[data-content]').innerHTML = html
            //$modal.querySelector('[data-content]') - получаем элемент по дата-атрибуту
            //  .innerHTML = html -- Перетираем html-содержимое на наше кастомное
        }
    })
}