import {openModal, closeModal} from "./modal";
import {postData} from "../services/services";


function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся.',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            /*Когда вместо слова "Загрузка", подставляем spinner.svg, этот код редактируем 
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);
            */
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));            

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
        
           })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });


        });
    }

     /*
    Красивое оповещение пользователя
    Делаем на основе блока modal__dialog 
    С помощью JS создаем новый блок с оповещением, а modal__dialog будем скрывать
    */
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        //скрываем предыдущий контент:
        prevModalDialog.classList.add('hide');
        // функция отвечающая за открытие модальных окон:
        openModal('.modal', modalTimerId);

        //создаем новый контент:
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close data-close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        //реализуем такой функционал, чтобы если пользователь снова открыл модальное окно, он снова мог увидеть форму для заполнения:
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);

        //Теперь возвращаемся в нашу отправку request.addEventListener('load'... и дорабатываем ее (см. изменения с пометкой **тут*)
        //И дорабатываем код так, чтобы при загрузке, у нас появлялся спиннер (файл spinner.svg)

    }
}

export default forms;