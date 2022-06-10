import {createContext} from 'react';

export const SlotsContext = createContext({
    companies: [],
    getCompanies: () => {},
    getSelectedSlot: (companyId) => {},
    toggleSelectedSlot: (companyId, slot) => {},
    getCompanySlots: (companyId) => {},
    isSlotSelected: (companyId, slot) => false,
    isSlotDisabled: (slot) => false
});