//
// plugins/Data.js

import Data from "~/data/en.json";

export default (context, inject) => {

    context.$content = Data;
    inject("content", Data);
}
