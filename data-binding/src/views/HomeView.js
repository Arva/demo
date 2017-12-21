import {View} from 'arva-js/core/View.js';
import {layout, dynamic, bindings, flow} from 'arva-js/layout/Decorators.js';
import {Surface} from 'arva-js/surfaces/Surface.js';

import {
    getMileageConstant,
    roundToTwoDecimals
} from '../utils/Calculations.js';
import {Text} from './Text.js';
import {LabeledInput} from './LabeledInput.js';

let shortTransition = {duration: 100};

/* The damage severities along with their textual descriptions */
let damageSeverities = [{
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
    }];

@layout.nativeScrollable()
@bindings.setup({
    initialPrice: 32000,
    damageSeverity: 0,
    mileage: 30000,
    valueBeforeAccident: 28000,
    valueAfterAccident: 0,
    damageSeverityIndex: 0,
    damageSeverity: 0
})
@layout.columnDockPadding(500, [50])
    .dockSpace(30)
export class HomeView extends View {

    @bindings.trigger()
    adjustValueAfterAccident(options) {
        let {
            initialPrice,
            damageSeverity,
            mileage
        } = options;
        /* This is the formula from which we calculate the value after the accident */
        options.valueAfterAccident =
            initialPrice * 0.9 *
            (1 - damageSeverity) *
            getMileageConstant(mileage)
    }

    @bindings.trigger()
    adjustDamageSeverity() {
        this.options.damageSeverity = damageSeverities[this.options.damageSeverityIndex].value;
    }

    @layout.fullSize()
    background = Surface.with({properties: {backgroundColor: 'white'}});

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
        value: this.inputOptions.initialPrice
    });


    @layout.dock.top()
        .size(undefined, true)
    mileage = LabeledInput.with({
        label: 'The mileage of your car',
        value: this.inputOptions.mileage
    });

    @layout.dock.top()
        .size(undefined, true)
    damageSeverity = LabeledInput.with({
        label: 'Damage severity',
        dropdown: {
            items: damageSeverities,
            selectedItemIndex: this.inputOptions.damageSeverityIndex
        }
    });

    @dynamic(({valueAfterAccident}) => {
            let scalingFactor = Math.min(Math.max((valueAfterAccident / 28000), 0.4), 1.4) || 1;
            return flow.transition(shortTransition)(
                layout.scale(scalingFactor, scalingFactor, 1))
        }
    )
    @layout.dock.top()
        .size(undefined, true)
    valueAdjustedForMileage  = Text.with({
            content: this.getResultText()
        });

    getResultText() {
        return `The worth of your car after the accident: 
        <span style="color: rgba(156, 39, 176, 0.95); font-size: 30px;" >
        €${roundToTwoDecimals(
            this.options.valueAfterAccident
        )}</span>`
    }

}


