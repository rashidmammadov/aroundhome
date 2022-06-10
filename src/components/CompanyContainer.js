import {SlotsContext} from '../contexts/slots.context';
import Company from './Company';
import Slots from './Slots';
import {useContext, useEffect} from 'react';

function CompanyContainer() {
    const {getCompanies} = useContext(SlotsContext);

    useEffect(() => {
        getCompanies();
    }, []);

    return (
        <SlotsContext.Consumer>
            { value => value.companies.length ?
                value.companies.map(company =>
                    <div className='company-container' key={company.id}>
                        <Company companyId={company.id} companyName={company.name} />
                        <Slots companyId={company.id} />
                    </div>
                ) :
                <div className='warning'>No data to show!</div>
            }
        </SlotsContext.Consumer>
    )
}

export default CompanyContainer;