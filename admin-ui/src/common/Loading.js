import {HashLoader} from "react-spinners";

const priColor = "#36d7b7"

const Loading = (props) => {
    return (
        <HashLoader color={priColor} {...props}/>
    )
}

export default Loading;