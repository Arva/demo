/**
 * Created by lundfall on 12/07/2017.
 */

import {InputSurface}           from 'arva-js/surfaces/InputSurface.js';

import {View}                   from 'arva-js/core/View.js';
import {layout, bindings, event}from 'arva-js/layout/Decorators.js';
import {NiceText} from './NiceText';
import {NiceInputSurface} from './NiceInputSurface';
import {NiceDropdown} from './NiceDropdown';

@bindings.setup({
    content: 'Hello world',
    value: '',
    dropdown: {selectedItem: {}}
})

@layout.dockSpace(10)
export class LabeledText extends View {

    @layout.dock.top(true)
    label = NiceText.with({ content: this.options.label + ':', properties: {fontSize: '12px'}});

    @layout.dock.top(32)
    inputSurface = this.options.dropdown.items ?
        NiceDropdown.with({
            items: this.options.dropdown.items,
            @bindings.onChange((selectedItem) =>
                this.options.dropdown.selectedItem = selectedItem
            )
            selectedItem: undefined
        }) :
        NiceInputSurface.with({
        @bindings.onChange((value) => {
            this.options.value = value;
        })
        value: this.options.value
    });


}