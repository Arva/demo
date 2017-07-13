import {View}                           from 'arva-js/core/View.js'
import {layout, dynamic, bindings, flow}from 'arva-js/layout/Decorators.js'
import {Model}                          from 'arva-js/core/Model.js'
import {Surface}                        from 'arva-js/surfaces/Surface.js';
import {InputSurface}                   from 'arva-js/surfaces/InputSurface.js';

import {getMileageConstant,
    roundToTwoDecimals}                 from '../utils/Calculations.js';
import {Text}                           from './Text.js';
import {LabeledInput}                   from './LabeledInput.js';

let shortTransition = { transition: { duration: 100 } };

@layout.nativeScrollable()
@bindings.setup({
    initialPrice: 32000,
    damageSeverity: 0,
    mileage: 30000,
    valueBeforeAccident: 28000,
    valueAfterAccident: undefined
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
        getMileageConstant(mileage)
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


    /* Flow states defined to indiciate the transition from one value to another*/
    /* The 'increase' flow state is executed when the value goes up */
    @flow.stateStep('increase', shortTransition, layout.rotateFrom(0, 0, 0.1))
    @flow.stateStep('increase', shortTransition, layout.rotate(0, 0, 0))
    /* The 'decrease' flow state is executed when the value goes down */
    @flow.stateStep('decrease', shortTransition, layout.rotateFrom(0, 0, 0.1))
    /* Scale the text in proportion to the car value */
    @dynamic(({ valueAfterAccident }) => {
            let scalingFactor = Math.min(Math.max((valueAfterAccident / 28000), 0.4), 1.7) || 1;
            return layout.scale(scalingFactor, scalingFactor, 1)
        }
    )
    @layout.dock.top()
        .size(undefined, true)
    valueAdjustedForMileage = (options) => {
        let newValue = options.valueAfterAccident;
        /* If there is a previous value, then make the animation depending on whether we had an increase or decrease */
        if (this._previousValue !== undefined) {
            this.setRenderableFlowState(this.valueAdjustedForMileage,
                this._previousValue > newValue ? 'decrease' : 'increase');
        }
        this._previousValue = newValue;
        return Text.with({
            content: this.getResultText()
        });
    }

    getResultText() {
        return `The worth of your car after the accident: 
        <span style="color: rgba(156, 39, 176, 0.95); font-size: 30px;" >
        €${roundToTwoDecimals(
            this.options.valueAfterAccident
        )}</span>`
    }

}


