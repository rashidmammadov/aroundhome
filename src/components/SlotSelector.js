import {useContext} from 'react';
import {convertReadableTimeRange} from '../utils/date.util';
import {SlotsContext} from '../contexts/slots.context';

function SlotSelector({companyId, slot}) {
    const {toggleSelectedSlot, isSlotSelected, isSlotDisabled} = useContext(SlotsContext);

    const handleOnSelect = () => {
        if (isSlotSelected(companyId, slot) || !isSlotDisabled(slot)) {
            toggleSelectedSlot(companyId, slot);
        }
    };

    return (
        <div className={'slot-selector' +
            (isSlotSelected(companyId, slot) ? ' selected' : (isSlotDisabled(slot) ? ' disabled' : ''))
        } onClick={handleOnSelect}>
            {convertReadableTimeRange(slot)}
        </div>
    )
}

export default SlotSelector;