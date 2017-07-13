/**
 * Created by lundfall on 13/07/2017.
 */
export let roundToTwoDecimals = (value) => Math.round(value * 100) / 100;
export let getMileageConstant = (mileage) => {
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
