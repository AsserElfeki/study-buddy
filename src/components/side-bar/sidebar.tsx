import CurrentFilters from './currentFilters';
import DisciplineContainer from './disciplineContainer';
import Toggler from './toggler';
import TuitionContainer from './tuitionContainer';

function Sidebar() {
    return (
        <div className='self-start bg-white rounder-xl mt-4 ml-2 shadow-md'>
            <CurrentFilters />
            <Toggler displayName='Disciplines'>
                <DisciplineContainer />
            </Toggler>

            <Toggler displayName='Tuition Fees'>
                <TuitionContainer />
            </Toggler>

            {/* <Toggler displayName='Duration'>
                <DisciplineContainer />
            </Toggler> */}

            <Toggler displayName='Format'>
                <DisciplineContainer />
            </Toggler>

            <Toggler displayName='Attendance'>
                <DisciplineContainer />
            </Toggler>

            <Toggler displayName='Degree Type'>
                <DisciplineContainer />
            </Toggler>

            <Toggler displayName='Language'>
                <DisciplineContainer />
            </Toggler>
        </div>
    )
}

export default Sidebar;
