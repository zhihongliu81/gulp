import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BusinessForm from "../createNewBusiness/businessForm";
// import { editBusinessThunk } from "../../store/business";


const EditBusiness = () => {
    const {businessId} =useParams()
    const business = useSelector(state => state.business[businessId])
    

    return (
        <div>
            <h2>Let's edit your business details</h2>
            <div>
                {console.log('business-------', business)}
                <BusinessForm action={'edit'} business={business} />
            </div>

        </div>
    )

}


export default EditBusiness;