function dragElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.onpointerdown = pointerDrag;

    function pointerDrag(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointermove = elementDrag;
        document.onpointerup = stopElementDrag;
    }

    function elementDrag(e) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";

        const topContainer = document.getElementById('top-container');
        const bottomContainer = document.getElementById('bottom-container');

        const topContainerRect = topContainer.getBoundingClientRect();
        const bottomContainerRect = bottomContainer.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        if (element.classList.contains('ice-cream')) {
            if (elementRect.top >= topContainerRect.top &&
                elementRect.left >= topContainerRect.left &&
                elementRect.bottom <= topContainerRect.bottom &&
                elementRect.right <= topContainerRect.right) {
                element.classList.add('in-bowl');
            } else {
                element.classList.remove('in-bowl');
            }
        } else if (element.classList.contains('toppings')) {
            if (elementRect.top >= bottomContainerRect.top &&
                elementRect.left >= bottomContainerRect.left &&
                elementRect.bottom <= bottomContainerRect.bottom &&
                elementRect.right <= bottomContainerRect.right) {
                element.classList.add('in-bowl');
            } else {
                element.classList.remove('in-bowl');
            }
        }
    }

    function stopElementDrag(e) {

        posX= e.clientX;
        posY= e.clientY;

        if (posX >= 0 && posY >= 0) {
            alert("Enjoy your Ice Cream!");
        }

        document.onpointerup = null;
        document.onpointermove = null;
    }
}

window.onload = function() {
    const toppings = document.getElementsByClassName('toppings');
    for (let i = 0; i < toppings.length; i++) {
        dragElement(toppings[i]);
    }

    const iceCreams = document.getElementsByClassName('ice-cream');
    for (let i = 0; i < iceCreams.length; i++) {
        dragElement(iceCreams[i]);
    }
};