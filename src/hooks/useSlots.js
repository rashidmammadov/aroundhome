import {useEffect, useState} from 'react';
import {fetchCompanies} from '../utils/api.util';
import {getTime} from '../utils/date.util';

function useSlots() {
    const [companies, setCompanies] = useState([]);
    const [selectedSlots, setSelectedSlots] = useState({});

    /**
     * @description Creates an object to hold the selected slot for each company, when companies have fetched.
     * @default Example: {
     *     1: undefined,
     *     2: undefined,
     *     3: undefined
     * }
     */
    useEffect(() => {
        if (companies?.length) {
            setSelectedSlots(companies.reduce((selected, company) => {
                selected[company.id] = undefined;
                return selected;
            }, {}));
        }
    }, [companies]);

    /**
     * @description Sends a request to fetch companies` data with slots.
     */
    const getCompanies = () => {
        fetchCompanies().then(result => setCompanies(result));
    };

    /**
     * @description Returns the selected slot of the company with the given company id.
     * @param companyId Holds the company id.
     * @returns {"start_time", "end_time"}
     */
    const getSelectedSlot = (companyId) => {
        return selectedSlots[companyId];
    };

    /**
     * @description Adds or removes the company´s selected slot regarding is exist or not.
     * @param companyId Holds the company id.
     * @param slot Selected slot.
     */
    const toggleSelectedSlot = (companyId, slot) => {
        if (isSlotSelected(companyId, slot)) {
            setSelectedSlots({...selectedSlots, [companyId]: undefined});
        } else {
            setSelectedSlots({...selectedSlots, [companyId]: slot});
        }
    };

    /**
     * @description Returns all time slots of the company with the given company id.
     * @param companyId Holds the company id.
     * @returns [{"start_time", "end_time"}]
     */
    const getCompanySlots = (companyId) => {
        return companies.find(company => company.id === companyId).time_slots;
    };

    /**
     * @description Checks if the slot is selected for the company or not.
     * @param companyId Holds the company id.
     * @param slot Checked slot.
     * @returns {boolean}
     */
    const isSlotSelected = (companyId, slot) => {
        const selected = selectedSlots[companyId];
        return !!(selected && selected.start_time === slot.start_time && selected.end_time === slot.end_time);
    };

    /**
     * @description Checks if the slot is disabled for all slots.
     * @param slot Checked slot.
     * @returns {boolean}
     */
    const isSlotDisabled = (slot) => {
        let disabled = false;
        Object.values(selectedSlots).forEach(selectedSlot => {
            if (selectedSlot &&
                ((
                    getTime(slot.start_time) >= getTime(selectedSlot.start_time) &&
                    getTime(slot.start_time) < getTime(selectedSlot.end_time)
                ) ||
                (
                    getTime(slot.end_time) > getTime(selectedSlot.start_time) &&
                    getTime(slot.end_time) <= getTime(selectedSlot.end_time)
                ))
            ) {
                disabled = true;
            }
        });
        return disabled;
    };

    return {
        companies,
        getCompanies,
        getSelectedSlot,
        toggleSelectedSlot,
        getCompanySlots,
        isSlotSelected,
        isSlotDisabled
    }
}

export default useSlots;