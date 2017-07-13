/**
 * Created by lundfall on 12/07/2017.
 */

import {Surface} from 'arva-js/surfaces/Surface.js';


export class Text extends Surface {
    static with(options) {
        return super.with({
            ...options, properties: {
                lineHeight: 1.5,
                color: 'rgba(0, 0, 0, 0.8)', fontSize: '18px',
                ...options.properties
            }
        })
    }

}