import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector} from "react-redux";
import BusinessForm from "./businessForm";
// import { createBusinessThunk } from "../../store/business";



const CreateNewBusiness = () => {
    // const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    if (!user) {
        return <Redirect to='/' />;
      }


    return (
        <div className="create-edit-business-form-container">
            <h2>Let's start with your business details</h2>
            <p>We'll use this information to help you create your business page on Gulp</p>
            <div>
                <BusinessForm action={'create'} />
            </div>
        </div>
    )
}


export default CreateNewBusiness;
