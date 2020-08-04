import React from 'react';
import {connect} from 'react-redux';
class Home extends React.Component
{
    render()
    {
        return( 
            <div>home</div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(null, mapDispatchToProps)(Home);