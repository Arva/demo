import Surface          from 'famous/core/Surface.js';
import {View}           from 'arva-js/core/View.js';
import {
    layout,
    bindings
}                       from 'arva-js/layout/Decorators.js';
import {PlusIconSvg}    from './PlusIcon.js'

export class RootView extends View {

    @layout
    /* Take up the full space*/
        .fullSize()
        /* -1 negative z-index to make space for the foreground content*/
        .translate(0, 0, -1)
        /* The surface is the most fundamental element to compose views with */
    background = Surface.with({properties: {backgroundColor: 'aliceblue'}});
    

    @layout
    /* Docking makes something appear at the top with a height of 44 pixels */
        .dock.top(48)
        /* This is a top bar */
    topBar = TopBar.with({title: 'Dashboard'})

    @layout
    /* Stick bottom right, and translate upwards/left for margin*/
        .stick.bottomRight()
        .translate(-16, -16, 0)
        .size(64, 64)
        /* We could pass a color to this button, but we're not, so the button will get its default color */
    bottomButton = Button.with()

}

/* Declare 'title' being part of the top bar class option */
@bindings.setup({
    title: 'Default title'
})
class TopBar extends View {
    @layout.fullSize()
    background = Surface.with({
        properties: {
            backgroundColor: 'white',
            boxShadow: `0px 0px 8px 0px rgba(0, 0, 0, 0.12)`
        }
    });

    @layout
    /* This will create a centered item*/
        .stick.center()
        /* True size means that the size will be wrapped to the text */
        .size(true, true)
    title = Surface.with({content: this.options.title, properties: {fontSize: '16px'}})
}


@bindings.setup({
    color: '#18D3B9'
})
class Button extends View {
    @layout.fullSize()
    background = Surface.with({
        properties: {
            cursor: 'pointer',
            borderRadius: '50%',
            backgroundColor: this.options.color,
            boxShadow: `0px 0px 8px 0px ${this.options.color}`
        }
    });

    @layout
        .stick.center()
        .size(0.5, 0.5)
    plusSign = Surface.with({
        content: PlusIconSvg,
        properties: {
            color: 'white'
        }
    })
}