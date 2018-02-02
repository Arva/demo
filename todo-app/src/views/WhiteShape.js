/**
 * Created by lundfall on 13/07/2017.
 */

import {Surface}                      from 'arva-js/surfaces/Surface.js';

import {View}                       from 'arva-js/core/View.js';
import {layout, bindings, event}    from 'arva-js/layout/Decorators.js';

export class WhiteShape extends Surface {

    static with(options){
        return super.with({
            properties: {
                backgroundColor: 'white',
                borderRadius: '1px'
            }
        })
    }

}