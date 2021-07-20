import { EditBusinessDTO } from "@seekNseat/contracts";
import React, { useReducer } from "react";

import { BusinessProfileForm } from "../components";
import { BusinessesScreen } from "../screens";

const businessProfile: EditBusinessDTO = {
    name: '',
    contactPhone: '',
    address: '',
    description: '',
}

export const businessContext = React.createContext(businessProfile);


const initialBusiness = businessProfile;

const reducer = (state, action) => {
    switch (action) {
        case 'getInfo':
            return
    }
}