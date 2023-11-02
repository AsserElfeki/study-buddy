
import DisciplineCard from './disciplineCard';
import DisciplineContainer from './disciplineContainer';
import DisciplineToggler from './disciplineToggler';

function Sidebar() {
    return (
        <div className='border-4 border-black absolute left-0 top-0'>
            Hello from side bar
            <DisciplineToggler>
                <DisciplineContainer />
            </DisciplineToggler>
        </div>
    )
}

export default Sidebar;
