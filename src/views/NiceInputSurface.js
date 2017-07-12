/**
 * Created by lundfall on 12/07/2017.
 */

import {InputSurface} from 'arva-js/surfaces/InputSurface.js';


export class NiceInputSurface extends InputSurface {
    static with(options) {
        return super.with({
            ...options,
            properties: {
                paddingLeft: '0px',
                borderBottom: '2px solid rgba(0, 0, 0, 0.2)',
                fontSize: '18px',
                ...options.properties
            }
        })
    }
}