import {SlotsContext} from "./contexts/slots.context";
import useSlots from "./hooks/useSlots";
import CompanyContainer from "./components/CompanyContainer";

function App() {
    return (
        <div className='app'>
            <SlotsContext.Provider value={useSlots()}>
                <CompanyContainer />
            </SlotsContext.Provider>
        </div>
    );
}

export default App;
