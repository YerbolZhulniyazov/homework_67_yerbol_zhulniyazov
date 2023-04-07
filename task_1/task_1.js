const container = document.getElementById('container');
const addItemBtn = document.getElementById('add-item-btn');

addItemBtn.addEventListener('click', function () {
    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.innerHTML = '<p>Можете убрать уведомление нажав кнопку закрыть или подождать пять секунд и оно ' +
        'само закроется</p>' + '<button class="close-btn">Закрыть</button>';
    notification.style.display = "block";
    container.appendChild(notification);

    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.addEventListener('click', function () {
        notification.remove();
    });

    setTimeout(function () {
        notification.remove();
    }, 5000);
});
