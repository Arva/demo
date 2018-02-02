/**
 * Created by lundfall on 13/07/2017.
 */

import Surface                      from 'famous/core/Surface.js';

import {View}                       from 'arva-js/core/View.js';
import {layout, bindings, event}    from 'arva-js/layout/Decorators.js';
import {MenuItem}                   from './MenuItem.js';

@bindings.setup({
    content: 'Hello world'
})
export class BottomMenu extends View {

    @layout.fullSize()
    background = Surface.with({ properties: {backgroundColor: 'white'} });

    @layout.dock.top(0.333)
    firstOption = MenuItem.with({text: 'Home'});

    @layout.dock.top(0.333)
    secondOption = MenuItem.with({text: 'Dashboard'});

    @layout.dock.top(0.333)
    thirdOption = MenuItem.with({text: 'Account'});


}