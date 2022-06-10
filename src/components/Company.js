import {useContext} from 'react';
import {SlotsContext} from '../contexts/slots.context';
import {convertReadableTimeRange} from '../utils/date.util';

function Company({companyId, companyName}) {
    const { getSelectedSlot } = useContext(SlotsContext);

    return (
        <div className='company'>
            <p className='company-name'>{companyName}</p>
            <p className='reservation'>Reservation</p>
            <p className='selected-slot'>{convertReadableTimeRange(getSelectedSlot(companyId), true)}</p>
        </div>
    );
}

export default Company;