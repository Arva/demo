import {View}                                   from 'arva-js/core/View.js'
import {layout, dynamic, bindings, flow, event} from 'arva-js/layout/Decorators.js'
import {Surface}                                from 'arva-js/surfaces/Surface.js';

import {FloatingButton}                         from './FloatingButton.js';
import {BottomMenu}                             from './BottomMenu.js';
import {Easing}                                 from 'arva-js/utils/Easing.js';
import {BgImageSurface}                         from 'arva-js/surfaces/BgImageSurface.js';
import picture                                  from './christmas-feeling.jpg';
import {SingleLineTextInput}                    from 'arva-kit/input/SingleLineTextInput.js';
import {Checkbox}                               from 'arva-kit/components/Checkbox.js';
import {WhiteIconButton}                        from 'arva-kit/buttons/WhiteIconButton.js';
import {TrashIcon}                              from 'arva-kit/icons/TrashIcon.js';

/* These are the available options for the HomeView and their defaults */
@bindings.setup({
    todos: [{text: 'First todo', done: false}]
})
@layout.dockPadding(32).
dockSpace(16)
export class HomeView extends View {


    @layout.dock.top(true)
    feedbackText = Surface.with({
        content: this.options.todos.every(({done}) => done) ? 'Everything is done!' : 'Still things left to do',
        properties: {textAlign: 'center'}
    });
    @event.on('message', function (text) {
        this.options.todos.push({
            text,
            done: false
        })
    })
    @layout.dock.top(true)
    enterText = SingleLineTextInput.with({
        required: false,
        clearOnEnter: true
    });

    @event.on('remove', function (index) {
        this.options.todos.splice(index, 1);
    })
    @layout.dock.top(48).
        size()
        .stick.top()
    todos = this.options.todos.map((todo, index) =>
        View.with({}, {
            @layout.fullSize()
            text: Surface.with({content: todo.text, properties: {textAlign: 'center', lineHeight: '48px'}}),
            @layout.dock.right(true)
            removeButton: WhiteIconButton.with({icon: TrashIcon, clickEventName: 'remove', clickEventData: [index]}),
            @layout.dock.left(true)
            checkbox: Checkbox.with({state: this.inputOptions.todos[index].done})
        })
    );
}
