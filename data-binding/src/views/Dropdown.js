/**
 * Created by lundfall on 12/07/2017.
 */

import {Dropdown as RawDropdown}               from 'arva-js/surfaces/Dropdown.js';


export class Dropdown extends RawDropdown {
    static with(options) {
        return super.with({
            ...options, properties: {
                borderBottom: '2px solid rgba(0, 0, 0, 0.2)',
                border: 'none',
                paddingLeft: '0px',
                borderRadius: '0px',
                fontSize: '18px',
                ...options.properties
            }
        })
    }
}