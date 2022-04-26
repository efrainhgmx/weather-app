const defaultConfig = {
    open: true,
    debug: true,
    animatable: true
}

export default function draggable($element, config = defaultConfig) {
    if(!$element instanceof HTMLElement) {
        return console.warn(`Elemento invalido ${$element}, se espera un elemento HTML`);
    }

    let isOpen = config,open;

    isOpen ? open() : close();


    const VISIBLE_Y_POSITION = 0;

    const HIDDEN_Y_POSITION = 0;
    
    function logger(message) {
        if(config.debug) {
            console.info(message);
        }
    }

    function open() {
        logger('Abrir widget');
        isOpen = true;
    }

    function close() {
        logger('Cerrar widget')
        isOpen = false;
    }

    function setWidgetPosition(value) {
        $element.style.marginBottom = `-${value}px`;
    }
}