import {View}                           from 'arva-js/core/View.js'
import {layout, dynamic, bindings, flow, event}from 'arva-js/layout/Decorators.js'
import {Surface}                        from 'arva-js/surfaces/Surface.js';

import {FloatingButton}                 from './FloatingButton.js';
import {BottomMenu}                     from './BottomMenu.js';
import {Easing}                         from 'arva-js/utils/Easing.js';
import {BgImageSurface}                 from 'arva-js/surfaces/BgImageSurface.js';
import picture                          from './christmas-feeling.jpg';

@layout.nativeScrollable()
@bindings.setup({
    isOpen: false
})
export class HomeView extends View {

    @layout
        .stick.bottomRight()
        .size(52, 52)
        .translate(-20, -20, 30)
    button = FloatingButton.with({isOpen: this.inputOptions.isOpen});


    @layout.dock.bottom(200)
    @dynamic(({isOpen}) =>
        isOpen ? flow.transition({curve: Easing.outCubic, duration: 500})(layout.translate(0, 0, 0)) :
            flow.transition()(layout.translate(0, 200, 0))
    )
    bottomMenu = BottomMenu.with();


    @layout.fullSize()
        .translate(0, 0, -5)
    @dynamic(({isOpen}) => flow.transition()(layout.opacity(isOpen ? .4 : 0)))
    darkOverlay = Surface.with({properties: {backgroundColor: 'black'}});


    @layout
        .fullSize()
        .translate(0, 0, -10)
    background = BgImageSurface.with({content: picture});


}


