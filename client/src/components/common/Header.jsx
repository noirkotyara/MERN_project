import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const Header = () => {

    return (
        <div className="col s12 m2">
        <div className="z-depth-5"> <h2 style={{padding: "20px"}} className="center-align #80cbc4 teal lighten-3">
            <FontAwesomeIcon style={{padding: "5px"}} icon={Icons.faLink}/>
            <FontAwesomeIcon style={{padding: "5px"}} icon={Icons.faHandScissors}/>
            Links Cutter App
            </h2></div>
      </div>
    )
}

export default Header;