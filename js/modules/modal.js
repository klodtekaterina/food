function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if(modalTimerId) {
        clearInterval(modalTimerId);
    }

}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector);
    // const modalCloseBtn = document.querySelector('[data-close]'); удаляем эту строку, когда доходим дл темы красивого оповещения пользователя. Так как в JS происходит динамическая верстка, крестики для закрывания модальных окон не будет работать для кода для нового созданного модального окна из нового урока. Чтобы найти реализацию нового кода, ориентируйся на комментарий *тут*
    const modal = document.querySelector(modalSelector);

    modalTrigger.forEach (item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    // modalCloseBtn.addEventListener('click', closeModal); *тут* - удаляем эту часть 

    // modal.addEventListener('click', (e) => {
    //     if (e.target === modal) {
    //         closeModal();
    //     }
    // }); *тут* - корректируем условие: 

    modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.getAttribute('data-close') == '') {
                closeModal(modalSelector);
            }
        });
    // теперь в ново-созанном модальеом окне крестик тоже будет работать 

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};