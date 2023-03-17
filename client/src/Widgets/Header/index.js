import './style.css'

// Import Widgets
import SearchView from '../SearchView'

export default function Header(props){
    return(
        <header>
            <span className='logo-header'>Weather<b>Forecast App</b></span>
            <SearchView setSearch={props.setSearch!=null&&props.setSearch}/>
        </header>
    )
}