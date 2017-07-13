/**
 * Created by lundfall on 13/07/2017.
 */
import {View}                           from 'arva-js/core/View.js'
import {layout, dynamic, bindings, flow, event}from 'arva-js/layout/Decorators.js'
import {Surface}                        from 'arva-js/surfaces/Surface.js';
import {InputSurface}                   from 'arva-js/surfaces/InputSurface.js';

import {WhiteShape}                     from './WhiteShape';

@flow.viewStates({
    closed: {
        bottomStick: 'straight',
        centerStick: 'inPlace',
        topStick: 'straight'
    },
    open: {
        bottomStick: 'tilted',
        centerStick: 'dislocated',
        topStick: 'tilted'
    }
})
@bindings.setup({})
@layout.columnDockPadding(500, [50])
    .dockSpace(30)
export class FloatingButton extends View {
    @layout.fullSize()
    background = Surface.with({
        properties: {
            backgroundColor: '#24B3FF',
            borderRadius: '50%',
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 3px 9px 0px'
        }
    });


    @flow.defaultState('hidden', {}, layout.opacity(0).fullSize().translate(0, 0, 30))
    @flow.stateStep('shown', {}, layout.opacity(1))
    clickOverlay = Surface.with({
        properties: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '50%'
        }
    });

    @flow.stateStep('tilted', {}, layout
        .translate(0, 0, 0))
    @flow.stateStep('tilted', {}, layout
        .rotate(0, 0, Math.PI / 4)
    )
    @flow.defaultState('straight', {}, layout
        .translate(0, -8, 0)
        .stick.center()
        .size(0.6, 3)
        .rotate(0, 0, 0))
    topStick = WhiteShape.with();

    @flow.stateStep('dislocated', {transition: {duration: 400}}, layout
        .opacity(0))
    @flow.defaultState('inPlace', {}, layout
        .stick.center()
        .translate(0, 0, 0)
        .size(0.6, 3)
        .opacity(1))
    centerStick = WhiteShape.with();

    @flow.stateStep('tilted', {}, layout
        .translate(0, 0, 0))
    @flow.stateStep('tilted', {}, layout
        .rotate(0, 0, -Math.PI / 4)
    )
    @flow.defaultState('straight', {}, layout
        .translate(0, 8, 0)
        .stick.center()
        .rotate(0, 0, 0)
        .size(0.6, 3))
    bottomStick = WhiteShape.with();


    constructor(options) {
        super(options);
        this.on('touchstart', function () {
            this.setViewFlowState(this.getViewFlowState() === 'open' ? 'closed' : 'open');
            this.setRenderableFlowState(this.clickOverlay, 'shown');
        });
        this.on('touchend', function () {
            this.setRenderableFlowState(this.clickOverlay, 'hidden');
        });
    }

}


