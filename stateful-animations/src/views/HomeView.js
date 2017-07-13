import {View}                           from 'arva-js/core/View.js'
import {layout, dynamic, bindings, flow, event}from 'arva-js/layout/Decorators.js'
import {Surface}                        from 'arva-js/surfaces/Surface.js';

import {FloatingButton}                 from './FloatingButton.js';
import {BottomMenu}                     from './BottomMenu.js';

@layout.nativeScrollable()
@bindings.setup({
})
export class HomeView extends View {

    @event.on('viewFlowStateChanged', function (stateName) {
        this.setRenderableFlowState(this.bottomMenu, stateName === 'open' ? 'shown' : 'hidden');
    })
    @layout
        .stick.bottomRight()
        .size(52, 52)
        .translate(-20, -20, 30)
    button = FloatingButton.with();


    @flow.defaultState('hidden', {}, layout.dock.bottom(200).opacity(0).translate(0, 200, 0))
    @flow.stateStep('shown', {}, layout.translate(0, 0, 0).opacity(1))
    bottomMenu = BottomMenu.with()



}


