import DisciplineContainer from './disciplineContainer';
import Toggler from './toggler';

function Sidebar() {
    return (
        <div className='border-4 border-black absolute left-0 top-0'>
            Hello from side bar
            <Toggler displayName='Disciplines'>
                <DisciplineContainer />
            </Toggler>

            <Toggler displayName='Tuition Fees'>
                <DisciplineContainer />
            </Toggler>

            <Toggler displayName='Duration'>
                <DisciplineContainer />
            </Toggler>

            <Toggler displayName='Format'>
                <DisciplineContainer />
            </Toggler>

            <Toggler displayName='Attendance'>
                <DisciplineContainer />
            </Toggler>

            <Toggler displayName='Degree Type'>
                <DisciplineContainer />
            </Toggler>
        </div>
    )
}

export default Sidebar;
