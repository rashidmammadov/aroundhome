import {useContext, useEffect, useState} from 'react';
import {groupByWeeDayName} from '../utils/date.util';
import SlotSelector from './SlotSelector';
import {SlotsContext} from '../contexts/slots.context';

function Slots({companyId}) {
    const [slots, setSlots] = useState({});
    const {companies, getCompanySlots} = useContext(SlotsContext);

    useEffect(() => {
        setSlots(groupByWeeDayName(getCompanySlots(companyId)));
    }, [companies]);

    return (
        <div className='slots'>
            {Object.keys(slots).map(day =>
                <div key={day}>
                    <p className='day-name'>{day}</p>
                    {slots[day].map(slot =>
                        <SlotSelector
                            key={slot.start_time}
                            companyId={companyId}
                            slot={slot}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default Slots;