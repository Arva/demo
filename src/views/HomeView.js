import {View}                           from 'arva-js/core/View.js'
import {layout, dynamic, bindings, flow}from 'arva-js/layout/Decorators.js'
import {Model}                          from 'arva-js/core/Model.js'
import {Surface}                        from 'arva-js/surfaces/Surface.js';

import {Text}                           from './Text.js';
import {LabeledInput}                   from './LabeledInput.js';
import {InputSurface}                   from 'arva-js/surfaces/InputSurface.js';


let roundToTwoDecimals = (value) => Math.round(value * 100) / 100;
let getMilageConstant = (mileage) => {
    if (mileage < 20000) {
        return 1;
    }
    if (mileage < 40000) {
        return 0.8;
    }
    if (mileage < 60000) {
        return 0.6;
    }
    if (mileage < 80000) {
        return 0.4;
    }
    if (mileage < 100000) {
        return 0.2;
    }
    return 0;
}


@layout.nativeScrollable()
@bindings.setup({
    initialPrice: 32000,
    damageSeverity: 0,
    mileage: 30000,
    valueBeforeAccident: 28000,
    valueAfterAccident: undefined,
    myName: ''
})
@bindings.preprocess((options, defaultOptions) => {
    let {
        initialPrice = defaultOptions.initialPrice,
        damageSeverity = defaultOptions.damageSeverity,
        mileage = defaultOptions.mileage
    } = options;
    options.valueAfterAccident =
        initialPrice * 0.9 *
        (1 - damageSeverity) *
        getMilageConstant(mileage)
})
@layout.columnDockPadding(500, [50])
    .dockSpace(30)
export class HomeView extends View {

    @layout.fullSize()
    background = Surface.with({ properties: { backgroundColor: 'white' } });

    @layout.dock.top()
        .size(undefined, true)
    welcomeText = Text.with({
        content: `Welcome`,
        properties: {
            fontSize: '32px'
        }
    });

    @layout.dock.top()
        .size(350, true)
    description = Text.with({
        content: `This is a guide to help you determine the diminished value of your car.`,
        properties: {
            fontSize: '18px'
        }
    });
    @layout.dock.top()
        .size(350, true)
    detailedDescription = Text.with({
        content: `The formula is used by insurance companies to asses how much money your car was worth after a crash.`,
        properties: {
            fontSize: '12px'
        }
    });

    @layout.dock.top()
        .size(undefined, true)
    initialMarketPrice = LabeledInput.with({
        label: 'The sales value of your car (€)',
        @bindings.onChange((value) => {
            this.options.initialPrice = value;
        })
        value: this.options.initialPrice
    })



    @layout.dock.top()
        .size(undefined, true)
    mileage = LabeledInput.with({
        label: 'The mileage of your car',
        @bindings.onChange((value) => {
            this.options.mileage = value;
        })
        value: this.options.mileage
    });

    @layout.dock.top()
        .size(undefined, true)
    damageSeverity = LabeledInput.with({
        label: 'Damage severity',
        dropdown: {
            items: [
                {
                    text: 'No structural damage or replaced',
                    value: 0
                }, {
                    text: 'Minor damage to structure and panels',
                    value: 0.25
                }, {
                    text: 'Moderate damage to structure and panels',
                    value: 0.5
                },
                {
                    text: 'Major damage to structure and panels',
                    value: 0.75
                }, {
                    text: 'Severe structural damage',
                    value: 1
                }
            ],
            @bindings.onChange((newSelectedItem) => {
                    if (newSelectedItem) {
                        this.options.damageSeverity = newSelectedItem.value
                    }
                }
            )
            selectedItem: undefined
        }
    })



    @flow.stateStep('increase', { transition: { duration: 100 } }, layout.rotateFrom(0, 0, 0.1))
    @flow.stateStep('increase', { transition: { duration: 100 } }, layout.rotate(0, 0, 0))
    @flow.stateStep('decrease', { transition: { duration: 100 } }, layout.rotateFrom(0, 0, 0.1))
    @dynamic(({ valueAfterAccident }) => {
            let scalingFactor = Math.min(Math.max((valueAfterAccident / 28000), 0.2), 1.7)
            return layout.scale(scalingFactor, scalingFactor, 1)
        }
    )
    @layout.dock.top()
        .size(undefined, true)
    valueAdjustedForMileage = (options) => {
        let currentValue = options.valueAfterAccident;
        if (this._lastValue !== undefined) {
            this.setRenderableFlowState(this.valueAdjustedForMileage,
                this._lastValue > currentValue ? 'decrease' : 'increase');
        }
        this._lastValue = currentValue;
        return Text.with({
            content: `The worth of your car after the accident: 
        <span style="color: rgba(156, 39, 176, 0.95); font-size: 30px;" >
        €${roundToTwoDecimals(
                currentValue
            )}</span>`
        });
    }

    @layout.dock.top()
        .size(undefined, true)
    question = InputSurface.with({
        placeholder: 'What is your name?',
        @bindings.onChange((value) => {
            this.options.myName = value;
        })
        value: this.options.myName
    })

    @layout.dock.top()
        .size(undefined, true)
    answer = Surface.with({
        content: `Your name is ${this.options.myName}`
    })

}


