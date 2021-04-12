import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const LinkDetails = (props) => {
    const { from, to, date, clicks } = props.linkDetails;
    const names = {
        fontWeight: "bold",
        padding: "20px",
        fontSize: "20px"
    }
    const content = { 
        fontWeight: "bold",
    }
    return (
        <div>
            <table style={{ tableLayout: "fixed" }}>
                <tbody>
                    <tr>
                        <td><span style={names}>Original :</span></td>
                        <td><a style={content} href={from}>{from}</a> <FontAwesomeIcon size="lg" icon={Icons.faLink}/></td>
                    </tr>
                    <tr>
                        <td><span style={names}>Short :</span></td>
                        <td style={content}><a  href={to} style={{ overflow: "scroll", width: "100px" }}>{to}</a> <FontAwesomeIcon size="lg" icon={Icons.faHandScissors}/></td>
                    </tr>
                    <tr>
                        <td><span style={names}>Creation date :</span></td>
                        <td style={content}>{new Date(date).toLocaleDateString()} <FontAwesomeIcon size="lg" icon={Icons.faCalendarAlt}/></td>
                    </tr>
                    <tr>
                        <td><span style={names}>Clicks on link :</span></td>
                        <td style={content}>{clicks} <FontAwesomeIcon size="lg" icon={Icons.faMouse}/></td>
                    </tr>
                </tbody>
            </table>
        </div>)

}
export default LinkDetails