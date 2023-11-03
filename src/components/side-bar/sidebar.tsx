import DisciplineContainer from './disciplineContainer';
import Toggler from './toggler';
import TuitionContainer from './tuitionContainer';

function Sidebar() {
    return (
        <div className=' absolute left-0 top-0 border-4 border-blue-400'>
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
            <Toggler displayName='Langyage'>
                <DisciplineContainer />
            </Toggler>
        </div>
    )
}

export default Sidebar;
