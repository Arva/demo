/**
 * Created by lundfall on 13/07/2017.
 */
import {View}                                   from 'arva-js/core/View.js'
import {layout, dynamic, bindings, flow, }      from 'arva-js/layout/Decorators.js'
import {Surface} from 'arva-js/surfaces/Surface.js';
import {InputSurface} from 'arva-js/surfaces/InputSurface.js';

import {WhiteShape} from './WhiteShape';

@bindings.setup({
    isOpen: false,
    isPressed: false
})
export class FloatingButton extends View {
    @layout.fullSize()
    background = Surface.with({
        properties: {
            backgroundColor: '#24B3FF',
            borderRadius: '50%',
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 3px 9px 0px'
        }
    });


    @layout.fullSize().translate(0, 0, 30)
    @dynamic(({isPressed}) =>
        flow.transition()(
            layout.opacity(isPressed ? 1 : 0)
        )
    )
    clickOverlay = Surface.with({
        properties: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '50%'
        }
    });

    @layout.stick.center()
        .size(0.6, 3)
    @dynamic(({isOpen}) =>
        isOpen ? flow
                .transition()(
                    layout
                        .translate(0, 0, 0))
                .transition()(
                    layout
                        .rotate(0, 0, Math.PI / 4))
            :
            flow.transition()(
                layout.rotate(0, 0, 0)
            ).transition() (
                layout.translate(0, -8, 0)
            )
    )
    topStick = WhiteShape.with();

    @dynamic(({isOpen}) =>
        isOpen ? flow.transition()(
            layout.opacity(0)
            ) :
            flow.transition()(
                layout
                    .stick.center()
                    .translate(0, 0, 0)
                    .size(0.6, 3)
                    .opacity(1)
            )
    )
    centerStick = WhiteShape.with();

    @layout.stick.center()
        .size(0.6, 3)
    @dynamic(({isOpen}) =>
        isOpen ? flow
                .transition({})(
                    layout
                        .translate(0, 0, 0))
                .transition()(
                    layout
                        .rotate(0, 0, - Math.PI / 4))
            :
            flow.transition()(
                layout.rotate(0, 0, 0)
            ).transition() (
                layout.translate(0, 8, 0)
            )
    )
    bottomStick = WhiteShape.with();


    constructor(options) {
        super(options);
        this.on('touchstart', ()=> {
            this.options.isPressed = true;
        });
        this.on('touchend', ()=> {
            this.options.isOpen = !this.options.isOpen;
            this.options.isPressed = false;
        });
    }

}


