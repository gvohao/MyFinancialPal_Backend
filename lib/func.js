import React, { useState } from 'react';
import axios from "axios";

let cpiUrl ="https://www.tablebuilder.singstat.gov.sg/publicfacing/api/json/title/16842.json"

async function getCpi() {
    let response = await axios.get(cpiUrl);
    let data = response.data;
    console.log(`cpi in ` + data.Level1[0].year + ` was ` + data.Level1[0].value)
    // setCpi(response)

    return (
        <div></div>
    );
}


export default Func;
