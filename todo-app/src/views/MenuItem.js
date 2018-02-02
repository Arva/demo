/**
 * Created by lundfall on 13/07/2017.
 */

import Surface                      from 'famous/core/Surface.js';

import {View}                       from 'arva-js/core/View.js';
import {layout, bindings, event, flow}    from 'arva-js/layout/Decorators.js';

@bindings.setup({
    content: 'Hello world'
})
export class MenuItem extends View {

    @layout.stick.center().size(true, true)
    text = Surface.with({ content: this.options.text , properties: {textAlign: 'center'}});

    @flow.defaultState('hidden', {}, layout.opacity(0).fullSize().translate(0, 0, 1))
    @flow.stateStep('shown', {}, layout.opacity(1))
    clickOverlay = Surface.with({
        properties: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }
    });

    @layout.fullSize()
    background = Surface.with();

    constructor(options){
        super(options);
        this.on('touchstart', () =>{
            this.setRenderableFlowState(this.clickOverlay, 'shown');
            this.setRenderableFlowState(this.text, 'bump');
        });
        this.on('touchend',  () => {
            this.setRenderableFlowState(this.clickOverlay, 'hidden');
        });
    }


}