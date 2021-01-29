
const LinkDetails = (props) => {
    const {from, to, owner, date, clicks } = props.linkDetails
return (
        <div>
            <div>Original: <a href={from}>{from}</a> </div>
            <div>Short: <a href={to}>{to}</a></div>
            <div>Owner: {owner}</div>
            <div>Creation date: {new Date(date).toLocaleDateString()}</div>
            <div>Cliks on link: {clicks}</div>
        </div>)
  
}
export default LinkDetails