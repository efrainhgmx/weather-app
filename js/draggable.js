const defaultConfig = {
    open: true,
    debug: true,
    animatable: true
}

export default function draggable($element, config = defaultConfig) {
    if(!$element instanceof HTMLElement) {
        return console.warn(`Elemento invalido ${$element}, se espera un elemento HTML`);
    }

    let isOpen = config.open;
    let isDragging = false;
    const elementRect = $element.getBoundingClientRect();
    const ELEMENT_BLOCK_SIZE = elementRect.height;
    const $marker = $element.querySelector('[data-marker]');
    const MARKER_BLOCK_SIZE = $marker.getBoundingClientRect().height;
    
    const VISIBLE_Y_POSITION = 0;
    const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE;
    
    let widgetPosition = VISIBLE_Y_POSITION;
    
    isOpen ? open() : close();

    let startY = 0;

    $marker.addEventListener('click', handleClick);
    $marker.addEventListener('pointerdown', handlePointerDown);
    $marker.addEventListener('pointerup', handlePointerUp);
    $marker.addEventListener('pointerout', handlePointerOut);
    $marker.addEventListener('pointercancel', handlePointerCancel);
    $marker.addEventListener('pointermove', handlePointerMove);

    if(config.animatable) {
        setAnimation();
    }

    function handlePointerMove(event) {
        logger('Pointer move');
        drag(event)
    }

    function handlePointerCancel() {
        logger('Pointer cancel')
        dragEnd()
    }

    function handlePointerOut() {
        logger('Pointer out')
        dragEnd()
    }

    function handlePointerDown(event) {
        logger('Pointer down')
        startDrag(event);
    }

    function handlePointerUp() {
        logger('Pointer up')
        dragEnd()
    }

    function handleClick(event) {
        logger('click');
        toggle(event)
    };

    function pageY(event) {
        return event.pageY || event.touches[0].pageY
    }

    function startDrag(event) {
        isDragging = true;
        startY = pageY(event);
        logger({startY})
    }

    function setAnimation() {
        $element.style.transition = 'margin-bottom .3s'
    }

    function bounce() {
        if(widgetPosition < ELEMENT_BLOCK_SIZE / 2) {
            return open()
        }
        return close();
    }

    function dragEnd()  {
        logger('Dragg end');
        isDragging = false;
        bounce()
    }
    function toggle() {
        if(!isDragging) {
            if(!isOpen) {
                return open();
            } 
            return close();
        }
    }

    function logger(message) {
        if(config.debug) {
            console.info(message);
        }
    }

    function open() {
        logger('Abrir widget');
        isOpen = true;
        widgetPosition = VISIBLE_Y_POSITION;
        setWidgetPosition(widgetPosition);
    }

    function close() {
        logger('Cerrar widget')
        isOpen = false;
        widgetPosition = HIDDEN_Y_POSITION;
        setWidgetPosition(widgetPosition)
    }

    function setWidgetPosition(value) {
        $element.style.marginBottom = `-${value}px`;
    }

    function drag(event) {
        const cursorY = pageY(event);
        const movementY = cursorY - startY;
        widgetPosition = widgetPosition + movementY
        logger(movementY);
        startY = cursorY;
        setWidgetPosition(widgetPosition);
    }
}